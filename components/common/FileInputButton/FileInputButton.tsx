import cx from "classnames";

import styles from "./fileInputButton.module.scss";

interface Props {
  className?: string;
  children?: React.ReactNode;
  accept?: string;
  onChange?: (file: File | null) => void;
}

const FileInputButton = ({
  children = "Choisir un fichier",
  className,
  accept = "",
  onChange,
}: Props) => {
  function isExtensionValid(file: File): boolean {
    const extension = file.name.split(".")[1];
    if (accept.length === 0) {
      return true;
    }
    return accept.includes(`.${extension}`);
  }
  return (
    <label className={cx(className, "button-primary", styles.fileInputButton)}>
      <input
        type="file"
        className="sr-only"
        accept={accept}
        onChange={e => {
          if (onChange == null) {
            return;
          }
          const file = e.target.files?.[0] ?? null;
          if (file != null && isExtensionValid(file)) {
            onChange(file);
          }
        }}
      />
      {children}
    </label>
  );
};

export default FileInputButton;
