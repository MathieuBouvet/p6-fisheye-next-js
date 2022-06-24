import type { NextApiRequest, NextApiResponse } from "next";
import logoutController from "@lib/controllers/logoutController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return logoutController(req, res);
}
