import prisma from "@lib/model/prisma";
import { User } from "@prisma/client";

async function updateProfilePic(user: User, profilePicUrl: string | null) {
  return prisma.user.update({
    data: {
      profilePicUrl,
    },
    where: {
      id: user.id,
    },
  });
}

export default updateProfilePic;
