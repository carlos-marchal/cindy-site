import { createPreviewSubscriptionHook } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { getSanityData, sanityConfig, SanityProps } from "./config";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(sanityConfig).image(source);

const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig);

export function useSanityData<T>(props: SanityProps<T>): T {
  const { data } = usePreviewSubscription(props?.query, {
    initialData: props.data,
    enabled: props.preview,
  });
  return getSanityData(data, props.preview);
}
