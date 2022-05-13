import Image from "next/image";

import styles from "./profilePic.module.scss";

interface Props {
  size: number;
  dominantColor: string | null;
  url: string | null;
  imageClassName?: string;
}

const ProfilePic = ({ size, dominantColor, url, imageClassName }: Props) => {
  return (
    <div
      className={styles.imageWrapper}
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
