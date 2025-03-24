import { Divider } from "primereact/divider";
import React, { useState, useEffect } from "react";

interface MultipleSelectProps {
  label: {
    questionType: string;
    questionText: string;
    questionId: number;
    options: {
      backwardQId: string;
      forwardQId: string;
      refOptionId: number;
      refOptionLabel: string;
    }[];
  };
  onOptionSelect: (selectedOptions: number[], forwardQIds: string[]) => void;
  onEdit: (selectedOptions: number[], forwardQIds: string[]) => void;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  label,
  onOptionSelect,
  onEdit,
}) => {
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  useEffect(() => {
    setSelectedValues([]);
  }, []);

  const handleButtonClick = (refOptionId: number, refNextQn: string) => {
    let updatedSelectedValues;

    if (selectedValues.includes(refOptionId)) {
      // If the option is already selected, remove it
      updatedSelectedValues = selectedValues.filter((id) => id !== refOptionId);
    } else {
      // Otherwise, add it to the selected values
      updatedSelectedValues = [...selectedValues, refOptionId];
    }

    setSelectedValues(updatedSelectedValues);

    
  };

  const handleSubmitClick = () => {
    // Extract forward question IDs for all selected options
    const forwardQIds = label.options
      .filter((option) => selectedValues.includes(option.refOptionId))
      .map((option) => option.forwardQId);

    // Call the callback functions with updated values
    onOptionSelect(selectedValues, forwardQIds);
    onEdit(selectedValues, forwardQIds);

    // Log the selected values and forward question IDs
    console.log("Selected Values:", selectedValues);
    console.log("Forward QIds:", forwardQIds);
  };

  return (
    <>
      {/*
    <div>
      <div className="questions multiInput">
        <Domain questionId={label.questionId} />
        <p className="question">{label.questionText}</p>
        <div className="buttonGroup">
          {label.options?.map((option) => (
            <button
              key={option.refOptionId}
              onClick={() =>
                handleButtonClick(option.refOptionId, option.forwardQId)
              }
              className={`optionButton ${selectedValues.includes(option.refOptionId) ? "selected" : ""
                }`}
            >
              {option.refOptionLabel}
            </button>
          ))}
        </div>
        <Divider />
      </div>
    </div>
    */}

      <div className="questionsType">
        <p className="questionText">{label.questionText}</p>
        <div className="questionsbuttonGroup_01">
          {label.options?.map((option) => (
            <button
              key={option.refOptionId}
              onClick={() =>
                handleButtonClick(option.refOptionId, option.forwardQId)
              }
              className={`questionsTextOptions_02 ${
                selectedValues.includes(option.refOptionId) ? "selected" : ""
              }`}
            >
              {selectedValues.includes(option.refOptionId) ? (
                <i className="pi pi-check"></i>
              ) : (
                <i></i>
              )}
              <span style={{ marginLeft: "1rem" }}>
                {option.refOptionLabel}
              </span>
            </button>
          ))}
        </div>
        <div
          style={{
            width: "100%",
            height: "35px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            background: "transparent",
            marginTop: "10px",
          }}
        >
          <button
            style={{
              background: "var(--med-dark-green)",
              width: "30px",
              height: "30px",
              color: "var(--med-light-green)",
              borderRadius: "50%",
              padding: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => handleSubmitClick()}
          >
            <i className="pi pi-arrow-right"></i>
          </button>
        </div>
        <Divider />
      </div>
    </>
  );
};

export default MultipleSelect;
