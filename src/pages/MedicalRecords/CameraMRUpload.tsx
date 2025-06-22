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
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { chevronBack, camera, trash, close } from "ionicons/icons";
import React, { useState } from "react";

import { usePhotoGallery, UserPhoto } from "../../hooks/usePhotoGallery";

const CameraMRUpload: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const [showPreviewModal, setShowPreviewModal] = useState(false); // Modal control

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
            {[...photos].reverse().map((photo, index) => (
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
            onClick={() => setShowPreviewModal(true)}
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
            onClick={() => {
              const uploadedUrls = photos
                .map((p) => p.uploadedUrl)
                .filter(Boolean);
              console.log("Uploaded file URLs:", uploadedUrls);
            }}
          >
            Submit
          </button>
        </div>

        {/* Preview Modal */}
        <IonModal
          isOpen={showPreviewModal}
          onDidDismiss={() => setShowPreviewModal(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Image Preview</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowPreviewModal(false)}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            {[...photos].reverse().map((photo, index) => (
              <IonImg
                key={index}
                src={photo.webviewPath}
                style={{ margin: "10px", borderRadius: "10px" }}
              />
            ))}
          </IonContent>
        </IonModal>

        {/* Delete ActionSheet */}
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
      </IonContent>
    </IonPage>
  );
};

export default CameraMRUpload;
