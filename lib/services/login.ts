import { LoginResponse } from "@lib/controllers/loginController";
import apiRoutes from "@lib/routes/apiRoutes";
import apiClient from "@lib/apiClient";

async function login(email: string, password: string) {
  const res = await apiClient.post<LoginResponse>(apiRoutes.login(), {
    email,
    password,
  });
  window.localStorage.setItem("csrf_token", res.csrfToken);
}

export default login;
