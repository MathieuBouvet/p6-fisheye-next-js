import { promises as fs } from "fs";
import crypto from "crypto";

import {
  ImageSaver,
  SaveParams,
} from "@lib/services/ImageSaver/AbstractImageSaver";

class FileSystemSaver extends ImageSaver {
  public async save({
    folder,
    fileName,
    withGeneratedId = true,
    withAutoExtension = true,
  }: SaveParams) {
    const path = `public/${folder}`;

    await fs.mkdir(path, { recursive: true });

    const generatedName = `${fileName}${
      withGeneratedId ? "-" + crypto.randomUUID() : ""
    }${withAutoExtension ? "." + this.extension : ""}`;

    await fs
      .writeFile(`${path}/${generatedName}`, this.imageBase64, "base64")
      .catch(err => {
        console.log("error is here");
        return Promise.reject(err);
      });
    return generatedName;
  }
}

export default FileSystemSaver;
