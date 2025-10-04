import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { getStaticSanityData } from '@/sanity-client/sanity.app'
import { urlFor } from '@/sanity-client/config'
import HomeClient from './page-client'

export const dynamic = 'force-static'
export const revalidate = false

interface IndexData {
  title: string
  main_text: string
  footer: string
}

async function getData() {
  const data = await getStaticSanityData<[IndexData]>([groq`*[_id == "home"]`])
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

export default async function HomePage() {
  const [settings, data] = await getData()
  const { isEnabled } = await draftMode()

  return (
    <HomeClient
      navItems={settings.navigation}
      mainText={data.main_text}
      footer={data.footer}
      draftMode={isEnabled}
    />
  )
}
