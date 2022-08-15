import { ProfilePicData } from "@lib/controllers/users/helpers/profilePicValidation";
import { User } from "@prisma/client";

import apiClient from "@lib/apiClient";
import apiRoutes from "@lib/routes/apiRoutes";

async function updateProfilePic(
  userId: number,
  profilePic: ProfilePicData | null
): Promise<User> {
  return apiClient.put(apiRoutes.profilePic(userId), { profilePic });
}

export default updateProfilePic;
