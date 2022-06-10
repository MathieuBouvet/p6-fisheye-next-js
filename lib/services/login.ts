import { LoginResponse } from "@lib/controllers/loginController";
import apiClient from "@lib/apiClient";

async function login(
  email: string,
  password: string,
) {
  const res = await apiClient.post<Promise<LoginResponse>>("/api/login", {
    email,
    password,
  });
  window.localStorage.setItem("csrf_token", res.csrfToken);
}

export default login;
