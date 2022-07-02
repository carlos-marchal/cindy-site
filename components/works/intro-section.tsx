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
  display: grid;
  grid-template-rows: 100vw auto;
  @media (min-width: 768px) {
    min-height: 100vh;
    grid-template-rows: auto;
    grid-template-columns: 50% 50%;
    padding: 10vh 0;
  }
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

const IntroSectionImage = styled.div`
  position: relative;
  width: 100%;
`;

const IntroSectionDetails = styled.div`
  color: #4f4f4f;
  display: grid;
  gap: 5px;
`;

interface IntroSectionProps {
  children: IntroSectionData;
  category: string;
}

export const IntroSection = (props: IntroSectionProps) => {
  const imageProps = sanityImageProps(props.children.image, "fill");
  return (
    <IntroSectionElement>
      <IntroSectionImage>
        <Image {...imageProps} objectFit="cover"></Image>
      </IntroSectionImage>
      <IntroSectionText>
        <h1>{props.children.title}</h1>
        <div>{props.category}</div>
        <IntroSectionDetails>
          <TextRenderer>{props.children.content}</TextRenderer>
        </IntroSectionDetails>
      </IntroSectionText>
    </IntroSectionElement>
  );
};
