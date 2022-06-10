import prisma from "@lib/model/prisma";

type Params = {
  mediumId: number;
  visitorIp: string;
};

async function likeMedium({ mediumId, visitorIp }: Params) {
  return prisma.like.create({
    data: {
      visitor: {
        connectOrCreate: {
          where: {
            ipAddress: visitorIp,
          },
          create: {
            ipAddress: visitorIp,
          },
        },
      },
      medium: {
        connect: {
          id: mediumId,
        },
      },
    },
  });
}

export default likeMedium;
