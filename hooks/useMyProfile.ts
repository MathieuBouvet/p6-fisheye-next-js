import useSWR from "swr";
import getFetcher from "@utils/getFetcher";
import apiRoutes from "@lib/routes/apiRoutes";

import { ProfileResponse } from "@lib/controllers/users/profileController";

function useMyProfile() {
  const { data: profile } = useSWR(
    apiRoutes.myProfile(),
    getFetcher<ProfileResponse>()
  );

  return profile;
}

export default useMyProfile;
