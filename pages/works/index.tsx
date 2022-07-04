import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { groq } from "next-sanity";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/header";
import { SanityImageReference, SanityProps } from "../../sanity-client/config";
import { sanityImageProps, useSanityData } from "../../sanity-client/sanity";
import { getSanityStaticProps } from "../../sanity-client/sanity.server";
import Link from "next/link";
import { Footer } from "../../components/footer";

interface WorksData {
  title: string;
  category_filter: WorksCategory[];
  showcases: WorksShowcase[];
}

interface WorksCategory {
  _id: string;
  name: string;
}

interface WorksShowcase {
  _id: string;
  title: string;
  slug: string;
  category: WorksCategory;
  cover: SanityImageReference;
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

const Showcases = styled.ul`
  display: grid;
  gap: 10px;
  margin: 0 var(--lateral-margin);
  margin-bottom: var(--lateral-margin);
  justify-content: center;
  --column-width: 300px;
  --row-height: 210px;
  grid-template-columns: repeat(auto-fill, var(--column-width));
  @media (min-width: 768px) {
    gap: 40px 30px;
    --column-width: 385px;
    --row-height: 270px;
  }
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
        <meta name="description" content="Works description" />
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
        <Showcases>
          {showcases.map((showcase) => (
            <Showcase key={showcase._id}>{showcase}</Showcase>
          ))}
        </Showcases>
      </Main>
      <Footer contact={settings.contact_information} />
    </Root>
  );
};

interface ShowcaseProps {
  children: WorksShowcase;
}

const A = styled.a`
  width: var(--column-width);
  height: var(--row-height);
  position: relative;
  display: block;
`;

const Showcase = (props: ShowcaseProps) => {
  const showcase = props.children;
  const imageProps = sanityImageProps(showcase.cover, "fill");
  return (
    <li>
      <Link href={`/works/${showcase.slug}`} passHref>
        <A>
          <Image {...imageProps} alt={showcase.title} objectFit="cover" />
        </A>
      </Link>
    </li>
  );
};

export default WorksPage;
