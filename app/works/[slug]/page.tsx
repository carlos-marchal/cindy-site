import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { SanityImageReference, urlFor } from '@/sanity-client/config'
import { getStaticSanityData, getStaticSanityPaths } from '@/sanity-client/sanity.app'
import {
  IntroSectionData,
} from '@/components/works/intro-section'
import {
  TextSectionData,
} from '@/components/works/text-section'
import {
  HighlightSectionData,
} from '@/components/works/highlight-section'
import {
  ImageSectionData,
} from '@/components/works/image-section'
import {
  GallerySectionData,
} from '@/components/works/gallery-section'
import {
  CarousselSectionData,
} from '@/components/works/caroussel-section'
import {
  ShowcaseThumbnailData,
} from '@/components/showcases'
import WorkClient from './work-client'

export const dynamic = 'force-static'
export const revalidate = false

interface WorksData {
  slug: string
  title: string
  description: string
  cover: SanityImageReference
  sections: SectionData[]
  category: string
  related: ShowcaseThumbnailData[] | null
}

type SectionData =
  | IntroSectionData
  | TextSectionData
  | HighlightSectionData
  | ImageSectionData
  | GallerySectionData
  | CarousselSectionData

export async function generateStaticParams() {
  const paths = await getStaticSanityPaths(
    groq`*[_type == "showcase" && !(_id in path("drafts.**"))]{"slug": slug.current}`
  )
  return paths
}

async function getData(slug: string) {
  const data = await getStaticSanityData<[WorksData]>([
    groq`*[_type == "showcase" && slug.current == "${slug}"]{
      _id, title, description, sections, cover,
      "slug": slug.current,
      "category": category->name,
      "related": related[]->{
        _id, title, cover,
        category->{ _id, name },
        "slug": slug.current,
      }
    }`,
  ])
  return data
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const [settings, data] = await getData(slug)
  return {
    title: settings.title_prefix + data.title,
    description: data.description,
    openGraph: {
      title: settings.title_prefix + data.title,
      description: data.description,
      images: [urlFor(data.cover).width(1200).height(630).toString()],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.title_prefix + data.title,
      description: data.description,
      images: [urlFor(data.cover).width(1200).height(630).toString()],
    },
  }
}

export default async function ShowcasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [settings, data] = await getData(slug)
  const { isEnabled } = await draftMode()

  return (
    <WorkClient
      slug={data.slug}
      navItems={settings.navigation}
      sections={data.sections}
      category={data.category}
      related={data.related}
      contact={settings.contact_information}
      draftMode={isEnabled}
    />
  )
}
