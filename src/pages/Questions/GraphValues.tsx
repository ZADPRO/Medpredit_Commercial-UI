import axios from "axios";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import React, { useEffect, useState } from "react";
import decrypt from "../../helper";
import { IonAlert, IonDatetime, IonModal } from "@ionic/react";
// import ShowCard from "../ShowCard/ShowCard";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";

interface GraphValuesProps {
  label: {
    questionType: string;
    questionText: string;
    questionId: number;
    options: [
      {
        backwardQId: string;
        forwardQId: string;
        refOptionId: number;
        refOptionLabel: string;
      }
    ];
  };
  onEdit: (questionType: any, value: any, forwardQId: string) => void;
  SubmitActive: (active: boolean) => void;
}

const GraphValues: React.FC<GraphValuesProps> = ({
  label,
  onEdit,
  SubmitActive,
}) => {
  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;
  const category: any = localStorage.getItem("getQuestions");
  let categoryId: any = JSON.parse(category).id;

  const [data, setData] = useState<
    {
      id: any | null;
      date: Date | null;
      number: number | null;
      flag: String | null;
    }[]
  >([
    { id: null, date: null, number: null, flag: "ui" }, // Initial state for one item
  ]);

  const forwardQId = label.options[0]?.forwardQId || "";
  const [isOpen, setIsOpen] = useState(false);
  
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const openModal = (index: number) => setOpenModalIndex(index);
  const closeModal = () => setOpenModalIndex(null);
  
  const handleChange = (
    index: number,
    field: keyof (typeof data)[0],
    value: any
  ) => {
    console.log("fffrrs");
    if (data.length > 0) {
      onEdit(label.questionType, data, forwardQId);
    }
    const updatedData = [...data];
    updatedData[index][field] = value; // Update the specific field
    setData(updatedData);
  };

  const [isAlertOpen, setIsAlertOpen] = useState({
    status: false,
    id: "",
  });

  const removeItem = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index); // Remove the item at the index
    if (data[index].flag === "ui") {
      setData(updatedData);
    } else if (data[index].flag === "temp") {
      console.log(data[index].id);
      setIsAlertOpen({ status: true, id: index.toString() });
    }
    if (updatedData.length === 0) {
      SubmitActive(true);
    }
  };

  const handleremoveScore = () => {
    const updatedData = data.filter((_, i) => i !== parseInt(isAlertOpen.id));
    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/deleteInvestigationDetail`,
            {
              investigationId: data[parseInt(isAlertOpen.id)].id,
            },
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );
            if (data.status) {
              setIsAlertOpen({ status: false, id: "" });
              setData(updatedData);
              if (updatedData.length === 0) {
                SubmitActive(true);
              }
            }
          });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }
  };

  const addItem = () => {
    // Check if all previous items have both date and number filled
    const allFieldsFilled = data.every(
      (item) => item.date !== null && item.number !== null
    );
    
    if (allFieldsFilled) {
      // If all fields are filled, add a new item
      setData([...data, { id: null, date: null, number: null, flag: "ui" }]);
    } 
    // else {
    //   // If any field is missing, show an alert or handle it accordingly
    //   alert("Please fill in all date and number fields before adding a new item.");
    // }
  };
  

  useEffect(() => {
    if (data.length === 1) {
      const { date, number } = data[0];
      // Check if both are null or both are filled
      if (
        (date === null && number === null) || 
        (date !== null && number !== null)
      ) {
        SubmitActive(false);
      } else {
        SubmitActive(true);
      }
    }
    else {
      const allFieldsFilled = data.every(
        (item) => item.date !== null && item.number !== null
      );
      if (!allFieldsFilled) {
        SubmitActive(true);
      } else {
        SubmitActive(false);
      }
    }
    
  }, [data]);
console.log(data);
  useEffect(() => {
    console.log("====================================");
    console.log(label);
    console.log("====================================");

    let temp: any = label.questionId;

    if (temp === 330 && localStorage.getItem("testQuestion") === "329") {
      categoryId = "225";
    }

    if (temp === 336 && localStorage.getItem("testQuestion") === "335") {
      categoryId = "228";
    }

    if (temp === 340 && localStorage.getItem("testQuestion") === "339") {
      categoryId = "231";
    }

    if (temp === 340 && localStorage.getItem("testQuestion") === "338") {
      categoryId = "231";
    }

    if (temp === 345 && localStorage.getItem("testQuestion") === "343") {
      categoryId = "234";
    }

    if (temp === 345 && localStorage.getItem("testQuestion") === "342") {
      categoryId = "234";
    }

    if (temp === 345 && localStorage.getItem("testQuestion") === "344") {
      categoryId = "234";
    }

    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getInvestigationDetails`,
            {
              patientId: localStorage.getItem("currentPatientId"),
              categoryId: categoryId,
            },
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );
            if (data.status) {
              if (data.data.length > 0) {
                setData(data.data);
                if (data.data.length > 0) {
                  onEdit(label.questionType, data.data, forwardQId);
                  console.log("################");
                }
                console.log(data.data);
              }
            }
          });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }
  }, [localStorage.getItem("testQuestion")]);
console.log(SubmitActive);
  return (
    <div className="questions inputText">
      <p className="questionText">{label.questionText}</p>

      <IonAlert
        isOpen={isAlertOpen.status}
        cssClass="custom-alert"
        header="Are you sure you want to delete the previous value?"
        backdropDismiss={false}
        buttons={[
          {
            text: "Yes",
            role: "confirm",
            handler: () => {
              handleremoveScore();
            },
            cssClass: "yes-button",
          },
          {
            text: "No",
            role: "cancel",
            handler: () => {},
            cssClass: "no-button",
          },
        ]}
        onDidDismiss={() => setIsAlertOpen({ status: false, id: "" })}
      />
      <div>
        {data.map((item, index) => (
          <div
            key={index}
            className="questions inputText"
            style={{ display: "flex", flexDirection: "row", width: "100%" }}
          >
            <div
              className="p-inputgroup flex-1"
              style={{
                border: "1.5px solid #10416a",
                borderRadius: "10px",
                marginBottom: "10px",
                backgroundColor: item.flag !== "ui" ? "lightblue" : "transparent",
              }}
            >
              {/* <Calendar
                id="hrsInputLeft"
                disabled={item.flag === "perm" || item.flag === "temp"}
                dateFormat="dd/mm/yy"
                value={item.date ? new Date(item.date) : null}
                onChange={(e) =>
                  handleChange(
                    index,
                    "date",
                    e.value ? e.value.toISOString() : ""
                  )
                }
                placeholder="Date"
              /> */}
              <InputText
                style={{ padding: "0", textAlign: "center" }}
                id="hrsInputLeft"
                disabled={item.flag === "perm" || item.flag === "temp"}
                value={item.date ? new Date(item.date).toISOString().split("T")[0] : ""}
                placeholder="Date"
                onClick={() => openModal(index)}
              />

              <IonModal
                isOpen={openModalIndex === index}
                id="doctorDetailsGraph"
                initialBreakpoint={1}
                onDidDismiss={closeModal}
                animated={false}
              >
                <div style={{ width: "100%", background: "#effafe" }}>
                  <IonDatetime
                    presentation="date"
                    preferWheel={true}
                    value={
                      item.date
                        ? new Date(item.date).toISOString().split("T")[0]
                        : new Date().toISOString().split("T")[0]
                    }
                    onIonChange={(e) => {
                      const selectedDate = e.detail.value as string; // Cast to string
                      handleChange(index, "date", selectedDate ? new Date(selectedDate).toISOString() : "");
                    }}
                  />
                  <Divider />
                  <div
                    style={{
                      background: "#effafe",
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      onClick={() => {
                        handleChange(index, "date", "");
                        closeModal();
                      }}
                      style={{
                        width: "40%",
                        background: "#ceebfb",
                        padding: "15px",
                        textAlign: "center",
                        fontSize: "1.1rem",
                        color: "#0c3f69",
                        borderRadius: "10px",
                        fontWeight: "600",
                      }}
                    >
                      Clear
                    </div>
                    <div
                      onClick={() => {
                        const finalDate = item.date ? new Date(item.date) : new Date();
                        handleChange(index, "date", finalDate.toISOString());
                        closeModal();
                      }}
                      style={{
                        width: "40%",
                        background:
                          "linear-gradient(27deg, rgba(16, 148, 231, 1) 0%, rgba(7, 117, 197, 1) 100%)",
                        padding: "15px",
                        textAlign: "center",
                        fontSize: "1rem",
                        color: "#fff",
                        borderRadius: "10px",
                        fontWeight: "700",
                      }}
                    >
                      Set
                    </div>
                  </div>
                </div>
              </IonModal>

              <InputNumber
                id="hrsInput"
                disabled={item.flag === "perm" || item.flag === "temp"}
                style={{ borderRadius: "10px" }}
                value={item.number}
                onChange={(e) => handleChange(index, "number", e.value)}
                placeholder="mg/dl"
              />
              <div
                style={{
                  width: "10%",
                  height: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "transparent",
                }}
              >
                <button
                  onClick={() => removeItem(index)}
                  style={{
                    background: "#10416a",
                    width: "30px",
                    height: "30px",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i className="pi pi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
        <div
          className="questionsbuttonGroup_01"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            className="p-button p-component questionsTextOptions_01 selected"
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              width: "80%",
              backgroundColor: "#219C90",
              color: "#fff",
              padding: "15px",
              display: "flex",
              justifyContent: "center",
              borderRadius: "50px",
            }}
            onClick={addItem}
          >
            Add Previous Values
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraphValues;
