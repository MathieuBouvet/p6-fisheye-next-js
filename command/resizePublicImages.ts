import fs from "fs/promises";
import { unlinkSync } from "fs";
import sharp, { FitEnum } from "sharp";

type FitMode = FitEnum[keyof FitEnum];

const basePath = "public";

const supportedExtensions = ["png", "jpg", "jpeg"];

const fitModes: FitMode[] = ["contain", "cover", "fill", "inside", "outside"];

function checkFit(str: string): asserts str is FitMode {
  if (!(fitModes as string[]).includes(str)) {
    throw new Error("invalid fit mode");
  }
}

async function resizePublicImages() {
  const args = process.argv.slice(2);
  const directory = args[0];

  const width = Number(args[1]);
  const heightStr = args[2];
  const height = heightStr != null ? Number(heightStr) : width;

  const fit = args[3] ?? "cover";
  checkFit(fit);

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

  await Promise.all(
    images.map(image => {
      return sharp(`${path}/${image}`)
        .resize(width, height, {
          fit,
        })
        .toFile(`${path}/temp-${image}`);
    })
  );

  images.forEach(image => unlinkSync(`${path}/${image}`));

  await Promise.all(
    images.map(image => fs.rename(`${path}/temp-${image}`, `${path}/${image}`))
  );
}

resizePublicImages();
