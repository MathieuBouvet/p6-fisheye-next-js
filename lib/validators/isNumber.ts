import validator from "@utils/validator";

const isNumberAs = (checkerFn: (input: number) => boolean, message: string) =>
  validator((input: any) => {
    if (typeof input === "number" && checkerFn(input)) {
      return [true, input] as const;
    }
    if (input == null) {
      return [true, input as null | undefined] as const;
    }
    return [false, null] as const;
  }, message);

const isNumber = isNumberAs(() => true, "must be a number");
const isGreaterThanZero = isNumberAs(
  input => input >= 0,
  "must be a number greater than zero"
);

export { isNumber, isGreaterThanZero, isNumberAs };
