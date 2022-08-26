import prisma from "@lib/model/prisma";
import { Medium } from "@prisma/client";
import generatePlaceholder from "@lib/services/imageProcessing/generatePlaceholder";
import createImageSaver from "@lib/services/ImageSaver/createImageSaver";

export const mediaFolder = "media";
export const placeholdersFolder = `${mediaFolder}/placeholders`;

async function setMediumRessource(medium: Medium, imagebase64: string) {
  const mediumSaver = createImageSaver(imagebase64);

  const fileName = `${medium.id}-${medium.title.toLowerCase()}`;

  const mediumName = await mediumSaver.save({ fileName, folder: mediaFolder });

  if (medium.type === "PICTURE") {
    const placeholder = await generatePlaceholder(imagebase64);
    const placeholderSaver = createImageSaver(placeholder);

    await placeholderSaver.save({
      folder: placeholdersFolder,
      fileName: mediumName,
      withAutoExtension: false,
      withGeneratedId: false,
    });
  }

  return prisma.medium.update({
    data: {
      url: mediumName,
    },
    where: {
      id: medium.id,
    },
  });
}

export default setMediumRessource;
