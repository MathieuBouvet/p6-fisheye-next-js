import { IncomingMessage, ServerResponse } from "http";
import Cookies from "cookies";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ROLE } from "@lib/auth/roles";

export type AuthToken = JwtPayload & {
  userId: number;
  role: ROLE;
  csrfToken: string;
};

function validateTokenFields(token: JwtPayload): AuthToken | null {
  const { userId, role, csrfToken, ...rest } = token;
  const parsedUserId = parseInt(userId);
  if (typeof csrfToken !== "string" || !(role in ROLE) || isNaN(parsedUserId)) {
    return null;
  }
  return { ...rest, csrfToken, role, userId };
}

function extractAuthToken(
  req: IncomingMessage,
  res: ServerResponse
): AuthToken | null {
  const cookies = new Cookies(req, res);
  const rawToken = cookies.get("auth_token");
  if (rawToken == null) {
    return null;
  }
  try {
    const decodedToken = jwt.verify(rawToken, process.env.JWT_SECRET ?? "");
    if (typeof decodedToken === "string") {
      return null;
    }

    return validateTokenFields(decodedToken);
  } catch (err) {
    return null;
  }
}

export default extractAuthToken;
