import cx from "classnames";
import Image from "next/image";

import styles from "./medium.module.scss";

interface Props {
  title: string;
  url: string;
  altText: string;
  dominantColor: string;
  likes: number;
  type: "VIDEO" | "PICTURE";
  className?: string;
}

const Medium = ({
  title,
  url,
  altText,
  dominantColor,
  likes,
  type,
  className,
}: Props) => {
  return (
    <figure className={cx(styles.medium, className)}>
      <div
        className={styles.wrapper}
        style={{ backgroundColor: `#${dominantColor}` }}
      >
        {type === "PICTURE" ? (
          <Image
            layout="fill"
            src={`/media/${url}`}
            alt={altText}
            objectFit="cover"
            sizes="(max-width: 584px) 100vw, (max-width: 1124px) 50vw, 33vw"
          />
        ) : (
          <>
            <video className={styles.video}>
              <source src={`/media/${url}`} />
              <p>{altText}</p>
            </video>
            <div className={styles.videoIconWrapper}>
              <i className="far fa-file-video"></i>
            </div>
          </>
        )}
      </div>
      <figcaption className={styles.caption}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.likes}>{likes}</p>
        <button className={styles.likeButton}>
          <i className="far fa-heart"></i>
        </button>
      </figcaption>
    </figure>
  );
};

export default Medium;
