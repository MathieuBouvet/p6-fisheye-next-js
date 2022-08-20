import controller from "@utils/controller";

import extractAuthToken from "@lib/auth/extractAuthToken";
import requireOwnershipOfUserData from "@lib/auth/accessControl/requireOwnershipOfUserData";
import requireLogin from "@lib/auth/accessControl/requireLogin";

import { findUserByIdOrFail } from "@lib/model/users/findUserById";
import validateProfilePicData, {
  ProfilePicData,
} from "@lib/controllers/users/helpers/profilePicValidation";
import validateBackgroundColor from "@lib/controllers/users/helpers/validateBackgroundColor";
import { validateUserId } from "@lib/controllers/users/helpers/userValidations";

import updateBackgroundColor from "@lib/model/users/updateBackgroundColor";
import setProfilePic from "@lib/services/profilePic/setProfilePic";
import resetProfilePic from "@lib/services/profilePic/resetProfilePic";

export type ProfilePicReqBody = {
  profilePic: ProfilePicData | null;
  backgroundColor: string | null;
};

const profilePicController = controller({
  PUT: async (req, res) => {
    const authToken = extractAuthToken(req, res);
    requireLogin(authToken);

    const userId = validateUserId(req.query.userId);
    const user = await findUserByIdOrFail(userId);

    requireOwnershipOfUserData(authToken, user);

    const profilePicData = validateProfilePicData(req.body);
    const backgroundColor = validateBackgroundColor(req.body.backgroundColor);

    await updateBackgroundColor(user, backgroundColor);

    if (profilePicData != null) {
      return setProfilePic(user, profilePicData);
    } else {
      return resetProfilePic(user);
    }
  },
});

export default profilePicController;
