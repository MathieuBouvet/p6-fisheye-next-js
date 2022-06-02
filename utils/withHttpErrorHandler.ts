import { NextApiHandler } from "next";
import HttpError from "./HttpError";

function withHttpErrorHandler(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.code).json({
          code: err.code,
          message: err.status,
        });
      } else {
        throw err;
      }
    }
  };
}

export default withHttpErrorHandler;
