import { createPreviewSubscriptionHook } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { getSanityData, sanityConfig, SanityProps } from "./config";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useRef } from "react";

export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(sanityConfig).image(source);

const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig);

export function useSanityData<T extends unknown[]>(props: SanityProps<T>): T {
  const nQueries = useRef(props.queries.length);
  if (nQueries.current !== props.queries.length) {
    throw Error(
      "Changing the number of queries at runtime is not allowed due to the rules of hooks"
    );
  }
  return props.queries
    .map((query, index) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      usePreviewSubscription(query, {
        initialData: props.data[index],
        enabled: props.preview,
      })
    )
    .map(({ data }) => getSanityData(data, props.preview)) as T;
}
