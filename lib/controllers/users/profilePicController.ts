import controller from "@utils/controller";

import extractAuthToken from "@lib/auth/extractAuthToken";
import requireOwnershipOfUserData from "@lib/auth/accessControl/requireOwnershipOfUserData";
import requireLogin from "@lib/auth/accessControl/requireLogin";

import { findUserByIdOrFail } from "@lib/model/users/findUserById";
import validateProfilePicData from "@lib/controllers/users/helpers/profilePicValidation";
import { validateUserId } from "@lib/controllers/users/helpers/userValidations";

import setProfilePic from "@lib/services/profilePic/setProfilePic";

const profilePicController = controller({
  PUT: async (req, res) => {
    const authToken = extractAuthToken(req, res);
    requireLogin(authToken);

    const userId = validateUserId(req.query.userId);
    const user = await findUserByIdOrFail(userId);

    requireOwnershipOfUserData(authToken, user);

    const profilePicData = validateProfilePicData(req.body);

    if (profilePicData != null) {
      return  setProfilePic(user, profilePicData);
    }

    return { res: "ok" };
  },
});

export default profilePicController;
