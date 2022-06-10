import { AuthToken } from "@lib/auth/extractAuthToken";
import HttpError from "@utils/HttpError";
import { ROLE, isRoleGranted } from "@lib/auth/roles";

function requireRole(token: AuthToken | null, role: ROLE) {
  if (token == null) {
    throw new HttpError(401, "Login required");
  }
  const currentRole = token.role;
  if (!isRoleGranted(currentRole, role)) {
    throw new HttpError(403, `User must be a ${role}`);
  }
}

export default requireRole;
