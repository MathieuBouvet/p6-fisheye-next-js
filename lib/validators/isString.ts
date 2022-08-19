import validator from "@utils/validator";

const isStringLike = (checker: (input: string) => boolean, message: string) =>
  validator((input: any) => {
    if (input == null || (typeof input === "string" && checker(input))) {
      return [true, input as string | null | undefined] as const;
    }
    return [false, null] as const;
  }, message);

const isString = isStringLike(() => true, "must be a string");
const isNotEmpty = isStringLike(
  input => input !== "",
  "must be a non empty string"
);
const isEmail = isStringLike(
  input => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input),
  "must be a valid email"
);

export { isString, isNotEmpty, isEmail, isStringLike };
