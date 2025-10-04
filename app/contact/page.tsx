import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { getStaticSanityData } from '@/sanity-client/sanity.app'
import { urlFor } from '@/sanity-client/config'
import { PortableTextData } from '@/components/works/text-renderer'
import ContactClient from './contact-client'

export const dynamic = 'force-static'
export const revalidate = false

interface ContactData {
  title: string
  content: PortableTextData
}

async function getData() {
  const data = await getStaticSanityData<[ContactData]>([
    groq`*[_id == "contact"]`,
  ])
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

export default async function ContactPage() {
  const [settings, data] = await getData()
  const { isEnabled } = await draftMode()

  return (
    <ContactClient
      navItems={settings.navigation}
      content={data.content}
      contact={settings.contact_information}
      draftMode={isEnabled}
    />
  )
}
