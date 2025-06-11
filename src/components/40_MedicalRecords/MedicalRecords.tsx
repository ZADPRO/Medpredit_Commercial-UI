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
import { chevronBack } from "ionicons/icons";
import React, { useState } from "react";

import "./MedicalRecords.css";
import MedicalRecordsReports from "./MedicalRecordsReports";
import MedicalRecordsPrescriptions from "./MedicalRecordsPrescriptions";
import MedicalRecordsDocuments from "./MedicalRecordsDocuments";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";

const MedicalRecords: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>("reports");

  const options = [
    { icon: "pi pi-camera", value: "camera" },
    { icon: "pi pi-images", value: "images" },
    { icon: "pi pi-file-pdf", value: "pdf" },
  ];
  const [value, setValue] = useState<string>();

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
          <SelectButton
            value={value}
            onChange={(e: SelectButtonChangeEvent) => {
              console.log("e", e.value);
              setValue(e.value);
            }}
            options={options}
            optionLabel="icon"
            itemTemplate={(option) => (
              <i className={option.icon} style={{ fontSize: "1rem" }} />
            )}
          />
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MedicalRecords;
