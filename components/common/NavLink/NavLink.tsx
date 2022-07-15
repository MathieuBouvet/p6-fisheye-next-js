import Link from "next/link";
import { useRouter } from "next/router";
import cx from "classnames";

import styles from "./navLink.module.scss";

interface Props {
  href: string;
  children: string;
}

const NavLink = ({ href, children }: Props) => {
  const router = useRouter();
  const isRouteActive = router.asPath === href;

  return (
    <Link href={href}>
      <a className={cx(styles.navLink, { [styles.active]: isRouteActive })}>
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
