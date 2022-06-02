import prisma from "@lib/model/prisma";

export type PhotographerData = NonNullable<
  Awaited<ReturnType<typeof getPhotographerById>>
>;

async function getPhotographerById(id: number) {
  const photographer = await prisma.photographer.findUnique({
    include: {
      user: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
          profilePicDominantColor: true,
          profilePicUrl: true,
        },
      },
      media: {
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          likes: {
            select: {
              visitorId: true,
            },
          },
        },
      },
    },
    where: {
      id,
    },
  });

  if (photographer == null) {
    return null;
  }

  const { user, media, ...rest } = photographer;
  return {
    ...rest,
    ...user,
    media: media.map(({ likes, ...medium }) => {
      return {
        ...medium,
        tags: medium.tags.map(tag => tag.tag.name),
        createdAt: medium.createdAt.getTime(),
        likes: likes.length,
      };
    }),
  };
}

export default getPhotographerById;
