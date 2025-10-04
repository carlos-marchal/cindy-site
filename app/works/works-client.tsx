'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  ShowcaseList,
  ShowcaseThumbnailData,
  ShowcaseThumnbailCategory,
} from '@/components/showcases'
import { SiteContactInformation, SiteSettingsNavigation } from '@/sanity-client/config'

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex-grow: 1;
  margin-bottom: var(--lateral-margin);
`

const CategoryFilter = styled.form`
  --items-margin: 40px;
  margin: 50px var(--lateral-margin);
  margin-right: calc(var(--lateral-margin) - var(--items-margin));
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;

  @media (min-width: 768px) {
    justify-content: center;
  }
`

const Label = styled.label<{ checked: boolean }>`
  cursor: pointer;
  text-decoration: ${({ checked }) => (checked ? 'underline' : 'none')};
  margin-right: var(--items-margin);
  margin-bottom: 20px;

  :hover {
    color: var(--highlight);
  }
`

interface WorksClientProps {
  navItems: SiteSettingsNavigation[]
  categoryFilter: ShowcaseThumnbailCategory[]
  showcases: ShowcaseThumbnailData[]
  contact: SiteContactInformation
  draftMode: boolean
}

export default function WorksClient(props: WorksClientProps) {
  const [selected, setSelected] = useState<string>()
  const showcases = props.showcases.filter(
    (showcase) => selected === undefined || showcase.category._id === selected
  )

  return (
    <Root>
      <Header preview={props.draftMode} navItems={props.navItems} />
      <Main>
        <CategoryFilter>
          <Label checked={selected === undefined}>
            <input
              type="radio"
              onChange={() => setSelected(undefined)}
              name="category"
            />
            All
          </Label>
          {props.categoryFilter.map((category) => (
            <Label checked={selected === category._id} key={category._id}>
              <input
                type="radio"
                onChange={() => setSelected(category._id)}
                name="category"
              />
              {category.name}
            </Label>
          ))}
        </CategoryFilter>
        <ShowcaseList>{showcases}</ShowcaseList>
      </Main>
      <Footer contact={props.contact} showBackToTop />
    </Root>
  )
}
