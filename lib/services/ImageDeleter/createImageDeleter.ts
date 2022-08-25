import { ImageDeleter } from "@lib/services/ImageDeleter/AbstractImageDeleter";
import FileSystemDeleter from "@lib/services/ImageDeleter/FileSystemDeleter";
import NoopDeleter from "@lib/services/ImageDeleter/NoopDeleter";

function createImageDeleter(): ImageDeleter {
  switch (process.env.NEXT_PUBLIC_MEDIA_STORAGE_STRATEGY) {
    case "imageKit":
      return new NoopDeleter();
    default:
      return new FileSystemDeleter();
  }
}

export default createImageDeleter;
