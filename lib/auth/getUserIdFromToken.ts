import { AuthToken } from "@lib/auth/extractAuthToken";

function getRoleFromToken(token: AuthToken | null): number | null {
  return token?.userId ?? null;
}

export default getRoleFromToken;