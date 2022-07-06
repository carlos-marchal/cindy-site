import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
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
  text-align: center;
  display: grid;
  place-content: center;
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

const CarousselSectionEntry = styled.div`
  position: relative;
`;

const CarousselSectionButton = styled.button<{ side: "left" | "right" }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ side }) => side}: 0;
  ${({ side }) => (side === "left" ? "right" : "left")}: 50%;
  color: transparent;
  cursor: ${({ side }) => (side === "left" ? "w-resize" : "e-resize")};
`;

export interface CarousselSectionProps {
  children: CarousselSectionData;
}

export const CarousselSection = (props: CarousselSectionProps) => {
  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    setMobile(!query.matches);
    const listener = (event: MediaQueryListEvent) => setMobile(!event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);
  const carousselRef = useRef<HTMLDivElement | null>(null);

  const clickHandler =
    (side: "left" | "right") => (event: MouseEvent<HTMLButtonElement>) => {
      const entry = event.currentTarget.parentElement as HTMLDivElement;
      const caroussel = carousselRef.current!;
      const direction = side === "left" ? -1 : 1;
      const scrollLeft = caroussel.scrollLeft + entry.clientWidth * direction;
      caroussel.scroll({ left: scrollLeft });
    };

  const intro = (
    <CarousselSectionIntro>
      <TextRenderer>{props.children.intro}</TextRenderer>
    </CarousselSectionIntro>
  );

  return (
    <CarousselSectionElement>
      {mobile && intro}
      <CarousselSectionSlider ref={carousselRef}>
        {!mobile && intro}
        {props.children.content.map((element, index) => {
          const imageProps = sanityImageProps(element, "responsive");
          return (
            <CarousselSectionEntry key={index}>
              <Image
                {...imageProps}
                sizes="(min-width: 1500px) 30vw, (min-width: 1000px) 40vw, (min-width: 768px) 50vw, 70vw"
              />
              <CarousselSectionButton
                side="left"
                onClick={clickHandler("left")}
              >
                Previous
              </CarousselSectionButton>
              <CarousselSectionButton
                side="right"
                onClick={clickHandler("right")}
              >
                Next
              </CarousselSectionButton>
            </CarousselSectionEntry>
          );
        })}
      </CarousselSectionSlider>
    </CarousselSectionElement>
  );
};
