import { useRouter } from "next/router";

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
  const router = useRouter();
  const tagQueried = router.query.tag?.toString();

  return (
    <div className="app">
      <Header tags={tags} />
      <main className={styles.main}>
        {photographers.map(photographer => {
          return (
            <Photographer
              key={photographer.id}
              photographer={photographer}
              isVisible={
                tagQueried == null || photographer.tags.includes(tagQueried)
              }
            />
          );
        })}
      </main>
    </div>
  );
};

export default HomePage;
