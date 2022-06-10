import prisma from "@lib/model/prisma";

async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export default findUserByEmail;
