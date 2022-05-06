import { Tag } from "@prisma/client";
import { PhotographerProfile } from "@lib/getPhotographers";

import Header from "@components/home/Header";
import Photographer from "@components/home/Photographer";

import styles from "./homePage.module.scss";

interface Props {
  photographers: PhotographerProfile[];
  tags: Tag[];
}

const HomePage = ({ tags, photographers }: Props) => {
  return (
    <div className="app">
      <Header tags={tags} />
      <main className={styles.main}>
        {photographers.map(photographer => {
          return (
            <Photographer key={photographer.id} photographer={photographer} />
          );
        })}
      </main>
    </div>
  );
};

export default HomePage;
