import prisma from "@lib/prisma";

async function getMediaTagsForPhotographer(photographerId: number) {
  const tags = await prisma.tag.findMany({
    where: {
      mediumTags: {
        some: {
          medium: {
            photographerId,
          },
        },
      },
    },
  });
  return tags.map(tag => tag.name);
}

export default getMediaTagsForPhotographer;
