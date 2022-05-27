import cx from "classnames";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

import { PhotographerData } from "@lib/getPhotographerById";
import mediaSort, { SortType, isSortType } from "@lib/mediaSort";

import usePresence from "@hooks/usePresence";
import useBooleanHashMap from "@hooks/useBooleanHashMap";

import Header from "@components/photographer/Header";
import ProfilePic from "@components/common/ProfilePic";
import TagLink from "@components/common/TagLink";
import Medium from "@components/photographer/Medium";
import ContactModal from "@components/photographer/ContactModal";
import ProgressBar from "@components/common/ProgressBar";
import LightBox from "@components/photographer/LightBox";

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

  const [mediaLoadingState, setIsMediumLoaded] = useBooleanHashMap(
    media.map(medium => [medium.id, false])
  );

  const mediaIdsMatchingTagQueried = media.reduce((acc, medium) => {
    if (tagQueried == null || medium.tags.includes(tagQueried)) {
      acc[medium.id] = true;
    }
    return acc;
  }, {} as Record<number, true>);

  const nbOfLoadedMedia = Object.entries(mediaLoadingState).reduce(
    (acc, [mediumId, isLoaded]) => {
      if (mediaIdsMatchingTagQueried[Number(mediumId)] && isLoaded) {
        return acc + 1;
      }
      return acc;
    },
    0
  );

  const [sortBy, setSortBy] = useState<SortType>("date");
  const currentSortFn = mediaSort[sortBy].sortFn;

  const contactModal = usePresence();
  const lighbox = usePresence();
  const initialLIghtBoxMedium = useRef(0);

  media.sort(currentSortFn);

  return (
    <div className="app">
      <Header />
      <main>
        <ProgressBar
          value={nbOfLoadedMedia}
          max={Object.values(mediaIdsMatchingTagQueried).length}
        />
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
                  hidden: mediaIdsMatchingTagQueried[medium.id] == null,
                })}
                onLoadingComplete={() => setIsMediumLoaded(medium.id, true)}
                onMediaClick={() => {
                  initialLIghtBoxMedium.current = medium.id;
                  lighbox.setPresent();
                }}
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
      {lighbox.isVisible && (
        <LightBox
          inititalMedium={initialLIghtBoxMedium.current}
          media={media.filter(medium => mediaIdsMatchingTagQueried[medium.id])}
          isClosing={lighbox.isVanishing}
          onCloseFinished={lighbox.setAbsent}
          onCloseStarted={lighbox.setVanishing}
        />
      )}
    </div>
  );
};

export default PhotographerPage;
