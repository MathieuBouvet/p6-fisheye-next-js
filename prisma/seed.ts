import prisma from "@lib/model/prisma";
import createPhotographer from "@lib/model/photographers/createPhotographer";

import {
  photographers,
  media,
  pictureDominantColor,
  profilePicDominantColor,
} from "./seedData";

function range(start: number, size: number): number[] {
  const range = [];
  for (let i = start; i < start + size; i++) {
    range.push(i);
  }
  return range;
}

const ipBase = "128.0.0.";

async function main() {
  const ipRange = range(1, 200).map(i => ipBase + i);

  await prisma.visitor.createMany({
    data: ipRange.map(ipAddress => ({ ipAddress })),
  });

  for (const photographer of photographers) {
    const {
      city,
      country,
      portrait,
      price,
      tagline: tagLine,
      name,
      id,
      tags,
    } = photographer;
    const [firstName, lastName] = name.split(" ");

    await Promise.all(
      tags.map(tag =>
        prisma.tag.upsert({
          where: { name: tag.toLowerCase() },
          update: {},
          create: {
            name: tag.toLowerCase(),
          },
        })
      )
    );
    const photographerInstance = await createPhotographer({
      email: `${firstName}.${lastName}@fisheye.com`.toLowerCase(),
      firstName,
      lastName,
      password: `pass_${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      profilePicDominantColor: profilePicDominantColor[`p${id}`].slice(1),
      profilePicUrl: portrait,
      city,
      country,
      tagLine,
      price,
      tags,
    });

    const photographerMedia = media.filter(
      medium => medium.photographerId === id
    );

    for (const photographerMedium of photographerMedia) {
      const {
        id,
        tags,
        title,
        image,
        video,
        price,
        altText,
        photographerId,
        date,
      } = photographerMedium;

      await Promise.all(
        tags.map(tag =>
          prisma.tag.upsert({
            where: { name: tag.toLowerCase() },
            update: {},
            create: {
              name: tag.toLowerCase(),
            },
          })
        )
      );

      const mediumInstance = await prisma.medium.create({
        data: {
          title,
          type: video != null ? "VIDEO" : "PICTURE",
          url: video != null ? video : image,
          dominantColor:
            pictureDominantColor[`p${photographerId}_${id}`].slice(1),
          createdAt: new Date(date),
          altText,
          price,
          tags: {
            create: tags.map(tag => ({
              tag: {
                connect: {
                  name: tag.toLowerCase(),
                },
              },
            })),
          },
          photographer: {
            connect: {
              id: photographerInstance.id,
            },
          },
        },
      });

      const likeCreationPromises = range(1, photographerMedium.likes).map(i => {
        return prisma.like.create({
          data: {
            visitor: {
              connect: {
                ipAddress: ipBase + i,
              },
            },
            medium: {
              connect: {
                id: mediumInstance.id,
              },
            },
          },
        });
      });
      await Promise.all(likeCreationPromises);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
