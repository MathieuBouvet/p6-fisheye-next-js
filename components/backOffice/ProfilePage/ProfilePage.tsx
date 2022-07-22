import { Formik, Form } from "formik";
import cx from "classnames";

import Header from "@components/backOffice/Header";
import NavLink from "@components/common/NavLink";
import FormikInput from "@components/common/FormikInput";

import useMyProfile from "@hooks/useMyProfile";

import getProfilFormData from "@components/backOffice/ProfilePage/helpers/getProfileFormData";
import validateProfileFormData from "@components/backOffice/ProfilePage/helpers/validateProfileFormData";

import styles from "./profilePage.module.scss";

interface Props {}

const ProfilePage = ({}: Props) => {
  const profile = useMyProfile();
  const initialProfile = getProfilFormData(profile);

  return (
    <div className="app">
      <Header>
        <NavLink href="/profile">Mon profil</NavLink>
        <NavLink href="/not-implemented-yet">Mes oeuvres</NavLink>
      </Header>
      <main>
        <Formik
          initialValues={initialProfile}
          onSubmit={async (values, actions) => {
            await new Promise(r => setTimeout(r, 1500));
            console.log(values);
            actions.resetForm({ values });
          }}
          validate={validateProfileFormData}
        >
          {({ dirty, isValid, isSubmitting }) => (
            <Form className={styles.profileForm}>
              <fieldset className={styles.formGroup}>
                <legend className={styles.groupTitle}>
                  Profil utilisateur
                </legend>
                <FormikInput name="email" type="email">
                  Email
                </FormikInput>
                <FormikInput name="lastName">Nom</FormikInput>
                <FormikInput name="firstName">Prénom</FormikInput>
              </fieldset>
              <fieldset className={styles.formGroup}>
                <legend className={styles.groupTitle}>
                  Profil photographe
                </legend>
                <FormikInput name="country">Pays</FormikInput>
                <FormikInput name="city">Ville</FormikInput>
                <FormikInput name="tagLine" as="textarea">
                  Phrase d&apos;accroche
                </FormikInput>
                <FormikInput name="price">Prix</FormikInput>
              </fieldset>
              {dirty && (
                <button
                  className={cx("button-primary", styles.submit)}
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? <>Modification...</> : <>Modifier</>}
                </button>
              )}
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default ProfilePage;
