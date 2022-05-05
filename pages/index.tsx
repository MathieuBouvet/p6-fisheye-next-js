import { InferGetStaticPropsType } from "next";

import getPhotographers from "@lib/getPhotographers";
import getTags from "@lib/getTags";

import HomePage from "@components/home/HomePage";

const Home = ({
  photographers,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <HomePage tags={tags} photographers={photographers} />;
};

async function getStaticProps() {
  const [photographers, tags] = await Promise.all([
    getPhotographers(),
    getTags(),
  ]);
  return {
    props: {
      photographers,
      tags,
    },
  };
}

export { getStaticProps };
export default Home;
