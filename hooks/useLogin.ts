import { useState } from "react";
import loginService from "@lib/services/login";

function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isOk, setIsOk] = useState(false);

  async function login(email: string, password: string) {
    setIsPending(true);

    try {
      await loginService(email, password);
      setIsPending(false);
      setIsOk(true);
      setHasError(false);
    } catch (err) {
      setIsPending(false);
      setHasError(true);
    }
  }

  return { isPending, hasError, isOk, login };
}

export default useLogin;
