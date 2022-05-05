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

  const filteredPhotographers =
    tagQueried == null
      ? photographers
      : photographers.filter(photographer =>
          photographer.tags.includes(tagQueried)
        );

  return (
    <div className="app">
      <Header tags={tags} />
      <main className={styles.main}>
        {filteredPhotographers.map(photographer => {
          return (
            <Photographer key={photographer.id} photographer={photographer} />
          );
        })}
      </main>
    </div>
  );
};

export default HomePage;
