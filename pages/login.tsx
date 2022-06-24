import { GetServerSideProps } from "next";
import { SWRConfig } from "swr";

import extractAuthToken from "@lib/auth/extractAuthToken";
import getUserProfile from "@lib/model/users/getUserProfile";
import apiRoutes from "@lib/routes/apiRoutes";

import { ProfileResponse } from "@lib/controllers/users/profileController";

import LoginPage from "@components/login/LoginPage";

interface Props {
  profileFallback: Record<string, ProfileResponse | null>;
}

const Login = ({ profileFallback }: Props) => {
  return (
    <SWRConfig value={{ fallback: profileFallback }}>
      <LoginPage />
    </SWRConfig>
  );
};

const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = extractAuthToken(req, res);
  const profile = token != null ? await getUserProfile(token.userId) : null;
  return {
    props: {
      profileFallback: {
        [apiRoutes.myProfile()]: profile,
      },
    },
  };
};

export default Login;
export { getServerSideProps };
