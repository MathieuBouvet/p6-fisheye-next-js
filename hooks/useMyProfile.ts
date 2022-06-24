import useSWR from "swr";
import getFetcher from "@utils/getFetcher";

import { ProfileResponse } from "@lib/controllers/users/profileController";

function useMyProfile() {
  const { data: profile } = useSWR(
    "/api/users/my-profile",
    getFetcher<ProfileResponse>()
  );

  return profile;
}

export default useMyProfile;
