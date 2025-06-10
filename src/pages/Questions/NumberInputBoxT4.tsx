import { Divider } from "primereact/divider";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import React, { useState } from "react";
// import Domain from "../Domain/Domain";
// import ShowCard from "../ShowCard/ShowCard";

interface NumberInputBoxT4Props {
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

const NumberInputBoxT4: React.FC<NumberInputBoxT4Props> = ({
  label,
  type,
  onClickOpt,
  onEdit,
}) => {
  const [value, setValue] = useState<number>();

  const handleButtonClick = () => {
    const forwardQId = label.options[0]?.forwardQId || "";
    onClickOpt(String(value), label.questionId, forwardQId);
    onEdit(label.questionType, value, forwardQId);
  };

  return (
    <div className="questionsOutline">
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          handleButtonClick();
        }}
      >
        <div className="questionsType inputText">
          {/* <Domain questionId={label.questionId} /> */}
          <p className="questionText ">{label.questionText}</p>
          {/* <ShowCard questionId={label.questionId} /> */}
          <div
            className="p-inputgroup flex-1 align-items-center justify-content-center"
            style={{
              border: "1.5px solid var(--med-dark-green)",
              borderRadius: "10px",
            }}
          >
            <InputNumber
              id="fullInput"
              style={{ textAlign: "left" }}
              value={value}
              onValueChange={(e: InputNumberValueChangeEvent) => {
                console.log("\n\n\ne line 67 ---->", e);
                setValue(e.value as number);
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

export default NumberInputBoxT4;
