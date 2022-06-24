import prisma from "@lib/model/prisma";

async function getUserProfile(userId: number) {
  return prisma.user.findUnique({
    select: {
      email: true,
      firstName: true,
      lastName: true,
      profilePicDominantColor: true,
      profilePicUrl: true,
    },
    where: {
      id: userId,
    },
  });
}

export default getUserProfile;
