import { PhotographerData } from "@lib/getPhotographerById";

import Header from "@components/photographer/Header";
import ProfilePic from "@components/common/ProfilePic";

import styles from "./photographerPage.module.scss";

interface Props {
  photographer: PhotographerData;
}

const PhotographerPage = ({
  photographer: {
    lastName,
    firstName,
    city,
    country,
    tagLine,
    profilePicDominantColor,
    profilePicUrl,
  },
}: Props) => {
  return (
    <div className="app">
      <Header />
      <main>
        <section className={styles.photographerCard}>
          <div>
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
          />
        </section>
      </main>
    </div>
  );
};

export default PhotographerPage;
