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
import { Nullable } from "primereact/ts-helpers";
import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";

const PdfMedicalRecord: React.FC = () => {
  const [date, setDate] = useState<Nullable<Date>>(null);

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
          <IonTitle>Upload PDF Records </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="fullscreen">
        <div className="pdfFormContents ion-padding">
          <div className="inputBox">
            <label>
              Medical Report Name <span style={{ color: "red" }}>*</span>
            </label>
            <div className={`p-inputgroup addFamilyInputField `}>
              <span className="addFamilyInputField_Icon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                style={{ width: "100%", textAlign: "left" }}
                className="addFamilyInputText"
                // disabled={!isEditing}
                // value={formData.refUserFname}
                // onChange={handleInputChange}
                placeholder="Enter Medical Report Name"
                name="refUserFname"
              />
            </div>
          </div>
          <div className="inputBox">
            <label>
              Type of Report <span style={{ color: "red" }}>*</span>
            </label>
            <div className={`p-inputgroup addFamilyInputField `}>
              <span className="addFamilyInputField_Icon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                style={{ width: "100%", textAlign: "left" }}
                className="addFamilyInputText"
                // disabled={!isEditing}
                // value={formData.refUserFname}
                // onChange={handleInputChange}
                placeholder="Blood Test, X-ray, etc."
                name="refUserFname"
              />
            </div>
          </div>
          <div className="inputBox">
            <label>
              Date of Report <span style={{ color: "red" }}>*</span>
            </label>
            <div className={`p-inputgroup addFamilyInputFieldCalendar `}>
              <span className="addFamilyInputField_Icon">
                <i className="pi pi-user"></i>
              </span>
              <Calendar
                className="primeReactCalendar"
                // disabled={!isEditing}
                value={date}
                onChange={(e) => setDate(e.value)}
                showButtonBar
                // onChange={handleInputChange}
                placeholder="Enter Medical Report Name"
                name="refUserFname"
              />
            </div>
          </div>
          <div className="inputBox">
            <label>
              Doctor's Name <span style={{ color: "red" }}>*</span>
            </label>
            <div className={`p-inputgroup addFamilyInputField `}>
              <span className="addFamilyInputField_Icon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                style={{ width: "100%", textAlign: "left" }}
                className="addFamilyInputText"
                // disabled={!isEditing}
                // value={formData.refUserFname}
                // onChange={handleInputChange}
                placeholder="Doctor's Name"
                name="refUserFname"
              />
            </div>
          </div>
          <div className="inputBox">
            <label>Notes or Description</label>
            <div className={`p-inputgroup addFamilyInputField `}>
              <span className="addFamilyInputField_Icon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                style={{ width: "100%", textAlign: "left" }}
                className="addFamilyInputText"
                // disabled={!isEditing}
                // value={formData.refUserFname}
                // onChange={handleInputChange}
                placeholder="Enter Notes or Description"
                name="refUserFname"
              />
            </div>
          </div>

          <div className="inputBox">
            <label className="pb-2">Upload Medical Record</label>
            <FileUpload
              className="w-full"
              name="demo[]"
              url={"/api/upload"}
              multiple
              accept="application/pdf"
              maxFileSize={10000000}
              emptyTemplate={
                <p className="m-0">Drag and drop files to here to upload.</p>
              }
            />
            <p>
              Note: If you are selecting multiple files, try to select at once,
              Don't try to upload individual files.{" "}
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
            <button className="questionSubmitButton">Submit</button>
          </div>
          {/* <IonButton expand="block">Next</IonButton> */}
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default PdfMedicalRecord;
