import { motion, useMotionValue, useSpring } from "framer-motion";
import type { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import { useEffect } from "react";
import styled from "styled-components";
import { Arrow } from "../components/arrow";
import { HeadData } from "../components/head-data";
import { Header } from "../components/header";
import { SanityProps } from "../sanity-client/config";
import { useSanityData } from "../sanity-client/sanity";
import { getSanityStaticProps } from "../sanity-client/sanity.server";

interface IndexData {
  title: string;
  main_text: string;
  footer: string;
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return getSanityStaticProps([groq`*[_id == "home"]`], preview);
};

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  a:hover,
  button:hover {
    color: var(--white);
  }
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

const Footer = styled.footer`
  margin: 0 var(--lateral-margin);
  padding-bottom: 35px;
  margin-bottom: 45px;
  --border: 2px solid var(--black);
  border-bottom: var(--border);

  @media (min-width: 768px) {
    margin-bottom: 0;
    padding: 40px 0 80px 0;
    border-bottom: none;
    border-top: var(--border);
    display: flex;
    justify-content: right;
    align-items: baseline;
  }
`;

type IndexProps = SanityProps<[IndexData]>;

const IndexPage: NextPage<IndexProps> = (props) => {
  const [settings, data] = useSanityData(props);
  return (
    <Root>
      <HeadData
        title={settings.title_prefix + data.title}
        description={settings.description}
        image={settings.preview}
      />
      <Circle />
      <Header preview={props.preview} navItems={settings.navigation} />
      <Main>
        {data.main_text}
        <Arrow direction="down" href="/works">
          Go to works
        </Arrow>
      </Main>
      <Footer>{data.footer}</Footer>
    </Root>
  );
};

const SVG = styled(motion.svg)`
  position: fixed;
  z-index: -10;
  transform: translate(300px, 300px);
`;

const Circle = () => {
  const translateXRaw = useMotionValue(300);
  const translateYRaw = useMotionValue(300);
  useEffect(() => {
    let animating = false;
    const listener = (event: MouseEvent) => {
      if (!animating) {
        animating = true;
        requestAnimationFrame(() => {
          translateXRaw.set(event.pageX);
          translateYRaw.set(event.pageY);
          animating = false;
        });
      }
    };
    window.document.body.addEventListener("mousemove", listener);
    () => window.document.body.removeEventListener("mousemove", listener);
  }, []);
  const translateX = useSpring(translateXRaw, { stiffness: 100, damping: 10 });
  const translateY = useSpring(translateYRaw, { stiffness: 100, damping: 10 });
  return (
    <SVG
      viewBox="0 0 10 10"
      width="500"
      xmlns="http://www.w3.org/2000/svg"
      style={{ translateX, translateY, top: -250, left: -250 }}
    >
      <defs>
        <radialGradient id="gradient">
          <motion.stop
            initial={{ offset: "20%" }}
            animate={{ offset: "70%" }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            stopColor="rgba(218,255,1,1)"
          />
          <motion.stop offset="100%" stopColor="rgba(218,255,1,0)" />
        </radialGradient>
      </defs>
      <circle cx="5" cy="5" r="5" fill="url('#gradient')" />
    </SVG>
  );
};

export default IndexPage;
