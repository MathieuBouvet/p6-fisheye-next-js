import prisma from "@lib/model/prisma";
import { User } from "@prisma/client";

function updateBackgroundColor(user: User, backgroundColor: string | null) {
  return prisma.user.update({
    data: {
      profilePicDominantColor: backgroundColor,
    },
    where: {
      id: user.id,
    },
  });
}

export default updateBackgroundColor;
