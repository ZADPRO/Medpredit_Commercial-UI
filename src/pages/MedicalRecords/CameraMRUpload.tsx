import {
  IonActionSheet,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useState } from "react";

import { camera, trash, close } from "ionicons/icons";
import { usePhotoGallery, UserPhoto } from "../../hooks/usePhotoGallery";

const CameraMRUpload: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  console.log("photos", photos);
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              mode="md"
              defaultHref="/uploadMedicalRecords"
              icon={chevronBack}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>Capture Image</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg
                  onClick={() => setPhotoToDelete(photo)}
                  src={photo.webviewPath}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <div className="cameraBtnContainer">
          <button
            className="sideBtn leftBtn"
            onClick={() => console.log("Left")}
          >
            Preview
          </button>

          <div className="cameraBtn">
            <IonFab vertical="bottom" horizontal="center" slot="fixed">
              <IonFabButton onClick={() => takePhoto()}>
                <IonIcon icon={camera}></IonIcon>
              </IonFabButton>
            </IonFab>
          </div>

          <button
            className="sideBtn rightBtn"
            onClick={() => console.log("Right")}
          >
            Submit
          </button>
        </div>

        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[
            {
              text: "Delete",
              role: "destructive",
              icon: trash,
              handler: () => {
                if (photoToDelete) {
                  deletePhoto(photoToDelete);
                  setPhotoToDelete(undefined);
                }
              },
            },
            {
              text: "Cancel",
              icon: close,
              role: "cancel",
            },
          ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
      </IonContent>{" "}
    </IonPage>
  );
};

export default CameraMRUpload;
