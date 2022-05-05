import Link from "next/link";
import { useRouter } from "next/router";

import Tag from "@components/common/Tag";

interface Props {
  children: string;
}

const TagLink = ({ children }: Props) => {
  const router = useRouter();

  const tagPath = `/?tag=${children}`;
  const isActive = router.asPath === tagPath;

  return (
    <Link href={isActive ? "/" : tagPath} shallow>
      <a>
        <Tag isActive={isActive}>{children}</Tag>
      </a>
    </Link>
  );
};

export default TagLink;
