import React from "react";
import folderIcon from "../../assets/MedicalRecords/folder.svg";

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

const MedicalRecordsPrescriptions: React.FC<Props> = ({ records }) => {
  return (
    <div>
      {records.length === 0 ? (
        <p>No reports available.</p>
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
            >
              <img
                src={folderIcon}
                alt="folder"
                className="medicalRecordsIcon"
              />
              <div className="flex flex-column pl-3 w-full">
                <p className="font-bold uppercase">{docName}</p>
                <p>{centerName}</p>
                <p className="text-sm text-secondary">{subCategoryLabel}</p>
                <p className="flex text-xs justify-content-end">
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

export default MedicalRecordsPrescriptions;
