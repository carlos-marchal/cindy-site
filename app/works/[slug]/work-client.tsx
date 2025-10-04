'use client'

import { Fragment } from 'react'
import styled from 'styled-components'
import { SiteSettingsNavigation, SiteContactInformation } from '@/sanity-client/config'
import {
  IntroSection,
  IntroSectionData,
} from '@/components/works/intro-section'
import {
  IntroVideoSection,
  IntroVideoSectionData,
} from '@/components/works/intro-video-section'
import {
  TextSection,
  TextSectionData,
} from '@/components/works/text-section'
import {
  HighlightSection,
  HighlightSectionData,
} from '@/components/works/highlight-section'
import {
  HighlightVideoSection,
  HighlightVideoSectionData,
} from '@/components/works/highlight-video-section'
import {
  ImageSection,
  ImageSectionData,
} from '@/components/works/image-section'
import {
  ImageVideoSection,
  ImageVideoSectionData,
} from '@/components/works/image-video-section'
import {
  GallerySection,
  GallerySectionData,
} from '@/components/works/gallery-section'
import {
  CarousselSection,
  CarousselSectionData,
} from '@/components/works/caroussel-section'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  ShowcaseList,
  ShowcaseThumbnailData,
} from '@/components/showcases'

type SectionData =
  | IntroSectionData
  | IntroVideoSectionData
  | TextSectionData
  | HighlightSectionData
  | HighlightVideoSectionData
  | ImageSectionData
  | ImageVideoSectionData
  | GallerySectionData
  | CarousselSectionData

const Main = styled.main`
  margin-top: 40px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`

const RelatedWorks = styled.section`
  color: var(--white);
  background: var(--black);
  padding-top: 30px;
`

const RelatedWorksHeader = styled.header`
  font: var(--header-font);
  margin: 0 var(--lateral-margin) 30px var(--lateral-margin);
  padding: 15px 10px;
  border-bottom: 2px solid currentColor;

  @media (min-width: 768px) {
    font-size: 60px;
    padding: 15px 0;
    margin-bottom: 50px;
  }
`

interface WorkClientProps {
  slug: string
  navItems: SiteSettingsNavigation[]
  sections: SectionData[]
  category: string
  related: ShowcaseThumbnailData[] | null
  contact: SiteContactInformation
  draftMode: boolean
}

export default function WorkClient(props: WorkClientProps) {
  return (
    <Fragment key={props.slug}>
      <Header preview={props.draftMode} navItems={props.navItems} />
      <Main>
        {props.sections.map((section, index) => {
          switch (section._type) {
            case 'intro':
              return (
                <IntroSection key={index} category={props.category}>
                  {section}
                </IntroSection>
              )
            case 'intro_video':
              return (
                <IntroVideoSection key={index} category={props.category}>
                  {section}
                </IntroVideoSection>
              )
            case 'text_section':
              return <TextSection key={index}>{section}</TextSection>
            case 'highlight':
              return <HighlightSection key={index}>{section}</HighlightSection>
            case 'highlight_video':
              return <HighlightVideoSection key={index}>{section}</HighlightVideoSection>
            case 'picture':
              return <ImageSection key={index}>{section}</ImageSection>
            case 'picture_video':
              return <ImageVideoSection key={index}>{section}</ImageVideoSection>
            case 'gallery':
              return <GallerySection key={index}>{section}</GallerySection>
            case 'caroussel':
              return <CarousselSection key={index}>{section}</CarousselSection>
          }
        })}
        {props.related !== null && (
          <RelatedWorks>
            <RelatedWorksHeader>Related works</RelatedWorksHeader>
            <ShowcaseList>{props.related}</ShowcaseList>
          </RelatedWorks>
        )}
      </Main>
      <Footer contact={props.contact} showBackToTop />
    </Fragment>
  )
}
