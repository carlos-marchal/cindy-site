import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import {
  SanityImageReference,
  SanityProps,
  urlFor,
} from "../../sanity-client/config";
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
import { Footer } from "../../components/footer";
import {
  ShowcaseList,
  ShowcaseThumbnailData,
} from "../../components/showcases";
import { HeadData } from "../../components/head-data";

interface WorksData {
  title: string;
  description: string;
  cover: SanityImageReference;
  sections: SectionData[];
  category: string;
  related: ShowcaseThumbnailData[] | null;
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
      groq`*[_type == "showcase" && slug.current == "${slug}"]{ 
        _id, title, sections, cover,
        "category": category->name,
        "related": related[]->{ _id, category->{ _id, name }, cover, "slug": slug.current, title }
      }`,
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

const RelatedWorks = styled.section`
  color: var(--white);
  background: var(--black);
  padding-top: 30px;
`;

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
`;

const ShowcasePage: NextPage<ShowcaseProps> = (props) => {
  const [settings, data] = useSanityData(props);
  return (
    <>
      <HeadData
        title={settings.title_prefix + data.title}
        description={data.description}
        image={data.cover}
      />
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
        {data.related !== null && (
          <RelatedWorks>
            <RelatedWorksHeader>Otros Proyectos</RelatedWorksHeader>
            <ShowcaseList>{data.related}</ShowcaseList>
          </RelatedWorks>
        )}
      </Main>
      <Footer contact={settings.contact_information} />
    </>
  );
};

export default ShowcasePage;
