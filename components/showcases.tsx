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

const LI = styled.li`
  background: red;
  box-sizing: content-box;
  padding-top: calc(0.7 * 100%);
  position: relative;
`;

const A = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
`;

interface ShowcaseThumbnailProps {
  children: ShowcaseThumbnailData;
}

const ShowcaseThumbnail = (props: ShowcaseThumbnailProps) => {
  const showcase = props.children;
  const imageProps = sanityImageProps(showcase.cover, "fill");
  return (
    <LI>
      <Link href={`/works/${showcase.slug}`} passHref>
        <A>
          <Image
            {...imageProps}
            alt={showcase.title}
            objectFit="cover"
            sizes="(min-width: 1800px) 25vw, (min-width: 1400px) 33vw, (min-width: 1000px) 50vw, 100vw"
          />
        </A>
      </Link>
    </LI>
  );
};

const UL = styled.ul`
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
  <UL>
    {props.children.map((showcase) => (
      <ShowcaseThumbnail key={showcase._id}>{showcase}</ShowcaseThumbnail>
    ))}
  </UL>
);
