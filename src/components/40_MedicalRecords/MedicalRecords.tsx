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
import React, { useEffect, useState } from "react";

import "./MedicalRecords.css";
import MedicalRecordsReports from "./MedicalRecordsReports";
import MedicalRecordsPrescriptions from "./MedicalRecordsPrescriptions";
import MedicalRecordsDocuments from "./MedicalRecordsDocuments";
import { Button } from "primereact/button";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState({
    reports: [],
    prescriptions: [],
    documents: [],
  });

  const location = useLocation<{ shouldReload?: boolean }>();

  const [selectedSegment, setSelectedSegment] = useState<string>("reports");

  const [value, setValue] = useState<string>();

  const history = useHistory();

  const userDetails = localStorage.getItem("userDetails");
  const userDeatilsObj = userDetails
    ? JSON.parse(userDetails)
    : { userId: null, token: null };

  const fetchMedicalRecords = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_COMMERCIAL_URL}/medicalRecordsDetails/${
          userDeatilsObj.userId
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        const allRecords = response.data.records;

        const categorized = {
          reports: allRecords.filter(
            (record) => record.refCategory === "reports"
          ),
          prescriptions: allRecords.filter(
            (record) => record.refCategory === "prescriptions"
          ),
          documents: allRecords.filter(
            (record) => record.refCategory === "medical_docs"
          ),
        };

        setRecords(categorized);
        console.log("categorized", categorized);
      } else {
        alert("No records found.");
      }
    } catch (error) {
      console.error("Error fetching medical records:", error);
      alert("Something went wrong while fetching records.");
    }
  };

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  useEffect(() => {
    // Call API on load or reload
    if (location.state?.shouldReload) {
      fetchMedicalRecords();

      // Clear the reload flag so it doesn’t trigger again unnecessarily
      history.replace({ ...location, state: {} });
    } else {
      fetchMedicalRecords();
    }
  }, [location.state?.shouldReload]);

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
            color="success"
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
        {selectedSegment === "reports" && (
          <MedicalRecordsReports records={records.reports} />
        )}
        {selectedSegment === "prescriptions" && (
          <MedicalRecordsPrescriptions records={records.prescriptions} />
        )}
        {selectedSegment === "documents" && (
          <MedicalRecordsDocuments records={records.documents} />
        )}

        {/* FAB BUTTONS */}
        <IonFab
          className="medicalRecFab"
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          edge={false}
        >
          <ButtonGroup>
            {/* <Button
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
            /> */}
            <Button
              icon="pi pi-file-pdf"
              size="large"
              className={
                value === "pdf"
                  ? "p-button-primary buttonIconGroupEnd buttonIconGroupStart"
                  : "buttonIconGroupEnd buttonIconGroupStart"
              }
              onClick={() => {
                console.log("PDF selected");
                // history.push("/pdfRecords");
                history.push("/uploadMedicalRecords");
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
