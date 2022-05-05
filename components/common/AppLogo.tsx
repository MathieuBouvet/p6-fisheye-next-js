import Image from "next/image";

import logo from "@public/logo.svg";

const AppLogo = () => {
  return <Image src={logo} alt="fisheye homepage" />;
};

export default AppLogo;
