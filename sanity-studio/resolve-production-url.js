const secret = process.env.PREVIEW_SECRET;
const remoteUrl = process.env.PRODUCTION_URL;
const localUrl = process.env.DEVELOPMENT_URL ?? "http://localhost:3000";

export default function resolveProductionUrl(document) {
  const baseUrl =
    window.location.hostname === "localhost" ? localUrl : remoteUrl;

  const previewUrl = new URL(baseUrl);

  previewUrl.pathname = `/api/preview`;
  previewUrl.searchParams.append(`secret`, secret);
  previewUrl.searchParams.append(`path`, getPath(document));

  return previewUrl.toString();
}

function getPath(document) {
  switch (document._type) {
    case "home":
      return "";
  }
  return "";
}
