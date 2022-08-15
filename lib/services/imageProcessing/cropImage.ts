import sharpImageProcessor from "@lib/services/imageProcessing/sharpImageProcessor";
import { CropConfig } from "@lib/controllers/users/helpers/profilePicValidation";

async function cropImage(
  base64Image: string,
  { width, height, x, y }: CropConfig
): Promise<string> {
  return sharpImageProcessor(sharp =>
    sharp.extract({
      width,
      height,
      top: y,
      left: x,
    })
  )(base64Image);
}

export default cropImage;
