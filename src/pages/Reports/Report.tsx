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
import {
  chevronBack,
  chevronForward,
  close,
  filterOutline,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import decrypt from "../../helper";
import "./Report.css";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { ScoreVerify } from "../../ScoreVerify/ScoreVerify";
import ReportContent from "./ReportContent";
import { useHistory, useLocation } from "react-router";
import { RadioButton } from "primereact/radiobutton";
import { ScoreSlider } from "../../ScoreVerify/ScoreSlider";
import ReportPDF from "../ReportPDF/ReportPDF";
import CustomIonLoading from "../../components/CustomIonLoading/CustomIonLoading";
import { useTranslation } from "react-i18next";

const Report: React.FC = () => {
  interface UserInfo {
    refUserId: number;
    refUserCustId: string;
    refUserMobileno: number;
    refUserFname: string;
    refUserLname?: string;
    refGender: string;
    headStatus: string;
  }

  interface CardData {
    refQCategoryId: number;
    refCategoryLabel: string;
    refScore?: any;
    refScoreId?: any;
    UserScoreVerify?: any;
  }

  interface LocationState {
    selectedUser?: number; // Replace 'any' with your actual plan type
    selectedUserInfo?: any;
  }

  const history = useHistory();
  const location = useLocation<LocationState>();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const headStatus = localStorage.getItem("headStatus") || "false";

  const [showModal1, setShowModal1] = useState<boolean>(false);

  const [showModal2, setShowModal2] = useState<boolean>(false);

  const [userData, setUserData] = useState<Array<UserInfo>>([]);

  const [selectedUser, setSelectedUser] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<Nullable<Date>>();

  const [tempselectedUser, settempSelectedUser] = useState<number>();
  const [tempselectedDate, settempSelectedDate] = useState<Nullable<Date>>(
    new Date()
  );

  const userDetails = localStorage.getItem("userDetails");

  const userDeatilsObj = userDetails
    ? JSON.parse(userDetails)
    : { userId: null, firstName: null };

  const [reportUser, setReportUser] = useState<{
    reUserId?: number;
    refGender?: string;
  } | null>(null);

  const [allCategory, setAllCategory] = useState<any[]>([]);

  const [structuredCategories, setStructuredCategories] = useState<any[]>([]);

  const [reportModalInfo, setReportModalInfo] = useState({
    serviceId: 0,
    serviceTitle: "",
  });
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

  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [reportModalCategories, allScore, stressAnswer]);

  const searchPatient = () => {
    const tokenString = localStorage.getItem("userDetails");

    const userDeatilsObj = tokenString
      ? JSON.parse(tokenString)
      : { userCustId: null, phNumber: null };

    //   console.log(userDeatilsObj.userId, userDeatilsObj.phNumber);

    if (tokenString) {
      setLoading(true);
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        axios
          .post(
            `${import.meta.env.VITE_API_COMMERCIAL_URL}/getFamilyMembers`,
            {
              mobileNumber: userDeatilsObj.phNumber,
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

            console.log(data);

            // setLoadingStatus(false);

            if (data.status) {
              setLoading(false);
              setUserData(data.familyMembers);
              !location.state?.selectedUser && setShowModal1(true);
              //   if (data.data.length === 0) {
              //     setStatus({
              //       status: true,
              //       message: "No Result Found",
              //     });
              //   } else {
              //     setURLMobileNo(data.data[0].refUserMobileno);
              //     setUrluserId(data.data[0].refUserId);
              //   }
            } else {
              setLoading(false);
              console.error("Data consoled false - chekc this");
            }
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error fetching patient data:", error);
          });
      } catch (error) {
        setLoading(false);
        console.error("Error parsing token:", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  };

  const reportData = () => {
    // console.log("---------------------->", reportDate);
    const tokenString = localStorage.getItem("userDetails");

    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        localStorage.setItem("currentPatientGender", "male");
        // setLoadingStatus(true);
        console.log("tgttggtttt", tempselectedUser);
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getPastReportData `,
            {
              patientId: tempselectedUser,
              employeeId: null,
              hospitalId: "undefined",
              reportDate: tempselectedDate,
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

            console.log("====================================");
            console.log("134", data);
            console.log("====================================");
            setItemColors({});
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

            setCanDismissModal1(true);
            setCanDismissModal2(true);
            setShowModal1(false);
            setShowModal2(false); //both for date selection modal

            // setLoadingStatus(false);
          });
        setSelectedDate(tempselectedDate);
        setSelectedUser(tempselectedUser);
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

    console.log(
      subCategoryIdStr,
      "dduration > -daysDifference",
      duration > -daysDifference
    );

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
    date.setDate(date.getDate() - 1 + daysToAdd);
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

  useEffect(() => {
    // Exit early if location.state is undefined and the router hasn't restored it yet
    if (location.state === undefined) return;

    if (location.state?.selectedUser) {
      console.log(location.state?.selectedUser);
      setShowModal1(false);
      setShowModal2(false);
      setSelectedDate(new Date());
      settempSelectedDate(new Date());
      settempSelectedUser(location.state.selectedUser);
      setSelectedUser(location.state.selectedUser);
      if (headStatus === "true") {
        searchPatient();
      }
    } else {
      if (headStatus === "true") {
        searchPatient();
        // setShowModal1(true);
        setShowModal2(false);
      } else {
        setShowModal1(false);
        setShowModal2(true);
        setSelectedUser(userDeatilsObj.userId);
      }
      settempSelectedUser(userDeatilsObj.userId);
    }
  }, [location.state?.selectedUser]);

  console.log("eeeeeeeeeeeeeeeeee", tempselectedDate, selectedDate);
  console.log("reportModalCategories", reportModalCategories);

  console.log("Structured Categories: ", structuredCategories);

  const getCategory = () => {
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      setLoading(true);
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getCategory `,
            {
              SubCategoryId: "4", //Risk Factor
              patientId: selectedUser?.toString(),
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
            console.log(data);
            setCategories(data.data);

            setLoading(false);
            // setLoadingStatus(false);
            console.log("----------->Val", data.data);
          });
      } catch (error) {
        setLoading(false);
        console.error("Error parsing token:", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }

    console.log(history.location.pathname);
  };

  useEffect(() => {
    if (selectedUser) {
      getCategory();
      if (isFirstRender == true && location.state?.selectedUser) {
        setIsFirstRender(false);
        reportData();
      }
    }
  }, [selectedUser]);

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(undefined);

  const [canDismissModal1, setCanDismissModal1] = useState(false);
  const [canDismissModal2, setCanDismissModal2] = useState(false);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  const { t, i18n } = useTranslation("global");

  console.log("item colors==========================", itemColors);
  return (
    <IonPage className="cus-ion-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          </IonButtons>
          <IonTitle>
            {userData.length > 0
              ? userData.find((item) => item.refUserId === selectedUser)
                ?.refUserFname
              : location.state?.selectedUserInfo?.refUserFname}
          </IonTitle>

          <IonButton
            fill="clear"
            slot="end"
            onClick={() => {
              headStatus == "true" ? setShowModal1(true) : setShowModal2(true);
            }}
          >
            <IonIcon icon={filterOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonModal
        isOpen={showModal1}
        onDidDismiss={() => setShowModal1(false)}
        initialBreakpoint={1}
        id="ion-custom-modal-02"
        ref={modal}
        canDismiss={canDismissModal1}
        presentingElement={presentingElement}
      >
        <div className="report-modalContent">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <h1
              style={{
                color: "var(--med-dark-green)",
                fontWeight: "bold",
                margin: "0 auto",
                textAlign: "center",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {t("reports.Reports")}
            </h1>
            <IonIcon
              onClick={() => {
                setShowModal1(false);
                if (structuredCategories.length === 0) {
                  history.replace("/home");
                }
              }}
              style={{ fontSize: "1.5rem", marginLeft: "auto" }}
              icon={close}
            />
          </div>

          <h4>{t("reports.Select User")}</h4>
          <IonList className="reports-user-list">
            {userData?.map((item, index) => (
              <div
                key={index}
                className="reports-user-data"
                onClick={() => settempSelectedUser(item.refUserId)}
              >
                <div className="reports-user-profile">
                  <i className="pi pi-user"></i>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{item.refUserFname + " " + item.refUserLname}</span>
                    {item.headStatus == "true" && (
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          color: "var(--med-dark-green)",
                        }}
                      >
                        {t("login.Primary")}
                      </span>
                    )}
                  </div>
                </div>
                <RadioButton
                  value={item.refUserCustId}
                  checked={tempselectedUser === item.refUserId}
                  onChange={() => settempSelectedUser(item.refUserId)}
                />
              </div>
            ))}
          </IonList>

          <div
            onClick={() => {
              if (tempselectedUser) {
                setCanDismissModal1(true);
                !selectedUser && setCanDismissModal2(false);
                setShowModal1(false);
                setShowModal2(true);
                const foundUser = userData.find(
                  (item) => item.refUserId === tempselectedUser
                );

                const reportSelectedUser = {
                  reUserId: foundUser?.refUserId,
                  refGender: foundUser?.refGender,
                };

                setReportUser(reportSelectedUser);
              }
            }}
          >
            <button className="medCustom-button01">{t("Register User.Next")}</button>
          </div>
        </div>
      </IonModal>

      <IonModal
        isOpen={showModal2}
        onDidDismiss={() => setShowModal2(false)}
        initialBreakpoint={1}
        id="ion-custom-modal-02"
        ref={modal}
        canDismiss={canDismissModal2}
        presentingElement={presentingElement}
      >
        <div className="report-modalContent">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <h1
              style={{
                color: "var(--med-dark-green)",
                fontWeight: "bold",
                margin: "0 auto",
                textAlign: "center",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {t("reports.Reports")}
            </h1>
            <IonIcon
              onClick={() => {
                setShowModal1(false);
                if (structuredCategories.length === 0) {
                  history.replace("/home");
                }
              }}
              style={{ fontSize: "1.5rem", marginLeft: "auto" }}
              icon={close}
            />
          </div>
          <h4>{t("reports.Select Date")}</h4>
          <div className="flex justify-content-center">
            <Calendar
              value={tempselectedDate}
              onChange={(e) => settempSelectedDate(e.value)}
              maxDate={maxDate}
              inline
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            {headStatus == "true" && (
              <button
                onClick={() => {
                  !selectedUser && setCanDismissModal1(false);
                  setCanDismissModal2(true);
                  setShowModal2(false);
                  setShowModal1(true);
                }}
                className="medCustom-button01"
              >
                {t("reports.Back")}
              </button>
            )}
            <button onClick={() => reportData()} className="medCustom-button01">
              {t("reports.Select")}
            </button>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4>{reportModalInfo.serviceTitle}</h4>
            <IonIcon
              onClick={() => setShowReportModal1(false)}
              style={{ "font-size": "1.5rem" }}
              icon={close}
            />
          </div>
          <div className="report-progress-status">
            {categories && (
              <>
                <span>{t("reports.Assessment Score")}</span>
                <div
                  style={{
                    margin: "0 auto",
                    width: "70%",
                  }}
                >
                  <ScoreSlider
                    userScoreVerify={
                      categories.find(
                        (item) =>
                          item.refQCategoryId == reportModalInfo.serviceId
                      )?.UserScoreVerify
                    }
                    refScore={
                      categories.find(
                        (item) =>
                          item.refQCategoryId == reportModalInfo.serviceId
                      )?.refScore
                    }
                  />
                </div>

                <div
                  style={{
                    margin: "0 auto",
                    width: "50%",
                  }}
                >
                  <ScoreVerify
                    userScoreVerify={
                      categories.find(
                        (item) =>
                          item.refQCategoryId == reportModalInfo.serviceId
                      )?.UserScoreVerify
                    }
                    refScore={
                      categories.find(
                        (item) =>
                          item.refQCategoryId == reportModalInfo.serviceId
                      )?.refScore
                    }
                  />
                </div>
              </>
            )}
          </div>
          <div
            ref={scrollableDivRef}
            style={{
              maxHeight: "60vh",
              paddingTop: "1rem",
              paddingBottom: "7rem",
              overflowY: "auto",
            }}
          >
            <ReportContent
              reportModalCategories={reportModalCategories}
              allScore={allScore}
              stressAnswer={stressAnswer}
            />
          </div>
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
          {selectedDate && (
            <div>
              {selectedDate
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(/ /g, "-")}{" "}
              {/* Replaces spaces with "-" */}
            </div>
          )}

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
                      setReportModalInfo({
                        serviceId: item.refQCategoryId,
                        serviceTitle: item.refCategoryLabel,
                      });
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
                        <b>{t("reports.Taken")}: </b>
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
                        <b>{t("reports.Valid Till")}: </b>
                        {addDaysToDate(
                          allScore?.find(
                            (answer) =>
                              answer.refQCategoryId ===
                              item.refQCategoryId.toString()
                          )?.refPTcreatedDate,
                          getValidity(item.refQCategoryId)
                        )}
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
                        {t("reports.No Data Filled")}
                      </span>
                    </div>
                    <IonIcon icon={chevronForward} />
                  </div>
                )
            )}
        </div>
      </IonContent>

      <IonFooter>
        {Object.keys(itemColors).length !== 0 && (
          <div
            style={{
              padding: "1rem 1.5rem",
            }}
          >
              <ReportPDF
                reportDate={selectedDate}
                selectedUser={selectedUser}
              />
          </div>
        )}
      </IonFooter>
      <CustomIonLoading isOpen={loading} />
    </IonPage>
  );
};

export default Report;
