import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
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
  close,
} from "ionicons/icons";
import React, { useRef, useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useHistory } from "react-router";

interface HealthRecord {
  id: number;
  name: string;
  timestamp: string;
  thumbnail: string;
  fileData?: string;
  type: "pdf" | "image";
}

const UploadMedicalRecords: React.FC = () => {
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const history = useHistory();

  const handleCameraClick = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 90,
      });

      //   const newRecord: HealthRecord = {
      //     id: healthRecords.length + 1,
      //     name: "New Photo Record",
      //     timestamp: new Date().toLocaleString(),
      //     thumbnail: image.dataUrl || "",
      //     fileData: image.dataUrl || "",
      //     type: "image",
      //   };

      //   setHealthRecords([newRecord, ...healthRecords]);
      history.push({
        pathname: "/customizeCamera",
        state: {
          imageData: image.dataUrl,
        },
      });
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

      const newRecord: HealthRecord = {
        id: healthRecords.length + 1,
        name: "New Gallery Record",
        timestamp: new Date().toLocaleString(),
        thumbnail: image.dataUrl || "",
        fileData: image.dataUrl || "",
        type: "image",
      };

      setHealthRecords([newRecord, ...healthRecords]);
    } catch (error) {
      console.error("Gallery error:", error);
    }
  };

  const handlePdfClick = () => {
    // fileInputRef.current?.click();
    history.push({ pathname: "/pdfMedicalRecords" });
  };

  const handlePdfSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        const pdfDataUrl = reader.result as string;
        const newRecord: HealthRecord = {
          id: healthRecords.length + 1,
          name: file.name,
          timestamp: new Date().toLocaleString(),
          thumbnail: "https://img.icons8.com/color/96/pdf-2.png",
          fileData: pdfDataUrl,
          type: "pdf",
        };
        setHealthRecords([newRecord, ...healthRecords]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRecordClick = (record: HealthRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
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
            />
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
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handlePdfSelected}
        />

        <IonFab
          className="fabButtonCustom"
          horizontal="end"
          vertical="bottom"
          slot="fixed"
        >
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side="start">
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

        {healthRecords.map((record) => (
          <IonItem
            mode="md"
            key={record.id}
            button
            onClick={() => handleRecordClick(record)}
          >
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

        {/* Preview Modal */}
        <IonModal
          isOpen={isModalOpen}
          onDidDismiss={() => setIsModalOpen(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedRecord?.name}</IonTitle>
              <IonButtons slot="end">
                <IonButton size="small" onClick={() => setIsModalOpen(false)}>
                  <IonIcon icon={close}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedRecord?.type === "image" ? (
              <img
                src={selectedRecord?.fileData}
                alt={selectedRecord?.name}
                style={{ width: "100%" }}
              />
            ) : (
              <iframe
                src={selectedRecord?.fileData}
                title="PDF Preview"
                style={{ width: "100%", height: "100vh", border: "none" }}
              />
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default UploadMedicalRecords;
