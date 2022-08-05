import prisma from "@lib/model/prisma";

async function getTags() {
  return prisma.tag.findMany({
    where: {
      status: "ACCEPTED"
    }
  });
}

export default getTags;
