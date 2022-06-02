import validator from "@utils/validator";

const toInteger = validator((input: string) => {
  const parsed = parseInt(input);
  if (isNaN(parsed)) {
    return [false, null] as const;
  }
  return [true, parsed] as const;
}, "must be parsable as an integer");

export default toInteger;
