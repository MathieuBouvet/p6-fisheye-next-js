import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import HttpError from "@utils/HttpError";
import controller from "@utils/controller";

import extractAuthToken from "@lib/auth/extractAuthToken";
import requireMatchingUserIds from "@lib/auth/accessControl/requireMatchingUserIds";
import requireLogin from "@lib/auth/accessControl/requireLogin";

import updateUser from "@lib/model/users/updateUser";
import getUserProfile from "@lib/model/users/getUserProfile";

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
    const userId = validateUserId(req.query.userId);

    requireLogin(authToken);
    requireMatchingUserIds(authToken, userId);

    const userData = validateUserData(req.body);

    try {
      await updateUser({ id: userId, ...userData });
    } catch (err) {
      updateUserErrorHandler(err, userId);
    }

    return getUserProfile(userId);
  },
});

export default userController;
