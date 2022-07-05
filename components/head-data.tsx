import Head from "next/head";
import { SanityImageReference, urlFor } from "../sanity-client/config";

export interface HeadDataProps {
  title: string;
  description: string;
  image: SanityImageReference;
}

export const HeadData = (props: HeadDataProps) => {
  const imageURL = urlFor(props.image).width(1200).height(630).toString();
  return (
    <Head>
      <title>{props.title}</title>
      <meta property="og:title" content={props.title} />
      <meta name="twitter:title" content={props.title} />
      <meta name="description" content={props.description} />
      <meta property="og:description" content={props.description} />
      <meta name="twitter:description" content={props.description} />
      <meta property="og:image" content={imageURL} />
      <meta name="twitter:image" content={imageURL} />
      <link rel="icon" href="/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
