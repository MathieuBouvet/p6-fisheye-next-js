import Link from "next/link";

import AppLogo from "@components/common/AppLogo";
import ProfileBadge from "@components/common/ProfileBadge";

import styles from "./header.module.scss";

interface Props {
  children: React.ReactNode;
}

const Header = ({ children }: Props) => {
  return (
    <header className={styles.header}>
      <Link href="/" shallow>
        <a className={styles.logo}>
          <AppLogo />
        </a>
      </Link>
      <ProfileBadge />
      <nav className={styles.menu}>{children}</nav>
    </header>
  );
};

export default Header;
