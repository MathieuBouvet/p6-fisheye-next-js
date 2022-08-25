import cx from "classnames";
import { useRef, useState, useEffect } from "react";
import CustomLoaderImage from "@components/common/CustomLoaderImage";
import getMediaBaseUrl from "@lib/services/getMediaBaseUrl";

import needsWhiteTextToContrast from "@utils/needsWhiteTextToContrast";

import styles from "./profilePic.module.scss";

interface Props {
  size: number;
  dominantColor: string | null;
  url: string | null;
  className?: string;
  imageClassName?: string;
  initialsClassName?: string;
  initials: string;
}

const ProfilePic = ({
  size,
  dominantColor,
  url,
  imageClassName,
  initialsClassName,
  className,
  initials,
}: Props) => {
  const dominantColorHex = `#${dominantColor ?? "ffffff"}`;

  const [, setWindowWidth] = useState(0);

  const initialsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialsRef.current != null) {
      const width = initialsRef.current.getBoundingClientRect().width;
      initialsRef.current.style.fontSize = `${width * 0.5 - 5}px`;
    }
  });

  useEffect(() => {
    function onResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className={cx(styles.imageWrapper, className)}
      style={{
        backgroundColor: url == null ? dominantColorHex : "#ffffff",
        width: size,
      }}
    >
      {url != null ? (
        <CustomLoaderImage
          src={`/profile-pics/${url}`}
          alt=""
          className={imageClassName}
          layout="intrinsic"
          width={size}
          height={size}
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`${getMediaBaseUrl()}/profile-pics/placeholders/${url}`}
        />
      ) : (
        <div
          className={cx(styles.initials, initialsClassName, {
            [styles.whiteText]: needsWhiteTextToContrast(dominantColorHex),
          })}
          ref={initialsRef}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

export default ProfilePic;
