import { GetStaticPropsResult } from "next";
import { createClient } from "next-sanity";
import { getSanityData, sanityConfig, SanityProps } from "./config";

const sanityClient = createClient(sanityConfig);

const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
});

const getClient = (usePreview: boolean) =>
  usePreview ? previewClient : sanityClient;

export async function getSanityStaticProps<T>(
  query: string,
  preview: boolean
): Promise<GetStaticPropsResult<SanityProps<T>>> {
  const response = await getClient(preview).fetch(query);
  if (response === undefined) {
    return { notFound: true };
  }
  const data = getSanityData<T>(response, preview);
  return { props: { data, query, preview } };
}
