import { CropConfig } from "@lib/controllers/users/helpers/profilePicValidation";
import createImageSaver from "@lib/services/ImageSaver/createImageSaver";
import cropImage from "@lib/services/imageProcessing/cropImage";
import generatePlaceholder from "@lib/services/imageProcessing/generatePlaceholder";
import updateProfilePic from "@lib/model/users/updateProfilePic";
import createImageDeleter from "@lib/services/ImageDeleter/createImageDeleter";
import { User } from "prisma/prisma-client";

export const picsFolder = "profile-pics";
export const placeholdersFolder = `${picsFolder}/placeholders`;

async function setProfilePic(
  user: User,
  imageBase64: string,
  cropConfig?: CropConfig
): Promise<User> {
  const previousUrl = user.profilePicUrl;

  const croppedImage =
    cropConfig != null ? await cropImage(imageBase64, cropConfig) : imageBase64;
  const placeholder = await generatePlaceholder(croppedImage);

  const croppedImageSaver = createImageSaver(croppedImage);
  const placeholderSaver = createImageSaver(placeholder);

  const fileName = `${
    user.id
  }-${user.firstName.toLowerCase()}-${user.lastName.toLowerCase()}`;

  const profilePicName = await croppedImageSaver.save({
    folder: picsFolder,
    fileName,
  });
  await placeholderSaver.save({
    folder: placeholdersFolder,
    fileName: profilePicName,
    withGeneratedId: false,
    withAutoExtension: false,
  });

  const updatedUser = await updateProfilePic(user, profilePicName);

  if (previousUrl != null) {
    const imageDeleter = createImageDeleter();
    await Promise.all([
      imageDeleter.delete(`${picsFolder}/${previousUrl}`),
      imageDeleter.delete(`${placeholdersFolder}/${previousUrl}`),
    ]);
  }

  return updatedUser;
}

export default setProfilePic;
