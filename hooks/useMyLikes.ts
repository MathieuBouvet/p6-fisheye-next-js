import useSWR from "swr";
import getFetcher from "@utils/getFetcher";

function useMyLikes(photographerId: number) {
  const { data, error } = useSWR(
    `/api/likes-of-photographer-media/${photographerId}`,
    getFetcher<Record<number, true>>()
  );
  return { data, error };
}

export default useMyLikes;
