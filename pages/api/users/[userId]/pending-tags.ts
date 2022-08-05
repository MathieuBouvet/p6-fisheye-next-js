import type { NextApiRequest, NextApiResponse } from "next";
import userPendingTagsController from "@lib/controllers/users/userPendingTagsController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return userPendingTagsController(req, res);
}