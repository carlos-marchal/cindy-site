import { motion } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";
import { SanityImageReference } from "../../sanity-client/config";
import { sanityImageProps } from "../../sanity-client/sanity";
import { PortableTextData, TextRenderer } from "./text-renderer";

export interface IntroSectionData {
  _type: "intro";
  title: string;
  image: SanityImageReference;
  content: PortableTextData;
}

const IntroSectionElement = styled.section`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  margin: var(--lateral-margin) 0;
`;

const IntroSectionText = styled.div`
  margin: var(--lateral-margin);
  display: grid;
  gap: 25px;
  align-content: center;
  @media (min-width: 768px) {
    order: -1;
    margin: 0 var(--lateral-margin);
  }
`;

const IntroSectionImage = styled(motion.div)`
  position: relative;
  width: 100%;
`;

const IntroSectionDetails = styled(motion.div)`
  color: #4f4f4f;
  display: grid;
  gap: 5px;
`;

interface IntroSectionProps {
  children: IntroSectionData;
  category: string;
}

const motionVariants = {
  shown: { opacity: 1, translateY: 0 },
  hidden: { opacity: 0, translateY: -50 },
};

const motionProps = {
  variants: motionVariants,
  initial: "hidden",
  whileInView: "shown",
  viewport: { once: true },
};

export const IntroSection = (props: IntroSectionProps) => {
  const imageProps = sanityImageProps(props.children.image, "responsive");
  return (
    <IntroSectionElement>
      <IntroSectionImage {...motionProps} transition={{ delay: 0.5 }}>
        <Image
          {...imageProps}
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
        ></Image>
      </IntroSectionImage>
      <IntroSectionText>
        <motion.h1 {...motionProps} transition={{ delay: 0.75 }}>
          {props.children.title}
        </motion.h1>
        <motion.div {...motionProps} transition={{ delay: 1 }}>
          {props.category}
        </motion.div>
        <IntroSectionDetails {...motionProps} transition={{ delay: 1.25 }}>
          <TextRenderer>{props.children.content}</TextRenderer>
        </IntroSectionDetails>
      </IntroSectionText>
    </IntroSectionElement>
  );
};
