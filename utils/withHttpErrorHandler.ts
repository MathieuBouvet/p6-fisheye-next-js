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
          status: err.status,
          message: err.message,
        });
      } else {
        throw new HttpError(
          500,
          err instanceof Error ? err.message : "unknown error"
        );
      }
    }
  };
}

export default withHttpErrorHandler;
