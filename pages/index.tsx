import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { Arrow } from "../components/arrow";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

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

const IndexPage: NextPage = () => {
  return (
    <Root>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>
        Flexib le Visual Communicator &amp; Brand Designer
        <Arrow direction="down" onClick={() => {}}>
          Go to works
        </Arrow>
      </Main>
      <Footer />
    </Root>
  );
};

export default IndexPage;
