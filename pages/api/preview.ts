import { NextApiHandler } from "next";

export const draft: NextApiHandler = (request, response) => {
  if (!request?.query?.secret) {
    return response.status(401).json({ message: "No secret token" });
  }
  if (request.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return response.status(401).json({ message: "Invalid secret token" });
  }
  if (request.query.path === undefined) {
    return response.status(400).json({ message: "No path" });
  }

  response.setDraftMode({ enable: true });
  response.writeHead(307, { Location: `/${request.query.path}` });
  return response.end();
};

export default draft;
