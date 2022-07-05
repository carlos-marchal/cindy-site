import type { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Image from "next/image";
import styled from "styled-components";
import { HeadData } from "../components/head-data";
import { Header } from "../components/header";
import {
  PortableTextData,
  TextRenderer,
} from "../components/works/text-renderer";
import { SanityImageReference, SanityProps } from "../sanity-client/config";
import { sanityImageProps, useSanityData } from "../sanity-client/sanity";
import { getSanityStaticProps } from "../sanity-client/sanity.server";

interface AboutData {
  title: string;
  portrait: SanityImageReference;
  entries: AboutChronologyEntry[];
}

interface AboutChronologyEntry {
  period: string;
  content: PortableTextData;
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return getSanityStaticProps([groq`*[_id == "about"]`], preview);
};

const Root = styled.div`
  min-height: 100vh;
  flex-direction: column;
  color: var(--white);
  background: var(--black);
`;

const Main = styled.main`
  margin: 0 var(--lateral-margin);
  padding-top: 35px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 30vw;
    gap: 150px;
  }
`;

const Portrait = styled.div`
  max-width: 50vw;

  @media (min-width: 768px) {
    position: fixed;
    bottom: 0;
    right: var(--lateral-margin);
    width: 30vw;
  }
`;

const DL = styled.dl`
  margin: 35px 0;

  em {
    font-family: "Grand Slang";
    font-style: normal;
  }

  @media (min-width: 768px) {
    order: -1;
  }
`;

const DD = styled.dd`
  margin-bottom: 35px;
`;

type AboutProps = SanityProps<[AboutData]>;

const AboutPage: NextPage<AboutProps> = (props) => {
  const [settings, data] = useSanityData(props);
  const imageProps = sanityImageProps(data.portrait, "responsive");
  return (
    <Root>
      <HeadData
        title={settings.title_prefix + data.title}
        description={settings.description}
        image={settings.preview}
      />
      <Header navItems={settings.navigation} />
      <Main>
        <Portrait>
          <Image {...imageProps} sizes="(min-width: 768px) 30vw, 50vw" />
        </Portrait>
        <DL>
          {data.entries.map((entry) => (
            <>
              <dt>{entry.period}</dt>
              <DD>
                <TextRenderer>{entry.content}</TextRenderer>
              </DD>
            </>
          ))}
        </DL>
      </Main>
    </Root>
  );
};

export default AboutPage;
