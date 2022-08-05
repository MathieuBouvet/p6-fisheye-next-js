import findOneOrFail from "@lib/model/helpers/findOneOrFail";
import prisma from "@lib/model/prisma";

export type UserFull = Awaited<ReturnType<typeof findUserByIdOrFail>>;

async function findUserById(id: number) {
  return prisma.user.findUnique({
    include: {
      photographer: true,
    },
    where: {
      id,
    },
  });
}

const findUserByIdOrFail = findOneOrFail(findUserById, userId => ({
  message: `User ${userId} not found`,
}));

export default findUserById;
export { findUserByIdOrFail };
