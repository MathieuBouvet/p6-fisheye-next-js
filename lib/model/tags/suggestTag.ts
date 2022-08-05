import { UserFull } from "@lib/model/users/findUserById";
import prisma from "@lib/model/prisma";

async function suggestTag(name: string, suggestor: UserFull) {
  const tag = await prisma.tag.create({
    data: {
      name,
      status: "PENDING",
      suggestedBy: {
        connect: {
          id: suggestor.id,
        },
      },
    },
  });

  if (suggestor.photographer != null) {
    await prisma.photographerTag.create({
      data: {
        tag: {
          connect: {
            id: tag.id,
          },
        },
        photographer: {
          connect: {
            id: suggestor.photographer.id,
          },
        },
      },
    });
  }

  return tag;
}

export default suggestTag;
