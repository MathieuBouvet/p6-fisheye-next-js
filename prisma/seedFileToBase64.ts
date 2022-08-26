import fs from "fs/promises";
import path from "path";

const seedFilesBasePath = "seedFiles";

function getMimeTypefromExt(ext: string) {
  if (ext === "mp4") {
    return "video/mp4";
  }
  if (ext === "jpg") {
    ext = "jpeg";
  }
  return `image/${ext}`;
}

async function seedFileToBase64(relativePath: string): Promise<string> {
  const filePath = `${seedFilesBasePath}/${relativePath}`;
  return fs
    .readFile(filePath, "base64")
    .then(image => {
      let imageExt = path.extname(filePath).slice(1);
      if (imageExt === "jpg") {
        imageExt = "jpeg";
      }
      return `data:${getMimeTypefromExt(imageExt)};base64,${image}`;
    })
    .catch(() => {
      return Promise.reject(`error reading file at ${filePath}`);
    });
}

export default seedFileToBase64;
