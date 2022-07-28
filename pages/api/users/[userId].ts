import type { NextApiRequest, NextApiResponse } from "next";
import userController from "@lib/controllers/users/userController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return userController(req, res);
}