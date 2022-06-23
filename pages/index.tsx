import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { Arrow } from "../components/arrow";
import { Header } from "../components/header";

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
      <Main>
        Flexib le Visual Communicator &amp; Brand Designer
        <Arrow direction="down" onClick={() => {}}>
          Go to works
        </Arrow>
      </Main>
    </>
  );
};

export default IndexPage;
