import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import { SanityProps } from "../../sanity-client/config";
import { useSanityData } from "../../sanity-client/sanity";
import {
  getSanityStaticPaths,
  getSanityStaticProps,
} from "../../sanity-client/sanity.server";
import {
  IntroSection,
  IntroSectionData,
} from "../../components/works/intro-section";
import {
  TextSection,
  TextSectionData,
} from "../../components/works/text-section";
import {
  HighlightSection,
  HighlightSectionData,
} from "../../components/works/highlight-section";
import {
  ImageSection,
  ImageSectionData,
} from "../../components/works/image-section";
import {
  GallerySection,
  GallerySectionData,
} from "../../components/works/gallery-section";
import {
  CarousselSection,
  CarousselSectionData,
} from "../../components/works/caroussel-section";
import { Header } from "../../components/header";
import styled from "styled-components";

interface WorksData {
  title: string;
  sections: SectionData[];
  category: string;
}

type SectionData =
  | IntroSectionData
  | TextSectionData
  | HighlightSectionData
  | ImageSectionData
  | GallerySectionData
  | CarousselSectionData;

type ShowcaseProps = SanityProps<[WorksData]>;

export const getStaticPaths: GetStaticPaths = async () => {
  return await getSanityStaticPaths(
    groq`*[_type == "showcase"]{"slug": slug.current}`,
    (entry) => `/works/${entry.slug}`
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const { slug } = params as Record<string, string>;
  const props = await getSanityStaticProps(
    [
      groq`*[_type == "showcase" && slug.current == "${slug}"]{ _id, title, sections, "category": category->name }`,
    ],
    preview
  );
  return props;
};

const Main = styled.main`
  margin-top: 40px;

  @media (min-width: 768px) {
  margin-top: 0;
  }
`;

const ShowcasePage: NextPage<ShowcaseProps> = (props) => {
  const [settings, data] = useSanityData(props);
  return (
    <>
      <Head>
        <title>{settings.title_prefix + data.title}</title>
        <meta name="description" content="Works description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header navItems={settings.navigation} />
      <Main>
        {data.sections.map((section, index) => {
          switch (section._type) {
            case "intro":
              return (
                <IntroSection key={index} category={data.category}>
                  {section}
                </IntroSection>
              );
            case "text_section":
              return <TextSection key={index}>{section}</TextSection>;
            case "highlight":
              return <HighlightSection key={index}>{section}</HighlightSection>;
            case "picture":
              return <ImageSection key={index}>{section}</ImageSection>;
            case "gallery":
              return <GallerySection key={index}>{section}</GallerySection>;
            case "caroussel":
              return <CarousselSection key={index}>{section}</CarousselSection>;
          }
        })}
      </Main>
    </>
  );
};

export default ShowcasePage;
