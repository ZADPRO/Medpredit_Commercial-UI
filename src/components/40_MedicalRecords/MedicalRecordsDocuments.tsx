import React, { useEffect, useState } from "react";
import folderIcon from "../../assets/MedicalRecords/pdf1.png";
import axios from "axios";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { IonSkeletonText, IonText } from "@ionic/react";
import { useTranslation } from "react-i18next";

interface Props {
  records: any[];
}

const subItems: { [key: string]: { label: string; value: string }[] } = {
  reports: [
    { label: "Lab Test Reports", value: "lab" },
    { label: "X-Ray", value: "xray" },
    { label: "Scans (CT/MRI/Ultrasound)", value: "scans" },
    { label: "Echo / ECG", value: "echo" },
    { label: "Biopsy", value: "biopsy" },
    { label: "Pathology", value: "pathology" },
    { label: "Doctor's Prescription", value: "doctor_presc" },
    { label: "Medication List", value: "med_list" },
    { label: "Dosage Schedule", value: "dosage" },
    { label: "Treatment Notes", value: "treatment_notes" },
    { label: "Follow-up Advice", value: "followup" },
    { label: "Discharge Summary", value: "discharge" },
    { label: "Hospital Bills", value: "bills" },
    { label: "Insurance", value: "insurance" },
    { label: "Referral Letters", value: "referral" },
    { label: "Medical Certificates", value: "certs" },
    { label: "Vaccination Records", value: "vaccine" },
    { label: "Surgery / Procedure Reports", value: "surgery" },
  ],
};

const getSubcategoryLabel = (category: string, subValue: string): string => {
  const categoryItems = subItems[category] || [];
  const found = categoryItems.find((item) => item.value === subValue);
  return found ? found.label : "-";
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",")[1]; // Remove "data:*/*;base64," prefix
      resolve(base64);
    };
    reader.readAsDataURL(blob);
  });
};
const MedicalRecordsDocuments: React.FC<Props> = ({ records }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [records]);

  const handleDocClick = async (refDocId: number) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_COMMERCIAL_URL}/medicalRecordsDownload`,
        { refDocId },
        { responseType: "blob" }
      );
      console.log("response", response);

      const fileBlob = response.data;
      console.log("fileBlob", fileBlob);
      const contentType = fileBlob.type || "application/pdf";
      console.log("contentType", contentType);

      // Convert blob to base64
      const base64Data = await blobToBase64(fileBlob);
      console.log("base64Data", base64Data);

      // Create file name
      const fileName = `document_${refDocId}.pdf`;
      console.log("fileName", fileName);

      // Save file to device
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Documents,
      });

      // Get file URI
      const fileUriResult = await Filesystem.getUri({
        path: fileName,
        directory: Directory.Documents,
      });

      const fileUri = fileUriResult.uri;
      console.log("fileUri", fileUri);

      // Open the PDF
      await FileOpener.open({
        filePath: fileUri,
        contentType: "application/pdf",
      });

      console.log("PDF saved and opened successfully!");
    } catch (error) {
      console.error("Error downloading or opening PDF:", error);
    }
  };
  const { t } = useTranslation("global");

  return (
    <div>
      {loading ? (
        <>
          {[...Array(3)].map((_, idx) => (
            <div className="flex shadow-2 m-2 p-3 border-round-lg" key={idx}>
              <IonSkeletonText
                animated
                style={{ width: "60px", height: "60px", borderRadius: "8px" }}
              />
              <div className="flex flex-column pl-3 w-full">
                <IonSkeletonText
                  animated
                  style={{ width: "70%", height: "12px", marginBottom: "6px" }}
                />
                <IonSkeletonText
                  animated
                  style={{ width: "50%", height: "12px", marginBottom: "6px" }}
                />
                <IonSkeletonText
                  animated
                  style={{ width: "40%", height: "12px", marginBottom: "6px" }}
                />
                <IonSkeletonText
                  animated
                  style={{ width: "30%", height: "12px" }}
                />
              </div>
            </div>
          ))}
        </>
      ) : records.length === 0 ? (
        <IonText color="medium">{t("home.No reports available.")}</IonText>
      ) : (
        records.map((record) => {
          const docName = record.refDocName || "-";
          const centerName = record.refMedicalCenterName || "-";
          const subCategoryLabel = getSubcategoryLabel(
            "reports",
            record.refSubCategory
          );
          const formattedDate = formatDate(record.refDateOfDoc);

          return (
            <div
              className="flex shadow-2 m-2 p-3 border-round-lg"
              key={record.refDocId}
              onClick={() => handleDocClick(record.refDocId)}
            >
              <img
                src={folderIcon}
                alt="folder"
                className="medicalRecordsIcon"
              />
              <div className="flex flex-column pl-3 w-full">
                <p className="font-bold uppercase m-0">{docName}</p>
                <p className="m-0">{centerName}</p>
                <p className="text-sm text-secondary m-0">{subCategoryLabel}</p>
                <p className="flex text-xs justify-content-end m-0">
                  Date - {formattedDate}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MedicalRecordsDocuments;
