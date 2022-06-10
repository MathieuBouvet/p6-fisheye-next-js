import prisma from "@lib/model/prisma";

async function getVisitorLikesOfPhotographerMedia(
  userIp: string,
  photographerId: number
): Promise<Record<number, true>> {
  const likes = await prisma.like.findMany({
    where: {
      AND: {
        visitor: {
          ipAddress: userIp,
        },
        medium: {
          photographerId,
        },
      },
    },
  });

  return likes.reduce((acc, like) => {
    acc[like.mediumId] = true;
    return acc;
  }, {} as Record<number, true>);
}

export default getVisitorLikesOfPhotographerMedia;
