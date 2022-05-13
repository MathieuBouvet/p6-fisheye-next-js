import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from "next";
import getPhotographers from "@lib/getPhotographers";
import getPhotographerById from "@lib/getPhotographerById";

import PhotographerPageComponent from "@components/photographer/PhotographerPage";

const PhotographerPage = ({
  photographer,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <PhotographerPageComponent photographer={photographer} />;
};

const getStaticPaths: GetStaticPaths = async () => {
  const photographers = await getPhotographers();
  return {
    fallback: false,
    paths: photographers.map(photographer => ({
      params: { id: photographer.id.toString() },
    })),
  };
};

const getStaticProps: GetStaticProps = async context => {
  const id = context.params?.id?.toString();
  const photographer = await getPhotographerById(Number(id));

  if (photographer == null) {
    return {
      notFound: true,
    };
  }

  return { props: { photographer } };
};

export default PhotographerPage;
export { getStaticPaths, getStaticProps };
