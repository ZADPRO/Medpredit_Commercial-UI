import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import decrypt from "../../helper";
import { arrowUndoSharp, chevronBack } from "ionicons/icons";
import { useHistory, useLocation, useParams } from "react-router";
import "./Questions.css";
import MultipleSelect from "./MultipleSelect";
import YesNo from "./YesNo";
import NumberInputBoxT4 from "./NumberInputBoxT4";
import NumberInputBoxT6 from "./NumberInputBoxT6";
import HrsMins from "./HrsMins";
import TextInputBox from "./TextInputBox";
import TimeInputBox from "./TimeInputBox";
import TimeInputBox24 from "./TimeInputBox24";
import Label from "./Label";
import GraphValues from "./GraphValues";
import Hrs24 from "./Hrs24";
import TreatmentDetailsQuestion from "./TreatmentDetailsQuestion";
import YearNMonth from "./YearNMonth";
import MultipleSelectInput from "./MultipleSelectInput";
import { useTranslation } from "react-i18next";

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

const Questions: React.FC = () => {
  const { t, i18n } = useTranslation("global");
  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;
  const history = useHistory();

  const { selectedServiceId, selectedUserId } = useParams<{
    selectedServiceId: string;
    selectedUserId: string;
  }>();

  const [submitButton, setSubmitButton] = useState(true);
  const [scrollIndex, setScrollIndex] = useState(0);

  const SubmitActive = (isActive: boolean) => {
    setSubmitButton(isActive);
  };

  // useEffect(() => {
  //   const getCategory = {
  //     id: cardTitle,
  //     label: refCategoryLabel,
  //   };

  //   localStorage.setItem("getQuestions", JSON.stringify(getCategory));
  // }, []);

  // INTERFACE FOR QUESTIONS
  const [questionData, setQuestionsData] = useState<
    {
      questionType: string;
      questionText: string;
      questionId: any;
      options: [
        {
          backwardQId: string;
          forwardQId: string;
          refOptionId: number;
          refOptionLabel: string;
        }
      ];
    }[]
  >([]);

  const [visibleQuestions, setVisibleQuestions] = useState<
    {
      questionType: string;
      questionText: string;
      questionId: any;
      options: [
        {
          backwardQId: string;
          forwardQId: string;
          refOptionId: number;
          refOptionLabel: string;
        }
      ];
    }[]
  >([]);

  const [enabledIndex, setEnabledIndex] = useState<number>(0);

  const [submittedAnswer, setSubmittedAnswer] = useState<any>();

  const [responses, setResponses] = useState<
    { questionId: any; questionType: any; answer: any }[]
  >([]);

  const getQuestions = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/getQuestions`,
        {
          questionId: selectedServiceId,
          patientId: selectedUserId,
          refLanCode: localStorage.getItem("refLanCode")
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
          console.log(data.questions);

          setQuestionsData(data.questions);
          console.log("data.questions", data.questions);
          setVisibleQuestions([data.questions[0]]);
        }
      });
  };

  const getNextQuestions = (
    questionId: any,
    questionType: any,
    answer: any,
    forwardQId: any
  ) => {
    setSubmitButton(true);
    console.log("forwardQId:", forwardQId);
    console.log("Answer submitted for questionId:", questionId, answer);
    console.log("################--->", questionId);
    localStorage.setItem("testQuestion", questionId);

    // Convert forwardQId to a number, if not null
    let nextQuestionId = forwardQId ? parseInt(forwardQId, 10) : null;

    // Update the responses state
    setResponses((prevResponses) => {
      const responseMap = new Map(
        prevResponses.map((res) => [
          res.questionId,
          { questionType: res.questionType, answer: res.answer },
        ])
      );

      responseMap.set(questionId, { questionType, answer });

      const updatedResponses = Array.from(responseMap.entries()).map(
        ([id, value]) => ({
          questionId: id,
          questionType: value.questionType,
          answer: value.answer,
        })
      );

      // Submit the final updated responses if no next question exists
      if (!nextQuestionId) {
        setSubmitButton(false);
        setSubmittedAnswer(updatedResponses); // Use the updated responses here
        console.log("Submitting responses:", updatedResponses);
      }

      return updatedResponses;
    });

    if (questionId === 33) {
      const prevQuestion = responses[1].answer;
      const currentQuestion = answer;
      console.log(prevQuestion, currentQuestion, forwardQId);

      if (currentQuestion === 118) {
        if (prevQuestion === 113) {
          const nextQuestion = questionData.find(
            (q) => parseInt(q.questionId, 10) === 39
          );

          if (nextQuestion) {
            setVisibleQuestions((prevVisibleQuestions) => [
              ...prevVisibleQuestions,
              nextQuestion,
            ]);
            setEnabledIndex((prevIndex) => prevIndex + 1);
          }
        } else {
          const nextQuestion = questionData.find(
            (q) => parseInt(q.questionId, 10) === 34
          );

          if (nextQuestion) {
            setVisibleQuestions((prevVisibleQuestions) => [
              ...prevVisibleQuestions,
              nextQuestion,
            ]);
            setEnabledIndex((prevIndex) => prevIndex + 1);
          }
        }
      } else {
        const nextQuestion = questionData.find(
          (q) => parseInt(q.questionId, 10) === nextQuestionId
        );

        if (nextQuestion) {
          setVisibleQuestions((prevVisibleQuestions) => [
            ...prevVisibleQuestions,
            nextQuestion,
          ]);
          setEnabledIndex((prevIndex) => prevIndex + 1);
        }
      }
    } else {
      const nextQuestion = questionData.find(
        (q) => parseInt(q.questionId, 10) === nextQuestionId
      );

      console.log("nextQuestion", visibleQuestions);

      console.log("nextQuestion", nextQuestion);

      if (nextQuestion) {
        setVisibleQuestions((prevVisibleQuestions) => [
          ...prevVisibleQuestions,
          nextQuestion,
        ]);
        setEnabledIndex((prevIndex) => prevIndex + 1);
      }
    };
  };

  const [loadingStatus, setLoadingStatus] = useState(false);

  const submitResponse = () => {
    console.log("submittedAnswer", submittedAnswer);
    console.log("serviceId", selectedServiceId, selectedUserId);
    setLoadingStatus(true);
    
    try {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/postAnswers`,
          {
            patientId: selectedUserId,
            categoryId: selectedServiceId.toString(),
            answers: Number(selectedServiceId) === 201 ? questionSets : submittedAnswer,
            // employeeId: localStorage.getItem("currentDoctorId")
            //   ? localStorage.getItem("currentDoctorId")
            //   : null,
            // hospitalId: localStorage.getItem("hospitalId")
            //   ? localStorage.getItem("hospitalId")
            //   : null,
            employeeId: null,
            hospitalId: "undefined",
            refLanCode: localStorage.getItem("refLanCode")
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

          console.log("--->====>", data);

          if (data.status) {
            const getCategory = localStorage.getItem("getCategory");
            if (getCategory) {
              const getQuestionsToken = JSON.parse(getCategory);
              getQuestions();
              setResponses([]);
              // history.push(
              //   `/subCategories/${getQuestionsToken.id}/${getQuestionsToken.label}`
              // );
              setLoadingStatus(false);
              history.replace(`/serviceAssessment/${selectedServiceId}`, { getCategory: true });
              setSubmittedAnswer([]);
            } else {
              console.error("getCategory is null or undefined");

              setLoadingStatus(false);
              history.replace(`/serviceAssessment/${selectedServiceId}`, { getCategory: true });
              setSubmittedAnswer([]);
            }
          }
        });
    } catch (error) {
      setLoadingStatus(false);
      console.error("Error submitting responses:", error);
    }
  };

  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);

  const handleData = (data: any) => {
    setQuestionSets(data);
  };

  const handleQuestionEdit = (
    questionId: any,
    questionType: any,
    refOptionId: number,
    forwardQnId: any
  ) => {
    console.log("handleQuestionEdit");
    if (responses) {
      console.log("handleQuestionEdit --------------- 1");

      responses.map((res) => {
        if (res.questionId === questionId) {
          console.log("Response found - editing");
          const index = visibleQuestions.findIndex(
            (visibleQns) => visibleQns.questionId === questionId
          );
          if (index !== -1) {
            const newVisibleQuestions = visibleQuestions.slice(0, index + 1);
            console.log("Visible qns", visibleQuestions);
            console.log("Response data", responses);
            console.log("Edited");
            setVisibleQuestions(newVisibleQuestions);
          }
        }
      });
    }
    console.log("forwardQnId", forwardQnId);
    getNextQuestions(questionId, questionType, refOptionId, forwardQnId);
  };
  console.log("Visible qns", visibleQuestions);

  const handleMultipleSelectEdit = (
    questionId: any,
    questionType: any,
    selectedOptions: any[],
    forwardQnId: any
  ) => {
    if (responses) {
      responses.map((res) => {
        if (res.questionId === questionId) {
          console.log("Response found - editing");
          const index = visibleQuestions.findIndex(
            (visibleQns) => visibleQns.questionId === questionId
          );
          if (index !== -1) {
            const newVisibleQuestions = visibleQuestions.slice(0, index + 1);
            console.log("Visible qns", visibleQuestions);
            console.log("Response data", responses);
            console.log("Edited");
            setVisibleQuestions(newVisibleQuestions);
          }
        }
      });
    }
    getNextQuestions(questionId, questionType, selectedOptions, forwardQnId);
  };

  const handleHrsEdit = (
    questionId: any,
    questionType: any,
    hrsValue: any,
    minsValue: any,
    forwardQnId: any
  ) => {
    console.log("questionType", questionType);
    if (responses) {
      responses.map((res) => {
        if (res.questionId === questionId) {
          console.log("Response found - editing");
          const index = visibleQuestions.findIndex(
            (visibleQns) => visibleQns.questionId === questionId
          );
          if (index !== -1) {
            const newVisibleQuestions = visibleQuestions.slice(0, index + 1);
            console.log("Visible qns", visibleQuestions);
            console.log("Response data", responses);
            console.log("Edited");
            setVisibleQuestions(newVisibleQuestions);
          }
        }
      });
    }

    const resultValue = hrsValue == null && minsValue == null ? null : `${hrsValue}:${minsValue}`;

    getNextQuestions(questionId, questionType, resultValue, forwardQnId);
  };

  useEffect(() => {
    if (token) {
      try {
        getQuestions();
      } catch (error) {
        console.log("Error fetching questions");
      }
    }
  }, [token]);

  const [backwardQ, setBackwardQ] = useState({
    id: 0,
    label: "",
  });

  useEffect(() => {
    const categoryString: any = localStorage.getItem("getCategory");
    const categoryObject = JSON.parse(categoryString);

    if (categoryString) {
      setBackwardQ({
        id: categoryObject.id,

        label: categoryObject.label,
      });
    }
  }, []);

  // const handleInfoClick = () => {
  //   if (cardTitle === "8") {
  //     history.push("/physicalActivity/showCards");
  //   }
  //   if (cardTitle === "10") {
  //     history.push("/tobacoo/showCards");
  //   }
  //   if (cardTitle === "9") {
  //     history.push("/stress/showCards");
  //   }
  //   if (cardTitle === "11") {
  //     history.push("/alcohol/showCards");
  //   }
  // };

  // const handleInstructionsClick = () => {
  //   if (cardTitle === "8") {
  //     history.push("/physicalActivity/instructions");
  //   }
  //   if (cardTitle === "10") {
  //     history.push("/tobacoo/instructions");
  //   }
  //   if (cardTitle === "9") {
  //     history.push("/stress/instructions");
  //   }
  //   if (cardTitle === "11") {
  //     history.push("/alcohol/instructions");
  //   }
  // };

  console.log("eee", responses);

  useEffect(() => {
    responses.map((item, index) => {
      if (item.answer == null || item.answer == "") {
        SubmitActive(true);
      }
    })
  }, [responses]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Refs for each question
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll when the enabledIndex changes
  useEffect(() => {
    if (questionRefs.current[scrollIndex]) {
      questionRefs.current[scrollIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [scrollIndex]);

  useEffect(() => {
    if (visibleQuestions.length > 0) {
      handleNextQuestion();
    }
  }, [visibleQuestions]); // Runs whenever visibleQuestions updates

  const handleNextQuestion = () => {
    if (visibleQuestions.length > 1) {
      const previousQuestion = visibleQuestions[visibleQuestions.length - 2];
    }

    if (visibleQuestions.length > 0) {
      setScrollIndex(visibleQuestions.length - 1);
    }
  };

  console.log("indexes", scrollIndex, visibleQuestions.length);


  const handleUndo = () => {
    setVisibleQuestions((prevQuestions) => {
      if (prevQuestions.length === 1) return prevQuestions;
      const newQuestions = prevQuestions.slice(0, -1);
      return newQuestions;
    });
    setSubmitButton(true)
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          </IonButtons>
          <IonTitle>
            {"Question: " + visibleQuestions.length}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => handleUndo()}><IonIcon icon={arrowUndoSharp} /></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {visibleQuestions.length > 0 && visibleQuestions.map((question, index) => (
          <div key={index} ref={(el) => (questionRefs.current[index] = el)} className={visibleQuestions.length - 1 != index ? "questions_MainDiv" : ""}>
            {question.questionType === "1" && (
              <YesNo
                label={question}
                onOptionSelect={(refOptionId, forwardQId) => {
                  // if (index === enabledIndex) {
                  //   // getNextQuestions(
                  //   //   question.questionId,
                  //   //   refOptionId,
                  //   //   forwardQId
                  //   // );
                  // }
                }}
                onEdit={(questionType, refOptionId, forwardQId) => {
                  handleQuestionEdit(
                    question.questionId,
                    questionType,
                    refOptionId,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "2" && (
              <MultipleSelect
                label={question}
                onOptionSelect={(selectedOptions, forwardQId) => {
                  // if (index === enabledIndex) {
                  //   // getNextQuestions(
                  //   //   question.questionId,
                  //   //   refOptionId,
                  //   //   forwardQId
                  //   // );
                  // }
                }}
                onEdit={(selectedOptions, forwardQId) => {
                  handleMultipleSelectEdit(
                    question.questionId,
                    question.questionType,
                    selectedOptions,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "6" && (
              <NumberInputBoxT6
                type="number"
                label={question}
                onClickOpt={(value, questionId, forwardQId) => {
                  if (index === enabledIndex) {
                    console.log("-------------------->onEdit Triggered");
                    // getNextQuestions(
                    //   questionId,
                    //   question.questionType,
                    //   parseInt(value),
                    //   forwardQId
                    // );
                  }
                }}
                onEdit={(questionType, value, forwardQId) => {
                  handleQuestionEdit(
                    question.questionId,
                    questionType,
                    value,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "5" && (
              <HrsMins
                type="text"
                label={question}
                SubmitActive={SubmitActive}
                onEdit={(
                  questionType,
                  hrsValue,
                  minsValue,
                  forwardQId
                ) => {
                  handleHrsEdit(
                    question.questionId,
                    questionType,
                    hrsValue,
                    minsValue,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "4" && (
              <NumberInputBoxT4
                type="number"
                label={question}
                onClickOpt={(value, questionId, forwardQId) => {
                  if (index === enabledIndex) {
                    console.log("-------------------->onEdit Triggered");
                    // getNextQuestions(
                    //   questionId,
                    //   question.questionType,
                    //   parseInt(value),
                    //   forwardQId
                    // );
                  }
                }}
                onEdit={(questionType, value, forwardQId) => {
                  handleQuestionEdit(
                    question.questionId,
                    questionType,
                    value,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "3" && (
              <TextInputBox
                type="text"
                label={question}
                onClickOpt={(value, questionId, forwardQId) => {
                  if (index === enabledIndex) {
                    console.log("-------------------->onEdit Triggered");
                    // getNextQuestions(
                    //   questionId,
                    //   question.questionType,
                    //   parseInt(value),
                    //   forwardQId
                    // );
                  }
                }}
                onEdit={(questionType, value, forwardQId) => {
                  handleQuestionEdit(
                    question.questionId,
                    questionType,
                    value,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "7" && (
              <TimeInputBox
                type="text"
                label={question}
                onEdit={(questionType, value, forwardQId) => {
                  handleQuestionEdit(
                    question.questionId,
                    questionType,
                    value,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "8" && (
              <TimeInputBox24
                type="text"
                label={question}
                onEdit={(questionType, value, forwardQId) => {
                  handleQuestionEdit(
                    question.questionId,
                    questionType,
                    value,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "9" && (
              <Label
                label={question}
                onEdit={(questionType, value, forwardQId) => {
                  handleQuestionEdit(
                    question.questionId,
                    questionType,
                    value,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "10" && (
              <GraphValues
                SubmitActive={SubmitActive}
                label={question}
                onEdit={(questionType, value, forwardQId) => {
                  handleQuestionEdit(
                    question.questionId,
                    questionType,
                    value,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "11" && (
              <Hrs24
                type="text"
                label={question}
                onEdit={(
                  questionType,
                  hrsValue,
                  minsValue,
                  forwardQId
                ) => {
                  handleHrsEdit(
                    question.questionId,
                    questionType,
                    hrsValue,
                    minsValue,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "12" && (
              <YearNMonth
                type="text"
                label={question}
                onClickOpt={(value, questionId, forwardQId) => {
                  if (index === enabledIndex) {
                    console.log("-------------------->onEdit Triggered");
                    // getNextQuestions(
                    //   questionId,
                    //   question.questionType,
                    //   parseInt(value),
                    //   forwardQId
                    // );
                  }
                }}
                onEdit={(questionType, value, forwardQId) => {
                  handleQuestionEdit(
                    question.questionId,
                    questionType,
                    value,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "13" && (
              <MultipleSelectInput
                label={question}
                onOptionSelect={(selectedOptions, forwardQId) => {
                  if (index === enabledIndex) {
                    // getNextQuestions(
                    //   question.questionId,
                    //   refOptionId,
                    //   forwardQId
                    // );
                  }
                }}
                onEdit={(selectedOptions, forwardQId) => {
                  handleMultipleSelectEdit(
                    question.questionId,
                    question.questionType,
                    selectedOptions,
                    forwardQId
                  );
                }}
              />
            )}

            {question.questionType === "99" && (
              <TreatmentDetailsQuestion
                SubmitActive={SubmitActive}
                handleData={handleData}
              />
            )}
          </div>
        ))}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          {loadingStatus ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%", // Ensures vertical centering if the parent has a defined height
                }}
              >
                <button
                  disabled={submitButton}
                  // onClick={submitResponse}
                  className={`questionSubmitButton ${submitButton ? "disabled" : ""
                    }`}
                >
                  <i className="pi pi-spin pi-spinner"></i>
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                disabled={submitButton}
                onClick={() => { submitResponse() }}
                className={`questionSubmitButton ${submitButton ? "disabled" : ""
                  }`}
              >
                {t("manage.Submit")}
              </button>
            </div>
          )}
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Questions;
