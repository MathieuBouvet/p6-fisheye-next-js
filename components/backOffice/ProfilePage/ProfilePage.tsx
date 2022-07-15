import Header from "@components/backOffice/Header";
import NavLink from "@components/common/NavLink";

import styles from "./profilePage.module.scss";

interface Props {}

const ProfilePage = ({}: Props) => {
  return (
    <div className="app">
      <Header>
        <NavLink href="/profile">Mon profil</NavLink>
        <NavLink href="/not-implemented-yet">Mes oeuvres</NavLink>
      </Header>
      <main>
        <form action="">
          
        </form>
      </main>
    </div>
  );
};

export default ProfilePage;
