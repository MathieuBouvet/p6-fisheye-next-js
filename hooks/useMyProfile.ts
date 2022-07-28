import useSWR from "swr";

import getFetcher from "@utils/getFetcher";
import apiRoutes from "@lib/routes/apiRoutes";

import { ProfileResponse } from "@lib/controllers/users/profileController";

export type Profile = ReturnType<typeof useMyProfile>[0];

function useMyProfile() {
  const { data, mutate } = useSWR(
    apiRoutes.myProfile(),
    getFetcher<ProfileResponse>()
  );
  return [data?.profile, mutate] as const;
}

export default useMyProfile;
