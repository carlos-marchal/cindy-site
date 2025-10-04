'use client'

import { motion } from "framer-motion";
import MuxPlayer from "@mux/mux-player-react";
import styled from "styled-components";
import { SanityMuxVideoReference } from "../../sanity-client/config";

export type ImageSectionMode = "full" | "left" | "right" | "poster";

export interface ImageVideoSectionData {
  _type: "picture_video";
  video: SanityMuxVideoReference;
  mode: ImageSectionMode;
}

const ImageSectionElement = styled(motion.section)<{ mode: ImageSectionMode }>`
  margin: var(--lateral-margin);
  margin-top: 0px;
  @media (min-width: 768px) {
    margin: ${({ mode }) =>
      ({
        full: "var(--lateral-margin)",
        right:
          "var(--lateral-margin) var(--lateral-margin) var(--lateral-margin) 30vw",
        left: "var(--lateral-margin) 30vw var(--lateral-margin) var(--lateral-margin)",
        poster: "var(--lateral-margin) 30vw var(--lateral-margin) 30vw",
      }[mode])};
  }
`;

export interface ImageVideoSectionProps {
  children: ImageVideoSectionData;
}

export const ImageVideoSection = (props: ImageVideoSectionProps) => {
  const playbackId = props.children.video.asset.playbackId;
  return (
    <ImageSectionElement
      mode={props.children.mode}
      initial={{ opacity: 0, translateY: -50 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 0.5 }}
      viewport={{ once: true }}
    >
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
    </ImageSectionElement>
  );
};
