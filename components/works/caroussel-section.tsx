import Image from "next/image";
import styled from "styled-components";
import { SanityImageReference } from "../../sanity-client/config";
import { sanityImageProps } from "../../sanity-client/sanity";
import { PortableTextData, TextRenderer } from "./text-renderer";

export interface CarousselSectionData {
  _type: "caroussel";
  intro: PortableTextData;
  content: SanityImageReference[];
}

const CarousselSectionElement = styled.section``;

const CarousselSectionIntro = styled.div`
  grid-column: 1 / 10;
  text-align: center;
`;

const CarousselSectionSlider = styled.div`
  display: grid;
  margin: var(--lateral-margin);
  margin-right: 0;
  padding-right: var(--lateral-margin);
  gap: 30px;
  grid-auto-columns: 70vw;
  grid-auto-flow: column;
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 768px) {
    grid-auto-columns: 50vw;
  }
  @media (min-width: 1000px) {
    grid-auto-columns: 40vw;
  }
  @media (min-width: 1500px) {
    grid-auto-columns: 30vw;
  }
`;

export interface CarousselSectionProps {
  children: CarousselSectionData;
}

export const CarousselSection = (props: CarousselSectionProps) => {
  return (
    <CarousselSectionElement>
      <CarousselSectionIntro>
        <TextRenderer>{props.children.intro}</TextRenderer>
      </CarousselSectionIntro>
      <CarousselSectionSlider>
        {props.children.content.map((element, index) => {
          const imageProps = sanityImageProps(element, "responsive");
          return (
            <Image
              key={index}
              {...imageProps}
              sizes="(min-width: 1500px) 30vw, (min-width: 1000) 40vw, (min-width: 768px) 50vw, 70vw"
            />
          );
        })}
      </CarousselSectionSlider>
    </CarousselSectionElement>
  );
};
