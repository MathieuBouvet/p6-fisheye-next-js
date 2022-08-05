import controller from "@utils/controller";

import extractAuthToken from "@lib/auth/extractAuthToken";
import requireLogin from "@lib/auth/accessControl/requireLogin";
import requireOwnershipOfUserData from "@lib/auth/accessControl/requireOwnershipOfUserData";

import { findUserByIdOrFail } from "@lib/model/users/findUserById";
import getPendingTagsSuggestedByUser from "@lib/model/tags/getPendingTagsSuggestedByUser";

import { validateUserId } from "@lib/controllers/users/helpers/userValidations";

const userPendingTagsController = controller({
  GET: async (req, res) => {
    const authToken = extractAuthToken(req, res);
    requireLogin(authToken);

    const userId = validateUserId(req.query.userId);
    const user = await findUserByIdOrFail(userId);
    requireOwnershipOfUserData(authToken, user);

    return getPendingTagsSuggestedByUser(userId);
  },
});

export default userPendingTagsController;
