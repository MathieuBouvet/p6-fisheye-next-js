import Link from "next/link";
import Image from "next/image";
import cx from "classnames";

import { PhotographerProfile } from "@lib/getPhotographers";
import TagLink from "@components/common/TagLink";

import styles from "./photographer.module.scss";

interface Props {
  photographer: PhotographerProfile;
  isVisible?: boolean;
}

const Photographer = ({
  photographer: {
    id,
    profilePicUrl,
    firstName,
    lastName,
    city,
    country,
    tagLine,
    price,
    profilePicDominantColor,
    tags,
  },
  isVisible = true,
}: Props) => {
  return (
    <section
      className={cx(styles.photographer, { [styles.hidden]: !isVisible })}
    >
      <Link href={`/photographer/${id}`}>
        <a className={styles.photographerLink}>
          <figure>
            <div
              className={styles.imageWrapper}
              style={{ backgroundColor: `#${profilePicDominantColor}` }}
            >
              <Image
                src={`/profile-pics/${profilePicUrl}`}
                alt=""
                className={styles.profilePic}
                layout="intrinsic"
                width={350}
                height={350}
                objectFit="cover"
                placeholder="blur"
                blurDataURL={`/profile-pics/placeholders/${profilePicUrl}`}
              />
            </div>
            <figcaption>
              <h2 className={styles.title}>
                {firstName} {lastName}
              </h2>
            </figcaption>
          </figure>
        </a>
      </Link>
      <p className={styles.location}>
        {city}, {country}
      </p>
      <p>{tagLine}</p>
      {price != null && <p className={styles.price}>{price}€/jour</p>}
      <div className={styles.tags}>
        {tags.map(tag => (
          <TagLink key={tag}>{tag}</TagLink>
        ))}
      </div>
    </section>
  );
};

export default Photographer;
