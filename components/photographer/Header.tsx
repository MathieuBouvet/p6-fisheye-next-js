import Link from "next/link";

import AppLogo from "@components/common/AppLogo";

interface Props {}

const Header = ({}: Props) => {
  return (
    <header className="header">
      <Link href="/">
        <a>
          <AppLogo />
        </a>
      </Link>
    </header>
  );
};

export default Header;
