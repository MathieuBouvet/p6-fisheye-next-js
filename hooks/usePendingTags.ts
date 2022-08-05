import useSWR from "swr";

import getFetcher from "@utils/getFetcher";
import apiRoutes from "@lib/routes/apiRoutes";

import { Tag } from "@prisma/client";

function usePendingTags(userId: number) {
  const { data, mutate } = useSWR(
    apiRoutes.userPendingTags(userId),
    getFetcher<Tag[]>()
  );
  return [data ?? [], mutate] as const;
}

export default usePendingTags;
