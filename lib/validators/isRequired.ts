import validator from "@utils/validator";

const isRequired = validator(<T>(input: T | null | undefined) => {
  if (input == null) {
    return [false, null] as const;
  }
  return [true, input] as const;
}, "must not be null nor undefined");

export default isRequired;
