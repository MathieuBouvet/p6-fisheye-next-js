import ValidationError from "./ValidationError";
import HttpError from "./HttpError";

function validation<Input, Output>(
  validator: (input: Input) => Output,
  fieldName: string
) {
  return (input: Input): Output => {
    try {
      return validator(input);
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new HttpError(400, `${fieldName} ${err.reason}`);
      }
      throw err;
    }
  };
}

export default validation;
