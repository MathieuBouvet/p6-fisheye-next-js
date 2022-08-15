import { NextApiRequest } from "next";

import isDefined from "@lib/validators/isDefined";
import isRequired from "@lib/validators/isRequired";
import { isGreaterThanZero } from "@lib/validators/isNumber";
import isRequiredString from "@lib/validators/isReqquiredString";
import hasSupportedBase64ImageExtension from "@lib/validators/hasSupportedBase64ImageExtension";

import validation from "@utils/validation";

export type CropConfig = {
  width: number;
  height: number;
  x: number;
  y: number;
};
export type ProfilePicData = {
  imageBase64: string;
  cropConfig: CropConfig;
};

const isRequiredAndGreaterThanZero = (input: any) =>
  isRequired(isGreaterThanZero(input));

const validateProfilePicRoot = validation(
  (input: any) => isDefined(input),
  "profilePic"
);
const validateCropConfig = validation(
  (input: any) => isRequired(input),
  "profilePic.cropConfig"
);
const validateImageBase64 = validation(
  (input: any) => hasSupportedBase64ImageExtension(isRequiredString(input)),
  "profilePic.imageBase64"
);

const validateProfilePicData = (
  body: NextApiRequest["body"]
): ProfilePicData | null => {
  const profilePic = validateProfilePicRoot(body.profilePic);
  if (profilePic === null) {
    return null;
  }
  const imageBase64 = validateImageBase64(profilePic.imageBase64);
  const cropConfig = validateCropConfig(profilePic.cropConfig);

  const width = validation(
    isRequiredAndGreaterThanZero,
    "profilePic.cropConfig.width"
  )(cropConfig.width);
  const height = validation(
    isRequiredAndGreaterThanZero,
    "profilePic.cropConfig.height"
  )(cropConfig.height);
  const x = validation(
    isRequiredAndGreaterThanZero,
    "profilePic.cropConfig.x"
  )(cropConfig.x);
  const y = validation(
    isRequiredAndGreaterThanZero,
    "profilePic.cropConfig.y"
  )(cropConfig.y);

  return {
    imageBase64,
    cropConfig: {
      width,
      height,
      x,
      y,
    },
  };
};

export default validateProfilePicData;
