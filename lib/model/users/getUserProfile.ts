import prisma from "@lib/model/prisma";

async function getUserProfile(userId: number) {
  const profile = await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      profilePicDominantColor: true,
      profilePicUrl: true,
      photographer: {
        select: {
          city: true,
          country: true,
          price: true,
          tagLine: true,
          tags: {
            select: {
              tagId: true,
            },
          },
        },
      },
    },

    where: {
      id: userId,
    },
  });

  if (profile?.photographer != null) {
    return {
      ...profile,
      photographer: {
        ...profile.photographer,
        tags: profile.photographer.tags.map(tag => tag.tagId),
      },
    };
  }
  return profile;
}

export default getUserProfile;
