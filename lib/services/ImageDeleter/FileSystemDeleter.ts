import { promises as fs } from "fs";
import { existsSync } from "fs";
import { ImageDeleter } from "@lib/services/ImageDeleter/AbstractImageDeleter";

class FileSystemDeleter extends ImageDeleter {
  public async delete(path: string): Promise<void> {
    const fullPath = `public/${path}`;
    if (existsSync(fullPath)) {
      await fs.unlink(fullPath);
    }
  }
}

export default FileSystemDeleter;
