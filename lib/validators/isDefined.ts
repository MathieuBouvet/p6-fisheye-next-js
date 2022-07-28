import validator from "@utils/validator";

const isDefined = validator(<T>(input: T | null | undefined) => {
  if (input === undefined) {
    return [false, null] as const;
  }
  return [true, input] as const;
}, "must not be undefined");

export default isDefined;