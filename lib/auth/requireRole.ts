import { AuthToken } from "@lib/auth/extractAuthToken";
import HttpError from "@utils/HttpError";
import { ROLE, isRoleGranted } from "@lib/auth/roles";

import getRoleFromToken from "@lib/auth/getRoleFromToken";

function requireRole(token: AuthToken | null, role: ROLE) {
  const currentRole = getRoleFromToken(token);

  if (!isRoleGranted(currentRole, role)) {
    throw new HttpError(403, `User must be a ${role}`);
  }
}

export default requireRole;
