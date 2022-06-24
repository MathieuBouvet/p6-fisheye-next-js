import useSWR from "swr";
import getFetcher from "@utils/getFetcher";
import apiClient from "@lib/apiClient";
import apiRoutes from "@lib/routes/apiRoutes";

function useMyLikes(photographerId: number) {
  const { data, error, mutate } = useSWR(
    apiRoutes.likesOfPhotographerMedia(photographerId),
    getFetcher<Record<number, true>>()
  );

  function toggleLike(mediumId: number) {
    if (data != null) {
      const isLiked = data[mediumId];
      const updateLike = isLiked
        ? apiClient.delete(apiRoutes.likes(mediumId))
        : apiClient.post(apiRoutes.likes(mediumId), {});

      const newData = { ...data };
      if (isLiked) {
        delete newData[mediumId];
      } else {
        newData[mediumId] = true;
      }
      mutate(
        async () => {
          await updateLike;
          return newData;
        },
        { optimisticData: newData, rollbackOnError: false }
      );
    }
  }
  return { data, error, toggleLike };
}

export default useMyLikes;
