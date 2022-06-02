import ValidationError from "./ValidationError";

type ValidationReturn<T> =
  | readonly [isValid: true, value: T, message?: string]
  | readonly [isValid: false, value: null];

function validator<Input, Output>(
  validationFn: (input: Input) => ValidationReturn<Output>,
  failReason: string
) {
  return (input: Input) => {
    const [isValid, value] = validationFn(input);
    if (!isValid) {
      throw new ValidationError(failReason);
    }
    return value;
  };
}

export default validator;
