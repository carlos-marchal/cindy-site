import { draftMode } from 'next/headers'
import { createClient } from 'next-sanity'
import {
  getSanityData,
  isSanityImageReference,
  sanityConfig,
  SanityImageReference,
  sanitySettingsQuery,
  SiteSettings,
} from './config'
import { urlBuilder } from './sanity'

const sanityClient = createClient(sanityConfig)

const draftClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const getClient = (useDraftMode: boolean) =>
  useDraftMode ? draftClient : sanityClient

export async function getStaticSanityData<T extends unknown[]>(
  queries: string[]
): Promise<[SiteSettings, ...T]> {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled)

  const responses = await Promise.all(
    [sanitySettingsQuery, ...queries].map((query) => client.fetch(query))
  )

  if (responses.every((response) => response === undefined)) {
    throw new Error('No data found')
  }

  const data = await Promise.all(
    responses.map(async (response) => {
      const entry = getSanityData(response, isEnabled)
      await loadSanityBlurredPlaceholders(entry)
      return entry
    })
  )

  return data as [SiteSettings, ...T]
}

export async function getStaticSanityPaths(
  query: string
): Promise<{ slug: string }[]> {
  const response = await sanityClient.fetch(query)
  return response
}

async function loadSanityBlurredPlaceholders(
  data: unknown | SanityImageReference
): Promise<void> {
  if (typeof data !== 'object' || data === null) {
    return
  }
  if (Array.isArray(data)) {
    await Promise.all(data.map(loadSanityBlurredPlaceholders))
    return
  }
  if (!isSanityImageReference(data)) {
    await Promise.all(Object.values(data).map(loadSanityBlurredPlaceholders))
    return
  }

  try {
    const blurredURL = urlBuilder
      .image(data)
      .height(30)
      .quality(30)
      .format('jpg')
      .url()
    const response = await fetch(blurredURL, { signal: AbortSignal.timeout(5000) })
    const blob = await response.arrayBuffer()
    const base64 = Buffer.from(blob).toString('base64')
    const contentType = response.headers.get('content-type')
    const blurredDataURL = `data:${contentType};base64,${encodeURIComponent(
      base64
    )}`;
    (data as SanityImageReference).blurDataURL = blurredDataURL
  } catch (error) {
    // Skip blur placeholder if fetch fails - image will still work
    console.warn('Failed to load blur placeholder:', error)
  }
}
