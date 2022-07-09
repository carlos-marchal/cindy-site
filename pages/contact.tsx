import type { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import styled from "styled-components";
import { Footer } from "../components/footer";
import { HeadData } from "../components/head-data";
import { Header } from "../components/header";
import {
  PortableTextData,
  TextRenderer,
} from "../components/works/text-renderer";
import { SanityProps } from "../sanity-client/config";
import { useSanityData } from "../sanity-client/sanity";
import { getSanityStaticProps } from "../sanity-client/sanity.server";

interface ContactData {
  title: string;
  content: PortableTextData;
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return getSanityStaticProps([groq`*[_id == "contact"]`], preview);
};

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: var(--white);
  background: var(--black);
`;

const Main = styled.main`
  font: var(--header-font);
  flex-grow: 1;
  margin: 0 var(--lateral-margin);
  padding-top: 35px;
  max-width: 900px;
  @media (min-width: 768px) {
    padding-top: 70px;
  }
`;

type ContactProps = SanityProps<[ContactData]>;

const ContactPage: NextPage<ContactProps> = (props) => {
  const [settings, data] = useSanityData(props);
  return (
    <Root>
      <HeadData
        title={settings.title_prefix + data.title}
        description={settings.description}
        image={settings.preview}
      />
      <Header preview={props.preview}  navItems={settings.navigation} />
      <Main>
        <TextRenderer>{data.content}</TextRenderer>
      </Main>
      <Footer contact={settings.contact_information} />
    </Root>
  );
};

export default ContactPage;
