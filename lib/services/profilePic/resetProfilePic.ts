import updateProfilePic from "@lib/model/users/updateProfilePic";
import createImageDeleter from "@lib/services/ImageDeleter/createImageDeleter";
import {
  picsFolder,
  placeholdersFolder,
} from "@lib/services/profilePic/setProfilePic";
import { User } from "prisma/prisma-client";

async function resetProfilePic(user: User) {
  const previousUrl = user.profilePicUrl;

  const updatedUser = await updateProfilePic(user, null);

  if (previousUrl != null) {
    const imageDeleter = createImageDeleter();
    await Promise.all([
      imageDeleter.delete(`${picsFolder}/${previousUrl}`),
      imageDeleter.delete(`${placeholdersFolder}/${previousUrl}`),
    ]);
  }

  return updatedUser;
}

export default resetProfilePic;
