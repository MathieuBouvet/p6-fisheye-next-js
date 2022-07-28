import { AuthToken } from "@lib/auth/extractAuthToken";
import HttpError from "@utils/HttpError";

function requireLogin(token: AuthToken | null): asserts token is AuthToken {
  if (token == null) {
    throw new HttpError(401, `Login required`);
  }
}

export default requireLogin;
