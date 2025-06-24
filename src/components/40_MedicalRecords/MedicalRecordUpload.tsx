import {
  IonBackButton,
  IonButtons,
  IonChip,
  IonContent,
  IonFooter,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";

import camera from "../../assets/MedicalRecords/cameraImg.png";
import photo from "../../assets/MedicalRecords/photoImg.png";
import document from "../../assets/MedicalRecords/pdfImg.png";
import { useTranslation } from "react-i18next";

const MedicalRecordUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [date, setDate] = useState<Nullable<Date>>(null);
  const [docName, setDocName] = useState("");
  const [notes, setNotes] = useState("");
  const [centerName, setCenterName] = useState("");
  const { t } = useTranslation("global");

  const [pdfFileUrl, setPdfFileUrl] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null); // hold actual file

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const uploadToServer = async (file: File): Promise<string | null> => {
    const tokenString = localStorage.getItem("userDetails");
    const tokenObject = tokenString ? JSON.parse(tokenString) : {};
    const userId = tokenObject.userId;

    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("userId", userId);

    try {
      const response = await fetch(
        "https://medpredit-staging.brightoncloudtech.com/fileUpload/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.fileUrl || null;
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

  const today = new Date();
  const history = useHistory();

  const modal = useRef<HTMLIonModalElement>(null);

  const categories = [
    { label: "Reports", value: "reports" },
    { label: "Prescriptions", value: "prescriptions" },
    { label: "Medical Documents", value: "medical_docs" },
  ];

  const subItems: { [key: string]: { label: string; value: string }[] } = {
    reports: [
      { label: "Lab Test Reports", value: "lab" },
      { label: "X-Ray", value: "xray" },
      { label: "Scans (CT/MRI/Ultrasound)", value: "scans" },
      { label: "Echo / ECG", value: "echo" },
      { label: "Biopsy", value: "biopsy" },
      { label: "Pathology", value: "pathology" },
    ],
    prescriptions: [
      { label: "Doctor's Prescription", value: "doctor_presc" },
      { label: "Medication List", value: "med_list" },
      { label: "Dosage Schedule", value: "dosage" },
      { label: "Treatment Notes", value: "treatment_notes" },
      { label: "Follow-up Advice", value: "followup" },
    ],
    medical_docs: [
      { label: "Discharge Summary", value: "discharge" },
      { label: "Hospital Bills", value: "bills" },
      { label: "Insurance", value: "insurance" },
      { label: "Referral Letters", value: "referral" },
      { label: "Medical Certificates", value: "certs" },
      { label: "Vaccination Records", value: "vaccine" },
      { label: "Surgery / Procedure Reports", value: "surgery" },
    ],
  };

  const handleSave = async () => {};

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPdfFileUrl(url);
      setPdfFile(file); // store actual file
      console.log("PDF File URL:", url);
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
          <IonTitle>{t("home.Medical Records")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="m-3">
          <p className="m-0">{t("report.Document Name")}</p>
          <InputText
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            placeholder={t("report.Enter Document Name")}
            className="w-full inputBoxMedrec my-2"
          />
          <p className="m-0">{t("report.Date")}</p>
          <Calendar
            id="buttondisplay"
            className="w-full inputBoxMedrec my-2"
            value={date}
            placeholder={t("report.Enter Date")}
            onChange={(e) => setDate(e.value)}
            maxDate={today}
          />
          <p className="m-0">{t("report.Document Category")}</p>
          <Dropdown
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.value);
              setSelectedSubItem(null);
            }}
            options={categories}
            placeholder={t("report.Select Category")}
            className="w-full my-2 inputBoxMedrec"
          />
          <p className="m-0">{t("report.Document Sub Category")}</p>
          <Dropdown
            value={selectedSubItem}
            onChange={(e) => setSelectedSubItem(e.value)}
            options={selectedCategory ? subItems[selectedCategory] : []}
            placeholder={t("report.Select Sub-category")}
            className="w-full inputBoxMedrec my-2"
            disabled={!selectedCategory}
          />
          <p className="m-0">{t("report.Notes")}</p>
          <InputText
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t("report.Enter Record notes")}
            className="w-full my-2"
          />
          <p className="m-0">{t("report.Medical Center Name")}</p>
          <InputText
            value={centerName}
            onChange={(e) => setCenterName(e.target.value)}
            placeholder={t("report.Enter Medical Center Name")}
            className="w-full my-2"
          />
          <p className="m-0">{t("report.Upload Medical Records")}</p>
          <div className="flex justify-content-center m-2">
            {/* <IonChip onClick={() => fileInputRef.current?.click()}> */}
            <IonChip id="open-modal">
              {t("report.Choose Medical Records")}
            </IonChip>{" "}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            multiple
            onChange={async (e) => {
              const files = e.target.files;
              if (!files) return;

              const fileArray = Array.from(files);
              for (const file of fileArray) {
                if (file.type === "application/pdf") {
                  const url = await uploadToServer(file);
                  if (url) {
                    setUploadedFiles((prev) => [...prev, url]);
                  }
                }
              }
              // Clear input value so same file can be re-uploaded if needed
              e.target.value = "";
            }}
            hidden
          />

          {uploadedFiles.length > 0 && (
            <div className="m-3">
              <p className="font-bold">{t("report.Uploaded PDFs:")}</p>
              {uploadedFiles.map((url, index) => (
                <div key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {t("report.PDF")} {index + 1}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
        <IonModal
          ref={modal}
          trigger="open-modal"
          initialBreakpoint={0.2}
          breakpoints={[0, 0.2]}
        >
          <div className="w-full flex align-items-center justify-content-center">
            <div
              className="flex align-items-center gap-3 mt-2 justify-content-center"
              style={{ width: "28%", minWidth: "100px", cursor: "pointer" }}
            >
              <div
                className="cardContents flex-1 shadow-3 border-round-lg py-2 px-3 my-3 flex flex-column align-items-center"
                onClick={() => {
                  modal.current?.dismiss(); // Close the modal
                  history.push("/cameraMR");
                }}
              >
                <img src={camera} alt="" />
                <p className="m-0 text-xs">{t("report.Capture")}</p>
              </div>
              <div
                className="cardContents flex-1 shadow-3 border-round-lg py-2 px-3 my-3 flex flex-column align-items-center"
                style={{ width: "28%", minWidth: "100px", cursor: "pointer" }}
                onClick={() => {
                  modal.current?.dismiss(); // Close the modal
                  history.push("/photoMR");
                }}
              >
                <img src={photo} alt="" />
                <p className="m-0 text-xs">{t("report.Photos")}</p>
              </div>
              <div
                style={{ width: "28%", minWidth: "100px", cursor: "pointer" }}
                className="cardContents flex-1 shadow-3 border-round-lg py-2 px-3 my-3 flex flex-column align-items-center"
                onClick={async () => {
                  modal.current?.dismiss();
                  // Trigger file input click
                  fileInputRef.current?.click();
                }}
              >
                <img src={document} alt="" />
                <p className="m-0 text-xs">{t("report.PDF")}</p>
              </div>
            </div>
          </div>
        </IonModal>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <button
            onClick={() => {
              handleSave();
            }}
            className={`questionSubmitButton`}
          >
            {t("report. Save Document")}
          </button>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default MedicalRecordUpload;
