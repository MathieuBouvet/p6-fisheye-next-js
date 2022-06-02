import type { NextApiRequest, NextApiResponse } from "next";
import withHttpErrorHandler from "./withHttpErrorHandler";
import withReturnedDataToJson from "./withReturnedDataToJson";
import withMethodRouter from "./withMethodRouter";

export type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<unknown>;

export type RouteHandlers = {
  GET?: Handler;
  POST?: Handler;
  PUT?: Handler;
  DELETE?: Handler;
  PATCH?: Handler;
  OPTIONS?: Handler;
  HEAD?: Handler;
};

function controller(routeHandlers: RouteHandlers) {
  return withHttpErrorHandler(
    withReturnedDataToJson(withMethodRouter(routeHandlers))
  );
}

export default controller;
