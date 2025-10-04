'use client'

import styled from 'styled-components'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TextRenderer, PortableTextData } from '@/components/works/text-renderer'
import { SiteSettingsNavigation, SiteContactInformation } from '@/sanity-client/config'

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: var(--white);
  background: var(--black);
`

const Main = styled.main`
  font: var(--header-font);
  flex-grow: 1;
  margin: 0 var(--lateral-margin);
  padding-top: 35px;
  max-width: 900px;
  @media (min-width: 768px) {
    padding-top: 70px;
  }
`

interface ContactClientProps {
  navItems: SiteSettingsNavigation[]
  content: PortableTextData
  contact: SiteContactInformation
  draftMode: boolean
}

export default function ContactClient(props: ContactClientProps) {
  return (
    <Root>
      <Header preview={props.draftMode} navItems={props.navItems} light />
      <Main>
        <TextRenderer>{props.content}</TextRenderer>
      </Main>
      <Footer contact={props.contact} />
    </Root>
  )
}
