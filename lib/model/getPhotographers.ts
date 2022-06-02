import prisma from "@lib/model/prisma";

import type { ArrayUnwrap } from "@utils/typeUtils";

export type PhotographerProfile = ArrayUnwrap<
  Awaited<ReturnType<typeof getPhotographers>>
>;

type Options = {
  withTag?: string;
};

async function getPhotographers({ withTag }: Options = {}) {
  const withTagQuery = {
    tags: {
      some: {
        tag: {
          name: {
            equals: withTag,
          },
        },
      },
    },
  };
  const photographers = await prisma.photographer.findMany({
    include: {
      user: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
          profilePicDominantColor: true,
          profilePicUrl: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: withTag ? withTagQuery : undefined,
  });

  return photographers.map(({ user, userId, tags, ...photographer }) => ({
    ...photographer,
    ...user,
    tags: tags.map(photographerTag => photographerTag.tag.name),
  }));
}

export default getPhotographers;
