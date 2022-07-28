import validator from "@utils/validator";

const isStringAs = (checker: (input: string) => boolean, message: string) =>
  validator((input: any) => {
    if ((typeof input === "string" && checker(input)) || input == null) {
      return [true, input as string | null | undefined] as const;
    }
    return [false, null] as const;
  }, message);

const isString = isStringAs(() => true, "must be a string");
const isNotEmpty = isStringAs(
  input => input !== "",
  "must be a non empty string"
);
const isEmail = isStringAs(
  input => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input),
  "must be a valid email"
);

export { isString, isNotEmpty, isEmail, isStringAs };
