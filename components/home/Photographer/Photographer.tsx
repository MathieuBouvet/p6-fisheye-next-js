import Link from "next/link";
import cx from "classnames";

import { PhotographerProfile } from "@lib/getPhotographers";
import TagLink from "@components/common/TagLink";
import ProfilePic from "@components/common/ProfilePic";

import styles from "./photographer.module.scss";

interface Props {
  photographer: PhotographerProfile;
  className?: string;
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
  className,
}: Props) => {
  return (
    <section className={cx(styles.photographer, className)}>
      <Link href={`/photographer/${id}`}>
        <a className={styles.photographerLink}>
          <figure>
            <ProfilePic
              size={350}
              dominantColor={profilePicDominantColor}
              url={profilePicUrl}
              imageClassName={styles.profilePic}
            />
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
