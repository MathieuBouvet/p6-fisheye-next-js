import { ImageDeleter } from "@lib/services/ImageDeleter/AbstractImageDeleter";

class NoopDeleter extends ImageDeleter {
  public delete(path: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}

export default NoopDeleter;
