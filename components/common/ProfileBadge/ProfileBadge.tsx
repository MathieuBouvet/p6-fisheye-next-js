import cx from "classnames";
import Link from "next/link";

import Dropdown from "@components/common/Dropdown";
import ProfilePic from "@components/common/ProfilePic";

import useMyProfile from "@hooks/useMyProfile";
import useLogout from "@hooks/useLogout";

import styles from "./profileBadge.module.scss";

interface Props {
  size?: number;
  alignment?: "left" | "right";
}

const ProfileBadge = ({ size = 65, alignment = "left" }: Props) => {
  const profile = useMyProfile();
  const logout = useLogout();

  if (profile == null) {
    return null;
  }
  return (
    <Dropdown
      triggerContent={
        <ProfilePic
          dominantColor={profile.profilePicDominantColor}
          url={profile.profilePicUrl}
          size={size}
        />
      }
      alignment={alignment}
    >
      <div className={styles.userName}>
        {profile.firstName} {profile.lastName}
      </div>
      <Link href="/users/my-profile">
        <a className={cx(styles.dropdownItem)}>Mon profil</a>
      </Link>
      <button className={cx(styles.dropdownItem)} onClick={logout}>
        Déconnexion
      </button>
    </Dropdown>
  );
};

export default ProfileBadge;
