import prisma from "@lib/model/prisma";

async function suggestTag(name: string, suggestorId: number) {
  return prisma.tag.create({
    data: {
      name,
      status: "PENDING",
      suggestedBy: {
        connect: {
          id: suggestorId,
        },
      },
    },
  });
}

export default suggestTag;
