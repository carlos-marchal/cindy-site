'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { SanityImageReference } from "../sanity-client/config";
import { sanityImageProps } from "../sanity-client/sanity";

export interface ShowcaseThumnbailCategory {
  _id: string;
  name: string;
}

export interface ShowcaseThumbnailData {
  _id: string;
  title: string;
  slug: string;
  category: ShowcaseThumnbailCategory;
  cover: SanityImageReference;
}

const LI = styled(motion.li)`
  box-sizing: content-box;
  padding-top: calc(0.7 * 100%);
  position: relative;
`;

const Caption = styled(motion.div)`
  position: absolute;
  top: -110px;
  left: -50px;
  width: 100%;
  height: 100%;
  background: var(--highlight);
  color: var(--black);
  padding: 80px;
  box-sizing: content-box;
  display: grid;
  align-content: end;
  font: 18px "Neue Haas Grotesk Display";

  header {
    font: 30px "Grand Slang";
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  text-decoration: none;
  overflow-y: hidden;
  overflow-x: hidden;
  &:hover {
    color: inherit;
  }
`;

const LinkContent = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

interface ShowcaseThumbnailProps {
  children: ShowcaseThumbnailData;
}

const ShowcaseThumbnail = (props: ShowcaseThumbnailProps) => {
  const showcase = props.children;
  const imageProps = sanityImageProps(showcase.cover, "fill");
  return (
    <LI
      variants={{
        shown: { opacity: 1, translateY: 0 },
        hidden: { opacity: 0, translateY: -50 },
      }}
      layout
    >
      <StyledLink href={`/works/${showcase.slug}`}>
        <LinkContent initial="hidden" whileHover="visible">
          <Image
            {...imageProps}
            alt={showcase.title}
            style={{ objectFit: 'cover' }}
            sizes="(min-width: 1800px) 25vw, (min-width: 1400px) 33vw, (min-width: 1000px) 50vw, 100vw"
          />
          <Caption
            variants={{
              hidden: { translateY: "-100%" },
              visible: { translateY: "0%" },
            }}
          >
            <header>{props.children.title}</header>
            <div>{props.children.category.name}</div>
          </Caption>
        </LinkContent>
      </StyledLink>
    </LI>
  );
};

const UL = styled(motion.ul)`
  display: grid;
  gap: 10px;
  margin: 0 var(--lateral-margin);
  justify-content: center;
  --column-width: 300px;
  grid-template-columns: repeat(auto-fill, minmax(var(--column-width), 1fr));
  @media (min-width: 768px) {
    --column-width: 385px;
    gap: 40px;
  }
`;

export interface ShowcaseListProps {
  children: ShowcaseThumbnailData[];
}

export const ShowcaseList = (props: ShowcaseListProps) => (
  <UL initial="hidden" animate="shown" transition={{ staggerChildren: 0.2 }}>
    {props.children.map((showcase) => (
      <ShowcaseThumbnail key={showcase._id}>{showcase}</ShowcaseThumbnail>
    ))}
  </UL>
);
