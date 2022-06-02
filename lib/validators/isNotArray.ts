import validator from "@utils/validator";

const isNotArray = validator(<T>(input: T | T[]) => {
  if (Array.isArray(input)) {
    return [false, null] as const;
  }
  return [true, input] as const;
}, "must not be an array");

export default isNotArray;
