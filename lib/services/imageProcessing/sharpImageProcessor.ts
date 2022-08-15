import sharp, { Sharp } from "sharp";

function sharpImageProcessor(processFunction: (sharp: Sharp) => Sharp) {
  return async (base64Image: string): Promise<string> => {
    const [prefix, unprefixedBase64] = base64Image.split(",");

    const sharpInstance = sharp(Buffer.from(unprefixedBase64, "base64"));

    const buffer = await processFunction(sharpInstance).toBuffer();

    return `${prefix},${buffer.toString("base64")}`;
  };
}

export default sharpImageProcessor;
