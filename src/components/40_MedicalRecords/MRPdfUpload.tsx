import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useRef, useState } from "react";
import PdfThumbnail from "../../assets/MedicalRecords/folder.svg";

import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import decrypt from "../../helper";
import { useHistory } from "react-router";

const MRPdfUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pdfFileUrl, setPdfFileUrl] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null); // hold actual file
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [docName, setDocName] = useState("");
  const [notes, setNotes] = useState("");
  const [centerName, setCenterName] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

  const today = new Date();
  const history = useHistory();

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPdfFileUrl(url);
      setPdfFile(file); // store actual file
      console.log("PDF File URL:", url);
    }
  };

  const openNativeViewer = () => {
    if (pdfFileUrl) {
      window.open(pdfFileUrl, "_blank");
    }
  };

  const handleSave = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }

    console.log("Saving document with values:");
    console.log({
      docName,
      date,
      selectedCategory,
      selectedSubItem,
      notes,
      centerName,
      pdfFile,
    });

    const userDetails = localStorage.getItem("userDetails");
    const userDeatilsObj = userDetails
      ? JSON.parse(userDetails)
      : { userId: null, token: null };

    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("docName", docName);
    formData.append("date", date ? date.toISOString() : "");
    formData.append("category", selectedCategory ?? "");
    formData.append("subCategory", selectedSubItem ?? "");
    formData.append("notes", notes);
    formData.append("centerName", centerName);
    formData.append("userId", userDeatilsObj.userId);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_COMMERCIAL_URL}/medicalRecordsUpload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("data", data);
      if (data.status) {
        history.replace("/MedicalRecords", { shouldReload: true });
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("An error occurred during upload.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              mode="md"
              defaultHref="/MedicalRecords"
              icon={chevronBack}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>PDF Records</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <div className="custom-border-box flex flex-column m-3 py-5 border-round-lg font-medium align-items-center justify-content-center bg-white">
          {!pdfFileUrl && (
            <>
              <p className="font-bold text-xl m-0">Upload PDF</p>
              <p className="text-sm pb-3 m-0">Browse Your PDF To Upload</p>
              <IonChip onClick={() => fileInputRef.current?.click()}>
                Browse Files
              </IonChip>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                hidden
              />
            </>
          )}

          {pdfFileUrl && (
            <div
              className="cursor-pointer mt-4"
              style={{
                height: "40vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={openNativeViewer}
            >
              <img
                src={PdfThumbnail}
                alt="PDF Preview"
                style={{
                  maxHeight: "100%",
                  maxWidth: "90%",
                  objectFit: "contain",
                  borderRadius: "12px",
                }}
              />
            </div>
          )}
        </div>

        <div className="m-3">
          {pdfFileUrl && (
            <>
              <p>Document Name</p>
              <InputText
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="Enter Document Name"
                className="w-full inputBoxMedrec my-2"
              />

              <p>Date</p>
              <Calendar
                id="buttondisplay"
                className="w-full inputBoxMedrec my-2"
                value={date}
                placeholder="Enter Date"
                onChange={(e) => setDate(e.value)}
                maxDate={today}
              />

              <p>Document Category</p>
              <Dropdown
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.value);
                  setSelectedSubItem(null);
                }}
                options={categories}
                placeholder="Select Category"
                className="w-full my-2 inputBoxMedrec"
              />

              <p>Document Sub Category</p>
              <Dropdown
                value={selectedSubItem}
                onChange={(e) => setSelectedSubItem(e.value)}
                options={selectedCategory ? subItems[selectedCategory] : []}
                placeholder="Select Sub-category"
                className="w-full inputBoxMedrec my-2"
                disabled={!selectedCategory}
              />

              <p>Notes</p>
              <InputText
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter Record notes"
                className="w-full my-2"
              />

              <p>Medical Center Name</p>
              <InputText
                value={centerName}
                onChange={(e) => setCenterName(e.target.value)}
                placeholder="Enter Medical Center Name"
                className="w-full my-2"
              />

              <IonButton expand="block" onClick={handleSave}>
                Save Document
              </IonButton>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MRPdfUpload;
