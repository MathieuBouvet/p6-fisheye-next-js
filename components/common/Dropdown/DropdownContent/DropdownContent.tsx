import cx from "classnames";

import useClickOutside from "@hooks/useClickOutside";

import styles from "./dropdownContent.module.scss";

interface Props {
  isVanishing: boolean;
  onClickOutside: () => void;
  onVanished: () => void;
  alignment: "left" | "right";
  children: React.ReactNode;
}

const DropdownContent = ({
  isVanishing,
  onClickOutside,
  onVanished,
  alignment,
  children,
}: Props) => {
  const ref = useClickOutside(onClickOutside);
  return (
    <div
      className={cx(styles.content, styles[alignment], {
        [styles.vanishing]: isVanishing,
      })}
      onAnimationEnd={e => {
        isVanishing && onVanished();
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default DropdownContent;
