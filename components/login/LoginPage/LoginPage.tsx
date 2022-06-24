import cx from "classnames";
import { useState } from "react";
import { useRouter } from "next/router";

import LoginHeader from "@components/login/LoginHeader";
import useLogin from "@hooks/useLogin";

import ProfileContainer from "@components/login/ProfileContainer";

import styles from "./loginPage.module.scss";

interface Props {}

const LoginPage = ({}: Props) => {
  const router = useRouter();
  const rawRedirectTo = router.query.to;
  const redirectTo = Array.isArray(rawRedirectTo) ? undefined : rawRedirectTo;

  const { isOk, isPending, error, login, reset } = useLogin();

  function getButtonContent() {
    if (isOk) {
      return <i className="far fa-check-circle"></i>;
    }
    if (isPending) {
      return <i className="fas fa-spinner fa-spin"></i>;
    }
    return "Connexion";
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={cx(styles.loginPage)}>
      <LoginHeader />
      <div className={styles.content}>
        <ProfileContainer />
        <form
          className={styles.loginForm}
          onSubmit={e => {
            e.preventDefault();
            if (email !== "" && password !== "") {
              login({
                email,
                password,
                onLoginSuccess: () => {
                  router.push(redirectTo ?? "/");
                },
              });
            }
          }}
        >
          <label>
            Adresse mail
            <input
              type="email"
              required
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (!isPending && error !== null) {
                  reset();
                }
              }}
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              required
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (!isPending && error !== null) {
                  reset();
                }
              }}
            />
          </label>
          <button
            className={cx("button-primary", styles.loginButton)}
            disabled={isPending}
          >
            {getButtonContent()}
          </button>
          {error != null && (
            <div className={styles.errorNotification}>
              <i className="fa fa-warning"></i>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
