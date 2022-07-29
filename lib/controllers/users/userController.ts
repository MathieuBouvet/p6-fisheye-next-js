import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import HttpError from "@utils/HttpError";
import controller from "@utils/controller";

import extractAuthToken from "@lib/auth/extractAuthToken";
import requireOwnershipOfUserData from "@lib/auth/accessControl/requireOwnershipOfUserData";
import requireLogin from "@lib/auth/accessControl/requireLogin";

import updateUser from "@lib/model/users/updateUser";
import getUserProfile from "@lib/model/users/getUserProfile";
import { findUserByIdOrFail } from "@lib/model/users/findUserById";

import {
  validateUserData,
  validateUserId,
} from "@lib/controllers/users/helpers/userValidations";

export type UpdateUserResponse = Awaited<ReturnType<typeof getUserProfile>>;

function updateUserErrorHandler(err: unknown, userId: number) {
  if (!(err instanceof PrismaClientKnownRequestError) || err.code !== "P2025") {
    throw err;
  }
  throw new HttpError(404, `user ${userId} not found`);
}

const userController = controller({
  PUT: async (req, res): Promise<UpdateUserResponse> => {
    const authToken = extractAuthToken(req, res);
    requireLogin(authToken);

    const userId = validateUserId(req.query.userId);
    const user = await findUserByIdOrFail(userId);

    requireOwnershipOfUserData(authToken, user);

    if (user.photographer == null && req.body.photographer != null) {
      throw new HttpError(
        400,
        "Trying to update photographer data of a non-photographer user"
      );
    }

    const userData = validateUserData(req.body);

    try {
      await updateUser({ id: user.id, ...userData });
    } catch (err) {
      updateUserErrorHandler(err, user.id);
    }

    return getUserProfile(user.id);
  },
});

export default userController;
