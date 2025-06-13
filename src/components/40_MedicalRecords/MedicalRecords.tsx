import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ButtonGroup } from "primereact/buttongroup";

import { chevronBack } from "ionicons/icons";
import React, { useState } from "react";

import "./MedicalRecords.css";
import MedicalRecordsReports from "./MedicalRecordsReports";
import MedicalRecordsPrescriptions from "./MedicalRecordsPrescriptions";
import MedicalRecordsDocuments from "./MedicalRecordsDocuments";
import { Button } from "primereact/button";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useHistory } from "react-router";

const MedicalRecords: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>("reports");

  const [value, setValue] = useState<string>();

  const history = useHistory();

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
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            color="primary"
            value={selectedSegment}
            onIonChange={(e) => {
              const value = e.detail.value;
              if (value) setSelectedSegment(value);
            }}
          >
            <IonSegmentButton value="reports">
              <IonLabel style={{ fontSize: "14px" }}>Reports</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="prescriptions">
              <IonLabel style={{ fontSize: "14px" }}>Prescriptions</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="documents">
              <IonLabel style={{ fontSize: "14px" }}>Documents</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* MEDICAL HISTORY DISPLAY CONTENTS */}
        {selectedSegment === "reports" && <MedicalRecordsReports />}
        {selectedSegment === "prescriptions" && <MedicalRecordsPrescriptions />}
        {selectedSegment === "documents" && <MedicalRecordsDocuments />}

        {/* FAB BUTTONS */}
        <IonFab
          className="medicalRecFab"
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          edge={false}
        >
          <ButtonGroup>
            <Button
              icon="pi pi-camera"
              className={
                value === "camera"
                  ? "p-button-primary buttonIconGroupStart"
                  : "buttonIconGroupStart"
              }
              onClick={async () => {
                setValue("camera");

                try {
                  const image = await Camera.getPhoto({
                    quality: 90,
                    allowEditing: false,
                    resultType: CameraResultType.Uri, // Can also use Base64 or DataUrl
                    source: CameraSource.Camera,
                  });

                  console.log("Captured image URI:", image.webPath);
                  // You can now display or upload the image using image.webPath
                  // For example: showPreview(image.webPath);
                } catch (error) {
                  console.error("Camera error:", error);
                }
              }}
            />
            <Button
              icon="pi pi-images"
              className={
                value === "images"
                  ? "p-button-primary buttonIconGroup"
                  : "buttonIconGroup"
              }
              onClick={() => {
                console.log("Images selected");
                history.push("/imageRecords");
                setValue("images");
              }}
            />
            <Button
              icon="pi pi-file-pdf"
              className={
                value === "pdf"
                  ? "p-button-primary buttonIconGroupEnd"
                  : "buttonIconGroupEnd"
              }
              onClick={() => {
                console.log("PDF selected");
                history.push("/pdfRecords");
                setValue("pdf");
              }}
            />
          </ButtonGroup>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MedicalRecords;
