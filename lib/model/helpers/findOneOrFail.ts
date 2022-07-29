import HttpError from "@utils/HttpError";

type ErrorData = {
  code?: number;
  message?: string;
};

function findOneOrFail<Fn extends (...args: any) => Promise<any>>(
  fn: Fn,
  getErrorData?: (...args: Parameters<Fn>) => ErrorData
) {
  return async (
    ...args: Parameters<Fn>
  ): Promise<NonNullable<Awaited<ReturnType<Fn>>>> => {
    const result = await fn(...args);
    if (result == null) {
      const { code = 404, message = "" } = getErrorData?.(...args) ?? {};
      throw new HttpError(code, message);
    }
    return result;
  };
}

export default findOneOrFail;
