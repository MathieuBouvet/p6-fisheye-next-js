import prisma from "@lib/prisma";

async function getTags() {
  return prisma.tag.findMany();
}

export default getTags;
