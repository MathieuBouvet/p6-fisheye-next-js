import prisma from "@lib/model/prisma";
import createUser, { CreateUserParams } from "@lib/model/users/createUser";

type Params = CreateUserParams & {
  city: string;
  country: string;
  price?: number;
  tagLine?: string;
  tags: string[];
};

async function createPhotographer({
  city,
  country,
  price,
  tagLine,
  tags,
  ...restUser
}: Params) {
  const user = await createUser(restUser);

  const photographer = await prisma.photographer.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      tags: {
        create: tags.map(tag => ({
          tag: {
            connect: {
              name: tag.toLowerCase(),
            },
          },
        })),
      },
      city,
      price,
      tagLine,
      country,
    },
  });

  return {
    ...photographer,
    user,
  };
}

export default createPhotographer;
