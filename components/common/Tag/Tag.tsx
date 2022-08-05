import cx from "classnames";

import styles from "./tag.module.scss";

interface Props {
  isActive?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Tag = ({ isActive = false, children, className }: Props) => {
  return (
    <div className={cx(styles.tag, className, { [styles.active]: isActive })}>
      #<span className={styles.tagName}>{children}</span>
    </div>
  );
};

export default Tag;
