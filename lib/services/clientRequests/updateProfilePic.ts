import { ProfilePicData } from "@lib/controllers/users/helpers/profilePicValidation";
import { ProfilePicReqBody } from "@lib/controllers/users/profilePicController";
import { User } from "@prisma/client";

import apiClient from "@lib/apiClient";
import apiRoutes from "@lib/routes/apiRoutes";

async function updateProfilePic(
  userId: number,
  profilePicReqBody: ProfilePicReqBody
): Promise<User> {
  return apiClient.put(apiRoutes.profilePic(userId), profilePicReqBody);
}

export default updateProfilePic;
