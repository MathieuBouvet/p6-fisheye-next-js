import { ROLE } from "@lib/auth/roles";
import { AuthToken } from "@lib/auth/extractAuthToken";

function getRoleFromToken(token: AuthToken | null): ROLE {
  return token?.role ?? ROLE.ANONYMOUS;
}

export default getRoleFromToken;
