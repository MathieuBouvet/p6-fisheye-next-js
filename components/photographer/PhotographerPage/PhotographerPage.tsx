import cx from "classnames";

import { useRouter } from "next/router";

import { PhotographerData } from "@lib/getPhotographerById";

import Header from "@components/photographer/Header";
import ProfilePic from "@components/common/ProfilePic";
import TagLink from "@components/common/TagLink";
import Picture from "@components/common/Picture";

import styles from "./photographerPage.module.scss";

interface Props {
  photographer: PhotographerData;
  tags: string[];
}

const PhotographerPage = ({
  photographer: {
    id,
    lastName,
    firstName,
    city,
    country,
    tagLine,
    profilePicDominantColor,
    profilePicUrl,
    media,
  },
  tags,
}: Props) => {
  const router = useRouter();
  const tagQueried = router.query.tag?.toString();

  return (
    <div className="app">
      <Header />
      <main>
        <section className={styles.photographerCard}>
          <div className={styles.infos}>
            <h1 className={styles.title}>
              {firstName} {lastName}
            </h1>
            <p className={styles.location}>
              {city}, {country}
            </p>
            <p className={styles.tagLine}>{tagLine}</p>
          </div>
          <div className={styles.contactButtonContainer}>
            <button className={styles.contactButton}>Contactez-moi</button>
          </div>
          <ProfilePic
            size={200}
            url={profilePicUrl}
            dominantColor={profilePicDominantColor}
            className={styles.profilePic}
          />
          <div className={styles.tags}>
            {tags.map(tag => (
              <TagLink key={tag} basePath={`/photographer/${id}`}>
                {tag}
              </TagLink>
            ))}
          </div>
        </section>
        <section className={styles.mediaContainer}>
          {media.map(medium => {
            if (medium.type === "VIDEO") {
              return null;
            }
            return (
              <Picture
                key={medium.id}
                title={medium.title}
                url={medium.url}
                altText={medium.altText ?? ""}
                dominantColor={medium.dominantColor ?? ""}
                likes={medium.likes}
                className={cx({
                  hidden:
                    tagQueried != null && !medium.tags.includes(tagQueried),
                })}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default PhotographerPage;
