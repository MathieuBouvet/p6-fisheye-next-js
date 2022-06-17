const statuses: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
  501: "Not Implemented",
};

class HttpError extends Error {
  code: number;
  status: string;

  constructor(code: number, message?: string) {
    const status = statuses[code];
    super(`${message != null ? message : status}`);

    this.code = code;
    this.status = status ?? "";
  }
}

export default HttpError;
