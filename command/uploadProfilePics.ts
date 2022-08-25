import fs from "fs/promises";
import path from "path";
import prisma from "@lib/model/prisma";

import setProfilePic from "@lib/services/profilePic/setProfilePic";

async function uploadProfilePics() {
  const photographers = await prisma.photographer.findMany({
    include: {
      user: true,
    },
  });

  const photographerAndImages = (
    await Promise.all(
      photographers.map(async photographer => {
        return fs
          .readFile(
            `public/profile-pics/${photographer.user.profilePicUrl}`,
            "base64"
          )
          .then(image => {
            let imageExt = path
              .extname(`public/profile-pics/${photographer.user.profilePicUrl}`)
              .slice(1);
            if (imageExt === "jpg") {
              imageExt = "jpeg";
            }
            return {
              photographer,
              image: `data:image/${imageExt};base64,${image}`,
            };
          })
          .catch(() => Promise.resolve(null));
      })
    )
  ).filter((data): data is NonNullable<typeof data> => data != null);

  for (let data of photographerAndImages) {
    await setProfilePic(data.photographer.user, data.image);
  }

  console.log("all done");
}

uploadProfilePics();
