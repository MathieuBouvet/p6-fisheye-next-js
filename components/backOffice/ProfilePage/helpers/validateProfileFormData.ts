import { ProfileFormData } from "@components/backOffice/ProfilePage/helpers/getProfileFormData";

type ValidationErrors = { [key in keyof ProfileFormData]?: string };

function checker(check: (value: string) => boolean, errorMessage: string) {
  return <T extends string>(...names: T[]) => {
    return (values: Record<T, string>) => {
      return names.reduce((errors, name) => {
        if (check(values[name])) {
          errors[name] = errorMessage;
        }
        return errors;
      }, {} as { [key in T]?: string });
    };
  };
}

const requiredValuesChecker = checker(
  value => value === "" || value == null,
  "requis"
);

const lengthChecker = (length: number) =>
  checker(
    value => value.length >= length,
    `ne doit pas dépasser ${length} caractères`
  );

const regExpChecker = (regExp: RegExp, message?: string) =>
  checker(value => !regExp.test(value), message ?? "non valide");

const emailChecker = regExpChecker(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

const numberChecker = checker(
  value => isNaN(Number(value)),
  "doit être un nombre"
);

const checkRequiredValues = requiredValuesChecker(
  "email",
  "firstName",
  "lastName",
  "city",
  "country"
);
const checkLength100 = lengthChecker(100)("firstName", "lastName");
const checkLength255 = lengthChecker(255)("email", "tagLine");
const checkEmail = emailChecker("email");
const checkPrice = numberChecker("price");

function validateProfileFormData(values: ProfileFormData): ValidationErrors {
  return {
    ...checkLength100(values),
    ...checkLength255(values),
    ...checkEmail(values),
    ...checkRequiredValues(values),
    ...checkPrice(values),
  };
}

export default validateProfileFormData;
