import ImageKit from "imagekit";
import {
  ImageSaver,
  SaveParams,
} from "@lib/services/ImageSaver/AbstractImageSaver";


class ImageKitSaver extends ImageSaver {
  private imageKit: ImageKit;

  constructor(base64: string) {
    super(base64);
    this.imageKit = new ImageKit({
      publicKey: process.env.IMAGE_KIT_PUBLIC_KEY ?? "",
      privateKey: process.env.IMAGE_KIT_PRIVATE_KEY ?? "",
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT ?? "",
    });
  }
  public async save({
    fileName,
    folder,
    withGeneratedId = true,
    withAutoExtension = true,
  }: SaveParams): Promise<string> {
    const preparedFileName = `${fileName}${
      withAutoExtension ? "." + this.extension : ""
    }`;

    const res = await this.imageKit.upload({
      file: this.imageBase64,
      fileName: preparedFileName,
      folder,
      useUniqueFileName: withGeneratedId,
    });

    return res.name;
  }
}

export default ImageKitSaver;
