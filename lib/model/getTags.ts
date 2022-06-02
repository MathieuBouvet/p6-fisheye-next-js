import prisma from "@lib/model/prisma";

async function getTags() {
  return prisma.tag.findMany();
}

export default getTags;
