import type { NextApiRequest, NextApiResponse } from "next";
import loginController from "@lib/controllers/loginController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return loginController(req, res);
}