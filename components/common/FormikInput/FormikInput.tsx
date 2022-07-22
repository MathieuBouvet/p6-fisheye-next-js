import cx from "classnames";
import { useField } from "formik";

import styles from "./formikInput.module.scss";

type Props = {
  as?: "input" | "textarea";
  name: string;
  children?: string;
  className?: string;
  inputClassName?: string;
  errorClassName?: string;
  type?: string;
};

const FormikInput = ({
  name,
  children,
  className,
  errorClassName = "",
  as,
  type = "text",
}: Props) => {
  const [field, meta] = useField(name);

  return (
    <label
      className={cx(styles.formikInput, className, {
        [styles.hasError]: meta.error != null,
        [errorClassName]: meta.error != null,
      })}
    >
      {children} {meta.touched && meta.error != null && " - " + meta.error}
      {as === "textarea" ? (
        <textarea {...field} className={cx(styles.input)} />
      ) : (
        <input {...field} className={cx(styles.input)} type={type} />
      )}
    </label>
  );
};

export default FormikInput;
