import cx from "classnames";
import Link from "next/link";

import AppLogo from "@components/common/AppLogo";

import styles from "./loginHeader.module.scss";

interface Props {}

const LoginHeader = ({}: Props) => {
  return (
    <header className={cx("header", styles.loginHeader)}>
      <Link href="/">
        <a>
          <AppLogo />
        </a>
      </Link>
    </header>
  );
};

export default LoginHeader;
