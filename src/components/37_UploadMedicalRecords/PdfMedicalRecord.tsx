import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import {
  FileUpload,
  FileUploadSelectEvent,
  FileUploadHandlerEvent,
} from "primereact/fileupload";
import axios from "axios";

const PdfMedicalRecord: React.FC = () => {
  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

  const [formData, setFormData] = useState<{
    reportName: string;
    reportType: string;
    reportDate: Date | null;
    doctorName: string;
    reportDescription: string;
    reportFiles: File[];
  }>({
    reportName: "",
    reportType: "",
    reportDate: null,
    doctorName: "",
    reportDescription: "",
    reportFiles: [],
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      reportDate: e.value,
    }));
  };

  const handleFileSelect = (e: FileUploadSelectEvent) => {
    const files = Array.from(e.files) as File[];
    setFormData((prevData) => ({
      ...prevData,
      reportFiles: files,
    }));
  };

  const uploadHandler = async (e: FileUploadHandlerEvent) => {
    const files = e.files as File[];

    const uploadFormData = new FormData();
    files.forEach((file) => {
      uploadFormData.append("files", file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_DOC_URL}/pdfMedicalRecords/uploadPdf`,
        uploadFormData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        alert("Files uploaded successfully!");
      } else {
        alert("Failed to upload files.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading files.");
    }
  };

  const handleSubmit = () => {
    console.log("Form data submitted:", formData);
    alert("Form data collected! (Upload already done separately)");
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
          <IonTitle>Upload PDF Records</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="fullscreen">
        <div className="pdfFormContents ion-padding">
          {/* All Input Fields */}
          {/* Report Name */}
          <div className="inputBox">
            <label>
              Medical Report Name <span style={{ color: "red" }}>*</span>
            </label>
            <div className="p-inputgroup addFamilyInputField">
              <span className="addFamilyInputField_Icon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                style={{ width: "100%", textAlign: "left" }}
                className="addFamilyInputText"
                value={formData.reportName}
                onChange={handleInputChange}
                placeholder="Enter Medical Report Name"
                name="reportName"
              />
            </div>
          </div>

          {/* Report Type */}
          <div className="inputBox">
            <label>
              Type of Report <span style={{ color: "red" }}>*</span>
            </label>
            <div className="p-inputgroup addFamilyInputField">
              <span className="addFamilyInputField_Icon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                style={{ width: "100%", textAlign: "left" }}
                className="addFamilyInputText"
                value={formData.reportType}
                onChange={handleInputChange}
                placeholder="Blood Test, X-ray, etc."
                name="reportType"
              />
            </div>
          </div>

          {/* Report Date */}
          <div className="inputBox">
            <label>
              Date of Report <span style={{ color: "red" }}>*</span>
            </label>
            <div className="p-inputgroup addFamilyInputFieldCalendar">
              <span className="addFamilyInputField_Icon">
                <i className="pi pi-user"></i>
              </span>
              <Calendar
                className="primeReactCalendar"
                value={formData.reportDate}
                showButtonBar
                onChange={handleDateChange}
                placeholder="Select Report Date"
              />
            </div>
          </div>

          {/* Doctor Name */}
          <div className="inputBox">
            <label>
              Doctor's Name <span style={{ color: "red" }}>*</span>
            </label>
            <div className="p-inputgroup addFamilyInputField">
              <span className="addFamilyInputField_Icon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                style={{ width: "100%", textAlign: "left" }}
                className="addFamilyInputText"
                value={formData.doctorName}
                onChange={handleInputChange}
                placeholder="Doctor's Name"
                name="doctorName"
              />
            </div>
          </div>

          {/* Description */}
          <div className="inputBox">
            <label>Notes or Description</label>
            <div className="p-inputgroup addFamilyInputField">
              <span className="addFamilyInputField_Icon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                style={{ width: "100%", textAlign: "left" }}
                className="addFamilyInputText"
                value={formData.reportDescription}
                onChange={handleInputChange}
                placeholder="Enter Notes or Description"
                name="reportDescription"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="inputBox">
            <label className="pb-2">Upload Medical Record</label>
            <FileUpload
              className="w-full"
              name="pdfFiles"
              multiple
              accept="application/pdf"
              maxFileSize={10000000}
              customUpload
              uploadHandler={uploadHandler}
              onSelect={handleFileSelect}
              emptyTemplate={
                <p className="m-0">Drag and drop files here to upload.</p>
              }
            />
            <p>
              Note: If you are selecting multiple files, try to select all at
              once. Don’t upload them one by one.
            </p>
          </div>
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className="questionSubmitButton" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default PdfMedicalRecord;
