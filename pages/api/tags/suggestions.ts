import type { NextApiRequest, NextApiResponse } from "next";
import suggestionsController from "@lib/controllers/tags/suggestionsController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return suggestionsController(req, res);
}