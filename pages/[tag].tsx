import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from "next";

import getPhotographers from "@lib/getPhotographers";
import getTags from "@lib/getTags";

import HomePage from "@components/home/HomePage";

const Home = ({
  photographers,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <HomePage tags={tags} photographers={photographers} />;
};

const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getTags();

  return {
    paths: tags.map(tag => ({
      params: {
        tag: tag.name,
      },
    })),
    fallback: false,
  };
};

const getStaticProps: GetStaticProps = async ctx => {
  const tag = ctx.params?.tag?.toString();

  const [photographers, tags] = await Promise.all([
    getPhotographers({ withTag: tag }),
    getTags(),
  ]);
  return {
    props: {
      photographers,
      tags,
    },
  };
};

export { getStaticProps, getStaticPaths };
export default Home;
