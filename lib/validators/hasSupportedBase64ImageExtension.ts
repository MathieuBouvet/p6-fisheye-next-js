import validator from "@utils/validator";

export const base64ImagePrefixRegex = /^data:image\/(png|jpeg)\;base64,/;

const hasSupportedBase64ImageExtension = validator((input: string) => {
  if (base64ImagePrefixRegex.test(input)) {
    return [true, input] as const;
  }
  return [false, null] as const;
}, "must contain the base64 prefix for an image with a supported type (image/png, or image/jpeg)");

export default hasSupportedBase64ImageExtension;
