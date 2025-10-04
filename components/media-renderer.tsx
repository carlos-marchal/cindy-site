'use client'

import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
import {
  SanityImageReference,
  SanityMuxVideoReference,
  isSanityImageReference,
  isSanityMuxVideoReference,
} from "@/sanity-client/config";
import { sanityImageProps } from "@/sanity-client/sanity";

export interface MediaRendererProps {
  media: SanityImageReference | SanityMuxVideoReference;
  layout: "fill" | "responsive";
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MediaRenderer = ({
  media,
  layout,
  sizes,
  priority,
  className,
  style,
}: MediaRendererProps) => {
  if (isSanityImageReference(media)) {
    const imageProps = sanityImageProps(media, layout);
    return (
      <Image
        {...imageProps}
        sizes={sizes || imageProps.sizes}
        priority={priority}
        className={className}
        style={style || imageProps.style}
      />
    );
  }

  if (isSanityMuxVideoReference(media)) {
    const playbackId = media.asset.playbackId;

    if (!playbackId) {
      console.error("Mux video missing playbackId", media);
      return null;
    }

    return (
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          height: layout === "fill" ? "100%" : "auto",
          aspectRatio: "16/9",
          "--controls": "none",
          ...style,
        } as React.CSSProperties}
        className={className}
      />
    );
  }

  console.error("Unknown media type", media);
  return null;
};
