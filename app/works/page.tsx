import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { getStaticSanityData } from '@/sanity-client/sanity.app'
import { urlFor } from '@/sanity-client/config'
import {
  ShowcaseThumbnailData,
  ShowcaseThumnbailCategory,
} from '@/components/showcases'
import WorksClient from './works-client'

export const dynamic = 'force-static'
export const revalidate = false

interface WorksData {
  title: string
  category_filter: ShowcaseThumnbailCategory[]
  showcases: ShowcaseThumbnailData[]
}

async function getData() {
  const data = await getStaticSanityData<[WorksData]>([
    groq`*[_id == "works"]{
      title,
      category_filter[]->{ _id, name },
      showcases[]->{ _id, category->{ _id, name }, cover, "slug": slug.current, title }
    }`,
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

export default async function WorksPage() {
  const [settings, data] = await getData()
  const { isEnabled } = await draftMode()

  return (
    <WorksClient
      navItems={settings.navigation}
      categoryFilter={data.category_filter}
      showcases={data.showcases}
      contact={settings.contact_information}
      draftMode={isEnabled}
    />
  )
}
