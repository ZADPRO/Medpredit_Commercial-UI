import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
// import ShowCard from "../ShowCard/ShowCard";
// import Domain from "../Domain/Domain";
 
interface TextInputBoxProps {
  type: string;
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
  onClickOpt: (value: string, questionId: number, forwardQId: string) => void;
  onEdit: (questionType: any, value: any, forwardQId: string) => void;
}
 
const YearNMonth: React.FC<TextInputBoxProps> = ({
  label,
  type,
  onClickOpt,
  onEdit,
}) => {
  const [value, setValue]: any = useState<string | null>(null);
 
  const handleButtonClick = () => {
    const forwardQId = label.options[0]?.forwardQId || "";
    onClickOpt(String(value), label.questionId, forwardQId);
    onEdit(
      label.questionType,
      selectedButton === "year"
        ? parseFloat(value).toFixed(2)
        : selectedButton === "month"
          ? (parseFloat(value) / 12).toFixed(2)
          : selectedButton === "week"
            ? (parseFloat(value) / 52).toFixed(2)
            : value,
      forwardQId
    );
  };
 
  const [selectedButton, setSelectedButton] = useState("year");
 
  return (
    <div className="questionsOutline">
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          handleButtonClick();
        }}
      >
        <div className="questions inputText">
          {/* <Domain questionId={label.questionId} /> */}
          <p className="questionText">{label.questionText}</p>
          {/* <ShowCard questionId={label.questionId} /> */}
          <div
            className="questionsbuttonGroup_01"
            style={{ display: "flex", width: "100%", paddingBottom: "10px" }}
          >
            <div
              className={`questionsTextOptions_01 ${
                selectedButton === "year" && "selected"
              }`}
              onClick={() => {
                setSelectedButton("year");
              }}
              style={{ width: "30%", fontSize: "0.7rem" }}
            >
              Year
            </div>
            <div
              className={`questionsTextOptions_01 ${
                selectedButton === "month" && "selected"
              }`}
              onClick={() => {
                setSelectedButton("month");
              }}
              style={{ width: "30%", fontSize: "0.7rem" }}
            >
              Month
            </div>
            <div
              className={`questionsTextOptions_01 ${
                selectedButton === "week" && "selected"
              }`}
              onClick={() => {
                setSelectedButton("week");
              }}
              style={{ width: "30%", fontSize: "0.7rem" }}
            >
              Week
            </div>
          </div>
          <div
            className="p-inputgroup flex-1 align-items-center justify-content-center"
            style={{ border: "1.5px solid var(--med-dark-green)", borderRadius: "10px" }}
          >
            <InputText
              type="number"
              id="fullInput"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              min={1}
              required
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
                style={{
                  background: "var(--med-light-green)",
                  width: "30px",
                  height: "30px",
                  color: "var(--med-dark-green)",
                  borderRadius: "50%",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i className="pi pi-arrow-right"></i>
              </button>
            </div>
          </div>
          <Divider />
        </div>
      </form>
    </div>
  );
};
 
export default YearNMonth;