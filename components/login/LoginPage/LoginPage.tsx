import cx from "classnames";

import LoginHeader from "@components/login/LoginHeader";

import styles from "./loginPage.module.scss";

interface Props {}

const LoginPage = ({}: Props) => {
  return (
    <div className={cx(styles.loginPage)}>
      <LoginHeader />
      <div className={styles.content}>
        <form className={styles.loginForm}>
          <label>
            Adresse mail
            <input type="text" />
          </label>
          <label>
            Mot de passe
            <input type="password" />
          </label>
          <button className={cx("button-primary", styles.loginButton)}>Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
