import extractAuthToken from "@lib/auth/extractAuthToken";
import requireRole from "@lib/auth/accessControl/requireRole";
import { ROLE } from "@lib/auth/roles";
import handleRoleRequiredError from "@utils/handleRoleRequiredError";
import getUserProfile from "@lib/model/users/getUserProfile";
import { ProfileResponse } from "@lib/controllers/users/profileController";
import { SWRConfig } from "swr";
import apiRoutes from "@lib/routes/apiRoutes";
import { GetServerSideProps } from "next";

import ProfilePage from "@components/backOffice/ProfilePage";

interface Props {
  profileFallback: Record<string, ProfileResponse | null>;
}

const profile = ({ profileFallback }: Props) => {
  return (
    <SWRConfig value={{ fallback: profileFallback }}>
      <ProfilePage />
    </SWRConfig>
  );
};

const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = extractAuthToken(req, res);
  try {
    requireRole(token, ROLE.PHOTOGRAPHER);
  } catch (err) {
    return handleRoleRequiredError(err, req.url);
  }
  const profile = token != null ? await getUserProfile(token.userId) : null;
  return {
    props: {
      profileFallback: {
        [apiRoutes.myProfile()]: { profile },
      },
    },
  };
};

export { getServerSideProps };
export default profile;
