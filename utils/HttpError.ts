const messages: Record<number, string> = {
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

  constructor(code: number) {
    const message = messages[code];
    super(`${code}${message != null ? ` - ${message}` : ""}`);
    this.code = code;
    this.status = message ?? "";
  }
}

export default HttpError;
