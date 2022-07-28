import useMyProfile from "@hooks/useMyProfile";
import ProfileBadge from "@components/common/ProfileBadge";

import styles from "./profileContainer.module.scss";

interface Props {}

const Profilecontainer = ({}: Props) => {
  const [profile] = useMyProfile();

  return (
    <div className={styles.profileContainer}>
      {profile != null && (
        <>
          Déjà connecté
          <ProfileBadge alignment="right" />
        </>
      )}
    </div>
  );
};

export default Profilecontainer;
