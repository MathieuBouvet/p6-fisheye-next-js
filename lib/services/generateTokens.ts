import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "@prisma/client";

function generateTokens(
  user: User
): [authToken: string, csrfToken: string] {
  const csrfToken = crypto.randomBytes(64).toString("hex");
  return [
    jwt.sign(
      {
        userId: user.id,
        csrfToken,
      },
      process.env.JWT_SECRET ?? "",
      { issuer: "fisheye", expiresIn: "1day" }
    ),
    csrfToken,
  ];
}

export default generateTokens;
