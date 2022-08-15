import { useState, useRef } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import updateProfilePic from "@lib/services/clientRequests/updateProfilePic";

import useMyProfile from "@hooks/useMyProfile";
import useBase64File from "@hooks/useBase64File";

import FileInputButton from "@components/common/FileInputButton";

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

  const croppedArea = useRef<Area | null>(null);

  return (
    <div className={styles.profilePicUpdater}>
      <div className={styles.cropperContainer}>
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
          className={styles.fileInput}
          accept=".jpg, .jpeg, .png"
          onChange={file => {
            if (file != null) {
              setFile(file);
            }
          }}
        >
          <i className="far fa-image"></i> Modifier l&apos;image
        </FileInputButton>
      </div>
      <button
        className="button-primary"
        onClick={async () => {
          if (profile != null && croppedArea.current != null) {
            await updateProfilePic(
              profile.id,
              file != null
                ? {
                    imageBase64: file,
                    cropConfig: croppedArea.current,
                  }
                : null
            );

            mutate();
          }
        }}
      >
        sauvegarder
      </button>
    </div>
  );
};

export default ProfilePicUpdater;
