import HttpError from "@utils/HttpError";

function handleRoleRequiredError(err: unknown, to?: string) {
  if (!(err instanceof HttpError)) {
    throw err;
  }
  if (err.code === 401 || err.code === 403) {
    const redirectTo = to != null ? `?to=${to}` : "";
    return {
      redirect: {
        permanent: false,
        destination: `/login${redirectTo}`,
      },
    };
  }
  throw err;
}

export default handleRoleRequiredError;
