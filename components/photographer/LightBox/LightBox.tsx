import Image from "next/image";
import { useState } from "react";
import cx from "classnames";

import { PhotographerData } from "@lib/getPhotographerById";

import useDisableBodyScroll from "@hooks/useDisableBodyScroll";

import AnimatedModal, {
  AnimatedProps,
} from "@components/common/AnimatedModal/AnimatedModal";

import styles from "./lightbox.module.scss";

type Media = PhotographerData["media"];

interface Props extends AnimatedProps {
  inititalMedium: number;
  media: Media;
}

const LightBox = ({ media, inititalMedium, ...props }: Props) => {
  useDisableBodyScroll();
  const [mediaOffset, setMediaOffset] = useState(
    media.findIndex(medium => medium.id === inititalMedium) ?? 0
  );

  function incrementOffset() {
    setMediaOffset(currentOffset => (currentOffset + 1) % media.length);
  }
  function decrementOffset() {
    setMediaOffset(currentOffset => {
      if (currentOffset === 0) {
        return media.length - 1;
      }
      return currentOffset - 1;
    });
  }

  const medium = media[mediaOffset];
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
      <div className={styles.lightBox}>
        <div className={styles.rightButtons}>
          <button
            className={cx(styles.closeButton, styles.button)}
            onClick={props.onCloseStarted}
          >
            <i className="fa fa-times"></i>
          </button>
          <button
            className={cx(styles.button, styles.rightButton)}
            onClick={incrementOffset}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
        <button
          className={cx(styles.button, styles.leftButton)}
          onClick={decrementOffset}
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        <figure className={styles.medium}>
          <div
            className={styles.imageWrapper}
            style={{ backgroundColor: `#${medium.dominantColor}` }}
          >
            {medium.type === "VIDEO" ? (
              <video className={styles.video} controls>
                <source src={`/media/${medium.url}`} />
                <p>{medium.altText}</p>
              </video>
            ) : (
              <Image
                src={`/media/${medium.url}`}
                alt={medium.altText ?? ""}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`/media/placeholders/${medium.url}`}
                key={medium.url}
                className={styles.image}
              />
            )}
          </div>
          <figcaption>{medium.title}</figcaption>
        </figure>
      </div>
    </AnimatedModal>
  );
};

export default LightBox;
