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
  onLoadingComplete: () => void;
  className?: string;
  onMediaClick: () => void;
  likeStatus: "liked" | "not-liked" | "loading";
  onLikeClick: () => void;
}

const Medium = ({
  title,
  url,
  altText,
  dominantColor,
  likes,
  type,
  onLoadingComplete,
  className,
  onMediaClick,
  likeStatus,
  onLikeClick,
}: Props) => {
  const isLiked = likeStatus === "liked";
  const isLikeLoading = likeStatus === "loading";

  const effectiveLikes = likes + Number(isLiked)
  return (
    <figure className={cx(styles.medium, className)}>
      <a onClick={onMediaClick} className={styles.mediumLink}>
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
              onLoadingComplete={onLoadingComplete}
              placeholder="blur"
              blurDataURL={`/media/placeholders/${url}`}
            />
          ) : (
            <>
              <video
                ref={ref => {
                  if (ref != null && ref.readyState >= 2) {
                    onLoadingComplete();
                  }
                }}
                className={styles.video}
                onLoadedData={onLoadingComplete}
              >
                <source src={`/media/${url}`} />
                <p>{altText}</p>
              </video>
              <div className={styles.videoIconWrapper}>
                <i className="far fa-file-video"></i>
              </div>
            </>
          )}
        </div>
      </a>
      <figcaption className={styles.caption}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.likes}>{effectiveLikes}</p>
        <button
          className={cx(styles.likeButton, {
            [styles.isLoading]: isLikeLoading,
          })}
          onClick={onLikeClick}
          title={isLikeLoading ? "Chargement du like" : ""}
        >
          <i className={`${isLiked ? "fas" : "far"} fa-heart`}></i>
        </button>
      </figcaption>
    </figure>
  );
};

export default Medium;
