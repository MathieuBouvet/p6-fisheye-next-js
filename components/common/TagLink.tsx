import Link from "next/link";
import { useRouter } from "next/router";

import Tag from "@components/common/Tag";

interface Props {
  basePath?: string;
  children: string;
}

const TagLink = ({ children, basePath = "/" }: Props) => {
  const router = useRouter();

  const tagPath = `${basePath}?tag=${children}`;
  const isActive = router.asPath === tagPath;

  return (
    <Link href={isActive ? basePath : tagPath} shallow>
      <a>
        <Tag isActive={isActive}>{children}</Tag>
      </a>
    </Link>
  );
};

export default TagLink;
