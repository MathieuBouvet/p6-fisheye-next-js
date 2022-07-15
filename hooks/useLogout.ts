import { useSWRConfig } from "swr";
import { useRouter } from "next/router";

import apiRoutes from "@lib/routes/apiRoutes";
import apiClient from "@lib/apiClient";

function useLogout() {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  return async () => {
    await apiClient.post(apiRoutes.logout(), {});
    window.localStorage.removeItem("csrf_token");
    mutate(apiRoutes.myProfile(), { profile: null });
    router.push("/");
  };
}

export default useLogout;
