import { motion } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";
import { SanityImageReference } from "../../sanity-client/config";
import { sanityImageProps } from "../../sanity-client/sanity";
import { PortableTextData, TextRenderer } from "./text-renderer";

export interface HighlightSectionData {
  _type: "highlight";
  image: SanityImageReference;
  content: PortableTextData;
}

const HighlightSectionElement = styled.section`
  margin: var(--lateral-margin);
  margin-top: 0;
  display: grid;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
    align-items: center;
    gap: 150px;
  }
`;

const HighlightSectionContent = styled(motion.div)`
  margin: 40px 20px;
  @media (min-width: 768px) {
    order: -1;
  }
`;

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

export interface HighlightSectionProps {
  children: HighlightSectionData;
}

export const HighlightSection = (props: HighlightSectionProps) => {
  const imageProps = sanityImageProps(props.children.image, "responsive");
  return (
    <HighlightSectionElement>
      <motion.div {...motionProps} transition={{ delay: 0.5 }}>
        <Image {...imageProps} sizes="(min-width: 768px) 66vw, 100vw" />
      </motion.div>
      <HighlightSectionContent {...motionProps} transition={{ delay: 1 }}>
        <TextRenderer>{props.children.content}</TextRenderer>
      </HighlightSectionContent>
    </HighlightSectionElement>
  );
};
