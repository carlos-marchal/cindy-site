import { motion, useTransform, useViewportScroll } from "framer-motion";
import type { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { Arrow } from "../components/arrow";
import { HeadData } from "../components/head-data";
import { Header } from "../components/header";
import {
  PortableTextData,
  TextRenderer,
} from "../components/works/text-renderer";
import { SanityImageReference, SanityProps } from "../sanity-client/config";
import { sanityImageProps, useSanityData } from "../sanity-client/sanity";
import { getSanityStaticProps } from "../sanity-client/sanity.server";

interface AboutData {
  title: string;
  portrait: SanityImageReference;
  entries: AboutChronologyEntry[];
}

interface AboutChronologyEntry {
  period: string;
  content: PortableTextData;
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return getSanityStaticProps([groq`*[_id == "about"]`], preview);
};

const Root = styled.div`
  min-height: 100vh;
  color: var(--white);
  background: var(--black);

  @media (min-width: 768px) {
    min-height: 300vh;
  }
`;

const ScrollContainer = styled.div`
  @media (min-width: 768px) {
    position: fixed;
    height: 100vh;
    width: 100%;
    overflow-y: hidden;
  }
`;

const Main = styled.main`
  margin: 0 var(--lateral-margin);
  overflow-y: hidden;
  @media (min-width: 768px) {
    position: relative;
    height: 100%;
  }
`;

const Portrait = styled(motion.div)`
  max-width: 50vw;
  z-index: 10;
  padding-top: 30px;

  @media (min-width: 768px) {
    position: fixed;
    bottom: 0;
    width: 30vw;
    box-sizing: content-box;
    padding: 0 var(--lateral-margin);
  }
`;

const DL = styled(motion.dl)`
  padding: 30px 0;

  em {
    font-family: "Grand Slang";
    font-style: normal;
  }

  @media (min-width: 768px) {
    position: absolute;
    order: -1;
    min-height: 100%;
    padding-bottom: 150px;
    max-width: 50vw;
  }
`;

const DD = styled.dd`
  margin-bottom: 35px;
`;

const ArrowContainer = styled(motion.div)`
  display: none;
  position: absolute;
  z-index: 5;
  top: 50px;
  right: 0;

  :hover {
    color: var(--highlight);
  }
  @media (min-width: 768px) {
    display: block;
  }
`;

type AboutProps = SanityProps<[AboutData]>;

function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    setMobile(!query.matches);
    const listener = (event: MediaQueryListEvent) => {
      setMobile(!event.matches);
    };
    if ("addEventListener" in query && "removeEventListener" in query) {
      query.addEventListener("change", listener);
      return () => query.removeEventListener("change", listener);
    } else {
      query.addListener(listener);
      return () => query.removeListener(listener);
    }
  }, []);
  return mobile;
}

const AboutPage: NextPage<AboutProps> = (props) => {
  const [settings, data] = useSanityData(props);
  const imageProps = sanityImageProps(data.portrait, "responsive");

  const { scrollYProgress: y } = useViewportScroll();
  const translateY = useTransform(y, (y) => `-${Math.max(y - 0.5, 0) * 200}%`);
  const top = useTransform(y, (y) => `${Math.max(y - 0.5, 0) * 200}%`);
  const translateX = useTransform(y, (y) => `-${Math.min(y, 0.5) * 200}%`);
  const left = useTransform(y, (y) => `${Math.min(y, 0.5) * 200}%`);
  const scale = useTransform(
    y,
    (y) => 1 - Math.max(Math.min((y - 0.45) * 20, 1), 0)
  );

  const mobile = useIsMobile();

  const arrowHandler = () => {
    window.scroll({
      top: (window.document.body.scrollHeight - window.innerHeight) / 2,
      behavior: "smooth",
    });
  };

  return (
    <Root>
      <HeadData
        title={settings.title_prefix + data.title}
        description={settings.description}
        image={settings.preview}
      />
      <ScrollContainer>
        <Header preview={props.preview} navItems={settings.navigation} light />
        <Main>
          <Portrait style={mobile ? undefined : { left, translateX }}>
            <Image {...imageProps} sizes="(min-width: 768px) 30vw, 50vw" />
          </Portrait>
          <ArrowContainer style={{ scale }}>
            <Arrow direction="down" onClick={arrowHandler}>
              Go down
            </Arrow>
          </ArrowContainer>
          <DL style={mobile ? undefined : { top, translateY }}>
            {data.entries.map((entry, index) => (
              <Fragment key={index}>
                <dt>{entry.period}</dt>
                <DD>
                  <TextRenderer>{entry.content}</TextRenderer>
                </DD>
              </Fragment>
            ))}
          </DL>
        </Main>
      </ScrollContainer>
    </Root>
  );
};

export default AboutPage;
