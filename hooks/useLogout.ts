import { useSWRConfig } from "swr";

import apiRoutes from "@lib/routes/apiRoutes";
import apiClient from "@lib/apiClient";

function useLogout() {
  const { mutate } = useSWRConfig();

  return async () => {
    await apiClient.post(apiRoutes.logout(), {});
    window.localStorage.removeItem("csrf_token");
    mutate(apiRoutes.myProfile);
  };
}

export default useLogout;
