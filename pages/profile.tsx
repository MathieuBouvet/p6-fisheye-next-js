import { SWRConfig } from "swr";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";

import extractAuthToken from "@lib/auth/extractAuthToken";
import requireRole from "@lib/auth/accessControl/requireRole";
import requireLogin from "@lib/auth/accessControl/requireLogin";

import { ROLE } from "@lib/auth/roles";

import apiRoutes from "@lib/routes/apiRoutes";
import getUserProfile from "@lib/model/users/getUserProfile";
import getTags from "@lib/model/tags/getTags";
import getPendingTagsSuggestedByUser from "@lib/model/tags/getPendingTagsSuggestedByUser";
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
    requireLogin(token);
    requireRole(token, ROLE.PHOTOGRAPHER);
  } catch (err) {
    return handleRoleRequiredError(err, req.url);
  }

  const [profile, tags, pendingTags] = await Promise.all([
    getUserProfile(token.userId),
    getTags(),
    getPendingTagsSuggestedByUser(token.userId),
  ]);
  return {
    props: {
      tags,
      pendingTags,
      profileFallback: {
        [apiRoutes.myProfile()]: { profile },
        [apiRoutes.userPendingTags(token.userId)]: pendingTags,
      },
    },
  };
};

export { getServerSideProps };
export default profile;
