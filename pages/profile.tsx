import { SWRConfig } from "swr";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";

import extractAuthToken from "@lib/auth/extractAuthToken";
import requireRole from "@lib/auth/accessControl/requireRole";

import { ROLE } from "@lib/auth/roles";

import apiRoutes from "@lib/routes/apiRoutes";
import getUserProfile from "@lib/model/users/getUserProfile";
import getTags from "@lib/model/tags/getTags";
import handleRoleRequiredError from "@utils/handleRoleRequiredError";

import ProfilePage from "@components/backOffice/ProfilePage";

const profile = ({
  profileFallback,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <SWRConfig value={{ fallback: profileFallback }}>
      <ProfilePage tags={tags} />
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

  const [profile, tags] = await Promise.all([
    token != null ? await getUserProfile(token.userId) : null,
    getTags(),
  ]);
  return {
    props: {
      tags,
      profileFallback: {
        [apiRoutes.myProfile()]: { profile },
      },
    },
  };
};

export { getServerSideProps };
export default profile;
