import { useReducer } from "react";
import HttpError from "@utils/HttpError";
import loginService from "@lib/services/login";

type State = {
  isPending: boolean;
  error: string | null;
  isOk: boolean;
};

type Action = Started | Failed | Succeeded | Reseted;

type Started = {
  type: "started";
};

type Failed = {
  type: "failed";
  payload: {
    error: string;
  };
};

type Succeeded = {
  type: "succeeded";
};

type Reseted = {
  type: "reseted";
};

const INITAL_STATE: State = {
  isOk: false,
  isPending: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "started": {
      return { ...state, isPending: true, error: null };
    }
    case "failed": {
      return {
        ...state,
        isPending: false,
        error: action.payload.error,
        isOk: false,
      };
    }
    case "succeeded": {
      return { ...state, isPending: false, error: null, isOk: true };
    }
    case "reseted": {
      return INITAL_STATE;
    }
    default:
      return state;
  }
}

type LoginFnArgs = {
  email: string;
  password: string;
  onLoginSuccess?: () => void;
};

function useLogin() {
  const [{ isOk, isPending, error }, dispatch] = useReducer(
    reducer,
    INITAL_STATE
  );

  async function login({
    email,
    password,
    onLoginSuccess = () => {},
  }: LoginFnArgs) {
    dispatch({ type: "started" });
    try {
      await loginService(email, password);
      dispatch({ type: "succeeded" });
      onLoginSuccess();
    } catch (err) {
      let errorMessage: string;
      switch ((err as any).code) {
        case 400: {
          errorMessage = "Renseignez vos identifiants";
          break;
        }
        case 401: {
          errorMessage = "Identifiants invalides";
          break;
        }
        default:
          errorMessage = "Une erreur inatendue est survenue";
      }
      dispatch({ type: "failed", payload: { error: errorMessage } });
    }
  }

  function reset() {
    dispatch({ type: "reseted" });
  }

  return { isPending, error, isOk, login, reset };
}

export default useLogin;
