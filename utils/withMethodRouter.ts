import { Handler } from "./controller";
import { RouteHandlers } from "./controller";
import HttpError from "./HttpError";
import isValidHttpMethod from "./isValidHttpMethod";

function withMethodRouter(handlers: RouteHandlers): Handler {
  return async (req, res) => {
    if (!isValidHttpMethod(req.method)) {
      throw new HttpError(501);
    }
    const handler = handlers[req.method];
    if (handler == null) {
      throw new HttpError(405);
    }
    return handler(req, res);
  };
}

export default withMethodRouter;
