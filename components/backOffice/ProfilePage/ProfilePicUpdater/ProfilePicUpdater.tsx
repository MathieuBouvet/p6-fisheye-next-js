import { useState, useRef } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import cx from "classnames";

import updateProfilePic from "@lib/services/clientRequests/updateProfilePic";

import useMyProfile from "@hooks/useMyProfile";
import useBase64File from "@hooks/useBase64File";

import getInitials from "@utils/getInitials";

import FileInputButton from "@components/common/FileInputButton";
import ProfilePic from "@components/common/ProfilePic";

import styles from "./profilePicUpdater.module.scss";

interface Props {}

const ProfilePicUpdater = ({}: Props) => {
  const [profile, mutate] = useMyProfile();
  const imageUrl =
    profile != null && profile.profilePicUrl != null
      ? `/profile-pics/${profile.profilePicUrl}`
      : undefined;

  const [currentCrop, setCurrentCrop] = useState<Point>({ x: 0, y: 0 });
  const [currentZoom, setCurrentZoom] = useState(1);

  const [file, setFile] = useBase64File({ url: imageUrl ?? null });
  const [backgroundColor, setbackgroundColor] = useState(
    profile?.profilePicDominantColor ?? "ffffff"
  );

  const croppedArea = useRef<Area>({ height: 0, width: 0, x: 0, y: 0 });

  const [isSaving, setIsSaving] = useState(false);

  return (
    <div className={styles.profilePicUpdater}>
      <div className={styles.cropperContainer}>
        {file != null ? (
          <>
            <Cropper
              image={file ?? undefined}
              crop={currentCrop}
              zoom={currentZoom}
              onCropChange={setCurrentCrop}
              onZoomChange={setCurrentZoom}
              aspect={1}
              showGrid={false}
              cropShape="round"
              onCropComplete={(_, area) => {
                croppedArea.current = area;
              }}
            />
            <FileInputButton
              key="edit-file"
              className={cx(styles.overlayedControl)}
              accept=".jpg, .jpeg, .png"
              onChange={file => {
                if (file != null) {
                  setFile(file);
                }
              }}
            >
              <i className="far fa-image"></i> Remplacer
            </FileInputButton>
            <button
              onClick={() => setFile(null)}
              className={cx(
                "button-primary",
                styles.overlayedControl,
                styles.deleteImageButton
              )}
            >
              <i className="fa fa-trash"></i> Supprimer
            </button>
          </>
        ) : (
          <>
            <div className={styles.userBadgeContainer}>
              <ProfilePic
                dominantColor={backgroundColor}
                size={350}
                url={null}
                initials={getInitials(profile?.firstName, profile?.lastName)}
              />
            </div>
            <FileInputButton
              key="add-file"
              className={cx(styles.overlayedControl)}
              accept=".jpg, .jpeg, .png"
              onChange={file => {
                if (file != null) {
                  setFile(file);
                }
              }}
            >
              <i className="far fa-image"></i> Ajouter
            </FileInputButton>
            <label
              className={cx(styles.overlayedControl, styles.colorPickerTrigger)}
            >
              Arrière plan
              <input
                type="color"
                className={cx(styles.colorPicker)}
                value={`#${backgroundColor}`}
                onChange={e => {
                  setbackgroundColor(e.target.value.slice(1));
                }}
              />
            </label>
          </>
        )}
      </div>
      <button
        className={cx("button-primary", styles.saveProfilePicButton)}
        disabled={isSaving}
        onClick={async () => {
          if (profile != null) {
            setIsSaving(true);
            await updateProfilePic(profile.id, {
              profilePic:
                file != null
                  ? {
                      imageBase64: file,
                      cropConfig: croppedArea.current,
                    }
                  : null,
              backgroundColor,
            });
            setIsSaving(false);
            mutate();
          }
        }}
      >
        {!isSaving ? "Enregistrer" : "Enregistrement"}
      </button>
    </div>
  );
};

export default ProfilePicUpdater;
