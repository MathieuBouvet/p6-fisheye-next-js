import prisma from "@lib/model/prisma";

type Params = {
  mediumId: number;
  visitorIp: string;
};

async function unlikeMedium({ mediumId, visitorIp }: Params) {
  return prisma.visitor.update({
    data: {
      likes: {
        deleteMany: { mediumId },
      },
    },
    where: {
      ipAddress: visitorIp,
    },
  });
}

export default unlikeMedium;
