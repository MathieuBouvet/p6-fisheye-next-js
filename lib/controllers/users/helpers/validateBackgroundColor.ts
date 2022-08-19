import { NextApiRequest } from "next";

import isDefined from "@lib/validators/isDefined";
import { isStringLike } from "@lib/validators/isString";

import validation from "@utils/validation";

const isColorString = isStringLike(
  str => /#?[0-9a-fA-F]{6}/.test(str),
  "must be a valid color hex"
);

function stripHashtag(str: string | null): string | null {
  if (str == null || str.charAt(0) !== "#") {
    return str;
  }
  return str.slice(1);
}

const validateBackgroundColor = validation(
  (input: any) =>
    stripHashtag(isDefined(isColorString(input))),
  "backgroundColor"
);

export default validateBackgroundColor;
