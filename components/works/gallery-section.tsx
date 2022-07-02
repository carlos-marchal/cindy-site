import Image from "next/image";
import styled from "styled-components";
import { SanityImageReference } from "../../sanity-client/config";
import { sanityImageProps } from "../../sanity-client/sanity";

export interface GallerySectionData {
  _type: "gallery";
  content: SanityImageReference[];
}

const GallerySectionElement = styled.section`
  display: grid;
  margin: var(--lateral-margin);
  gap: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(3, minmax(280px, 1fr));
  }
  @media (min-width: 1500px) {
    grid-template-columns: repeat(4, minmax(280px, 1fr));
  }
`;

const GallerySectionImage = styled.div`
  position: relative;
`;

export interface GallerySectionProps {
  children: GallerySectionData;
}

export const GallerySection = (props: GallerySectionProps) => {
  return (
    <GallerySectionElement>
      {props.children.content.map((element, index) => {
        const imageProps = sanityImageProps(element, "responsive");
        return (
          <GallerySectionImage key={index}>
            <Image {...imageProps} />
          </GallerySectionImage>
        );
      })}
    </GallerySectionElement>
  );
};
