import { motion } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";
import { SanityImageReference } from "../../sanity-client/config";
import { sanityImageProps } from "../../sanity-client/sanity";

export interface GallerySectionData {
  _type: "gallery";
  content: SanityImageReference[];
}

const GallerySectionElement = styled(motion.section)`
  display: grid;
  margin: var(--lateral-margin);
  gap: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
  @media (min-width: 1500px) {
    grid-template-columns: repeat(16, minmax(0, 1fr));
  }
`;

const GalleryImage = styled(motion.div)`
  grid-column: span 4;
  @media (min-width: 768px) and (max-width: 999px) {
    :last-child:nth-child(2n - 1) {
      grid-column-end: 7;
    }
  }
  @media (min-width: 1000px) and (max-width: 1499px) {
    :last-child:nth-child(3n - 2) {
      grid-column-end: 9;
    }
    :nth-last-child(2):nth-child(3n - 2) {
      grid-column-end: 7;
    }
    :last-child:nth-child(3n - 1) {
      grid-column-end: 11;
    }
  }
  @media (min-width: 1500px) {
    :last-child:nth-child(4n - 3) {
      grid-column-end: 11;
    }
    :nth-last-child(2):nth-child(4n - 3) {
      grid-column-end: 9;
    }
    :last-child:nth-child(4n - 2) {
      grid-column-end: 13;
    }
    :nth-last-child(3):nth-child(4n - 3) {
      grid-column-end: 7;
    }
    :nth-last-child(2):nth-child(4n - 2) {
      grid-column-end: 11;
    }
    :last-child:nth-child(4n - 1) {
      grid-column-end: 15;
    }
  }
`;

const motionVariants = {
  shown: { opacity: 1, translateY: 0 },
  hidden: { opacity: 0, translateY: -50 },
};

export interface GallerySectionProps {
  children: GallerySectionData;
}

export const GallerySection = (props: GallerySectionProps) => {
  return (
    <GallerySectionElement
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true }}
      transition={{ delayChildren: 0.5, staggerChildren: 0.25 }}
    >
      {props.children.content.map((element, index) => {
        const imageProps = sanityImageProps(element, "responsive");
        return (
          <GalleryImage key={index} variants={motionVariants}>
            <Image
              {...imageProps}
              sizes="(min-width: 1500px) 25vw, (min-width: 1000px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </GalleryImage>
        );
      })}
    </GallerySectionElement>
  );
};
