import Image, { ImageProps, ImageLoader } from "next/image";

type Props = Exclude<ImageProps, "loader">;

const imageKitLoader: ImageLoader = ({ src, width, quality }) => {
  if (src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(",");
  let urlEndpoint = process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT ?? "";
  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

const CustomLoaderImage = (props: Props) => {
  const customLoader =
    process.env.NEXT_PUBLIC_MEDIA_STORAGE_STRATEGY === "imageKit"
      ? imageKitLoader
      : undefined;
  return <Image {...props} alt={props.alt} loader={customLoader} />;
};

export default CustomLoaderImage;
