import { NextApiHandler } from "next";

const exit: NextApiHandler = (request, response) => {
  response.setDraftMode({ enable: false });
  response.writeHead(307, { Location: request?.query?.path ?? `/` });
  return response.end();
};

export default exit;
