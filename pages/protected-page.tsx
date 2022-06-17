import extractAuthToken from "@lib/auth/extractAuthToken";
import requireRole from "@lib/auth/requireRole";
import { ROLE } from "@lib/auth/roles";
import handleRoleRequiredError from "@utils/handleRoleRequiredError";
import { GetServerSideProps } from "next";

interface Props {
  test: string;
}

const ProtectedPage = ({ test }: Props) => {
  return <div>{test}</div>;
};

const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = extractAuthToken(req, res);
  try {
    requireRole(token, ROLE.PHOTOGRAPHER);
  } catch (err) {
    return handleRoleRequiredError(err, req.url);
  }
  return {
    props: {
      test: "oui",
    },
  };
};

export default ProtectedPage;
export { getServerSideProps };
