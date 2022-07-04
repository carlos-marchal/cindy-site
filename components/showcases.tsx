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

const A = styled.a`
  width: var(--column-width);
  height: var(--row-height);
  position: relative;
  display: block;
`;

interface ShowcaseThumbnailProps {
  children: ShowcaseThumbnailData;
}

const ShowcaseThumbnail = (props: ShowcaseThumbnailProps) => {
  const showcase = props.children;
  const imageProps = sanityImageProps(showcase.cover, "fill");
  return (
    <li>
      <Link href={`/works/${showcase.slug}`} passHref>
        <A>
          <Image {...imageProps} alt={showcase.title} objectFit="cover" />
        </A>
      </Link>
    </li>
  );
};

const UL = styled.ul`
  display: grid;
  gap: 10px;
  margin: 0 var(--lateral-margin);
  justify-content: center;
  --column-width: 300px;
  --row-height: 210px;
  grid-template-columns: repeat(auto-fill, var(--column-width));
  @media (min-width: 768px) {
    gap: 40px 30px;
    --column-width: 385px;
    --row-height: 270px;
  }
`;

export interface ShowcaseListProps {
  children: ShowcaseThumbnailData[];
}

export const ShowcaseList = (props: ShowcaseListProps) => (
  <UL>
    {props.children.map((showcase) => (
      <ShowcaseThumbnail key={showcase._id}>{showcase}</ShowcaseThumbnail>
    ))}
  </UL>
);
