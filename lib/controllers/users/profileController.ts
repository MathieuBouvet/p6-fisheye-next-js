import controller from "@utils/controller";
import extractAuthToken from "@lib/auth/extractAuthToken";

import getUserProfile from "@lib/model/users/getUserProfile";

export type ProfileResponse = {
  profile: Awaited<ReturnType<typeof getUserProfile>>;
};

const profileController = controller({
  GET: async (req, res): Promise<ProfileResponse> => {
    const authToken = extractAuthToken(req, res);

    const userId = authToken?.userId;

    if (userId == null) {
      return { profile: null };
    }
    return { profile: await getUserProfile(userId) };
  },
});

export default profileController;
