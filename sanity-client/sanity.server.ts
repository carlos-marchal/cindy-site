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

export async function getSanityStaticProps<T extends unknown[]>(
  queries: string[],
  preview: boolean
): Promise<GetStaticPropsResult<SanityProps<T>>> {
  const responses = await Promise.all(
    queries.map((query) => getClient(preview).fetch(query))
  );
  if (responses.every((response) => response === undefined)) {
    return { notFound: true };
  }
  const data = responses.map((response) => getSanityData(response, preview));
  return { props: { queries, data: data as T, preview } };
}
