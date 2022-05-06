import Link from "next/link";

import { Tag as TagType } from "@prisma/client";

import AppLogo from "@components/common/AppLogo";
import TagLink from "@components/common/TagLink";

import styles from "./header.module.scss";

interface Props {
  tags: TagType[];
}

const Header = ({ tags }: Props) => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logo}>
          <AppLogo />
        </a>
      </Link>
      <h1 className={styles.title}>Nos Photographes</h1>
      <nav className={styles.nav}>
        {tags.map(({ id, name }) => (
          <TagLink key={id}>{name}</TagLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
