import { base64ImagePrefixRegex } from "@lib/validators/hasSupportedBase64ImageExtension";
const base64VideoPrefixRegex = /^data:video\/(mp4)\;base64,/;

export type SaveParams = {
  folder: string;
  fileName: string;
  withGeneratedId?: boolean;
  withAutoExtension?: boolean;
};

export abstract class ImageSaver {
  protected imageBase64: string;
  protected extension: string;
  protected prefixedBase64: string;

  constructor(base64: string) {
    const extension = (base64.match(base64ImagePrefixRegex) ||
      base64.match(base64VideoPrefixRegex))?.[1];
    const imageBase64 = base64.split(",")[1];
    if (extension == null || imageBase64 == null) {
      throw new Error("Invalid base64 sent to file saver");
    }

    this.extension = extension;
    this.imageBase64 = imageBase64;
    this.prefixedBase64 = base64;
  }

  public abstract save(params: SaveParams): Promise<string>;
}
