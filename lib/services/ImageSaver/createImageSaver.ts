import { ImageSaver } from "@lib/services/ImageSaver/AbstractImageSaver";
import FileSystemSaver from "@lib/services/ImageSaver/FileSystemSaver";

function createImageSaver(base64Image: string): ImageSaver {
  switch (process.env.NODE_ENV) {
    default:
      return new FileSystemSaver(base64Image);
  }
}

export default createImageSaver;
