import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { createClient } from "next-sanity";
import {
  getSanityData,
  isSanityImageReference,
  sanityConfig,
  SanityImageReference,
  SanityProps,
  sanitySettingsQuery,
  SiteSettings,
} from "./config";
import { urlBuilder } from "./sanity";

const sanityClient = createClient(sanityConfig);

const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
});

const getClient = (usePreview: boolean) =>
  usePreview ? previewClient : sanityClient;

export async function getSanityStaticPaths(
  query: string,
  transform: (entry: any) => string
): Promise<GetStaticPathsResult> {
  const response = await getClient(false).fetch(query);
  return { paths: response.map(transform), fallback: false };
}

export async function getSanityStaticProps<T extends unknown[]>(
  queries: string[],
  preview: boolean
): Promise<GetStaticPropsResult<SanityProps<[SiteSettings, ...T]>>> {
  const responses = await Promise.all(
    [sanitySettingsQuery, ...queries].map((query) =>
      getClient(preview).fetch(query)
    )
  );
  if (responses.every((response) => response === undefined)) {
    return { notFound: true };
  }
  const data = await Promise.all(
    responses.map(async (response) => {
      const entry = getSanityData(response, preview);
      await loadSanityBlurredPlaceholders(entry);
      return entry;
    })
  );
  return { props: { queries, data: data as [SiteSettings, ...T], preview } };
}

async function loadSanityBlurredPlaceholders(
  data: unknown | SanityImageReference
): Promise<void> {
  if (typeof data !== "object" || data === null) {
    return;
  }
  if (Array.isArray(data)) {
    await Promise.all(data.map(loadSanityBlurredPlaceholders));
    return;
  }
  if (!isSanityImageReference(data)) {
    await Promise.all(Object.values(data).map(loadSanityBlurredPlaceholders));
    return;
  }

  const blurredURL = urlBuilder
    .image(data)
    .height(30)
    .quality(30)
    .format("jpg")
    .url();
  const response = await fetch(blurredURL);
  const blob = await response.arrayBuffer();
  const base64 = Buffer.from(blob).toString("base64");
  const contentType = response.headers.get("content-type");
  const blurredDataURL = `data:${contentType};base64,${encodeURIComponent(
    base64
  )}`;
  (data as SanityImageReference).blurDataURL = blurredDataURL;
}
