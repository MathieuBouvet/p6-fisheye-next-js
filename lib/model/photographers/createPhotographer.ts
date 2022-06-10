import prisma from "@lib/model/prisma";
import createUser, { CreateUserParams } from "@lib/model/users/createUser";

type Params = CreateUserParams & {
  city: string;
  country: string;
  price?: number;
  tagLine?: string;
};

async function createPhotographer({
  city,
  country,
  price,
  tagLine,
  ...restUser
}: Params) {
  const user = await createUser(restUser);

  return prisma.photographer.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      city,
      price,
      tagLine,
      country,
    },
  });
}

export default createPhotographer;
