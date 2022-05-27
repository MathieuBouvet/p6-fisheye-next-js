import cx from "classnames";

import Portal from "../Portal";
import styles from "./progressBar.module.scss";

interface Props {
  max: number;
  value: number;
}

const ProgressBar = ({ max, value }: Props) => {
  const progress = (value / max) * 100;
  return (
    <Portal>
      <div
        className={cx(styles.progressBar, { [styles.fadeOut]: value >= max })}
      >
        <div
          className={styles.progressIndicator}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </Portal>
  );
};

export default ProgressBar;
