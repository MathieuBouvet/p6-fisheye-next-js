import type { NextApiRequest, NextApiResponse } from "next";
import likesOfPhotographerMediaController from "@lib/controllers/likesOfPhotographerMediaController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return likesOfPhotographerMediaController(req, res);
}
