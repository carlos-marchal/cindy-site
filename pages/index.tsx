import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

const Main = styled.main`
  font: var(--header-font);
`;

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>Flexible Visual Communicator &amp; Brand Designer</Main>
    </>
  );
};

export default IndexPage;
