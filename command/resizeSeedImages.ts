import fs from "fs/promises";
import { unlinkSync } from "fs";
import sharp, { FitEnum } from "sharp";

type FitMode = FitEnum[keyof FitEnum];

const basePath = "seedFiles";

const supportedExtensions = ["png", "jpg", "jpeg"];

const fitModes: FitMode[] = ["contain", "cover", "fill", "inside", "outside"];

function checkFit(str: string): asserts str is FitMode {
  if (!(fitModes as string[]).includes(str)) {
    throw new Error("invalid fit mode");
  }
}

async function resizeSeedImages() {
  const args = process.argv.slice(2);
  const directory = args[0];

  const width = Number(args[1]);
  
  const fit = args[2] ?? "cover";
  checkFit(fit);

  const heightStr = args[3];
  const height = heightStr != null ? Number(heightStr) : null;

  if (directory == null) {
    throw new Error("directory argument required");
  }
  if (width == null) {
    throw new Error("width argument required");
  }

  const path = `${basePath}/${directory}`;

  const images = (await fs.readdir(path)).filter(file => {
    const parts = file.split(".");
    return supportedExtensions.includes(parts[parts.length - 1]);
  });

  if (images.length === 0) {
    console.log(`No images found in ${path}, nothing to do`);
    return;
  }

  console.log(`Resizing ${images.length}...`);

  await Promise.all(
    images.map(image => {
      return sharp(`${path}/${image}`)
        .resize(width, height, {
          fit,
        })
        .toFile(`${path}/temp-${image}`)
        .then();
    })
  );

  images.forEach(image => unlinkSync(`${path}/${image}`));

  await Promise.all(
    images.map(image =>
      fs.rename(`${path}/temp-${image}`, `${path}/${image}`).then(() => {
        console.log(`Done resizing ${image}`);
      })
    )
  );
}

resizeSeedImages();
