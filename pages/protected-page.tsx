import extractAuthToken from "@lib/auth/extractAuthToken";
import requireRole from "@lib/auth/accessControl/requireRole";
import { ROLE } from "@lib/auth/roles";
import handleRoleRequiredError from "@utils/handleRoleRequiredError";
import useMyProfile from "@hooks/useMyProfile";
import getUserProfile from "@lib/model/users/getUserProfile";
import { ProfileResponse } from "@lib/controllers/users/profileController";
import { SWRConfig } from "swr";
import apiRoutes from "@lib/routes/apiRoutes";
import { GetServerSideProps } from "next";

interface Props {
  profileFallback: Record<string, ProfileResponse | null>;
}

const ProtectedPage = ({ profileFallback }: Props) => {
  return (
    <SWRConfig value={{ fallback: profileFallback }}>
      <Page />
    </SWRConfig>
  );
};

const Page = () => {
  const profile = useMyProfile();
  return <div>ok pour {profile?.email ?? "..."}</div>;
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
        [apiRoutes.myProfile()]: profile,
      },
    },
  };
};

export default ProtectedPage;
export { getServerSideProps };
