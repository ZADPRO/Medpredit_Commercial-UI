import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  camera,
  chevronBack,
  documents,
  ellipsisVertical,
  image,
  search,
} from "ionicons/icons";
import React, { useRef, useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const UploadMedicalRecords: React.FC = () => {
  const [healthRecords, setHealthRecords] = useState([
    {
      id: 1,
      name: "Blood Report",
      timestamp: "07-Apr-2025, 14:35",
      thumbnail: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
    },
    {
      id: 2,
      name: "X-Ray Scan",
      timestamp: "06-Apr-2025, 10:15",
      thumbnail: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
    },
    {
      id: 3,
      name: "ECG Report",
      timestamp: "05-Apr-2025, 18:22",
      thumbnail: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 90,
      });

      const newRecord = {
        id: healthRecords.length + 1,
        name: "New Photo Record",
        timestamp: new Date().toLocaleString(),
        thumbnail: image.dataUrl || "",
      };

      setHealthRecords([newRecord, ...healthRecords]);
    } catch (error) {
      console.error("Camera error:", error);
    }
  };

  const handleGalleryClick = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        quality: 90,
      });

      const newRecord = {
        id: healthRecords.length + 1,
        name: "New Gallery Record",
        timestamp: new Date().toLocaleString(),
        thumbnail: image.dataUrl || "",
      };

      setHealthRecords([newRecord, ...healthRecords]);
    } catch (error) {
      console.error("Gallery error:", error);
    }
  };

  const handlePdfClick = () => {
    fileInputRef.current?.click();
  };

  const handlePdfSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const newRecord = {
        id: healthRecords.length + 1,
        name: file.name,
        timestamp: new Date().toLocaleString(),
        thumbnail: "https://img.icons8.com/color/96/pdf-2.png", // A placeholder thumbnail for PDF
      };
      setHealthRecords([newRecord, ...healthRecords]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              mode="md"
              defaultHref="/profile"
              icon={chevronBack}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>Medical Records</IonTitle>
          <IonButtons slot="end" className="ion-padding-end">
            <IonIcon
              icon={search}
              style={{ fontSize: "26px", fontWeight: "bold" }}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="fullscreen">
        {/* HIDDEN INPUT FOR PDF UPLOAD */}
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handlePdfSelected}
        />

        {/* ION FAB BUTTON - HEALTH RECORDS UPLOAD */}
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={handlePdfClick}>
              <IonIcon icon={documents}></IonIcon>
            </IonFabButton>
            <IonFabButton onClick={handleGalleryClick}>
              <IonIcon icon={image}></IonIcon>
            </IonFabButton>
            <IonFabButton onClick={handleCameraClick}>
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>

        {/* DISPLAY THE HEALTH RECORDS */}
        {healthRecords.map((record) => (
          <IonItem key={record.id}>
            <IonThumbnail slot="start">
              <img alt={record.name} src={record.thumbnail} />
            </IonThumbnail>
            <div className="flex flex-column">
              <IonLabel>{record.name}</IonLabel>
              <IonLabel>{record.timestamp}</IonLabel>
            </div>
            <IonButtons slot="end" className="ion-padding-end">
              <IonIcon icon={ellipsisVertical} />
            </IonButtons>
          </IonItem>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default UploadMedicalRecords;
