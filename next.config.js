/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },
  images: { domains: ["cdn.sanity.io"] },
  i18n: { defaultLocale: "en", locales: ["en"] },
};

module.exports = nextConfig;
