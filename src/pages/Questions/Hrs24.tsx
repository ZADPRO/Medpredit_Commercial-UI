import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import React, { useEffect, useState } from "react";
// import Domain from "../Domain/Domain";
import { IonDatetime, IonModal } from "@ionic/react";

interface Option {
    backwardQId: string;
    forwardQId: string;
    refOptionId: number;
    refOptionLabel: string;
}

interface Label {
    questionType: string;
    questionText: string;
    questionId: number;
    options: Option[];
}

interface HrsInputBox {
    type: string;
    label: Label;
    onEdit: (
        questionType: string,
        hrsValue: number | null,
        minsValue: number | null,
        forwardQId: string
    ) => void;
}

const Hrs24: React.FC<HrsInputBox> = ({ label, type, onEdit }) => {
    const [hrsValue, setHrsValue] = useState<number | null>(null);
    const [minsValue, setMinsValue] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const [localInput, setLocalInput] = useState<string>(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T00:00:00`;
      });

    const handleButtonClick = () => {
        const forwardQId = label.options[0]?.forwardQId || "";
        onEdit(label.questionType, hrsValue, minsValue, forwardQId);
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        const now = new Date();
        setLocalInput(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T00:00:00`);
        setIsOpen(false);
      };

    // Set selected hours and minutes from the modal
    const handleSetTime = () => {
        setHrsValue(hrsValue);
        setMinsValue(minsValue);
        closeModal();
        if(hrsValue !== null && minsValue !== null) {
          handleButtonClick();
        }
        else 
        if(hrsValue == null && minsValue == null) {
          setHrsValue(0);
        setMinsValue(0);
        }
      };

    useEffect(() => {
        if (hrsValue === 0 && minsValue === 0) {
          handleButtonClick();
        }
        else if (hrsValue === null && minsValue === null) {
          handleButtonClick();
        }
      }, [hrsValue, minsValue]);
      
    
      const handleClearTime = () => {
        setHrsValue(null);
        setMinsValue(null);
        closeModal();
      }

    return (
        <div className="questionsOutline">
            <form
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    handleButtonClick();
                }}
            >
                <IonModal
                    isOpen={isOpen}
                    id="med-modal"
                    initialBreakpoint={1}
                    onDidDismiss={closeModal}
                    animated={false}
                >
                    <div style={{ width: "100%", background: "#effafe" }}>
                        <IonDatetime
                            presentation="time"
                            hour-cycle="h24"  // Use the hour-cycle prop to control the format
                            value={localInput}
                            onIonChange={(e) => {
                                if (typeof e.detail.value === 'string') {
                                    setLocalInput(e.detail.value);
                                  } 
                                const time = e.detail.value;
                                console.log(time);

                                if (typeof time === "string") {
                                    // Extracting only the time part "HH:mm"
                                    const timeParts = time.split("T")[1]?.split(":");
                                    if (timeParts && timeParts.length === 3) {  // Adjusted to check for 2 parts (HH:mm)
                                        const hours = parseInt(timeParts[0], 10);  // Hours part
                                        const minutes = parseInt(timeParts[1], 10);  // Minutes part
                                        setHrsValue(hours);
                                        setMinsValue(minutes);
                                        console.log('====================================');
                                        console.log("Updated Time:", hours, minutes);
                                        console.log('====================================');
                                    }
                                }
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
                                    setHrsValue(null);
                                    setMinsValue(null);
                                    handleClearTime();
                                }}
                                style={{
                                    width: "40%",
                                    background: "var(--med-light-green)",
                                    padding: "15px",
                                    textAlign: "center",
                                    fontSize: "1.1rem",
                                    color: "var(--med-dark-green)",
                                    borderRadius: "10px",
                                    fontWeight: "600",
                                }}
                            >
                                Clear
                            </div>
                            <div
                                onClick={handleSetTime}
                                style={{
                                    width: "40%",
                                    background: "var(--med-dark-green)",
                                    padding: "15px",
                                    textAlign: "center",
                                    fontSize: "1rem",
                                    color: "var(--med-light-green)",
                                    borderRadius: "10px",
                                    fontWeight: "700"
                                }}
                            >
                                Set
                            </div>
                        </div>
                    </div>
                </IonModal>

                <div className="questionsType inputText">
                    {/* <Domain questionId={label.questionId} /> */}
                    <p className="questionText">{label.questionText}</p>
                    <div className="p-inputgroup flex-1" style={{ border: "1.5px solid #10416a", borderRadius: "10px" }}>
                        <InputNumber
                            id="hrsInputLeft"
                            value={hrsValue}
                            placeholder="In Hrs"
                            onClick={openModal}
                            min={0}
                            max={23}
                            required
                        />
                        <InputNumber
                            id="hrsInput"
                            value={minsValue}
                            placeholder="In Mins"
                            onClick={openModal}
                            min={0}
                            max={59}
                            required
                        />
                        {/* <button type="submit">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-arrow-right"></i>
                            </span>
                        </button> */}
                    </div>
                    <Divider />
                </div>
            </form>
        </div>
    );
};

export default Hrs24;
