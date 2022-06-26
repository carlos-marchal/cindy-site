import { createPreviewSubscriptionHook } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import {
  getSanityData,
  sanityConfig,
  SanityImageReference,
  SanityProps,
  sanitySettingsQuery,
  SiteSettings,
} from "./config";
import { useRef } from "react";
import { ImageProps } from "next/image";

export const urlBuilder = createImageUrlBuilder(sanityConfig);

export function sanityImageProps(
  source: SanityImageReference,
  layout: ImageProps["layout"]
): ImageProps {
  const props: ImageProps = {
    src: source.asset._ref,
    layout,
    loader: (props) => {
      const build = urlBuilder.image(source).width(props.width).auto("format");
      if (props.quality !== undefined) {
        build.quality(props.quality);
      }
      return build.url();
    },
    placeholder: "blur",
  };
  if (layout !== "fill") {
    const [width, height] = source.asset._ref
      .match(/\d+x\d+/)![0]
      .split("x")
      .map((x) => Number.parseInt(x, 10));
    props.width = width;
    props.height = height;
  }
  if (source.blurDataURL !== undefined) {
    props.blurDataURL = source.blurDataURL;
  }
  return props;
}

const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig);

export function useSanityData<T extends unknown[]>(
  props: SanityProps<T>
): [SiteSettings, ...T] {
  const nQueries = useRef(props.queries.length);
  if (nQueries.current !== props.queries.length) {
    throw Error(
      "Changing the number of queries at runtime is not allowed due to the rules of hooks"
    );
  }
  return [sanitySettingsQuery, ...props.queries]
    .map((query, index) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      usePreviewSubscription(query, {
        initialData: props.data[index],
        enabled: props.preview,
      })
    )
    .map(({ data }) => getSanityData(data, props.preview)) as [
    SiteSettings,
    ...T
  ];
}
