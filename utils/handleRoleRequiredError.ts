import HttpError from "@utils/HttpError";

function handleRoleRequiredError(err: unknown) {
  if (!(err instanceof HttpError)) {
    throw err;
  }
  if (err.code === 401 || err.code === 403) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  throw err;
}

export default handleRoleRequiredError;
