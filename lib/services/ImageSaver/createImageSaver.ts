import { ImageSaver } from "@lib/services/ImageSaver/AbstractImageSaver";
import ImageKitSaver from "@lib/services/ImageSaver/ImageKitSaver";
import FileSystemSaver from "@lib/services/ImageSaver/FileSystemSaver";

function createImageSaver(base64Image: string): ImageSaver {
  switch (process.env.NEXT_PUBLIC_MEDIA_STORAGE_STRATEGY) {
    case "imageKit":
      return new ImageKitSaver(base64Image);
    default:
      return new FileSystemSaver(base64Image);
  }
}

export default createImageSaver;
