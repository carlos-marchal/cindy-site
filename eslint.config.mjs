import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: ["sanity-studio/**", ".next/**", "node_modules/**"],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      // Alt content is provided through the sanityImageProps function
      "jsx-a11y/alt-text": "off",
    },
  },
];

export default config;
