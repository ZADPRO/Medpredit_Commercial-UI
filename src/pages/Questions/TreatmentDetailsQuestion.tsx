import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { IonToast } from "@ionic/react";
import { Divider } from "primereact/divider";

interface QuestionSet {
  nameOfMedicine: string;
  category: string | null;
  strength: number | null;
  roa: string | null;
  relationToFood: string | null;
  morningdosage: number | null;
  morningtime: Date | null;
  afternoondosage: number | null;
  afternoontime: Date | null;
  eveningdosage: number | null;
  eveningtime: Date | null;
  nightdosage: number | null;
  nighttime: Date | null;
  monthsduration: number | null;
  yearsduration: number | null;
}

interface TreatmentDetailsQuestionProps {
  SubmitActive: (active: boolean) => void;
  handleData: (data: QuestionSet[]) => void;
}

const categoryOptions = [
  "Anti-diabetic",
  "Anti-hypertensive",
  "Anti-thrombotic",
  "Antibiotic",
  "NSAIDS",
  "Steroids",
  "Vitamin and Mineral Supplements",
  "Others",
];

const roaOptions = ["PO", "IM", "IV", "SC", "ID", "PV", "PR"];
const relationToFoodOptions = ["Before Food", "After Food"];

const createNewQuestionSet = (): QuestionSet => ({
  nameOfMedicine: "",
  category: null,
  strength: null,
  roa: null,
  relationToFood: null,
  morningdosage: null,
  morningtime: null,
  afternoondosage: null,
  afternoontime: null,
  eveningdosage: null,
  eveningtime: null,
  nightdosage: null,
  nighttime: null,
  monthsduration: null,
  yearsduration: null,
});

const TreatmentDetailsQuestion: React.FC<TreatmentDetailsQuestionProps> = ({
  SubmitActive,
  handleData,
}) => {
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const handleInputChange = <T extends keyof QuestionSet>(
    index: number,
    field: T,
    value: QuestionSet[T]
  ) => {
    const updatedSets = [...questionSets];
    updatedSets[index][field] = value;
    setQuestionSets(updatedSets);
  };

  const [toastOpen, setToastOpen] = useState({
      status: false,
      message: "",
    });

  console.log("questionSets", questionSets);
  

  const handleAddSet = () => {
    if(questionSets.length === 0) {
      setQuestionIndex(0);
      setQuestionSets([...questionSets, createNewQuestionSet()]);
    }
    else if (verifyForm() == true) {
      setQuestionIndex(questionIndex + 1);
      setQuestionSets([...questionSets, createNewQuestionSet()]);
    }
  };

  
  const handleRemoveSet = (index: number) => {
    const updatedSets = questionSets.filter((_, i) => i !== index);
    setQuestionSets(updatedSets);
    setQuestionIndex(questionSets.length > 0 ?  questionIndex - 1 : 0);
  };

  const verifyForm = () => {
    if (questionSets[questionIndex].nameOfMedicine?.length === 0) {
      setToastOpen({ status: true, message: "Please enter a valid medicine name" });
      return false;
    } else if (questionSets[questionIndex].category === null) {
      setToastOpen({ status: true, message: "Please select a valid category" });
      return false;
    } else if (questionSets[questionIndex].roa === null) {
      setToastOpen({ status: true, message: "Please select a valid ROA" });
      return false;
    } else if (questionSets[questionIndex].relationToFood === null) {
      setToastOpen({ status: true, message: "Please select a valid relation to food" });
      return false;
    } else if (
      (questionSets[questionIndex].morningdosage === null || questionSets[questionIndex].morningtime === null) && 
      (questionSets[questionIndex].afternoondosage === null || questionSets[questionIndex].afternoontime === null) &&
      (questionSets[questionIndex].eveningdosage === null || questionSets[questionIndex].eveningtime === null) &&
      (questionSets[questionIndex].nightdosage === null || questionSets[questionIndex].nighttime === null)
    ) {
      setToastOpen({ status: true, message: "Please enter at least one Dosage and it's timing" });
      return false;
    }
    
    return true;
  };

  useEffect(() => {
    if (questionSets.length > 0 && questionSets.length == questionIndex+1) {
      if (
        questionSets[questionIndex].nameOfMedicine.length !== 0 &&
        questionSets[questionIndex].category !== null &&
        questionSets[questionIndex].roa !== null &&
        questionSets[questionIndex].relationToFood !== null &&
        (
          (questionSets[questionIndex].morningdosage != null && questionSets[questionIndex].morningtime != null) ||
          (questionSets[questionIndex].afternoondosage !== null && questionSets[questionIndex].afternoontime !== null) ||
          (questionSets[questionIndex].eveningdosage !== null && questionSets[questionIndex].eveningtime !== null) ||
          (questionSets[questionIndex].nightdosage !== null && questionSets[questionIndex].nighttime !== null)
        )
      ) {
        SubmitActive(false);
      } else {
        SubmitActive(true);
      }
    }
    handleData(questionSets);
    console.log("SubmitActive", SubmitActive);
  }, [questionSets, SubmitActive, handleData]);

  return (
    <div>
      {questionSets.map((set, index) => (
        <div
          key={index}
          className="questionsType"
          style={{ marginBottom: "10px" }}
        >
          {/* Medicine Name */}
          <div className="questions">
            <p className="questionText">Name of Medicine</p>
            <InputText
              style={{
                border: "1.5px solid #10416a",
                borderRadius: "10px",
                width: "100%",
              }}
              id="fullInput"
              value={set.nameOfMedicine}
              onChange={(e) =>
                handleInputChange(index, "nameOfMedicine", e.target.value)
              }
              placeholder="Enter Medicine Name"
              required
            />
          </div>

          {/* Category */}
          <div className="questions inputText">
            <p className="questionText">Category</p>
            <Dropdown
              id="dropValue"
              options={categoryOptions}
              value={set.category || undefined}
              placeholder="Select a Category"
              onChange={(e) => handleInputChange(index, "category", e.value)}
              style={{
                width: "100%",
                background: "transparent",
                height: "35px",
                fontSize: "1rem",
                border: "1.5px solid #10416a",
                borderRadius: "10px",
              }}
            />
          </div>

          {/* Strength */}
          <div className="questions inputText">
            <p className="questionText">Strength (mg)</p>
            <InputNumber
              style={{
                border: "1.5px solid #10416a",
                borderRadius: "10px",
                width: "100%",
              }}
              id="fullInput"
              value={set.strength || undefined}
              onChange={(e) => handleInputChange(index, "strength", e.value)}
              placeholder="Strength"
            />
          </div>

          {/* ROA */}
          <div className="questions inputText">
            <p className="questionText">ROA</p>
            <Dropdown
              id="dropValue"
              style={{
                width: "100%",
                background: "transparent",
                height: "35px",
                fontSize: "1rem",
                border: "1.5px solid #10416a",
                borderRadius: "10px",
              }}
              options={roaOptions}
              value={set.roa || undefined}
              placeholder="Select a ROA"
              onChange={(e) => handleInputChange(index, "roa", e.value)}
            />
          </div>

          {/* Relation to Food */}
          <div className="questions inputText">
            <p className="questionText">Relation to Food</p>
            <Dropdown
              id="dropValue"
              style={{
                width: "100%",
                background: "transparent",
                height: "35px",
                fontSize: "1rem",
                border: "1.5px solid #10416a",
                borderRadius: "10px",
              }}
              options={relationToFoodOptions}
              value={set.relationToFood || undefined}
              placeholder="Select a Relation to Food"
              onChange={(e) =>
                handleInputChange(index, "relationToFood", e.value)
              }
            />
          </div>

          {/* Dosage Time */}
          {[
            {
              label: "Morning",
              dosageKey: "morningdosage",
              timeKey: "morningtime",
            },
            {
              label: "Afternoon",
              dosageKey: "afternoondosage",
              timeKey: "afternoontime",
            },
            {
              label: "Evening",
              dosageKey: "eveningdosage",
              timeKey: "eveningtime",
            },
            { label: "Night", dosageKey: "nightdosage", timeKey: "nighttime" },
          ].map(({ label, dosageKey, timeKey }) => (
            <div
              key={label}
              className="questions inputText"
              style={{ marginBottom: "15px" }}
            >
              <p className="questionText">{`${label} Dosage`}</p>
              <div
                className="p-inputgroup flex-1"
                style={{ border: "1.5px solid #10416a", borderRadius: "10px" }}
              >
                <InputNumber
                  id="hrsInputLeft"
                  style={{ width: "40%" }}
                  value={set[dosageKey as keyof QuestionSet] as number | null} // Cast to expected type
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      dosageKey as keyof QuestionSet,
                      e.value as number | null
                    )
                  }
                  placeholder="Dosage"
                />
                <Calendar
                  id="fullInput"
                  style={{ width: "50%" }}
                  value={set[timeKey as keyof QuestionSet] as Date | null} // Cast to expected type
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      timeKey as keyof QuestionSet,
                      e.value as Date | null
                    )
                  }
                  timeOnly
                  hourFormat="12"
                  placeholder="Time"
                />
                <div
                  style={{
                    width: "10%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderLeft: "1.5px solid #10416a",
                  }}
                  onClick={() => {
                    handleInputChange(index, dosageKey as keyof QuestionSet, null);
                    handleInputChange(index, timeKey as keyof QuestionSet, null);
                  }}
                
                >
                  <i className="pi pi-trash"></i>
                </div>
              </div>
            </div>
          ))}

          {/* Duration */}
          <div className="questions">
            <p className="questionText" style={{ marginBottom: "5px" }}>
              Duration
            </p>
            <div
              className="p-inputgroup flex-1"
              style={{ border: "1.5px solid #10416a", borderRadius: "10px" }}
            >
              <InputNumber
                id="hrsInputLeft"
                style={{ width: "40%" }}
                onChange={(e) =>
                  handleInputChange(index, "monthsduration", e.value)
                }
                placeholder="Months"
                min={0}
                required
              />
              <InputNumber
                id="fullInput"
                style={{ width: "60%" }}
                value={set.yearsduration || undefined}
                onChange={(e) =>
                  handleInputChange(index, "yearsduration", e.value)
                }
                placeholder="Years"
                min={0}
                required
              />
            </div>
          </div>

          {/* Remove Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={() => handleRemoveSet(index)}
              className="p-button p-component"
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                width: "30%",
                backgroundColor: "rgb(222, 54, 54)",
                color: "#fff",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "5px",
              }}
            >
              <div>Clear</div>
            </button>
          </div>
          {index != questionIndex && <Divider />}
        </div>
      ))}

      {/* Add New Set Button */}
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
          onClick={handleAddSet}
          className="p-button p-component questionsTextOptions_01 selected"
          style={{
            marginBottom: "15px",
            width: "100%",
            backgroundColor: "#219C90",
            color: "#fff",
            padding: "15px",
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          Add New Treatment Details
        </button>
      </div>
      <Divider />
      <IonToast
        style={{ "--color": "red", "font-weight": "bold" }}
        isOpen={toastOpen.status}
        onDidDismiss={() => setToastOpen({ status: false, message: "" })}
        message={toastOpen.message}
        duration={3000}
      />
    </div>
  );
};

export default TreatmentDetailsQuestion;
