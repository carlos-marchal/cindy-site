import { ClientConfig, ProjectConfig } from "next-sanity";

if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === undefined) {
  throw new Error("Env variable NEXT_PUBLIC_SANITY_PROJECT_ID needs to be set");
}

export const sanityConfig: ClientConfig & ProjectConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2022-06-24",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

export interface SanityProps<T extends unknown[]> {
  queries: string[];
  data: T;
  preview: boolean;
}

export function getSanityData<T>(data: unknown, preview: boolean): T {
  if (!Array.isArray(data)) {
    return data as T;
  }

  if (data.length === 1) {
    return data[0];
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0];
  }

  return data[0];
}
