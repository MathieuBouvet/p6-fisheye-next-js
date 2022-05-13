import cx from "classnames";
import Image from "next/image";

import styles from "./profilePic.module.scss";

interface Props {
  size: number;
  dominantColor: string | null;
  url: string | null;
  className?: string;
  imageClassName?: string;
}

const ProfilePic = ({
  size,
  dominantColor,
  url,
  imageClassName,
  className,
}: Props) => {
  return (
    <div
      className={cx(styles.imageWrapper, className)}
      style={{ backgroundColor: `#${dominantColor}`, maxWidth: size }}
    >
      <Image
        src={`/profile-pics/${url}`}
        alt=""
        className={imageClassName}
        layout="intrinsic"
        width={size}
        height={size}
        objectFit="cover"
        placeholder="blur"
        blurDataURL={`/profile-pics/placeholders/${url}`}
      />
    </div>
  );
};

export default ProfilePic;
