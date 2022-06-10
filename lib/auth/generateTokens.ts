import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "@prisma/client";
import getUserRole from "@lib/model/users/getUserRole";

async function generateTokens(
  user: User
): Promise<[authToken: string, csrfToken: string]> {
  const csrfToken = crypto.randomBytes(64).toString("hex");
  const userRole = await getUserRole(user);
  return [
    jwt.sign(
      {
        userId: user.id,
        role: userRole,
        csrfToken,
      },
      process.env.JWT_SECRET ?? "",
      { issuer: "fisheye", expiresIn: "1day" }
    ),
    csrfToken,
  ];
}

export default generateTokens;
