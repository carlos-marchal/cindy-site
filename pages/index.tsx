import type { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import styled from "styled-components";
import { Arrow } from "../components/arrow";
import { Header } from "../components/header";
import { SanityProps } from "../sanity-client/config";
import { useSanityData } from "../sanity-client/sanity";
import { getSanityStaticProps } from "../sanity-client/sanity.server";

interface IndexData {
  title: string;
  main_text: string;
  footer: string;
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return getSanityStaticProps([groq`*[_id == "home"]`], preview);
};

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  font: var(--header-font);
  display: grid;
  place-content: start;
  place-items: start;
  gap: 25px;
  margin: 0 var(--lateral-margin);
  padding-top: 35px;
  max-width: 900px;
  flex-grow: 1;
  @media (min-width: 768px) {
    padding-top: 70px;
  }
`;

const Footer = styled.footer`
  margin: 0 var(--lateral-margin);
  padding-bottom: 35px;
  margin-bottom: 45px;
  --border: 2px solid var(--black);
  border-bottom: var(--border);

  @media (min-width: 768px) {
    margin-bottom: 0;
    padding: 40px 0 80px 0;
    border-bottom: none;
    border-top: var(--border);
    display: flex;
    justify-content: right;
    align-items: baseline;
  }
`;

type IndexProps = SanityProps<[IndexData]>;

const IndexPage: NextPage<IndexProps> = (props) => {
  const [settings, data] = useSanityData(props);
  return (
    <Root>
      <Head>
        <title>
          {settings.title_prefix}
          {data.title}
        </title>
        <meta name="description" content="Home description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header navItems={settings.navigation} />
      <Main>
        {data.main_text}
        <Arrow direction="down" onClick={() => {}}>
          Go to works
        </Arrow>
      </Main>
      <Footer>{data.footer}</Footer>
    </Root>
  );
};

export default IndexPage;
