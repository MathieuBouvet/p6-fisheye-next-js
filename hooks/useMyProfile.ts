import useSWR from "swr";

import getFetcher from "@utils/getFetcher";
import apiRoutes from "@lib/routes/apiRoutes";

import { ProfileResponse } from "@lib/controllers/users/profileController";

export type Profile = ReturnType<typeof useMyProfile>;

function useMyProfile() {
  const { data } = useSWR(apiRoutes.myProfile(), getFetcher<ProfileResponse>());
  return data?.profile;
}

export default useMyProfile;
