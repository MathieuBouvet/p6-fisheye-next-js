import { NextApiHandler } from "next";
import { Handler } from "./controller";

function withReturnedDataToJson(handler: Handler): NextApiHandler {
  return async (req, res) => {
    const data = await handler(req, res);
    res.json(data);
  };
}

export default withReturnedDataToJson;
