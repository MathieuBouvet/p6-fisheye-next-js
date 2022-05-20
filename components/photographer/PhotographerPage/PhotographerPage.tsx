import cx from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

import { PhotographerData } from "@lib/getPhotographerById";
import mediaSort, { SortType, isSortType } from "@lib/mediaSort";

import usePresence from "@hooks/usePresence";

import Header from "@components/photographer/Header";
import ProfilePic from "@components/common/ProfilePic";
import TagLink from "@components/common/TagLink";
import Medium from "@components/photographer/Medium";
import ContactModal from "@components/photographer/ContactModal";

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

  const [sortBy, setSortBy] = useState<SortType>("date");
  const currentSortFn = mediaSort[sortBy].sortFn;

  const contactModal = usePresence();

  media.sort(currentSortFn);

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
            <button
              className={styles.contactButton}
              onClick={contactModal.setPresent}
            >
              Contactez-moi
            </button>
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
        <label htmlFor="sort-media" className={styles.sortSelectorLabel}>
          Trier par{" "}
        </label>
        <select
          id="sort-media"
          className={styles.sortSelector}
          value={sortBy}
          onChange={({ target: { value } }) =>
            isSortType(value) && setSortBy(value)
          }
        >
          {Object.entries(mediaSort).map(([type, { label }]) => (
            <option key={type} value={type}>
              {label}
            </option>
          ))}
        </select>
        <section className={styles.mediaContainer}>
          {media.map(medium => {
            return (
              <Medium
                key={medium.id}
                title={medium.title}
                url={medium.url}
                altText={medium.altText ?? ""}
                dominantColor={medium.dominantColor ?? ""}
                likes={medium.likes}
                type={medium.type}
                className={cx({
                  hidden:
                    tagQueried != null && !medium.tags.includes(tagQueried),
                })}
              />
            );
          })}
        </section>
      </main>
      {contactModal.isVisible && (
        <ContactModal
          photographerName={`${firstName} ${lastName}`}
          isClosing={contactModal.isVanishing}
          onCloseFinished={contactModal.setAbsent}
          onCloseStarted={contactModal.setVanishing}
        />
      )}
    </div>
  );
};

export default PhotographerPage;
