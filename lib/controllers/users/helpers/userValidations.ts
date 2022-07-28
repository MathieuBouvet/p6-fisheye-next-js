import { NextApiRequest } from "next";
import { NextQueryField } from "@utils/typeUtils";

import validation from "@utils/validation";
import isRequired from "@lib/validators/isRequired";
import isNotArray from "@lib/validators/isNotArray";
import toInteger from "@lib/validators/toInteger";
import { isString, isEmail } from "@lib/validators/isString";
import isDefined from "@lib/validators/isDefined";
import { isGreaterThanZero } from "@lib/validators/isNumber";

export type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  photographer?: {
    country: string;
    city: string;
    tagLine: string | null;
    price: number | null;
  };
};

const validateUserId = validation(
  (field: NextQueryField) => toInteger(isNotArray(isRequired(field))),
  "userId in query"
);

const isRequiredString = (input: any) => isRequired(isString(input));
const isRequiredEmail = (input: any) => isRequired(isEmail(input));
const isDefinedString = (input: any) => isDefined(isString(input));
const isDefinedAndGreaterThanZero = (input: any) =>
  isDefined(isGreaterThanZero(input));

const validateUserData = (body: NextApiRequest["body"]): UserData => {
  const userData = {
    email: validation(isRequiredEmail, "email")(body.email),
    firstName: validation(isRequiredString, "firstName")(body.firstName),
    lastName: validation(isRequiredString, "lastName")(body.lastName),
  };

  if (body.photographer == null) {
    return userData;
  }

  return {
    ...userData,
    photographer: {
      country: validation(
        isRequiredString,
        "photographer country"
      )(body.photographer?.country),

      city: validation(
        isRequiredString,
        "photographer city"
      )(body.photographer?.city),

      tagLine: validation(
        isDefinedString,
        "tagLine"
      )(body.photographer?.tagLine),

      price: validation(
        isDefinedAndGreaterThanZero,
        "price"
      )(body?.photographer?.price),
    },
  };
};

export { validateUserId, validateUserData };
