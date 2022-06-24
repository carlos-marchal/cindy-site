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
