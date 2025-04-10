import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { chevronBack, camera } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const CustomizeCamera: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleCameraClick = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 90,
      });

      if (image?.dataUrl) {
        setPreviewImage(image.dataUrl);
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Camera error:", error);
    }
  };

  const confirmImage = () => {
    if (previewImage) {
      setImages([previewImage, ...images]);
    }
    setPreviewImage(null);
    setShowDialog(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/uploadMedicalRecords"
              icon={chevronBack}
            />
          </IonButtons>
          <IonTitle>Create Medical Records</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="p-grid">
          {images.map((img, index) => (
            <div className="p-col-12 p-md-4 p-lg-4" key={index}>
              <div className="custom-card p-shadow-4 p-3 border-round-sm">
                <img
                  src={img}
                  alt={`Captured-${index}`}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* FAB for camera */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleCameraClick}>
            <IonIcon icon={camera} />
          </IonFabButton>
        </IonFab>

        {/* Preview and Confirm Dialog */}
        <Dialog
          header="Preview Image"
          visible={showDialog}
          style={{ width: "90vw", maxWidth: "400px" }}
          onHide={() => setShowDialog(false)}
          footer={
            <div className="flex justify-content-end gap-2">
              <IonButton
                className="p-button-text"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </IonButton>
              <IonButton className="p-button-text" onClick={confirmImage}>
                Confirm
              </IonButton>
            </div>
          }
        >
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          )}
        </Dialog>
      </IonContent>
    </IonPage>
  );
};

export default CustomizeCamera;
