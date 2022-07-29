import prisma from "@lib/model/prisma";

export type UpdateUserData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  photographer?: {
    country: string;
    city: string;
    tagLine: string | null;
    price: number | null;
    tags: number[];
  };
};

function updateUser({ id, photographer, ...user }: UpdateUserData) {
  const { tags = [], ...restPhotographer } = photographer ?? {};
  const updatePhotographerPart =
    photographer != null
      ? prisma.photographer.update({
          where: { userId: id },
          data: {
            ...restPhotographer,
            tags: {
              deleteMany: {},
              create: tags.map(tagId => ({
                tag: { connect: { id: tagId } },
              })),
            },
          },
        })
      : Promise.resolve();

  const updateUserPart = prisma.user.update({
    where: { id },
    data: user,
  });

  return Promise.all([updateUserPart, updatePhotographerPart]);
}

export default updateUser;
