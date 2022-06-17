import cx from "classnames";
import AnimatedModal, {
  AnimatedProps,
} from "@components/common/AnimatedModal/AnimatedModal";

import useDisableBodyScroll from "@hooks/useDisableBodyScroll";

import styles from "./contactModal.module.scss";

interface Props extends AnimatedProps {
  photographerName: string;
}

const ContactModal = ({ photographerName, ...props }: Props) => {
  useDisableBodyScroll();

  return (
    <AnimatedModal
      {...props}
      className={styles.overlay}
      animationClassNames={{
        overlayEntering: styles.overlayEntering,
        overlayClosing: styles.overlayClosing,
        contentEntering: styles.contentEntering,
        contentClosing: styles.contentClosing,
      }}
    >
      <section className={styles.contactModal} tabIndex={0}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            Contactez-moi{" "}
            <span className={styles.name}>{photographerName}</span>
          </h2>
          <button className={styles.closeButton} onClick={props.onCloseStarted}>
            <i className="fa fa-times"></i>
          </button>
        </header>
        <main className={styles.formContainer}>
          <form className={styles.contactForm}>
            <label>
              Prénom
              <input />
            </label>
            <label>
              Nom
              <input />
            </label>
            <label>
              Email
              <input />
            </label>
            <label className={styles.messageInputGroup}>
              Votre message
              <textarea />
            </label>
            <button className={cx("button-primary", styles.submitButton)}>
              Envoyer
            </button>
          </form>
        </main>
      </section>
    </AnimatedModal>
  );
};

export default ContactModal;
