'use client'

import { motion } from "framer-motion";
import MuxPlayer from "@mux/mux-player-react";
import styled from "styled-components";
import { SanityMuxVideoReference } from "../../sanity-client/config";
import { PortableTextData, TextRenderer } from "./text-renderer";

export interface IntroVideoSectionData {
  _type: "intro_video";
  title: string;
  video: SanityMuxVideoReference;
  content: PortableTextData;
}

const IntroSectionElement = styled.section`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  margin: var(--lateral-margin) 0;
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

const IntroSectionVideo = styled(motion.div)`
  position: relative;
  width: 100%;
`;

const IntroSectionDetails = styled(motion.div)`
  color: #4f4f4f;
  display: grid;
  gap: 5px;
`;

interface IntroVideoSectionProps {
  children: IntroVideoSectionData;
  category: string;
}

const motionVariants = {
  shown: { opacity: 1, translateY: 0 },
  hidden: { opacity: 0, translateY: -50 },
};

const motionProps = {
  variants: motionVariants,
  initial: "hidden",
  whileInView: "shown",
  viewport: { once: true },
};

export const IntroVideoSection = (props: IntroVideoSectionProps) => {
  const playbackId = props.children.video.asset.playbackId;
  return (
    <IntroSectionElement>
      <IntroSectionVideo {...motionProps} transition={{ delay: 0.5 }}>
        {playbackId && (
          <MuxPlayer
            playbackId={playbackId}
            streamType="on-demand"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", aspectRatio: "16/9", "--controls": "none" } as React.CSSProperties}
          />
        )}
      </IntroSectionVideo>
      <IntroSectionText>
        <motion.h1 {...motionProps} transition={{ delay: 0.75 }}>
          {props.children.title}
        </motion.h1>
        <motion.div {...motionProps} transition={{ delay: 1 }}>
          {props.category}
        </motion.div>
        <IntroSectionDetails {...motionProps} transition={{ delay: 1.25 }}>
          <TextRenderer>{props.children.content}</TextRenderer>
        </IntroSectionDetails>
      </IntroSectionText>
    </IntroSectionElement>
  );
};
