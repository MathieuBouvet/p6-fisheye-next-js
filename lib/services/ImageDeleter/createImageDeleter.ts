import { ImageDeleter } from "@lib/services/ImageDeleter/AbstractImageDeleter";
import FileSystemDeleter from "@lib/services/ImageDeleter/FileSystemDeleter";

function createImageDeleter(): ImageDeleter {
  switch (process.env.NODE_ENV) {
    default:
      return new FileSystemDeleter();
  }
}

export default createImageDeleter;
