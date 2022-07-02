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

const HighlightSectionImage = styled.div``;

const HighlightSectionContent = styled.div`
  margin: 40px 20px;
  @media (min-width: 768px) {
    order: -1;
  }
`;

export interface HighlightSectionProps {
  children: HighlightSectionData;
}

export const HighlightSection = (props: HighlightSectionProps) => {
  const imageProps = sanityImageProps(props.children.image, "responsive");
  return (
    <HighlightSectionElement>
      <HighlightSectionImage>
        <Image {...imageProps} sizes="(min-width: 768px) 66vw, 100vw" />
      </HighlightSectionImage>
      <HighlightSectionContent>
        <TextRenderer>{props.children.content}</TextRenderer>
      </HighlightSectionContent>
    </HighlightSectionElement>
  );
};
