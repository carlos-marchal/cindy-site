import { NextApiHandler } from "next";

const exit: NextApiHandler = (request, response) => {
  response.clearPreviewData();
  response.writeHead(307, { Location: request?.query?.path ?? `/` });
  return response.end();
};

export default exit;
