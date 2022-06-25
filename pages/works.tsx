import type { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { Header } from "../components/header";
import { SanityProps } from "../sanity-client/config";
import { useSanityData } from "../sanity-client/sanity";
import { getSanityStaticProps } from "../sanity-client/sanity.server";

interface WorksData {
  title: string;
  category_filter: WorksCategory[];
}

interface WorksCategory {
  _id: string;
  name: string;
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return getSanityStaticProps(
    [groq`*[_id == "works"]{ title, category_filter[]-> }`],
    preview
  );
};

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

  return (
    <>
      <Head>
        <title>{settings.title_prefix + data.title}</title>
        <meta name="description" content="Works description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header navItems={settings.navigation} />
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
    </>
  );
};

export default WorksPage;
