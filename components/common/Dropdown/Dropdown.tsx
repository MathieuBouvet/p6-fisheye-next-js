import cx from "classnames";

import usePresence from "@hooks/usePresence";

import DropdownContent from "@components/common/Dropdown/DropdownContent";

import styles from "./dropdown.module.scss";

interface Props {
  triggerContent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  alignment?: "left" | "right";
}

const Dropdown = ({
  className,
  alignment = "left",
  triggerContent,
  children,
}: Props) => {
  const dropdown = usePresence();

  return (
    <div className={cx(styles.dropdown, className)}>
      <button
        className={styles.trigger}
        onClick={e => {
          !dropdown.isVisible && e.stopPropagation();
          dropdown.setPresent();
        }}
      >
        {triggerContent}
      </button>
      {dropdown.isVisible && (
        <DropdownContent
          isVanishing={dropdown.isVanishing}
          onVanished={dropdown.setAbsent}
          alignment={alignment}
          onClickOutside={() => {
            dropdown.setVanishing();
          }}
        >
          {children}
        </DropdownContent>
      )}
    </div>
  );
};

export default Dropdown;
