import { motion } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";
import { SanityImageReference } from "../../sanity-client/config";
import { sanityImageProps } from "../../sanity-client/sanity";

export type ImageSectionMode = "full" | "left" | "right" | "poster";

export interface ImageSectionData {
  _type: "picture";
  image: SanityImageReference;
  mode: ImageSectionMode;
}

const ImageSectionElement = styled(motion.section)<{ mode: ImageSectionMode }>`
  margin: var(--lateral-margin);
  margin-top: 0px;
  @media (min-width: 768px) {
    margin: ${({ mode }) =>
      ({
        full: "var(--lateral-margin)",
        right:
          "var(--lateral-margin) var(--lateral-margin) var(--lateral-margin) 30vw",
        left: "var(--lateral-margin) 30vw var(--lateral-margin) var(--lateral-margin)",
        poster: "var(--lateral-margin) 30vw var(--lateral-margin) 30vw",
      }[mode])};
  }
`;

export interface ImageSectionProps {
  children: ImageSectionData;
}

export const ImageSection = (props: ImageSectionProps) => {
  const imageProps = sanityImageProps(props.children.image, "responsive");
  return (
    <ImageSectionElement
      mode={props.children.mode}
      initial={{ opacity: 0, translateY: -50 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 0.5 }}
      viewport={{ once: true }}
    >
      <Image
        {...imageProps}
        sizes={`(min-width: 768px) ${
          { full: 100, left: 70, right: 70, poster: 40 }[props.children.mode]
        }vw, 100vw`}
      />
    </ImageSectionElement>
  );
};
