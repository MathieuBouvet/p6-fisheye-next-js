import cx from "classnames";
import Image from "next/image";

import styles from "./picture.module.scss";

interface Props {
  title: string;
  url: string;
  altText: string;
  dominantColor: string;
  likes: number;
  className?: string;
}

const Picture = ({
  title,
  url,
  altText,
  dominantColor,
  likes,
  className,
}: Props) => {
  return (
    <figure className={cx(styles.picture, className)}>
      <div
        className={styles.wrapper}
        style={{ backgroundColor: `#${dominantColor}` }}
      >
        <Image
          layout="fill"
          src={`/media/${url}`}
          alt={altText}
          objectFit="cover"
          sizes="(max-width: 584px) 100vw, (max-width: 1124px) 50vw, 33vw"
        />
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

export default Picture;
