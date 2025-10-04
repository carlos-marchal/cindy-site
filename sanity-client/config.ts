import { ClientConfig, groq } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === undefined) {
  throw new Error("Env variable NEXT_PUBLIC_SANITY_PROJECT_ID needs to be set");
}

export const sanityConfig: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: "2022-06-24",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

export const urlFor = (source: SanityImageReference) =>
  createImageUrlBuilder({
    projectId: sanityConfig.projectId!,
    dataset: sanityConfig.dataset!,
  }).image(source);

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

export const sanitySettingsQuery = groq`*[_id == "site_settings"]`;

export interface SiteSettings {
  title_prefix: string;
  description: string;
  preview: SanityImageReference;
  navigation: SiteSettingsNavigation[];
  contact_information: SiteContactInformation;
}

export interface SiteContactInformation {
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  instagram_url: string;
}

export interface SiteSettingsNavigation {
  name: string;
  path: string;
}

export interface SanityImageReference {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  caption?: string;
  blurDataURL?: string;
}

export function isSanityImageReference(
  data: any
): data is SanityImageReference {
  if (data._type !== "image") {
    return false;
  }
  return data.asset?._type === "reference";
}
