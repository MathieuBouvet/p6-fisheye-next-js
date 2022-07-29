import { useField } from "formik";

import Tag from "@components/common/Tag";

import styles from "./formikTagInput.module.scss";

interface Props {
  value: string;
  children: string;
}

const FormikTagInput = ({ value, children }: Props) => {
  const [field] = useField({
    name: "tags",
    type: "checkbox",
    multiple: true,
    value,
  });
  return (
    <label className={styles.tagInput}>
      <input {...field} type="checkbox" className="sr-only" />
      <Tag isActive={field.checked} className={styles.tag}>
        {children}
      </Tag>
    </label>
  );
};

export default FormikTagInput;
