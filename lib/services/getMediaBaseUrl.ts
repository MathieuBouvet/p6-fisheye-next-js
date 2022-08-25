function getMediaBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_MEDIA_STORAGE_STRATEGY === "imageKit") {
    return process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT ?? "";
  }
  return "";
}

export default getMediaBaseUrl;
