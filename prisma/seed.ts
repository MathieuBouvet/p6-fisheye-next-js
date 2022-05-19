import { PrismaClient } from "@prisma/client";

import {
  photographers,
  media,
  pictureDominantColor,
  profilePicDominantColor,
} from "./seedData";

const ipStart = 2130706434; //127.0.0.1
function range(start: number, size: number): number[] {
  const range = [];
  for (let i = start; i < start + size; i++) {
    range.push(i);
  }
  return range;
}

const prisma = new PrismaClient();

async function main() {
  const ipRange = range(ipStart, 200);

  await prisma.visitor.createMany({
    data: ipRange.map(ipv4Address => ({ ipv4Address })),
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
    const photographerInstance = await prisma.photographer.create({
      data: {
        city,
        country,
        tagLine,
        price,
        user: {
          create: {
            email: `${firstName}.${lastName}@fisheye.com`.toLowerCase(),
            firstName,
            lastName,
            password: "",
            profilePicDominantColor: profilePicDominantColor[`p${id}`].slice(1),
            isAdmin: false,
            profilePicUrl: portrait,
          },
        },
        tags: {
          create: tags.map(tag => ({
            tag: {
              connect: {
                name: tag.toLowerCase(),
              },
            },
          })),
        },
      },
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

      const likeCreationPromises = range(ipStart, photographerMedium.likes).map(
        ip =>
          prisma.like.create({
            data: {
              visitor: {
                connect: {
                  ipv4Address: ip,
                },
              },
              medium: {
                connect: {
                  id: mediumInstance.id,
                },
              },
            },
          })
      );
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
