import cx from "classnames";

import styles from "./tag.module.scss";

interface Props {
  isActive?: boolean;
  children: string;
}

const Tag = ({ isActive = false, children }: Props) => {
  return (
    <div className={cx(styles.tag, { [styles.active]: isActive })}>
      #<span className={styles.tagName}>{children}</span>
    </div>
  );
};

export default Tag;
