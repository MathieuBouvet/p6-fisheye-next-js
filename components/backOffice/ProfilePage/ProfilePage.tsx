import { Formik, Form, Field } from "formik";
import cx from "classnames";
import { useState } from "react";

import { Tag as TagType } from "@prisma/client";

import Header from "@components/backOffice/Header";
import NavLink from "@components/common/NavLink";
import FormikInput from "@components/common/FormikInput";
import FormikTagInput from "@components/common/FormikTagInput";

import useMyProfile from "@hooks/useMyProfile";

import getProfileFormData from "@components/backOffice/ProfilePage/helpers/getProfileFormData";
import getUserData from "@components/backOffice/ProfilePage/helpers/getUserData";
import validateProfileFormData from "@components/backOffice/ProfilePage/helpers/validateProfileFormData";
import updateUser from "@lib/services/updateUser";

import styles from "./profilePage.module.scss";

interface Props {
  tags: TagType[];
}

const ProfilePage = ({ tags }: Props) => {
  const [profile, mutateProfile] = useMyProfile();
  const initialProfile = getProfileFormData(profile);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
            setShowError(false);
            setShowSuccess(false);
            if (profile != null) {
              try {
                const res = await updateUser(profile.id, getUserData(values));
                mutateProfile({ profile: res });
                actions.resetForm({ values });
                setShowSuccess(true);
              } catch (err) {
                setShowError(true);
                actions.resetForm();
              }
            }
          }}
          validate={validateProfileFormData}
        >
          {({ dirty, isValid, isSubmitting, errors }) => (
            <Form
              className={styles.profileForm}
              onChange={() => {
                setShowError(false);
                setShowSuccess(false);
              }}
            >
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
                <div>
                  <span
                    className={cx(styles.pseudoLabel, {
                      [styles.errorMessage]: errors.tags,
                    })}
                  >
                    Tags
                    {errors.tags && <> - {errors.tags}</>}
                  </span>
                  <div className={styles.tagContainer}>
                    {tags.map(tag => (
                      <FormikTagInput value={tag.id.toString()} key={tag.id}>
                        {tag.name}
                      </FormikTagInput>
                    ))}
                  </div>
                </div>
                <FormikInput name="country">Pays</FormikInput>
                <FormikInput name="city">Ville</FormikInput>
                <FormikInput name="tagLine" as="textarea">
                  Phrase d&apos;accroche
                </FormikInput>
                <FormikInput name="price" type="number">
                  Prix
                </FormikInput>
              </fieldset>
              {dirty && (
                <button
                  className={cx("button-primary", styles.submit)}
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      Modification
                      <span className={cx(styles.blink)}>.</span>
                      <span className={cx(styles.blink, styles.delay1)}>.</span>
                      <span className={cx(styles.blink, styles.delay2)}>.</span>
                    </>
                  ) : (
                    <>Modifier</>
                  )}
                </button>
              )}
              {showError && (
                <div className={cx(styles.notification, styles.error)}>
                  <i className="fa fa-exclamation-circle" />
                  Une erreur est survenue pendant la sauvegarde
                  <button
                    className={styles.dismissButton}
                    onClick={() => setShowError(false)}
                  >
                    <i className="far fa-times-circle"></i>
                  </button>
                </div>
              )}
              {showSuccess && (
                <div className={cx(styles.notification, styles.success)}>
                  <i className="fas fa-check" />
                  Sauvegarde effectuée
                  <button
                    className={styles.dismissButton}
                    onClick={() => setShowSuccess(false)}
                  >
                    <i className="far fa-times-circle"></i>
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default ProfilePage;
