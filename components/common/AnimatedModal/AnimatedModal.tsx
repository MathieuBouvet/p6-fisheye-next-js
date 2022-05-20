import cx from "classnames";
import { ReactNode } from "react";
import Portal from "@components/common/Portal";

import useClickOutside from "@hooks/useClickOutside";
import useOnEscape from "@hooks/useOnEscape";

import styles from "./animatedModal.module.scss";

export interface AnimatedProps {
  isClosing: boolean;
  onCloseStarted: () => void;
  onCloseFinished: () => void;
}

interface Props extends AnimatedProps {
  children: ReactNode;
  className?: string;
  animationClassNames?: {
    overlayEntering?: string;
    overlayClosing?: string;
    contentEntering?: string;
    contentClosing?: string;
  };
}

const AnimatedModal = ({
  children,
  isClosing,
  onCloseStarted,
  onCloseFinished,
  className,
  animationClassNames = {},
}: Props) => {
  useOnEscape(onCloseStarted);
  const contentRef = useClickOutside(onCloseStarted);

  const {
    overlayEntering = styles.entering,
    overlayClosing = styles.closing,
    contentEntering = "",
    contentClosing = "",
  } = animationClassNames;

  return (
    <Portal>
      <div
        className={cx(styles.modalOverlay, className, {
          [overlayEntering]: !isClosing,
          [overlayClosing]: isClosing,
        })}
        onAnimationEnd={() => {
          if (isClosing) {
            onCloseFinished();
          }
        }}
      >
        <div
          ref={contentRef}
          className={cx(styles.modalContent, {
            [contentEntering]: !isClosing,
            [contentClosing]: isClosing,
          })}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default AnimatedModal;
