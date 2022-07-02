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

interface WorksData {
  title: string;
  sections: SectionData[];
  category: string;
}

type SectionData =
  | IntroSectionData
  | TextSectionData
  | HighlightSectionData
  | ImageSectionData;

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
      groq`*[_type == "showcase" && slug.current == "${slug}"]{ title, sections, "category": category->name }`,
    ],
    preview
  );
  return props;
};

const ShowcasePage: NextPage<ShowcaseProps> = (props) => {
  const [settings, data] = useSanityData(props);
  return (
    <>
      <Head>
        <title>{settings.title_prefix + data.title}</title>
        <meta name="description" content="Works description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data.sections.map((section) => {
        switch (section._type) {
          case "intro":
            return (
              <IntroSection category={data.category}>{section}</IntroSection>
            );
          case "text_section":
            return <TextSection>{section}</TextSection>;
          case "highlight":
            return <HighlightSection>{section}</HighlightSection>;
          case "picture":
            return <ImageSection>{section}</ImageSection>;
        }
      })}
    </>
  );
};

export default ShowcasePage;
