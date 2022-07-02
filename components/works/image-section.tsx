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

const ImageSectionElement = styled.section<{ mode: ImageSectionMode }>`
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
  console.log(props.children.mode);
  return (
    <ImageSectionElement mode="full">
      <Image {...imageProps} />
    </ImageSectionElement>
  );
};
