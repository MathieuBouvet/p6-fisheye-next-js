import isRequired from "@lib/validators/isRequired";
import { isString } from "@lib/validators/isString";

const isRequiredString = (input: any) => isRequired(isString(input));

export default isRequiredString;
