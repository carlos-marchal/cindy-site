import createImageUrlBuilder from "@sanity/image-url";
import {
  sanityConfig,
  SanityImageReference,
  SanityProps,
  SiteSettings,
} from "./config";
import { ImageProps } from "next/image";

export const urlBuilder = createImageUrlBuilder({
  projectId: sanityConfig.projectId!,
  dataset: sanityConfig.dataset!,
});

export function sanityImageProps(
  source: SanityImageReference,
  layout: "fill" | "responsive"
): ImageProps {
  const [width, height] = source.asset._ref
    .match(/\d+x\d+/)![0]
    .split("x")
    .map((x) => Number.parseInt(x, 10));

  const props: ImageProps = {
    src: source.asset._ref,
    loader: (props) => {
      const build = urlBuilder.image(source).width(props.width).auto("format");
      if (props.quality !== undefined) {
        build.quality(props.quality);
      }
      return build.url();
    },
    placeholder: "blur",
    alt: source.caption ?? "",
  };

  if (layout === "fill") {
    props.fill = true;
    props.sizes = "100vw";
  } else {
    props.width = width;
    props.height = height;
    props.sizes = "100vw";
    props.style = { width: '100%', height: 'auto' };
  }

  if (source.blurDataURL !== undefined) {
    props.blurDataURL = source.blurDataURL;
  }
  return props;
}

export function useSanityData<T extends unknown[]>(
  props: SanityProps<T>
): [SiteSettings, ...T] {
  return [props.data[0] as SiteSettings, ...props.data.slice(1)] as [
    SiteSettings,
    ...T
  ];
}
