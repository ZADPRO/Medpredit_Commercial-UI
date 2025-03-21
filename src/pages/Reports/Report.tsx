import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { chevronBack, chevronForward, filter, filterOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import decrypt from "../../helper";
import { RadioButton } from "primereact/radiobutton";
import "./Report.css";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { color } from "framer-motion";
import ReportData from "./ReportContent";
import { ScoreVerify } from "../../ScoreVerify";
import ReportContent from "./ReportContent";

const Report: React.FC = () => {
  interface UserInfo {
    refUserId: number;
    refUserCustId: string;
    refUserMobileno: number;
    refUserFname: string;
    refUserLname?: string;
    refGender: string;
  }

  const [showModal1, setShowModal1] = useState<boolean>(false);

  const [showModal2, setShowModal2] = useState<boolean>(true);

  const [userData, setUserData] = useState<Array<UserInfo>>([]);

  const [selectedUser, setSelectedUser] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<Nullable<Date>>(null);

  const [reportUser, setReportUser] = useState<{
    reUserId?: number;
    refGender?: string;
  } | null>(null);

  const [allCategory, setAllCategory] = useState<any[]>([]);

  const [structuredCategories, setStructuredCategories] = useState<any[]>([]);

  const [reportModalTitle, setReportModalTitle] = useState();
  const [reportModalCategories, setReportModalCategories] = useState<any>({});

  const [structuredScores, setstructuredScores] = useState<any[]>([]);

  const [allScore, setAllScore] = useState<any[]>([]);

  const [allScorVerify, setAllScoreVerify] = useState<any[]>([]);

  const [stressAnswer, setStressAnswer] = useState<any[]>([]);

  const [treatmentDetails, setTreatmentDetails] = useState<any[]>([]);

  const [rbs, setRbs] = useState<any[]>([]);
  const [fbs, setFbs] = useState<any[]>([]);
  const [ppbs, setPpbs] = useState<any[]>([]);
  const [ogtt, setOgtt] = useState<any[]>([]);
  const [gct, setGct] = useState<any[]>([]);
  const [hba1c, setHba1c] = useState<any[]>([]);
  const [fastingcholesterol, setFastingcholesterol] = useState<any[]>([]);
  const [fastingtriglycerides, setFastingtriglycerides] = useState<any[]>([]);
  const [hdl, setHdl] = useState<any[]>([]);
  const [ldl, setLdl] = useState<any[]>([]);
  const [tchdl, setTchdl] = useState<any[]>([]);
  const [kr, setKr] = useState<any[]>([]);
  const [kl, setKl] = useState<any[]>([]);
  const [echo, setEcho] = useState<any[]>([]);
  const [cortico, setCortico] = useState<any[]>([]);
  const [bloodurea, setBloodurea] = useState<any[]>([]);
  const [serum, SetSerum] = useState<any[]>([]);

  const [egfr, setEgfr] = useState<any[]>([]);

  const [urinesugar, setUrinesugar] = useState<any[]>([]);

  const [urinealbumin, setUrinealbumin] = useState<any[]>([]);

  const [urineketones, setUrineketones] = useState<any[]>([]);
  const maxDate = new Date();

  // const sampleUsers: UserInfo[] = [
  //   {
  //     refUserMobileno: 9876543210,
  //     refUserFname: "John",
  //     refUserLname: "Doe",
  //     refUserCustId: "CUST001",
  //   },
  //   {
  //     refUserMobileno: 8765432109,
  //     refUserFname: "Jane",
  //     refUserLname: "Smith",
  //     refUserCustId: "CUST002",
  //   },
  //   {
  //     refUserMobileno: 7654321098,
  //     refUserFname: "Alice",
  //     refUserCustId: "CUST003",
  //   }, // No last name
  //   {
  //     refUserMobileno: 6543210987,
  //     refUserFname: "Bob",
  //     refUserLname: "Williams",
  //     refUserCustId: "CUST004",
  //   },
  //   {
  //     refUserMobileno: 9123456789,
  //     refUserFname: "Charlie",
  //     refUserLname: "Brown",
  //     refUserCustId: "CUST005",
  //   },
  //   {
  //     refUserMobileno: 9234567890,
  //     refUserFname: "David",
  //     refUserLname: "Miller",
  //     refUserCustId: "CUST006",
  //   },
  //   {
  //     refUserMobileno: 9345678901,
  //     refUserFname: "Emma",
  //     refUserLname: "Taylor",
  //     refUserCustId: "CUST007",
  //   },
  //   {
  //     refUserMobileno: 9456789012,
  //     refUserFname: "Fiona",
  //     refUserLname: "Anderson",
  //     refUserCustId: "CUST008",
  //   },
  //   {
  //     refUserMobileno: 9567890123,
  //     refUserFname: "George",
  //     refUserLname: "Harris",
  //     refUserCustId: "CUST009",
  //   },
  //   {
  //     refUserMobileno: 9678901234,
  //     refUserFname: "Hannah",
  //     refUserLname: "White",
  //     refUserCustId: "CUST010",
  //   },
  //   {
  //     refUserMobileno: 9789012345,
  //     refUserFname: "Ian",
  //     refUserLname: "Clark",
  //     refUserCustId: "CUST011",
  //   },
  //   {
  //     refUserMobileno: 9890123456,
  //     refUserFname: "Jack",
  //     refUserLname: "Lewis",
  //     refUserCustId: "CUST012",
  //   },
  //   {
  //     refUserMobileno: 9901234567,
  //     refUserFname: "Kelly",
  //     refUserLname: "Walker",
  //     refUserCustId: "CUST013",
  //   },
  //   {
  //     refUserMobileno: 9012345678,
  //     refUserFname: "Liam",
  //     refUserLname: "Hall",
  //     refUserCustId: "CUST014",
  //   },
  //   {
  //     refUserMobileno: 9123456781,
  //     refUserFname: "Mia",
  //     refUserLname: "Allen",
  //     refUserCustId: "CUST015",
  //   },
  //   {
  //     refUserMobileno: 9234567892,
  //     refUserFname: "Nathan",
  //     refUserLname: "Young",
  //     refUserCustId: "CUST016",
  //   },
  //   {
  //     refUserMobileno: 9345678903,
  //     refUserFname: "Olivia",
  //     refUserLname: "King",
  //     refUserCustId: "CUST017",
  //   },
  //   {
  //     refUserMobileno: 9456789014,
  //     refUserFname: "Peter",
  //     refUserLname: "Scott",
  //     refUserCustId: "CUST018",
  //   },
  //   {
  //     refUserMobileno: 9567890125,
  //     refUserFname: "Quinn",
  //     refUserLname: "Harris",
  //     refUserCustId: "CUST019",
  //   },
  //   {
  //     refUserMobileno: 9678901236,
  //     refUserFname: "Rachel",
  //     refUserLname: "Moore",
  //     refUserCustId: "CUST020",
  //   },
  // ];

  const serviceCards = [
    {
      title: "Physical Activities",
      startDate: "01-01-2025",
      endDate: "31-01-2025",
      status: "Healthy",
      color: "rgba(165, 231, 104, 1)",
    },
    {
      title: "Stress",
      startDate: "01-01-2025",
      endDate: "31-01-2025",
      status: "Risk",
      color: "rgba(230, 70, 70, 1)",
    },
  ];

  // const searchPatient = () => {
  //   const tokenString = localStorage.getItem("userDetails");

  //   const userDeatilsObj = tokenString
  //     ? JSON.parse(tokenString)
  //     : { userCustId: null, phNumber: null };

  //   //   console.log(userDeatilsObj.userId, userDeatilsObj.phNumber);

  //   if (tokenString) {
  //     try {
  //       const tokenObject = JSON.parse(tokenString);
  //       const token = tokenObject.token;

  //       axios
  //         .post(
  //           `${import.meta.env.VITE_API_URL}/getPatientData`,
  //           {
  //             mobileNumber: userDeatilsObj.phNumber,
  //           },
  //           {
  //             headers: {
  //               Authorization: token,
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         )
  //         .then((response) => {
  //           const data = decrypt(
  //             response.data[1],
  //             response.data[0],
  //             import.meta.env.VITE_ENCRYPTION_KEY
  //           );

  //           console.log(data);

  //           // setLoadingStatus(false);

  //           if (data.status) {
  //             setUserData(data.data);

  //             //   if (data.data.length === 0) {
  //             //     setStatus({
  //             //       status: true,
  //             //       message: "No Result Found",
  //             //     });
  //             //   } else {
  //             //     setURLMobileNo(data.data[0].refUserMobileno);
  //             //     setUrluserId(data.data[0].refUserId);
  //             //   }
  //           } else {
  //             console.error("Data consoled false - chekc this");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching patient data:", error);
  //         });
  //     } catch (error) {
  //       console.error("Error parsing token:", error);
  //     }
  //   } else {
  //     console.error("No token found in localStorage.");
  //   }
  // };

  const reportData = () => {
    // console.log("---------------------->", reportDate);

    const tokenString = localStorage.getItem("userDetails");

    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        localStorage.setItem("currentPatientGender", "male"); 
        // setLoadingStatus(true);

        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getPastReportData `,
            {
              patientId: tokenObject.userId,
              employeeId: null,
              hospitalId: "undefined",
              reportDate: selectedDate,
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

            console.log("====================================");
            console.log("134", data);
            console.log("====================================");

            setRbs(data.rbs);
            setFbs(data.fbs);
            setPpbs(data.ppbs);
            setOgtt(data.ogtt);
            setGct(data.gct);
            setHba1c(data.hba1c);
            setFastingcholesterol(data.fastingcholesterol);
            setFastingtriglycerides(data.fastingtriglycerides);
            setHdl(data.hdl);
            setLdl(data.ldl);
            setTchdl(data.tchdl);
            setKr(data.kr);
            setKl(data.kl);
            setEcho(data.echo);
            setCortico(data.cortico);
            setBloodurea(data.bloodurea);

            SetSerum(data.serum);
            setEgfr(data.egfr);

            setUrinesugar(data.urinesugar);

            setUrinealbumin(data.urinealbumin);

            setUrineketones(data.urineketones);

            setAllScoreVerify(data.allScoreVerify);

            setAllCategory(data.allCategory);

            setStructuredCategories(structureCategories(data.allCategory));
            setAllScore(data.allScore);

            setStressAnswer(data.stressAnswer);

            setCanDismiss(true);
            setShowModal2(false);  //both for date selection modal

            // setLoadingStatus(false);
          });
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  };

  function structureCategories(data: any[]) {
    const categoryMap = new Map<number, any>();

    const gender = reportUser?.refGender;

    // First, initialize the map with all categories
    data.forEach((item) => {
      categoryMap.set(item.refQCategoryId, { ...item, subcategories: [] });
    });

    const structuredData: any[] = [];

    data.forEach((item) => {
      if (item.refQSubCategory === "0") {
        // It's a parent category
        if (gender === "Male" && item.refCategoryLabel === "Menstrual Cycle") {
          return; // Skip this category if gender is Male
        }
        structuredData.push(categoryMap.get(item.refQCategoryId));
      } else {
        // Find the parent category and push this as a subcategory
        const parent = categoryMap.get(Number(item.refQSubCategory));
        if (parent) {
          if (
            gender === "Male" &&
            item.refCategoryLabel === "Menstrual History"
          ) {
            return; // Skip this subcategory if gender is Male
          }
          parent.subcategories.push(categoryMap.get(item.refQCategoryId));
        }
      }
    });
    return structuredData;
  }

  const [itemColors, setItemColors] = useState<{ [key: string]: string }>({});

  const [showReportModal1, setShowReportModal1] = useState<boolean>(false);

  const filterRiskFactors = (serviceCards: any[]) => {
    return serviceCards.reduce((acc, category) => {
      // Check if the current category has the label "Risk Factor"
      if (category.refCategoryLabel === "Risk Factor") {
        acc.push(category);
      }

      // Recursively check subcategories
      if (category.subcategories && category.subcategories.length > 0) {
        const filteredSubcategories = filterRiskFactors(category.subcategories);
        acc.push(...filteredSubcategories);
      }

      return acc;
    }, []);
  };

  const getValidateDuration = (questionId: any) => {
    console.log("questionId: ", questionId);

    switch (parseInt(questionId)) {
      case 94:
        return 1;
      case 5:
        return 1;
      case 6:
        return 1;
      case 8:
        return 14;
      case 9:
        return 14;
      case 10:
        return 14;
      case 11:
        return 14;
      case 12:
        return 14;
      case 13:
        return 14;
      case 43:
        return 14;
      case 51:
        return 14;
      case 201:
        return 1;
      case 202:
        return 1;
      case 203:
        return 1;
      case 204:
        return 1;
      case 205:
        return 1;
      case 206:
        return 1;
      case 207:
        return 1;
      case 213:
        return 1;
      case 214:
        return 1;
      case 215:
        return 1;
      case 216:
        return 1;
      case 217:
        return 1;
      case 218:
        return 1;
      case 219:
        return 1;
      case 220:
        return 1;
      case 221:
        return 1;
      case 222:
        return 1;
      case 223:
        return 1;
      case 224:
        return 1;
      default:
        return 0;
    }
  };

  function isValidCategory(subCategoryId: NumberConstructor): boolean {
    // Convert subCategoryId to string for comparison
    const subCategoryIdStr = subCategoryId.toString();

    // Check if the subCategoryId exists in allScore
    const categoryExists = allScore?.some(
      (answer) => answer?.refQCategoryId === subCategoryIdStr
    );

    console.log(subCategoryIdStr, "categoryExists", categoryExists);

    if (!categoryExists) return false;

    // Find the matching answer
    const matchedAnswer = allScore?.find(
      (answer) => answer.refQCategoryId === subCategoryIdStr
    );

    console.log(subCategoryIdStr, "matchedAnswer", matchedAnswer);


    if (!matchedAnswer || !matchedAnswer.refPTcreatedDate) return false;

    // Calculate the duration and days difference
    const duration = getValidateDuration(subCategoryId);
    const daysDifference = calculateDaysDifference(
      matchedAnswer.refPTcreatedDate
    );

    console.log(subCategoryIdStr, "dduration > -daysDifference", duration > -daysDifference)

    return duration > -daysDifference;
  }

  function calculateDaysDifference(dateString: string) {
    // Ensure givenDate is a valid Date object
    const givenDate = new Date(dateString);

    if (isNaN(givenDate.getTime())) {
      console.error("Invalid date:", dateString);
      return NaN; // Return NaN for invalid dates
    }

    // Ensure selectedDate is a valid Date or fallback to today
    const currentDate = selectedDate ? new Date(selectedDate) : new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const diffInMs = givenDate.getTime() - currentDate.getTime();

    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    console.log("====================================");
    console.log("Days Difference:", diffInDays);
    console.log("====================================");

    return diffInDays;
  }

  function addDaysToDate(isoDate: string, daysToAdd: number): string {
    console.log(isoDate, daysToAdd);
    const date = new Date(isoDate);
    date.setDate(date.getDate()-1 + daysToAdd);
    return date.toLocaleDateString("en-GB");
  }
  
  const getValidity = (refQCategoryId: number) => {
    switch (refQCategoryId) {
      case 8:
        return 14;
      case 9:
        return 14;
      case 10:
        return 14;
      case 11:
        return 14;
      case 12:
        return 14;
      case 13:
        return 14;
      case 43:
        return 14;
      case 51:
        return 14;
      case 202:
        return 1;
      case 203:
        return 1;
      case 204:
        return 1;
      case 205:
        return 1;
      case 206:
        return 1;
      case 207:
        return 1;
      case 213:
        return 1;
      case 214:
        return 1;
      case 215:
        return 1;
      case 216:
        return 1;
      case 217:
        return 1;
      case 218:
        return 1;
      case 219:
        return 1;
      case 220:
        return 1;
      case 221:
        return 1;
      case 222:
        return 1;
      case 223:
        return 1;
      case 224:
        return 1;
      default:
        return 0;
    }
  };


  // useEffect(() => {
  //   searchPatient();
  // }, []);

  console.log("reportModalCategories", reportModalCategories);

  console.log("Structured Categories: ", structuredCategories);

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(undefined);

  const [canDismiss, setCanDismiss] = useState(false);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          </IonButtons>
          <IonTitle>Reports</IonTitle>
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => setShowModal2(true)}
          >
            <IonIcon icon={filterOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      {/* <IonModal
        isOpen={showModal1}
        onDidDismiss={() => setShowModal1(false)}
        initialBreakpoint={1}
        id="ion-custom-modal-02"
      >
        <div className="report-modalContent">
          <h4>Select User</h4>
          <IonList className="reports-user-list">
            {userData?.map((item, index) => (
              <div
                key={index}
                className="reports-user-data"
                onClick={() => setSelectedUser(item.refUserId)}
              >
                <div className="reports-user-profile">
                  <i className="pi pi-user"></i>
                  <span>{item.refUserFname + " " + item.refUserLname}</span>
                </div>
                <RadioButton
                  value={item.refUserCustId}
                  checked={selectedUser === item.refUserId}
                  onChange={() => setSelectedUser(item.refUserId)}
                />
              </div>
            ))}
          </IonList>

          <div
            onClick={() => {
              if (selectedUser) {
                setShowModal1(false);
                setShowModal2(true);
                const foundUser = userData.find(
                  (item) => item.refUserId === selectedUser
                );

                const reportSelectedUser = {
                  reUserId: foundUser?.refUserId,
                  refGender: foundUser?.refGender,
                };

                setReportUser(reportSelectedUser);
              }
            }}
          >
            <button className="medCustom-button01">Next</button>
          </div>
        </div>
      </IonModal> */}

      <IonModal
        isOpen={showModal2}
        onDidDismiss={() => setShowModal2(false)}
        initialBreakpoint={1}
        id="ion-custom-modal-02"
        ref={modal}
        trigger="open-modal"
        canDismiss={canDismiss}
        presentingElement={presentingElement}
      >
        <div className="report-modalContent">
          <h4>Select Date</h4>
          <div className="flex justify-content-center reports-user-list">
            <Calendar
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.value)}
              maxDate={maxDate}
              inline
            />
          </div>
          <div
            onClick={() => {
              reportData();
            }}
          >
            <button className="medCustom-button01">Select</button>
          </div>
        </div>
      </IonModal>

      <IonModal
        isOpen={showReportModal1}
        onDidDismiss={() => setShowReportModal1(false)}
        initialBreakpoint={1}
        id="ion-custom-modal-02"
      >
        <div className="report-modalContent">
          <h4>{reportModalTitle}</h4>
          <ReportContent
            reportModalCategories={reportModalCategories}
            allScore={allScore}
            stressAnswer={stressAnswer}
          />
        </div>
      </IonModal>

      <IonContent className="ion-padding">
        {/* {selectedUser && (
          <div
            style={{
              margin: "0 1rem 1rem 0",
              padding: "0 0.5rem",
              background: "white",
              border: "0.5px solid",
              borderRadius: "10px",
              width: "fit-content",
              color: "var(--med-dark-green)",
            }}
          >
            <h4>
              {
                userData?.find((item) => item.refUserId === selectedUser)
                  ?.refUserFname
              }
            </h4>
          </div>
        )} */}

        <div className="reports-services-card">
          {selectedDate && <div>{selectedDate.toLocaleDateString()}</div>}
          {structuredCategories.length > 0 &&
            structuredCategories[0]?.subcategories[0]?.subcategories.map(
              (item: any, index: number) =>
                isValidCategory(item.refQCategoryId) ? (
                  <div
                    className="activity-card"
                    key={index}
                    onClick={() => {
                      console.log("Modal should open now!");
                      setShowReportModal1(true);
                      setReportModalTitle(item.refCategoryLabel);
                      setReportModalCategories(item);
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "60%",
                        background: itemColors[item.refQCategoryId] || "gray",
                        borderRadius: "8px",
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <div className="content">
                      <h4 className="title">{item.refCategoryLabel}</h4>
                      <p className="date-range">
                        <b>Taken: </b>
                        {allScore?.find(
                          (answer) =>
                            answer.refQCategoryId ===
                            item.refQCategoryId.toString()
                        )?.refPTcreatedDate &&
                          new Date(
                            allScore.find(
                              (answer) =>
                                answer.refQCategoryId ===
                                item.refQCategoryId.toString()
                            )?.refPTcreatedDate!
                          ).toLocaleDateString("en-GB")}
                      </p>

                      <p className="date-range">
                        <b>Valid Till: </b>
                        {
                          addDaysToDate(
                            (
                              allScore?.find(
                                (answer) =>
                                  answer.refQCategoryId ===
                                  item.refQCategoryId.toString()
                              )?.refPTcreatedDate
                            ),
                            getValidity(item.refQCategoryId)
                          )
                        }
                      </p>
                      <span
                        style={{
                          display: "inline-block",
                        }}
                      >
                        {allScore?.map((answer) => {
                          if (
                            answer.refQCategoryId ===
                            item.refQCategoryId.toString()
                          ) {
                            const totalScore: any = [];
                            allScorVerify?.forEach((scoresVerify) => {
                              if (
                                scoresVerify.refQCategoryId ==
                                item.refQCategoryId
                              ) {
                                totalScore.push(scoresVerify);
                              }
                            });
                            return (
                              <div key={answer.refQCategoryId}>
                                <ScoreVerify
                                  userScoreVerify={totalScore} // Pass the totalScore directly
                                  refScore={answer.refPTScore}
                                  setColor={(color) =>
                                    setItemColors((prevColors) => ({
                                      ...prevColors,
                                      [answer.refQCategoryId]: color, // Store color per category
                                    }))
                                  }
                                />
                              </div>
                            );
                          }
                          return null;
                        })}
                      </span>
                    </div>
                    <IonIcon icon={chevronForward} />
                  </div>
                ) : (
                  <div className="activity-card" key={index}>
                    <div
                      style={{
                        width: "4px",
                        height: "60%",
                        background: item.color,
                        borderRadius: "8px",
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <div className="content">
                      <h4 className="title">{item.refCategoryLabel}</h4>
                      <p className="date-range"></p>
                      <span
                        style={{
                          color: "lightgrey",
                          fontSize: "0.8rem",
                          display: "inline-block",
                        }}
                      >
                        No Data Filled
                      </span>
                    </div>
                    <IonIcon icon={chevronForward} />
                  </div>
                )
            )}
        </div>
      </IonContent>

      <IonFooter>
        <div
          style={{
            padding: "1rem 1.5rem",
          }}
        >
          <button className="medCustom-button01">Download Report</button>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Report;
