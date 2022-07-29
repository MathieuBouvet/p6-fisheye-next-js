import validator from "@utils/validator";

const isArrayOf = <T>(checker: (input: T[]) => input is T[], message: string) =>
  validator((input: any) => {
    if ((Array.isArray(input) && checker(input)) || input == null) {
      return [true, input as T[] | null | undefined] as const;
    }
    return [false, null] as const;
  }, message);

const isArray = isArrayOf(
  (input): input is unknown[] => true,
  "must be an array"
);

const isArrayOfNumber = isArrayOf<number>(
  (array): array is number[] => array.every(item => typeof item === "number"),
  "must be an array of number"
);

const isNotEmptyArray = validator(<T>(input: T[] | null | undefined) => {
  if (input == null || input.length > 0) {
    return [true, input] as const;
  }
  return [false, null] as const;
}, "must be an array with at least one element");

export { isArray, isArrayOfNumber, isNotEmptyArray };
