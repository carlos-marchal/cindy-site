import type { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/header";
import { SanityProps, urlFor } from "../../sanity-client/config";
import { useSanityData } from "../../sanity-client/sanity";
import { getSanityStaticProps } from "../../sanity-client/sanity.server";
import { Footer } from "../../components/footer";
import {
  ShowcaseList,
  ShowcaseThumbnailData,
  ShowcaseThumnbailCategory,
} from "../../components/showcases";

interface WorksData {
  title: string;
  category_filter: ShowcaseThumnbailCategory[];
  showcases: ShowcaseThumbnailData[];
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return getSanityStaticProps(
    [
      groq`*[_id == "works"]{ 
        title,
        category_filter[]->{ _id, name },
        showcases[]->{ _id, category->{ _id, name }, cover, "slug": slug.current, title }
      }`,
    ],
    preview
  );
};

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex-grow: 1;
  margin-bottom: var(--lateral-margin);
`;

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
`;

const Label = styled.label<{ checked: boolean }>`
  cursor: pointer;
  text-decoration: ${({ checked }) => (checked ? "underline" : "none")};
  margin-right: var(--items-margin);
  margin-bottom: 20px;
`;

type WorksProps = SanityProps<[WorksData]>;

const WorksPage: NextPage<WorksProps> = (props) => {
  const [settings, data] = useSanityData(props);
  const [selected, setSelected] = useState<string>();
  const showcases = data.showcases.filter(
    (showcase) => selected === undefined || showcase.category._id === selected
  );
  return (
    <Root>
      <Head>
        <title>{settings.title_prefix + data.title}</title>
        <meta name="description" content={settings.description} />
        <meta
          property="og:image"
          content={urlFor(settings.preview).width(1200).toString()}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header navItems={settings.navigation} />
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
          {data.category_filter.map((category) => (
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
      <Footer contact={settings.contact_information} />
    </Root>
  );
};

export default WorksPage;
