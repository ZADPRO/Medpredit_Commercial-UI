import { Text } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";

interface UserScoreElement {
  refAction: string;
  refValue: string;
  refAnswerLabel: string;
  refScoreColor: string;
}

interface HandleScoreValueProps {
  userScoreVerify: UserScoreElement[];
  refScore: number | string;
  status?: any;
  setColor?: (color: string) => void;
}

export const ScoreVerify: React.FC<HandleScoreValueProps> = ({
  userScoreVerify,
  refScore,
  status,
  setColor,
}) => {
  const evaluateScore = (
    userScoreVerify: UserScoreElement[],
    refScore: number | string
  ) => {
    let label = "";
    let scoreValue = "";
    let color = "";

    console.log(refScore, userScoreVerify);

    userScoreVerify.forEach((element) => {
      switch (element.refAction) {
        case "equal":
          if (refScore.toString() === element.refValue.toString()) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "notEqual":
          if (refScore.toString() != element.refValue.toString()) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "lessThanEqual":
          console.log("lessthanEqual");
          if (parseFloat(refScore as string) <= parseFloat(element.refValue)) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "greaterThanEqual":
          if (parseFloat(refScore as string) >= parseFloat(element.refValue)) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "lessThan":
          if (parseFloat(refScore as string) < parseFloat(element.refValue)) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "greaterThan":
          if (parseFloat(refScore as string) > parseFloat(element.refValue)) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        case "rangeEqual":
          const [firstVal, secondVal] = element.refValue
            .split(",")
            .map(parseFloat);

          if (
            firstVal <= parseFloat(refScore as string) &&
            parseFloat(refScore as string) <= secondVal
          ) {
            label = element.refAnswerLabel;
            scoreValue = refScore.toString();
            color = element.refScoreColor;
            console.log(label);
          }
          break;

        default:
          console.log("Unknown refAction:", element.refAction);
      }
    });

    return { label, scoreValue, color };
  };

  const { label, scoreValue, color } = evaluateScore(userScoreVerify, refScore);

  
  const [prevColor, setPrevColor] = useState("");

  useEffect(() => {
    if (setColor && color !== prevColor) {
      setPrevColor(color);
      setColor(color);
    }
  }, [color, prevColor, setColor]);

  
  console.log(label);

  return (
    <>
      {status ? (
        <Text style={{ width: "auto", color: "#000" }}>
          : {label || "No Label Available"}
        </Text>
      ) : (
        <>
          <div
            style={{
              fontSize: "0.6rem",
              // width: "100px",
              color: "white",
              backgroundColor: `${color}`,
              padding: "0.3rem",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center"
            }}
          >
            {/* <div>Score: {scoreValue}</div> */}
            <div>
              <b>{label}</b>
            </div>
          </div>
        </>
      )}
    </>
  );
};
