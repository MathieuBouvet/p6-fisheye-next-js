import type { NextApiRequest, NextApiResponse } from "next";
import likesController from "@lib/controllers/likesController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return likesController(req, res);
}
