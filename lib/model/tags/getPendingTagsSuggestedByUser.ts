import prisma from "@lib/model/prisma";

async function getPendingTagsSuggestedByUser(userId: number) {
  return prisma.tag.findMany({
    where: {
      status: "PENDING",
      suggestorId: userId,
    },
  });
}

export default getPendingTagsSuggestedByUser;
