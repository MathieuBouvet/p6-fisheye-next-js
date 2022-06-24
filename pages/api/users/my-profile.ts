import type { NextApiRequest, NextApiResponse } from "next";
import profileController from "@lib/controllers/users/profileController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return profileController(req, res);
}
