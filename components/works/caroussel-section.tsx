import { motion } from "framer-motion";
import Image from "next/image";
import { MouseEvent, useRef, useState } from "react";
import styled from "styled-components";
import { SanityImageReference } from "../../sanity-client/config";
import { sanityImageProps } from "../../sanity-client/sanity";
import { PortableTextData, TextRenderer } from "./text-renderer";

export interface CarousselSectionData {
  _type: "caroussel";
  intro?: PortableTextData;
  content: SanityImageReference[];
}

const CarousselSectionElement = styled.section`
  @media (min-width: 768px) {
    display: grid;
    grid-auto-flow: column;
  }
`;

const CarousselSectionIntro = styled(motion.div)`
  text-align: center;
  display: grid;
  place-content: center;
  text-align: center;
  @media (min-width: 768px) {
    margin: 0 var(--lateral-margin);
    max-width: 33vw;
  }
`;

const CarousselSectionSlider = styled(motion.div)`
  display: grid;
  margin: var(--lateral-margin);
  margin-right: 0;
  padding-right: var(--lateral-margin);
  gap: 30px;
  grid-auto-columns: 70vw;
  grid-auto-flow: column;
  overflow-x: auto;
  scroll-behavior: smooth;

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

const CarousselSectionEntryElement = styled(motion.div)`
  position: relative;
`;

const CarousselSectionButton = styled.button<{ side: "left" | "right" }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ side }) => side}: 0;
  width: 50%;
  color: transparent;
  cursor: none;
`;

const motionVariants = {
  shown: { opacity: 1, translateY: 0 },
  hidden: { opacity: 0, translateY: -50 },
};

export interface CarousselSectionProps {
  children: CarousselSectionData;
}

export const CarousselSection = (props: CarousselSectionProps) => {
  const carousselRef = useRef<HTMLDivElement | null>(null);

  const slideHandler = (slide: number) => {
    const caroussel = carousselRef.current!;
    const scrollLeft = caroussel.scrollLeft + slide;
    caroussel.scroll({ left: scrollLeft });
  };

  return (
    <CarousselSectionElement>
      {props.children.intro === undefined ? null : (
        <CarousselSectionIntro
          variants={motionVariants}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <TextRenderer>{props.children.intro}</TextRenderer>
        </CarousselSectionIntro>
      )}
      <CarousselSectionSlider
        ref={carousselRef}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true }}
        transition={{
          delayChildren: props.children.intro === undefined ? 0.5 : 0.75,
          staggerChildren: 0.25,
        }}
      >
        {props.children.content.map((element, index) => (
          <CarousselSectionEntry key={index} onSlide={slideHandler}>
            {element}
          </CarousselSectionEntry>
        ))}
      </CarousselSectionSlider>
    </CarousselSectionElement>
  );
};

interface CarousselSectionEntryProps {
  children: SanityImageReference;
  onSlide: (slide: number) => void;
}

const CarousselSectionEntry = (props: CarousselSectionEntryProps) => {
  const imageProps = sanityImageProps(props.children, "responsive");

  const [showArrow, setShowArrow] = useState(false);
  const [arrowRight, setArrowRight] = useState(false);
  const [arrowX, setArrowX] = useState(0);
  const [arrowY, setArrowY] = useState(0);

  const clickHandler =
    (side: "left" | "right") => (event: MouseEvent<HTMLButtonElement>) => {
      const entry = event.currentTarget.parentElement as HTMLDivElement;
      const direction = side === "left" ? -1 : 1;
      props.onSlide(entry.clientWidth * direction);
      setShowArrow(false);
    };

  const animatingArrow = useRef(false);
  const mouseMoveHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (!animatingArrow.current) {
      animatingArrow.current = true;
      const target = event.currentTarget;
      window.requestAnimationFrame(() => {
        const rectangle = target.getBoundingClientRect();
        const x = event.pageX - rectangle.x - window.scrollX;
        const y = event.pageY - rectangle.y - window.scrollY;
        setArrowX(x);
        setArrowY(y);
        setArrowRight(x > rectangle.width / 2);
        animatingArrow.current = false;
      });
    }
  };

  return (
    <CarousselSectionEntryElement
      onMouseEnter={() => setShowArrow(true)}
      onMouseLeave={() => setShowArrow(false)}
      onMouseMove={mouseMoveHandler}
      variants={motionVariants}
    >
      {showArrow && <HoverArrow x={arrowX} y={arrowY} right={arrowRight} />}
      <Image
        {...imageProps}
        sizes="(min-width: 1500px) 30vw, (min-width: 1000px) 40vw, (min-width: 768px) 50vw, 70vw"
      />
      <CarousselSectionButton side="left" onClick={clickHandler("left")}>
        Previous
      </CarousselSectionButton>
      <CarousselSectionButton side="right" onClick={clickHandler("right")}>
        Next
      </CarousselSectionButton>
    </CarousselSectionEntryElement>
  );
};

const HOVER_ARROW_WIDTH = 65;
const HOVER_ARROW_HEIGHT = 69;

const HoverArrowElement = styled.svg`
  position: absolute;
  z-index: 10;
  pointer-events: none;
`;

interface HoverArrowProps {
  x: number;
  y: number;
  right?: boolean;
}

const HoverArrow = (props: HoverArrowProps) => (
  <HoverArrowElement
    width={HOVER_ARROW_WIDTH}
    height={HOVER_ARROW_HEIGHT}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: `translate(
      ${props.x - HOVER_ARROW_WIDTH / 2}px,
      ${props.y - HOVER_ARROW_HEIGHT / 2}px
    )
    scaleX(${props.right ? 1 : -1})`,
    }}
  >
    <path
      d="M-1.46433e-06 34.5L63 34.5M63 34.5L29.293 68M63 34.5L29.293 0.999999"
      stroke="var(--highlight)"
      strokeWidth="2"
    />
  </HoverArrowElement>
);
