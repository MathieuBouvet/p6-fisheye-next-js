import { AuthToken } from "@lib/auth/extractAuthToken";
import HttpError from "@utils/HttpError";
import { ROLE, isRoleGranted } from "@lib/auth/roles";

import getUserIdFromToken from "@lib/auth/getUserIdFromToken";
import getRoleFromToken from "@lib/auth/getRoleFromToken";

type Options = {
  allowedIfRole?: ROLE | null;
};

function makeRequireOwnership<Ressource>(
  getOwnerId: (ressource: Ressource) => number
) {
  return (
    token: AuthToken | null,
    ressource: Ressource,
    { allowedIfRole = ROLE.ADMIN }: Options = {}
  ) => {
    const userIdFromToken = getUserIdFromToken(token);
    const userRoleFromToken = getRoleFromToken(token);

    const isAuthorized =
      userIdFromToken === getOwnerId(ressource) ||
      (allowedIfRole !== null &&
        isRoleGranted(userRoleFromToken, allowedIfRole));

    if (!isAuthorized) {
      throw new HttpError(
        403,
        `User must be the author of this ressource ${
          allowedIfRole !== null ? `or have the role ${allowedIfRole}` : ""
        }`
      );
    }
  };
}

export default makeRequireOwnership;
