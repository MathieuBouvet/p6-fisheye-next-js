type NoMethodOptions = Omit<RequestInit, "method">;
type NoBodyOptions = Omit<RequestInit, "body">;

type SendParams = {
  route: string;
  body?: any;
  options?: NoBodyOptions;
};

async function send<T>({ route, body, options }: SendParams): Promise<T> {
  const csrfToken = window.localStorage.getItem("csrf_token");
  const res = await fetch(route, {
    ...options,
    headers: {
      "content-type": "application/json",
      "x-csrf-token": csrfToken ?? "",
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw res;
  }
  const data = res.status === 204 ? {} : res.json();
  return data as Promise<T>;
}

async function get<T>(route: string, options?: NoMethodOptions): Promise<T> {
  return send({ route, options: { ...options, method: "GET" } });
}

async function post<T = void>(
  route: string,
  data: any,
  options?: NoBodyOptions & NoMethodOptions
): Promise<T> {
  return send({ route, body: data, options: { ...options, method: "POST" } });
}

async function put<T>(
  route: string,
  data: any,
  options: NoBodyOptions & NoMethodOptions
): Promise<T> {
  return send({ route, body: data, options: { ...options, method: "PUT" } });
}

async function del<T = void>(
  route: string,
  options?: NoMethodOptions
): Promise<T> {
  return send({ route, options: { ...options, method: "DELETE" } });
}

const apiClient = {
  get,
  post,
  put,
  delete: del,
};

export default apiClient;
