import type { NextApiRequest, NextApiResponse } from "next";
import profilePicController from "@lib/controllers/users/profilePicController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return profilePicController(req, res);
}
