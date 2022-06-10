import prisma from "@lib/model/prisma";
import { ROLE } from "@lib/auth/roles";
import { User } from "@prisma/client";

async function getUserRole(user: User): Promise<ROLE> {
  if (user.isAdmin) {
    return ROLE.ADMIN;
  }
  const associatedPhotographer = await prisma.photographer.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (associatedPhotographer != null) {
    return ROLE.PHOTOGRAPHER;
  }
  return ROLE.ANONYMOUS;
}

export default getUserRole;
