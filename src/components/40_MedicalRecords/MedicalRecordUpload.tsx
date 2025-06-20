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

const MedicalRecordUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [date, setDate] = useState<Nullable<Date>>(null);
  const [docName, setDocName] = useState("");
  const [notes, setNotes] = useState("");
  const [centerName, setCenterName] = useState("");

  const [pdfFileUrl, setPdfFileUrl] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null); // hold actual file

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
          <IonTitle>Medical Records</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="m-3">
          <p className="m-0">Document Name</p>
          <InputText
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            placeholder="Enter Document Name"
            className="w-full inputBoxMedrec my-2"
          />
          <p className="m-0">Date</p>
          <Calendar
            id="buttondisplay"
            className="w-full inputBoxMedrec my-2"
            value={date}
            placeholder="Enter Date"
            onChange={(e) => setDate(e.value)}
            maxDate={today}
          />
          <p className="m-0">Document Category</p>
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
          <p className="m-0">Document Sub Category</p>
          <Dropdown
            value={selectedSubItem}
            onChange={(e) => setSelectedSubItem(e.value)}
            options={selectedCategory ? subItems[selectedCategory] : []}
            placeholder="Select Sub-category"
            className="w-full inputBoxMedrec my-2"
            disabled={!selectedCategory}
          />
          <p className="m-0">Notes</p>
          <InputText
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter Record notes"
            className="w-full my-2"
          />
          <p className="m-0">Medical Center Name</p>
          <InputText
            value={centerName}
            onChange={(e) => setCenterName(e.target.value)}
            placeholder="Enter Medical Center Name"
            className="w-full my-2"
          />
          <p className="m-0">Upload Medical Records</p>
          <div className="flex justify-content-center m-2">
            {/* <IonChip onClick={() => fileInputRef.current?.click()}> */}
            <IonChip id="open-modal">Choose Medical Records</IonChip>{" "}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            hidden
          />
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
              style={{ width: "85%" }}
            >
              <div
                className="cardContents flex-1 shadow-3 border-round-lg py-2 px-3 my-3 flex flex-column align-items-center"
                onClick={() => {
                  modal.current?.dismiss(); // Close the modal
                  history.push("/cameraMR");
                }}
              >
                <img src={camera} alt="" />
                <p className="m-0 text-xs">Capture</p>
              </div>
              <div
                className="cardContents flex-1 shadow-3 border-round-lg py-2 px-3 my-3 flex flex-column align-items-center"
                onClick={() => {
                  modal.current?.dismiss(); // Close the modal
                  history.push("/photoMR");
                }}
              >
                <img src={photo} alt="" />
                <p className="m-0 text-xs">Photos</p>
              </div>
              <div
                className="cardContents flex-1 shadow-3 border-round-lg py-2 px-3 my-3 flex flex-column align-items-center"
                onClick={() => {
                  modal.current?.dismiss(); // Close the modal
                  history.push("/pdfMR");
                }}
              >
                <img src={document} alt="" />
                <p className="m-0 text-xs">PDF</p>
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
            Save Document
          </button>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default MedicalRecordUpload;
