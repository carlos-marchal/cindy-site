'use client'

import { motion } from "framer-motion";
import MuxPlayer from "@mux/mux-player-react";
import styled from "styled-components";
import { SanityMuxVideoReference } from "../../sanity-client/config";
import { PortableTextData, TextRenderer } from "./text-renderer";

export interface HighlightVideoSectionData {
  _type: "highlight_video";
  video: SanityMuxVideoReference;
  content: PortableTextData;
}

const HighlightSectionElement = styled.section`
  margin: var(--lateral-margin);
  margin-top: 0;
  display: grid;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
    align-items: center;
    gap: 150px;
  }
`;

const HighlightSectionContent = styled(motion.div)`
  margin: 40px 20px;
  @media (min-width: 768px) {
    order: -1;
  }
`;

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

export interface HighlightVideoSectionProps {
  children: HighlightVideoSectionData;
}

export const HighlightVideoSection = (props: HighlightVideoSectionProps) => {
  const playbackId = props.children.video.asset.playbackId;
  return (
    <HighlightSectionElement>
      <motion.div {...motionProps} transition={{ delay: 0.5 }}>
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
      </motion.div>
      <HighlightSectionContent {...motionProps} transition={{ delay: 1 }}>
        <TextRenderer>{props.children.content}</TextRenderer>
      </HighlightSectionContent>
    </HighlightSectionElement>
  );
};
