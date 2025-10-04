import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { SanityImageReference, urlFor } from '@/sanity-client/config'
import { getStaticSanityData } from '@/sanity-client/sanity.app'
import { PortableTextData } from '@/components/works/text-renderer'
import AboutClient from './about-client'

export const dynamic = 'force-static'
export const revalidate = false

interface AboutData {
  title: string
  portrait: SanityImageReference
  entries: AboutChronologyEntry[]
}

interface AboutChronologyEntry {
  period: string
  content: PortableTextData
}

async function getData() {
  const data = await getStaticSanityData<[AboutData]>([groq`*[_id == "about"]`])
  return data
}

export async function generateMetadata(): Promise<Metadata> {
  const [settings, data] = await getData()
  return {
    title: settings.title_prefix + data.title,
    description: settings.description,
    openGraph: {
      title: settings.title_prefix + data.title,
      description: settings.description,
      images: [urlFor(settings.preview).width(1200).height(630).toString()],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.title_prefix + data.title,
      description: settings.description,
      images: [urlFor(settings.preview).width(1200).height(630).toString()],
    },
  }
}

export default async function AboutPage() {
  const [settings, data] = await getData()
  const { isEnabled } = await draftMode()

  return (
    <AboutClient
      navItems={settings.navigation}
      portrait={data.portrait}
      entries={data.entries}
      draftMode={isEnabled}
    />
  )
}
