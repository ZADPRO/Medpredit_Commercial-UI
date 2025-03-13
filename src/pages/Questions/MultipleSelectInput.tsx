import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
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
    onOptionSelect: (selectedOptions: number[], forwardQIds: string[], inputValues: any) => void;
    onEdit: (selectedOptions: any, forwardQId: string) => void; // Updated to accept forwardQId
}
 
const MultipleSelectInput: React.FC<MultipleSelectProps> = ({
    label,
    onOptionSelect,
    onEdit,
}) => {
    const [selectedValues, setSelectedValues] = useState<number[]>([]);
    const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
    const [numberInputs, setNumberInputs] = useState<{ [key: number]: string }>({});
    const [selectedTimeUnits, setSelectedTimeUnits] = useState<{ [key: number]: "day" | "week" | null }>({}); // Unique state for each input
 
    useEffect(() => {
        const initialTimeUnits: { [key: number]: "day" | "week" | null } = {};
        label.options.forEach(option => {
            initialTimeUnits[option.refOptionId] = "day"; // Set default to "day"
        });
 
        setSelectedValues([]);
        setInputValues({});
        setNumberInputs({});
        setSelectedTimeUnits(initialTimeUnits); // Set default selection on mount
    }, [label.options]);
 
    const handleButtonClick = (refOptionId: number) => {
        let updatedSelectedValues;
 
        if (selectedValues.includes(refOptionId)) {
            updatedSelectedValues = selectedValues.filter((id) => id !== refOptionId);
        } else {
            updatedSelectedValues = [...selectedValues, refOptionId];
        }
 
        setSelectedValues(updatedSelectedValues);
 
        const forwardQIds = label.options
            .filter((option) => updatedSelectedValues.includes(option.refOptionId))
            .map((option) => option.forwardQId);
 
        onOptionSelect(updatedSelectedValues, forwardQIds, { ...inputValues, ...numberInputs });
    };
 
    const handleInputChange = (refOptionId: number, value: string) => {
        setInputValues((prev) => ({
            ...prev,
            [refOptionId]: value,
        }));
    };
 
    const handleNumberInputChange = (refOptionId: number, value: string) => {
        setNumberInputs((prev) => ({
            ...prev,
            [refOptionId]: value,
        }));
    };
 
    const toggleTimeUnitSelection = (refOptionId: number, unit: "day" | "week") => {
        setSelectedTimeUnits((prev) => ({
            ...prev,
            [refOptionId]: unit, // Always set to the clicked unit
        }));
    };
 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
 
        const resultArray = selectedValues.map((optionId) => {
            const daysValue = numberInputs[optionId] || "0"; // Default to "0" if not provided
            const timeUnit = selectedTimeUnits[optionId] || "day"; // Default to "day" if not set
            const productName = optionId === 205 ? inputValues[optionId] : undefined; // Get product name if optionId is 205
 
            // Calculate days based on the time unit
            const days = timeUnit === "week" ? Math.floor(Number(daysValue) * 7) : Number(daysValue);
 
            // Construct the output object
            const output: { optionId: string; days: string; productname?: string } = {
                optionId: optionId.toString(),
                days: days.toString(),
            };
 
            if (productName) {
                output.productname = productName;
            }
 
            return output;
        });
 
        console.log(resultArray);
 
        // Get the last selected option's forwardQId
        const lastSelectedOptionId = selectedValues[selectedValues.length - 1];
        const lastForwardQId = label.options.find(option => option.refOptionId === lastSelectedOptionId)?.forwardQId;
 
        // Call onEdit with selectedOptions and lastForwardQId
        if (lastForwardQId) {
            onEdit(resultArray, lastForwardQId);
        }
    };
 
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="questionsType">
                    <p className="questionText">{label.questionText}</p>
                    <div className="questionsbuttonGroup_01">
                        {label.options?.map((option) => (
                            <React.Fragment key={option.refOptionId}>
                                <button
                                    onClick={() => handleButtonClick(option.refOptionId)}
                                    className={`questionsTextOptions_02 ${selectedValues.includes(option.refOptionId) ? "selected" : ""}`}
                                >
                                    <span>{option.refOptionLabel}</span>
                                    {selectedValues.includes(option.refOptionId) ? (
                                        <i className="pi pi-check"></i>
                                    ) : (
                                        <i></i>
                                    )}
                                </button>
 
                                {(option.refOptionId === 205 || option.refOptionId === 228) && selectedValues.includes(option.refOptionId) && (
                                    <>
                                        <div className="questionText" >Enter the Name of Product</div>
                                        <div style={{ width: "90%" }}>
                                            <div className="p-inputgroup flex-1" style={{ border: "1.5px solid #10416a", borderRadius: "10px", height: "35px", fontSize: "1rem" }}>
                                                <InputText
                                                    style={{ background: "transparent" }}
                                                    type="text"
                                                    value={inputValues[option.refOptionId] || ""}
                                                    onChange={(e) => handleInputChange(option.refOptionId, e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
 
                                {selectedValues.includes(option.refOptionId) && (
                                    <>
                                        <div className="questionsbuttonGroup_01" style={{ display: "flex", width: "100%", paddingBottom: "10px" }}>
                                            <button
                                                onClick={() => toggleTimeUnitSelection(option.refOptionId, "day")}
                                                className={`questionsTextOptions_01 ${selectedTimeUnits[option.refOptionId] === "day" ? "selected" : ""}`}
                                                style={{ width: "30%", fontSize: "0.7rem" }}
                                            >
                                                Day
                                            </button>
                                            <button
                                                onClick={() => toggleTimeUnitSelection(option.refOptionId, "week")}
                                                className={`questionsTextOptions_01 ${selectedTimeUnits[option.refOptionId] === "week" ? "selected" : ""}`}
                                                style={{ width: "30%", fontSize: "0.7rem" }}
                                            >
                                                Week
                                            </button>
                                        </div>
                                        <div style={{ width: "90%" }}>
                                            <div className="p-inputgroup flex-1" style={{ border: "1.5px solid #10416a", borderRadius: "10px", height: "35px", fontSize: "1rem" }}>
                                                <InputText
                                                    style={{ background: "transparent" }}
                                                    type="number"
                                                    value={numberInputs[option.refOptionId] || ""}
                                                    onChange={(e) => handleNumberInputChange(option.refOptionId, e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
 
                    <div style={{ width: "100%", height: "35px", display: "flex", justifyContent: "flex-end", alignItems: "center", background: "transparent", marginTop: "10px" }}>
                        <button type="submit" style={{ background: "#10416a", width: "30px", height: "30px", color: "#fff", borderRadius: "50%", padding: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <i className="pi pi-arrow-right"></i>
                        </button>
                    </div>
                    <Divider />
                </div>
            </form>
        </>
    );
};
 
export default MultipleSelectInput;