import React, { useEffect, useState } from "react";
import axios from "axios";
import decrypt from "../../helper";
import {
  Document,
  Font,
  Image,
  Page,
  pdf,
  Text,
  View,
} from "@react-pdf/renderer";
import backgroundImage from "../../assets/PDFTemplate/background.png";
import governmentLogo from "../../assets/images/Icons/governmentHospitalLogo.png";

import PopRegular from "../../assets/Fonts/Poppins-Regular.ttf";
import PopBold from "../../assets/Fonts/Poppins-Bold.ttf";
import PopBoldItalic from "../../assets/Fonts/Poppins-BoldItalic.ttf";
import PopSemiboldItalic from "../../assets/Fonts/Poppins-SemiBoldItalic.ttf";
import { ScoreVerify } from "../../ScoreVerify/ScoreVerify2";

import backgroundImage1 from "../../assets/PDFTemplate/background-1.png";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

import { download } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { IonToast, isPlatform } from "@ionic/react";

interface DoctorDetails {
  refHospitalName: any;
  refHospitalAddress: any;
  refHospitalPincode: any;
  refUserFname: any;
  refUserLname: any;
  refEducationSpec: any;
  refCRDesignation: any;
  refMCINo: any;
  refUserEmail: any;
}

interface patientDetails {
  refUserCustId: any;
  refUserFname: any;
  refUserLname: any;
  refDOB: any;
  refGender: any;
}

interface ReportPDFProps {
  reportDate: any;
  selectedUser: any;
}

const ReportPDF: React.FC<ReportPDFProps> = ({ reportDate, selectedUser }) => {

  const {t, i18n} = useTranslation("global");

  const [showToast, setShowToast] = useState(false);

  const tokenString: any = localStorage.getItem("userDetails");

  const [Loading, setLoading] = useState(false);

  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

  Font.register({
    family: "PopRegular",
    src: PopRegular,
  });

  Font.register({
    family: "PopBoldItalic",
    src: PopBoldItalic,
  });

  Font.register({
    family: "PopBold",
    src: PopBold,
  });

  Font.register({
    family: "PopSemiboldItalic",
    src: PopSemiboldItalic,
  });

  function calculateAge(dateString: any) {
    const birthDate = new Date(dateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // Adjust age if the birthdate hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }

  function calculateDaysDifference(dateString: any) {
    // Convert the given date string to a Date object
    const givenDate: any = new Date(dateString);

    // Get the current date and set time to midnight for accurate day difference
    const currentDate: any = new Date(reportDate);
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const diffInMs = givenDate - currentDate;

    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  }

  const getValidateDuration = (questionId: any) => {
    switch (parseInt(questionId)) {
      case 94:
        return 30;
      case 5:
        return 30;
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
        return 30;
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
      case 237:
        return 1;
      case 238:
        return 1;
      case 22:
        return 14;
      case 23:
        return 14;
      case 24:
        return 14;
      case 89:
        return 1;
      case 92:
        return 1;
      case 84:
        return 1;
      case 90:
        return 1;
      default:
        return 0;
    }
  };

  const [treatementDetails, setTreatementDetails]: any = useState([]);

  const [content, setContent] = useState("");

  useEffect(() => {
    if (tokenString) {
      try {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getReportPDF`,
            {
              patientId: selectedUser.toString(),
              reportDate: reportDate,
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
              console.log("====>", data);

              setDoctorDetails(data.doctorDetails);
              setPatientDetails(data.patientDetails);
              setScore(data.scoreResult);
              setScoreVerify(data.scoreVerifyResult);
              setGenerateDate(data.generateDate);
              setAllCategory(data.categoryResult);

              setTreatementDetails(data.treatmentDetails);

              setContent(data.content);
            }
          });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }
  }, []);

  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails | undefined>(
    undefined
  );
  const [patientDetails, setPatientDetails] = useState<
    patientDetails | undefined
  >(undefined);
  const [score, setScore]: any = useState([]);
  const [scoreVerify, setScoreVerify] = useState([]);

  const [generateDate, setGenerateDate] = useState("");

  const [allCategory, setAllCategory] = useState([]);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        if (reader.result) {
          const base64data = reader.result.toString().split(",")[1]; // Extract actual Base64 content
          resolve(base64data);
        } else {
          reject(new Error("Failed to convert Blob to Base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDownloadPDF = async () => {
    const doc = (
      <Document>
        <Page size="A4">
          <View style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={backgroundImage}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
            <View style={{ padding: 20 }}>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {/* Date */}
                <View>
                  <Text
                    style={{
                      fontSize: "12px",
                      color: "#636466",
                      fontFamily: "PopBold",
                      marginBottom: "20px",
                    }}
                  >
                    {generateDate.split("T")[0]}
                  </Text>
                </View>

                {/* Hospital Details */}
                {/* <View
                  style={{
                    width: "55%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "20%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Image src={governmentLogo} style={{ width: "80%" }} />
                  </View>
                  <View style={{ width: "80%" }}>
                    <Text
                      style={{
                        fontFamily: "PopBold",
                        fontSize: "11.5px",
                        color: "#1b71b1",
                      }}
                    >
                      Government Mohan Kumaramangalam
                    </Text>
                    <Text
                      style={{
                        fontFamily: "PopBold",
                        fontSize: "11.5px",
                        color: "#1b71b1",
                      }}
                    >
                      Medical College Hospital
                    </Text>
                    <Text
                      style={{
                        fontFamily: "PopBold",
                        fontSize: "11.5px",
                        color: "#1b71b1",
                      }}
                    >
                      Department of Community Medicine
                    </Text>
                    <Text
                      style={{
                        fontFamily: "PopBold",
                        fontSize: "11.5px",
                        color: "#1b71b1",
                      }}
                    >
                      GMKMCH Salem
                    </Text>
                  </View>
                </View> */}

                {/* Patient And Doctor Details */}

                <View
                  style={{
                    marginTop: "80px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0px 20px",
                    paddingTop: "20px",
                  }}
                >
                  {/* Patient Details */}
                  <View
                    style={{
                      width: "50%",
                      height: "100px",
                      backgroundColor: "#1b71b1",
                      borderRadius: "10px",
                      padding: "0px 20px",
                      display: "flex",
                      rowGap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    {/* Patient ID */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    >
                      <Text style={{ fontFamily: "PopBold" }}>Patient ID </Text>
                      <Text style={{ fontFamily: "PopRegular" }}>
                        : {patientDetails?.refUserCustId}
                      </Text>
                    </View>

                    {/* Patient Name */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    >
                      <Text style={{ fontFamily: "PopBold" }}>Name </Text>
                      <Text style={{ fontFamily: "PopRegular" }}>
                        : {patientDetails?.refUserFname}{" "}
                        {patientDetails?.refUserLname}
                      </Text>
                    </View>

                    {/* Age */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    >
                      <Text style={{ fontFamily: "PopBold" }}>Age </Text>
                      <Text style={{ fontFamily: "PopRegular" }}>
                        : {calculateAge(patientDetails?.refDOB)}
                      </Text>
                    </View>

                    {/* Gender */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    >
                      <Text style={{ fontFamily: "PopBold" }}>Gender </Text>
                      <Text style={{ fontFamily: "PopRegular" }}>
                        : {patientDetails?.refGender}
                      </Text>
                    </View>
                  </View>

                  {/* Doctor Details */}
                  {tokenObject.roleType === 4 || tokenObject.roleType === 1 ? (
                    <View
                      style={{
                        width: "45%",
                        height: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      {/* Doctor Name */}

                      <View>
                        <Text
                          style={{
                            fontSize: "9.5px",
                            fontFamily: "PopRegular",
                          }}
                        >
                          Dr. {doctorDetails?.refUserFname}{" "}
                          {doctorDetails?.refUserLname}{" "}
                          {doctorDetails?.refEducationSpec} (Community Med)
                        </Text>
                      </View>

                      {/* Doctor Designation */}
                      <View>
                        <Text
                          style={{
                            fontSize: "9.5px",
                            fontFamily: "PopRegular",
                          }}
                        >
                          {doctorDetails?.refCRDesignation}
                        </Text>
                      </View>

                      {/* Reg No */}
                      <View>
                        <Text
                          style={{
                            fontSize: "9.5px",
                            fontFamily: "PopRegular",
                          }}
                        >
                          Reg No: {doctorDetails?.refMCINo}
                        </Text>
                      </View>

                      {/* Mail Id */}
                      <View>
                        <Text
                          style={{
                            fontSize: "9.5px",
                            fontFamily: "PopRegular",
                          }}
                        >
                          Mail id : {doctorDetails?.refUserEmail}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>

                {/* Line */}
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-10px",
                  }}
                >
                  <View
                    style={{
                      width: "92%",
                      borderBottom: "1px solid #1a70b0",
                    }}
                  >
                    <Text> </Text>
                  </View>
                </View>

                {/* Report Details */}

                {/* OverAll Report */}
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0px 20px",
                    marginTop: "10px",
                  }}
                >
                  {/* Left Part */}
                  <View style={{ width: "35%" }}>
                    {/* Headline - Risk Status */}
                    <Text
                      style={{
                        fontSize: "13px",
                        fontFamily: "PopBold",
                        backgroundColor: "#39b44a",
                        color: "#fff",
                        padding: "5px",
                        margin: "0px 10px",
                        borderRadius: "50",
                        textAlign: "center",
                      }}
                    >
                      Risk Status
                    </Text>

                    {/* Risk Score */}

                    <View
                      style={{
                        marginTop: "10px",
                        height: "190px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Alcohol Status */}
                      <View
                        style={{
                          fontSize: "10px",
                          display: "flex",
                          flexDirection: "row",
                          padding: "0px 10px",
                        }}
                      >
                        <Text
                          style={{
                            width: "30%",
                            color: "#1b71b1",
                            fontFamily: "PopBold",
                          }}
                        >
                          Alcohol
                        </Text>
                        {score.some(
                          (element: any) => element.refQCategoryId === "11"
                        ) ? (
                          score
                            .filter(
                              (element: any) => element.refQCategoryId === "11"
                            )
                            .map((element: any) => {
                              const result = scoreVerify.filter(
                                (soc: any) => soc.refQCategoryId === "11"
                              );
                              return (
                                <View
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "70%",
                                  }}
                                >
                                  <>
                                    <>
                                      {getValidateDuration(
                                        element.refQCategoryId
                                      ) >
                                      -calculateDaysDifference(
                                        element.refPTcreatedDate
                                      ) ? (
                                        <>
                                          {" "}
                                          <ScoreVerify
                                            userScoreVerify={result}
                                            refScore={element.refPTScore}
                                            status={true}
                                          />
                                          {/* <Image
                                              style={{ width: "18px", height: "18px", marginLeft: "5px" }}
                                              src={
                                                element.refRoleId === 1 || element.refRoleId === 4
                                                  ? doctor
                                                  : element.refRoleId === 2
                                                    ? assistant
                                                    : element.refRoleId === 3
                                                      ? patient
                                                      : "defaultImageUrl.jpg"
                                              }
                                            /> */}
                                        </>
                                      ) : (
                                        <Text
                                          style={{
                                            width: "70%",
                                            color: "#000",
                                          }}
                                        >
                                          : -
                                        </Text>
                                      )}
                                    </>
                                  </>
                                </View>
                              );
                            })
                        ) : (
                          <Text style={{ width: "70%", color: "#000" }}>
                            : -
                          </Text>
                        )}
                      </View>

                      {/* BMI Status */}
                      <View
                        style={{
                          fontSize: "10px",
                          display: "flex",
                          flexDirection: "row",
                          padding: "0px 10px",
                        }}
                      >
                        <Text
                          style={{
                            width: "30%",
                            color: "#1b71b1",
                            fontFamily: "PopBold",
                          }}
                        >
                          BMI
                        </Text>
                        {score.some(
                          (element: any) => element.refQCategoryId === "13"
                        ) ? (
                          score
                            .filter(
                              (element: any) => element.refQCategoryId === "13"
                            )
                            .map((element: any) => {
                              const result = scoreVerify.filter(
                                (soc: any) => soc.refQCategoryId === "13"
                              );
                              return (
                                <View
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "70%",
                                  }}
                                >
                                  <>
                                    <>
                                      {getValidateDuration(
                                        element.refQCategoryId
                                      ) >
                                      -calculateDaysDifference(
                                        element.refPTcreatedDate
                                      ) ? (
                                        <>
                                          {" "}
                                          <ScoreVerify
                                            userScoreVerify={result}
                                            refScore={element.refPTScore}
                                            status={true}
                                          />
                                          {/* <Image
                                              style={{ width: "18px", height: "18px", marginLeft: "5px" }}
                                              src={
                                                element.refRoleId === 1 || element.refRoleId === 4
                                                  ? doctor
                                                  : element.refRoleId === 2
                                                    ? assistant
                                                    : element.refRoleId === 3
                                                      ? patient
                                                      : "defaultImageUrl.jpg"
                                              }
                                            /> */}
                                        </>
                                      ) : (
                                        <Text
                                          style={{
                                            width: "70%",
                                            color: "#000",
                                          }}
                                        >
                                          : -
                                        </Text>
                                      )}
                                    </>
                                  </>
                                </View>
                              );
                            })
                        ) : (
                          <Text style={{ width: "70%", color: "#000" }}>
                            : -
                          </Text>
                        )}
                      </View>

                      {/* Diet Status */}
                      <View
                        style={{
                          fontSize: "10px",
                          display: "flex",
                          flexDirection: "row",
                          padding: "0px 10px",
                        }}
                      >
                        <Text
                          style={{
                            width: "30%",
                            color: "#1b71b1",
                            fontFamily: "PopBold",
                          }}
                        >
                          Diet
                        </Text>
                        {score.some(
                          (element: any) => element.refQCategoryId === "12"
                        ) ? (
                          score
                            .filter(
                              (element: any) => element.refQCategoryId === "12"
                            )
                            .map((element: any) => {
                              const result = scoreVerify.filter(
                                (soc: any) => soc.refQCategoryId === "12"
                              );
                              return (
                                <View
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "70%",
                                  }}
                                >
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <>
                                        {" "}
                                        <ScoreVerify
                                          userScoreVerify={result}
                                          refScore={element.refPTScore}
                                          status={true}
                                        />
                                        {/* <Image
                                            style={{ width: "18px", height: "18px", marginLeft: "5px" }}
                                            src={
                                              element.refRoleId === 1 || element.refRoleId === 4
                                                ? doctor
                                                : element.refRoleId === 2
                                                  ? assistant
                                                  : element.refRoleId === 3
                                                    ? patient
                                                    : "defaultImageUrl.jpg"
                                            }
                                          /> */}
                                      </>
                                    ) : (
                                      <Text
                                        style={{ width: "70%", color: "#000" }}
                                      >
                                        : -
                                      </Text>
                                    )}
                                  </>
                                </View>
                              );
                            })
                        ) : (
                          <Text style={{ width: "70%", color: "#000" }}>
                            : -
                          </Text>
                        )}
                      </View>

                      {/* Physical Status */}
                      <View
                        style={{
                          fontSize: "10px",
                          display: "flex",
                          flexDirection: "row",
                          padding: "0px 10px",
                        }}
                      >
                        <Text
                          style={{
                            width: "30%",
                            color: "#1b71b1",
                            fontFamily: "PopBold",
                          }}
                        >
                          Physical
                        </Text>
                        {score.some(
                          (element: any) => element.refQCategoryId === "8"
                        ) ? (
                          score
                            .filter(
                              (element: any) => element.refQCategoryId === "8"
                            )
                            .map((element: any) => {
                              const result = scoreVerify.filter(
                                (soc: any) => soc.refQCategoryId === "8"
                              );
                              return (
                                <View
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "70%",
                                  }}
                                >
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <>
                                        {" "}
                                        <ScoreVerify
                                          userScoreVerify={result}
                                          refScore={element.refPTScore}
                                          status={true}
                                        />
                                        {/* <Image
                                            style={{ width: "18px", height: "18px", marginLeft: "5px" }}
                                            src={
                                              element.refRoleId === 1 || element.refRoleId === 4
                                                ? doctor
                                                : element.refRoleId === 2
                                                  ? assistant
                                                  : element.refRoleId === 3
                                                    ? patient
                                                    : "defaultImageUrl.jpg"
                                            }
                                          /> */}
                                      </>
                                    ) : (
                                      <Text
                                        style={{ width: "70%", color: "#000" }}
                                      >
                                        : -
                                      </Text>
                                    )}
                                  </>
                                </View>
                              );
                            })
                        ) : (
                          <Text style={{ width: "70%", color: "#000" }}>
                            : -
                          </Text>
                        )}
                      </View>

                      {/* Sleep Status */}
                      <View
                        style={{
                          fontSize: "10px",
                          display: "flex",
                          flexDirection: "row",
                          padding: "0px 10px",
                        }}
                      >
                        <Text
                          style={{
                            width: "30%",
                            color: "#1b71b1",
                            fontFamily: "PopBold",
                          }}
                        >
                          Sleep
                        </Text>
                        {score.some(
                          (element: any) => element.refQCategoryId === "43"
                        ) ? (
                          score
                            .filter(
                              (element: any) => element.refQCategoryId === "43"
                            )
                            .map((element: any) => {
                              const result = scoreVerify.filter(
                                (soc: any) => soc.refQCategoryId === "43"
                              );
                              return (
                                <View
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "70%",
                                  }}
                                >
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <>
                                        {" "}
                                        <ScoreVerify
                                          userScoreVerify={result}
                                          refScore={element.refPTScore}
                                          status={true}
                                        />
                                        {/* <Image
                                            style={{ width: "18px", height: "18px", marginLeft: "5px" }}
                                            src={
                                              element.refRoleId === 1 || element.refRoleId === 4
                                                ? doctor
                                                : element.refRoleId === 2
                                                  ? assistant
                                                  : element.refRoleId === 3
                                                    ? patient
                                                    : "defaultImageUrl.jpg"
                                            }
                                          /> */}
                                      </>
                                    ) : (
                                      <Text
                                        style={{ width: "70%", color: "#000" }}
                                      >
                                        : -
                                      </Text>
                                    )}
                                  </>
                                </View>
                              );
                            })
                        ) : (
                          <Text style={{ width: "70%", color: "#000" }}>
                            : -
                          </Text>
                        )}
                      </View>

                      {/* Stress Status */}
                      <View
                        style={{
                          fontSize: "10px",
                          display: "flex",
                          flexDirection: "row",
                          padding: "0px 10px",
                        }}
                      >
                        <Text
                          style={{
                            width: "30%",
                            color: "#1b71b1",
                            fontFamily: "PopBold",
                          }}
                        >
                          Stress
                        </Text>
                        {score.some(
                          (element: any) => element.refQCategoryId === "9"
                        ) ? (
                          score
                            .filter(
                              (element: any) => element.refQCategoryId === "9"
                            )
                            .map((element: any) => {
                              const result = scoreVerify.filter(
                                (soc: any) => soc.refQCategoryId === "9"
                              );
                              return (
                                <View
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "70%",
                                  }}
                                >
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <>
                                        {" "}
                                        <ScoreVerify
                                          userScoreVerify={result}
                                          refScore={element.refPTScore}
                                          status={true}
                                        />
                                        {/* <Image
                                            style={{ width: "18px", height: "18px", marginLeft: "5px" }}
                                            src={
                                              element.refRoleId === 1 || element.refRoleId === 4
                                                ? doctor
                                                : element.refRoleId === 2
                                                  ? assistant
                                                  : element.refRoleId === 3
                                                    ? patient
                                                    : "defaultImageUrl.jpg"
                                            }
                                          /> */}
                                      </>
                                    ) : (
                                      <Text
                                        style={{ width: "70%", color: "#000" }}
                                      >
                                        : -
                                      </Text>
                                    )}
                                  </>
                                </View>
                              );
                            })
                        ) : (
                          <Text style={{ width: "70%", color: "#000" }}>
                            : -
                          </Text>
                        )}
                      </View>

                      {/* Tobacco Status */}
                      <View
                        style={{
                          fontSize: "10px",
                          display: "flex",
                          flexDirection: "row",
                          padding: "0px 10px",
                        }}
                      >
                        <Text
                          style={{
                            width: "30%",
                            color: "#1b71b1",
                            fontFamily: "PopBold",
                          }}
                        >
                          Tobacco
                        </Text>
                        {score.some(
                          (element: any) => element.refQCategoryId === "10"
                        ) ? (
                          score
                            .filter(
                              (element: any) => element.refQCategoryId === "10"
                            )
                            .map((element: any) => {
                              const result = scoreVerify.filter(
                                (soc: any) => soc.refQCategoryId === "10"
                              );
                              return (
                                <View
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "70%",
                                  }}
                                >
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <>
                                        {" "}
                                        <ScoreVerify
                                          userScoreVerify={result}
                                          refScore={element.refPTScore}
                                          status={true}
                                        />
                                        {/* <Image
                                            style={{ width: "18px", height: "18px", marginLeft: "5px" }}
                                            src={
                                              element.refRoleId === 1 || element.refRoleId === 4
                                                ? doctor
                                                : element.refRoleId === 2
                                                  ? assistant
                                                  : element.refRoleId === 3
                                                    ? patient
                                                    : "defaultImageUrl.jpg"
                                            }
                                          /> */}
                                      </>
                                    ) : (
                                      <Text
                                        style={{ width: "70%", color: "#000" }}
                                      >
                                        : -
                                      </Text>
                                    )}
                                  </>
                                </View>
                              );
                            })
                        ) : (
                          <Text style={{ width: "70%", color: "#000" }}>
                            : -
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>

                  {/* Right Part */}
                  <View
                    style={{
                      width: "65%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Anthropometry & Vitals */}
                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      {/* Inside Left */}
                      <View style={{ width: "50%" }}>
                        {/* Headline - Anthropometry */}
                        <Text
                          style={{
                            fontSize: "13px",
                            fontFamily: "PopBold",
                            backgroundColor: "#39b44a",
                            color: "#fff",
                            padding: "5px",
                            margin: "0px 10px",
                            borderRadius: "50",
                            textAlign: "center",
                          }}
                        >
                          Anthropometry
                        </Text>

                        {/* Anthropometry Score */}

                        <View
                          style={{
                            marginTop: "9px",
                            display: "flex",
                            gap: "7px",
                          }}
                        >
                          {/* Height */}
                          <View
                            style={{
                              fontSize: "9px",
                              display: "flex",
                              flexDirection: "row",
                              padding: "0px 10px",
                            }}
                          >
                            <Text
                              style={{
                                width: "30%",
                                color: "#1b71b1",
                                fontFamily: "PopBold",
                              }}
                            >
                              Height
                            </Text>
                            <Text style={{ width: "70%", color: "#000" }}>
                              :{" "}
                              {score.some(
                                (element: any) =>
                                  element.refQCategoryId === "22"
                              ) ? (
                                score
                                  .filter(
                                    (element: any) =>
                                      element.refQCategoryId === "22"
                                  )
                                  .map((element: any) => (
                                    <>
                                      {getValidateDuration(
                                        element.refQCategoryId
                                      ) >
                                      -calculateDaysDifference(
                                        element.refPTcreatedDate
                                      ) ? (
                                        <>
                                          {" "}
                                          <Text key={element.refPTScore}>
                                            {element.refPTScore} cms
                                          </Text>
                                        </>
                                      ) : (
                                        <Text
                                          style={{
                                            width: "70%",
                                            color: "#000",
                                          }}
                                        >
                                          -
                                        </Text>
                                      )}
                                    </>
                                  ))
                              ) : (
                                <Text>-</Text>
                              )}
                            </Text>
                          </View>

                          {/* Weight */}
                          <View
                            style={{
                              fontSize: "9px",
                              display: "flex",
                              flexDirection: "row",
                              padding: "0px 10px",
                            }}
                          >
                            <Text
                              style={{
                                width: "30%",
                                color: "#1b71b1",
                                fontFamily: "PopBold",
                              }}
                            >
                              Weight
                            </Text>
                            <Text style={{ width: "70%", color: "#000" }}>
                              :{" "}
                              {score.some(
                                (element: any) =>
                                  element.refQCategoryId === "23"
                              ) ? (
                                score
                                  .filter(
                                    (element: any) =>
                                      element.refQCategoryId === "23"
                                  )
                                  .map((element: any) => (
                                    <>
                                      {getValidateDuration(
                                        element.refQCategoryId
                                      ) >
                                      -calculateDaysDifference(
                                        element.refPTcreatedDate
                                      ) ? (
                                        <>
                                          {" "}
                                          <Text key={element.refPTScore}>
                                            {element.refPTScore} kgs
                                          </Text>
                                        </>
                                      ) : (
                                        <Text
                                          style={{
                                            width: "70%",
                                            color: "#000",
                                          }}
                                        >
                                          -
                                        </Text>
                                      )}
                                    </>
                                  ))
                              ) : (
                                <Text>-</Text>
                              )}
                            </Text>
                          </View>

                          {/*  Waist/ Hip ratio*/}
                          <View
                            style={{
                              fontSize: "9px",
                              display: "flex",
                              flexDirection: "row",
                              padding: "0px 10px",
                            }}
                          >
                            <Text
                              style={{
                                width: "30%",
                                color: "#1b71b1",
                                fontFamily: "PopBold",
                              }}
                            >
                              Waist/ Hip ratio
                            </Text>
                            <Text
                              style={{
                                width: "70%",
                                color: "#000",
                                paddingTop: "8px",
                              }}
                            >
                              :{" "}
                              {score.some(
                                (element: any) =>
                                  element.refQCategoryId === "24"
                              ) ? (
                                score
                                  .filter(
                                    (element: any) =>
                                      element.refQCategoryId === "24"
                                  )
                                  .map((element: any) => (
                                    <>
                                      {getValidateDuration(
                                        element.refQCategoryId
                                      ) >
                                      -calculateDaysDifference(
                                        element.refPTcreatedDate
                                      ) ? (
                                        <>
                                          {" "}
                                          <Text key={element.refPTScore}>
                                            {element.refPTScore}
                                          </Text>
                                        </>
                                      ) : (
                                        <Text
                                          style={{
                                            width: "70%",
                                            color: "#000",
                                          }}
                                        >
                                          -
                                        </Text>
                                      )}
                                    </>
                                  ))
                              ) : (
                                <Text>-</Text>
                              )}
                            </Text>
                          </View>

                          {/* BMI Status */}
                          <View
                            style={{
                              fontSize: "9px",
                              display: "flex",
                              flexDirection: "row",
                              padding: "0px 10px",
                            }}
                          >
                            <Text
                              style={{
                                width: "30%",
                                color: "#1b71b1",
                                fontFamily: "PopBold",
                              }}
                            >
                              BMI
                            </Text>
                            <Text style={{ width: "70%", color: "#000" }}>
                              :{" "}
                              {score.some(
                                (element: any) =>
                                  element.refQCategoryId === "13"
                              ) ? (
                                score
                                  .filter(
                                    (element: any) =>
                                      element.refQCategoryId === "13"
                                  )
                                  .map((element: any) => (
                                    <>
                                      {getValidateDuration(
                                        element.refQCategoryId
                                      ) >
                                      -calculateDaysDifference(
                                        element.refPTcreatedDate
                                      ) ? (
                                        <>
                                          {" "}
                                          <Text key={element.refPTScore}>
                                            {element.refPTScore} kg/m2
                                          </Text>
                                        </>
                                      ) : (
                                        <Text
                                          style={{
                                            width: "70%",
                                            color: "#000",
                                          }}
                                        >
                                          -
                                        </Text>
                                      )}
                                    </>
                                  ))
                              ) : (
                                <Text>-</Text>
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Insight Right */}
                      <View style={{ width: "50%" }}>
                        {/* Headline - Vitals */}
                        <Text
                          style={{
                            fontSize: "13px",
                            fontFamily: "PopBold",
                            backgroundColor: "#39b44a",
                            color: "#fff",
                            padding: "5px",
                            margin: "0px 10px",
                            borderRadius: "50",
                            textAlign: "center",
                          }}
                        >
                          Vitals
                        </Text>

                        {/* Vitals Score */}

                        <View
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            gap: "7px",
                          }}
                        >
                          {/* Temperature */}
                          <View
                            style={{
                              fontSize: "9px",
                              display: "flex",
                              flexDirection: "row",
                              padding: "0px 10px",
                            }}
                          >
                            <Text
                              style={{
                                width: "45%",
                                color: "#1b71b1",
                                fontFamily: "PopBold",
                              }}
                            >
                              Temperature
                            </Text>
                            <Text style={{ width: "55%", color: "#000" }}>
                              :{" "}
                              {score.some(
                                (element: any) =>
                                  element.refQCategoryId === "89"
                              ) ? (
                                score
                                  .filter(
                                    (element: any) =>
                                      element.refQCategoryId === "89"
                                  )
                                  .map((element: any, index: number) => (
                                    <>
                                      {getValidateDuration(
                                        element.refQCategoryId
                                      ) >
                                      -calculateDaysDifference(
                                        element.refPTcreatedDate
                                      ) ? (
                                        <>
                                          {" "}
                                          <Text key={element.refPTScore}>
                                            {element.refPTScore} F
                                          </Text>
                                        </>
                                      ) : (
                                        <Text
                                          style={{
                                            width: "70%",
                                            color: "#000",
                                          }}
                                        >
                                          -
                                        </Text>
                                      )}
                                    </>
                                  ))
                              ) : (
                                <Text>-</Text>
                              )}
                            </Text>
                          </View>

                          {/* RR */}
                          <View
                            style={{
                              fontSize: "9px",
                              display: "flex",
                              flexDirection: "row",
                              padding: "0px 10px",
                            }}
                          >
                            <Text
                              style={{
                                width: "45%",
                                color: "#1b71b1",
                                fontFamily: "PopBold",
                              }}
                            >
                              RR
                            </Text>
                            <Text style={{ width: "55%", color: "#000" }}>
                              :{" "}
                              {score.some(
                                (element: any) =>
                                  element.refQCategoryId === "92"
                              ) ? (
                                score
                                  .filter(
                                    (element: any) =>
                                      element.refQCategoryId === "92"
                                  )
                                  .map((element: any, index: number) => (
                                    <>
                                      {getValidateDuration(
                                        element.refQCategoryId
                                      ) >
                                      -calculateDaysDifference(
                                        element.refPTcreatedDate
                                      ) ? (
                                        <>
                                          {" "}
                                          <Text key={element.refPTScore}>
                                            {element.refPTScore} /min
                                          </Text>
                                        </>
                                      ) : (
                                        <Text
                                          style={{
                                            width: "70%",
                                            color: "#000",
                                          }}
                                        >
                                          -
                                        </Text>
                                      )}
                                    </>
                                  ))
                              ) : (
                                <Text>-</Text>
                              )}
                            </Text>
                          </View>

                          {/*  Pulse*/}
                          <View
                            style={{
                              fontSize: "9px",
                              display: "flex",
                              flexDirection: "row",
                              padding: "0px 10px",
                            }}
                          >
                            <Text
                              style={{
                                width: "45%",
                                color: "#1b71b1",
                                fontFamily: "PopBold",
                              }}
                            >
                              Pulse
                            </Text>
                            <Text
                              style={{
                                width: "55%",
                                color: "#000",
                              }}
                            >
                              :{" "}
                              {score.some(
                                (element: any) =>
                                  element.refQCategoryId === "84"
                              ) ? (
                                score
                                  .filter(
                                    (element: any) =>
                                      element.refQCategoryId === "84"
                                  )
                                  .map((element: any, index: number) => (
                                    <>
                                      <>
                                        {getValidateDuration(
                                          element.refQCategoryId
                                        ) >
                                        -calculateDaysDifference(
                                          element.refPTcreatedDate
                                        ) ? (
                                          <>
                                            {" "}
                                            <Text key={element.refPTScore}>
                                              {element.refPTScore} /min
                                            </Text>
                                          </>
                                        ) : (
                                          <Text
                                            style={{
                                              width: "70%",
                                              color: "#000",
                                            }}
                                          >
                                            -
                                          </Text>
                                        )}
                                      </>
                                    </>
                                  ))
                              ) : (
                                <Text>-</Text>
                              )}
                            </Text>
                          </View>

                          {/* BP */}
                          <View
                            style={{
                              fontSize: "9px",
                              display: "flex",
                              flexDirection: "row",
                              padding: "0px 10px",
                            }}
                          >
                            <Text
                              style={{
                                width: "45%",
                                color: "#1b71b1",
                                fontFamily: "PopBold",
                              }}
                            >
                              BP
                            </Text>

                            <Text style={{ width: "55%", color: "#000" }}>
                              :
                              <Text style={{ width: "55%", color: "#000" }}>
                                {score.find(
                                  (element: any) =>
                                    element.refQCategoryId === "90"
                                ) ? (
                                  (() => {
                                    const foundElement = score.find(
                                      (element: any) =>
                                        element.refQCategoryId === "90"
                                    );
                                    return (
                                      <>
                                        {foundElement &&
                                        getValidateDuration(
                                          foundElement.refQCategoryId
                                        ) >
                                          -calculateDaysDifference(
                                            foundElement.refPTcreatedDate
                                          ) ? (
                                          <Text key={foundElement.refPTScore}>
                                            {
                                              score.find(
                                                (element: any) =>
                                                  element.refQCategoryId ===
                                                  "90"
                                              ).refPTScore
                                            }{" "}
                                            /{" "}
                                            {
                                              score.find(
                                                (element: any) =>
                                                  element.refQCategoryId ===
                                                  "91"
                                              )?.refPTScore
                                            }{" "}
                                            mm of Hg
                                          </Text>
                                        ) : (
                                          <Text
                                            style={{
                                              width: "70%",
                                              color: "#000",
                                            }}
                                          >
                                            {" "}
                                            -
                                          </Text>
                                        )}
                                      </>
                                    );
                                  })()
                                ) : (
                                  <Text> -</Text>
                                )}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* Line */}
                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "-13px",
                      }}
                    >
                      <View
                        style={{
                          width: "95%",
                          borderBottom: "1px solid #1a70b0",
                        }}
                      >
                        <Text> </Text>
                      </View>
                    </View>

                    {/* Blood Sugar */}
                    <View
                      style={{
                        width: "100%",
                        marginTop: "8px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* Headline - Risk Status */}
                      <View
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            width: "50%",
                            fontSize: "13px",
                            fontFamily: "PopBold",
                            backgroundColor: "#39b44a",
                            color: "#fff",
                            padding: "5px",
                            margin: "0px 10px",
                            borderRadius: "50",
                            textAlign: "center",
                          }}
                        >
                          Blood Sugar
                        </Text>
                      </View>

                      {/* Blood Sugar Score */}
                      <View
                        style={{
                          width: "95%",
                          border: "1px solid #000",
                          borderRadius: "5px",
                          marginTop: "10px",
                        }}
                      >
                        {/* Row 1 */}
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              textAlign: "center",
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                              color: "#fff",
                              backgroundColor: "#1b71b1",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                            }}
                          >
                            Parameter
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                              color: "#1b71b1",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            FBS mg/dl
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                              color: "#1b71b1",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            PPBS mg/dl
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                              color: "#1b71b1",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            RBS mg/dl
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              borderBottom: "1px solid #000",
                              color: "#1b71b1",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            HBA1c %
                          </Text>
                        </View>

                        {/* Row 2 */}
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              textAlign: "center",
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                              color: "#fff",
                              backgroundColor: "#1b71b1",
                              fontFamily: "PopRegular",
                            }}
                          >
                            Value
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                              color: "#000",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            {score.filter(
                              (element: any) => element.refQCategoryId === "203"
                            ).length === 0 ? (
                              <Text>-</Text>
                            ) : (
                              score
                                .filter(
                                  (element: any) =>
                                    element.refQCategoryId === "203"
                                )
                                .map((element: any) => (
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <Text>{element.refPTScore}</Text>
                                    ) : (
                                      <Text>-</Text>
                                    )}
                                  </>
                                ))
                            )}
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                              color: "#000",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            {score.filter(
                              (element: any) => element.refQCategoryId === "204"
                            ).length === 0 ? (
                              <Text>-</Text>
                            ) : (
                              score
                                .filter(
                                  (element: any) =>
                                    element.refQCategoryId === "204"
                                )
                                .map((element: any) => (
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <Text>{element.refPTScore}</Text>
                                    ) : (
                                      <Text>-</Text>
                                    )}
                                  </>
                                ))
                            )}
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              borderRight: "1px solid #000",
                              borderBottom: "1px solid #000",
                              color: "#000",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            {score.filter(
                              (element: any) => element.refQCategoryId === "202"
                            ).length === 0 ? (
                              <Text>-</Text>
                            ) : (
                              score
                                .filter(
                                  (element: any) =>
                                    element.refQCategoryId === "202"
                                )
                                .map((element: any) => (
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <Text>{element.refPTScore}</Text>
                                    ) : (
                                      <Text>-</Text>
                                    )}
                                  </>
                                ))
                            )}
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              borderBottom: "1px solid #000",
                              color: "#000",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            {score.filter(
                              (element: any) => element.refQCategoryId === "207"
                            ).length === 0 ? (
                              <Text>-</Text>
                            ) : (
                              score
                                .filter(
                                  (element: any) =>
                                    element.refQCategoryId === "207"
                                )
                                .map((element: any) => (
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <Text>{element.refPTScore}</Text>
                                    ) : (
                                      <Text>-</Text>
                                    )}
                                  </>
                                ))
                            )}
                          </Text>
                        </View>

                        {/* Row 3 */}
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              textAlign: "center",
                              borderRight: "1px solid #000",
                              color: "#fff",
                              backgroundColor: "#1b71b1",
                              borderBottomLeftRadius: "4px",
                              fontFamily: "PopRegular",
                            }}
                          >
                            Date
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              borderRight: "1px solid #000",
                              color: "#000",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            {score.filter(
                              (element: any) => element.refQCategoryId === "203"
                            ).length === 0 ? (
                              <Text>-</Text>
                            ) : (
                              score
                                .filter(
                                  (element: any) =>
                                    element.refQCategoryId === "203"
                                )
                                .map((element: any) => (
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <Text>
                                        {element.refPTcreatedDate.split("T")[0]}
                                      </Text>
                                    ) : (
                                      <Text>-</Text>
                                    )}
                                  </>
                                ))
                            )}
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              borderRight: "1px solid #000",
                              color: "#000",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            {score.filter(
                              (element: any) => element.refQCategoryId === "204"
                            ).length === 0 ? (
                              <Text>-</Text>
                            ) : (
                              score
                                .filter(
                                  (element: any) =>
                                    element.refQCategoryId === "204"
                                )
                                .map((element: any) => (
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <Text>
                                        {element.refPTcreatedDate.split("T")[0]}
                                      </Text>
                                    ) : (
                                      <Text>-</Text>
                                    )}
                                  </>
                                ))
                            )}
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              borderRight: "1px solid #000",
                              color: "#000",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            {score.filter(
                              (element: any) => element.refQCategoryId === "202"
                            ).length === 0 ? (
                              <Text>-</Text>
                            ) : (
                              score
                                .filter(
                                  (element: any) =>
                                    element.refQCategoryId === "202"
                                )
                                .map((element: any) => (
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <Text>
                                        {element.refPTcreatedDate.split("T")[0]}
                                      </Text>
                                    ) : (
                                      <Text>-</Text>
                                    )}
                                  </>
                                ))
                            )}
                          </Text>
                          <Text
                            style={{
                              width: "20%",
                              fontSize: "9px",
                              color: "#000",
                              borderTopLeftRadius: "4px",
                              fontFamily: "PopRegular",
                              paddingLeft: "5px",
                            }}
                          >
                            {score.filter(
                              (element: any) => element.refQCategoryId === "207"
                            ).length === 0 ? (
                              <Text>-</Text>
                            ) : (
                              score
                                .filter(
                                  (element: any) =>
                                    element.refQCategoryId === "207"
                                )
                                .map((element: any) => (
                                  <>
                                    {getValidateDuration(
                                      element.refQCategoryId
                                    ) >
                                    -calculateDaysDifference(
                                      element.refPTcreatedDate
                                    ) ? (
                                      <Text>
                                        {element.refPTcreatedDate.split("T")[0]}
                                      </Text>
                                    ) : (
                                      <Text>-</Text>
                                    )}
                                  </>
                                ))
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Family History Report */}
                <View style={{ width: "100%", padding: "10px" }}>
                  <View style={{ padding: "0px 20px" }}>
                    <View
                      style={{
                        fontSize: "10px",
                        display: "flex",
                        flexDirection: "row",
                        height: "38px",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          width: "10%",
                          color: "#1b71b1",
                          fontFamily: "PopBold",
                        }}
                      >
                        Family History
                      </Text>
                      <Text style={{ width: "1%" }}>:</Text>
                      <Text
                        style={{
                          width: "89%",
                          color: "#000",
                          textAlign: "justify",
                          fontFamily: "PopRegular",
                        }}
                      >
                        {score
                          .filter(
                            (element: any) => element.refQCategoryId === "51"
                          )
                          .map((element: any) => (
                            <>
                              {getValidateDuration(element.refQCategoryId) >
                              -calculateDaysDifference(
                                element.refPTcreatedDate
                              ) ? (
                                <>
                                  {[
                                    "52", // Add all relevant category IDs
                                    "53",
                                    "54",
                                    "55",
                                    "56",
                                    "57",
                                    "58",
                                  ]
                                    .map((refQCategoryId) => {
                                      // Filter `score` and check for "Yes" condition
                                      const categoryLabels = score
                                        .filter(
                                          (element: any) =>
                                            element?.refQCategoryId &&
                                            element.refQCategoryId.toString() ===
                                              refQCategoryId &&
                                            element.refPTScore === "Yes"
                                        )
                                        .flatMap((element: any) =>
                                          // Map matching categories to their labels
                                          allCategory
                                            .filter(
                                              (cat: any) =>
                                                cat.refQCategoryId.toString() ===
                                                element.refQCategoryId
                                            )
                                            .map(
                                              (cat: any) => cat.refCategoryLabel
                                            )
                                        );

                                      return categoryLabels.length > 0
                                        ? categoryLabels.join(" / ")
                                        : null; // Return null if no matching categories
                                    })
                                    .filter(Boolean) // Remove null or empty results
                                    .join(" / ") ||
                                    "No categories available"}{" "}
                                </>
                              ) : (
                                <>No categories available</>
                              )}
                            </>
                          ))}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Line */}
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-20px",
                  }}
                >
                  <View
                    style={{
                      width: "92%",
                      borderBottom: "1px solid #1a70b0",
                    }}
                  >
                    <Text> </Text>
                  </View>
                </View>

                {/* Disease Status */}
                <View style={{ width: "100%", padding: "20px 0px" }}>
                  <View
                    style={{
                      padding: "0px 20px",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        width: "28%",
                        height: "80px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          width: "100%",
                          fontSize: "13px",
                          fontFamily: "PopBold",
                          backgroundColor: "#39b44a",
                          color: "#fff",
                          padding: "5px",
                          margin: "0px 10px",
                          borderRadius: "50",
                          textAlign: "center",
                        }}
                      >
                        Disease Status
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "68%",
                        height: "80px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          fontSize: "11px",
                          textAlign: "center",
                          color: "#000",
                          fontFamily: "PopRegular",
                          display: "flex",
                          flexDirection: "row",
                          paddingBottom: "5px",
                        }}
                      >
                        <Text
                          style={{
                            color: "#1a70b0",
                            width: "22%",
                            textAlign: "left",
                          }}
                        >
                          Diabetic
                        </Text>
                        <Text style={{ width: "3%", textAlign: "left" }}>
                          -
                        </Text>
                        <Text style={{ width: "75%", textAlign: "left" }}>
                          {score.filter(
                            (element: any) => element.refQCategoryId === "237"
                          ).length === 0 ? (
                            <Text>No Values</Text>
                          ) : (
                            score
                              .filter(
                                (element: any) =>
                                  element.refQCategoryId === "237"
                              )
                              .map((element: any) => (
                                <>
                                  {getValidateDuration(element.refQCategoryId) >
                                  -calculateDaysDifference(
                                    element.refPTcreatedDate
                                  ) ? (
                                    <>
                                      {" "}
                                      <Text key={element.refPTScore}>
                                        {element.refPTScore}
                                      </Text>
                                    </>
                                  ) : (
                                    <Text
                                      style={{ width: "70%", color: "#000" }}
                                    >
                                      No Values
                                    </Text>
                                  )}
                                </>
                              ))
                          )}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          fontSize: "11px",
                          textAlign: "center",
                          color: "#000",
                          fontFamily: "PopRegular",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          style={{
                            color: "#1a70b0",
                            width: "22%",
                            textAlign: "left",
                          }}
                        >
                          Hypertension
                        </Text>
                        <Text style={{ width: "3%", textAlign: "left" }}>
                          -
                        </Text>
                        <Text style={{ width: "75%", textAlign: "left" }}>
                          {score.filter(
                            (element: any) => element.refQCategoryId === "238"
                          ).length === 0 ? (
                            <Text>No Values</Text>
                          ) : (
                            score
                              .filter(
                                (element: any) =>
                                  element.refQCategoryId === "238"
                              )
                              .map((element: any) => (
                                <>
                                  {getValidateDuration(element.refQCategoryId) >
                                  -calculateDaysDifference(
                                    element.refPTcreatedDate
                                  ) ? (
                                    <>
                                      {" "}
                                      <Text key={element.refPTScore}>
                                        {element.refPTScore}
                                      </Text>
                                    </>
                                  ) : (
                                    <Text
                                      style={{ width: "70%", color: "#000" }}
                                    >
                                      No Values
                                    </Text>
                                  )}
                                </>
                              ))
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Line */}
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-20px",
                  }}
                >
                  <View
                    style={{
                      width: "92%",
                      borderBottom: "1px solid #1a70b0",
                    }}
                  >
                    <Text> </Text>
                  </View>
                </View>

                {/* User Identification */}
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                  }}
                >
                  <View style={{ width: "92%" }}>
                    <Text
                      style={{
                        fontSize: "9px",
                        textAlign: "left",
                        color: "#000",
                        fontFamily: "PopRegular",
                      }}
                    >
                      {content}
                    </Text>
                  </View>
                  {/* <View style={{ width: "92%", display: "flex", flexDirection: "row", marginTop: "10px" }}>
                    <View style={{ width: "33%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                      <Image style={{ height: "20px", width: "20px" }} src={doctor} />
                      <Text style={{
                        fontSize: "9px",
                        textAlign: "left",
                        color: "#000",
                        fontFamily: "PopBold",
                      }}>Doctor</Text>
                    </View>
                    <View style={{ width: "33%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                      <Image style={{ height: "20px", width: "20px" }} src={assistant} />
                      <Text style={{
                        fontSize: "9px",
                        textAlign: "left",
                        color: "#000",
                        fontFamily: "PopBold",
                      }}>Assistant</Text>
                    </View>
                    <View style={{ width: "33%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                      <Image style={{ height: "20px", width: "20px" }} src={patient} />
                      <Text style={{
                        fontSize: "9px",
                        textAlign: "left",
                        color: "#000",
                        fontFamily: "PopBold",
                      }}>Patient</Text>
                    </View>
                  </View> */}
                </View>
              </View>
            </View>
          </View>
        </Page>

        <Page size="A4">
          <View style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={backgroundImage1}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
            <View style={{ padding: 20 }}>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {/* Date */}
                <View>
                  <Text
                    style={{
                      fontSize: "12px",
                      color: "#636466",
                      fontFamily: "PopBold",
                      marginBottom: "20px",
                    }}
                  >
                    {generateDate.split("T")[0]}
                  </Text>
                </View>

                {/* Hospital Details */}
                {/* <View
                  style={{
                    width: "55%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "20%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Image src={governmentLogo} style={{ width: "80%" }} />
                  </View>
                  <View style={{ width: "80%" }}>
                    <Text
                      style={{
                        fontFamily: "PopBold",
                        fontSize: "11.5px",
                        color: "#1b71b1",
                      }}
                    >
                      Government Mohan Kumaramangalam
                    </Text>
                    <Text
                      style={{
                        fontFamily: "PopBold",
                        fontSize: "11.5px",
                        color: "#1b71b1",
                      }}
                    >
                      Medical College Hospital
                    </Text>
                    <Text
                      style={{
                        fontFamily: "PopBold",
                        fontSize: "11.5px",
                        color: "#1b71b1",
                      }}
                    >
                      Department of Community Medicine
                    </Text>
                    <Text
                      style={{
                        fontFamily: "PopBold",
                        fontSize: "11.5px",
                        color: "#1b71b1",
                      }}
                    >
                      GMKMCH Salem
                    </Text>
                  </View>
                </View> */}

                {/* Patient And Doctor Details */}

                <View
                  style={{
                    marginTop: "80px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0px 20px",
                    paddingTop: "20px",
                  }}
                >
                  {/* Patient Details */}
                  <View
                    style={{
                      width: "50%",
                      height: "100px",
                      backgroundColor: "#1b71b1",
                      borderRadius: "10px",
                      padding: "0px 20px",
                      display: "flex",
                      rowGap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    {/* Patient ID */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    >
                      <Text style={{ fontFamily: "PopBold" }}>Patient ID </Text>
                      <Text style={{ fontFamily: "PopRegular" }}>
                        : {patientDetails?.refUserCustId}
                      </Text>
                    </View>

                    {/* Patient Name */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    >
                      <Text style={{ fontFamily: "PopBold" }}>Name </Text>
                      <Text style={{ fontFamily: "PopRegular" }}>
                        : {patientDetails?.refUserFname}{" "}
                        {patientDetails?.refUserLname}
                      </Text>
                    </View>

                    {/* Age */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    >
                      <Text style={{ fontFamily: "PopBold" }}>Age </Text>
                      <Text style={{ fontFamily: "PopRegular" }}>
                        : {calculateAge(patientDetails?.refDOB)}
                      </Text>
                    </View>

                    {/* Gender */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    >
                      <Text style={{ fontFamily: "PopBold" }}>Gender </Text>
                      <Text style={{ fontFamily: "PopRegular" }}>
                        : {patientDetails?.refGender}
                      </Text>
                    </View>
                  </View>

                  {/* Doctor Details */}
                  {tokenObject.roleType === 4 || tokenObject.roleType === 1 ? (
                    <View
                      style={{
                        width: "45%",
                        height: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      {/* Doctor Name */}

                      <View>
                        <Text
                          style={{
                            fontSize: "9.5px",
                            fontFamily: "PopRegular",
                          }}
                        >
                          Dr. {doctorDetails?.refUserFname}{" "}
                          {doctorDetails?.refUserLname}{" "}
                          {doctorDetails?.refEducationSpec} (Community Med)
                        </Text>
                      </View>

                      {/* Doctor Designation */}
                      <View>
                        <Text
                          style={{
                            fontSize: "9.5px",
                            fontFamily: "PopRegular",
                          }}
                        >
                          {doctorDetails?.refCRDesignation}
                        </Text>
                      </View>

                      {/* Reg No */}
                      <View>
                        <Text
                          style={{
                            fontSize: "9.5px",
                            fontFamily: "PopRegular",
                          }}
                        >
                          Reg No: {doctorDetails?.refMCINo}
                        </Text>
                      </View>

                      {/* Mail Id */}
                      <View>
                        <Text
                          style={{
                            fontSize: "9.5px",
                            fontFamily: "PopRegular",
                          }}
                        >
                          Mail id : {doctorDetails?.refUserEmail}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>

                {/* Line */}
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-10px",
                  }}
                >
                  <View
                    style={{
                      width: "92%",
                      borderBottom: "1px solid #1a70b0",
                    }}
                  >
                    <Text> </Text>
                  </View>
                </View>

                {/* Medication Report */}
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      width: "25%",
                      fontSize: "13px",
                      fontFamily: "PopBold",
                      backgroundColor: "#39b44a",
                      color: "#fff",
                      padding: "5px",
                      margin: "0px 10px",
                      borderRadius: "50",
                      textAlign: "center",
                    }}
                  >
                    Medication
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      padding: "0 20px",
                      marginTop: "10px",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",

                        display: "flex",
                        flexDirection: "row",
                        borderRadius: "4px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: "6%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                          borderLeft: "1px solid #000",
                          borderRight: "1px solid #000",
                          borderTopLeftRadius: "4px",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>S.No</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "12%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid #000",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>Medicine</Text>
                          <Text>Name</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "15%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid #000",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>Category</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "8%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid #000",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ padding: "2px" }}>Strength</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "7%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid #000",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>RoA</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "9%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid #000",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>RoF</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "7%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid #000",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>FN</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "7%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid #000",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>AN</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "7%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid #000",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>Eve</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "7%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid #000",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>Night</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "10%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid #000",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>Duration</Text>
                          <Text>(days)</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "5%",
                          height: "38px",
                          fontSize: "9px",
                          color: "#1b71b1",
                          fontFamily: "PopRegular",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRight: "1px solid #000",
                          borderTop: "1px solid #000",
                          borderBottom: "1px solid #000",
                          borderTopRightRadius: "4px",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>Qty</Text>
                        </View>
                      </View>
                    </View>

                    {treatementDetails.length === 0 ? (
                      <View
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          borderRadius: "4px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            height: "38px",
                            fontSize: "8px",
                            color: "#000",
                            fontFamily: "PopRegular",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderLeft: "1px solid #000",
                            borderBottom: "1px solid #000",
                            borderRight: "1px solid #000",
                            borderBottomLeftRadius: "4px",
                            borderBottomRightRadius: "4px",
                          }}
                        >
                          <Text>No Data Found</Text>
                        </View>
                      </View>
                    ) : null}

                    {treatementDetails.map((element: any, index: any) => (
                      <>
                        {index === treatementDetails.length - 1 ? (
                          <View
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              borderRadius: "4px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                width: "6%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderLeft: "1px solid #000",
                                borderBottom: "1px solid #000",
                                borderRight: "1px solid #000",
                                borderBottomLeftRadius: "4px",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{index + 1}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "12%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{element.refTDMedName}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "15%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  padding: "3px",
                                  textAlign: "center",
                                }}
                              >
                                <Text>{element.refTDCat}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "8%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{element.refTDStrength}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "7%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{element.refTDROA}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "9%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{element.refTDRTF}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "7%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>
                                  {element.refTDMorningDosage
                                    ? element.refTDMorningDosage
                                    : "-"}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "7%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>
                                  {element.refTDAfternoonDosage
                                    ? element.refTDAfternoonDosage
                                    : "-"}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "7%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>
                                  {element.refTDEveningDosage
                                    ? element.refTDEveningDosage
                                    : "-"}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "7%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>
                                  {element.refTDNightDosage
                                    ? element.refTDNightDosage
                                    : "-"}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "10%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "1px solid #000",
                                borderRight: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>
                                  {getDaysInMonth(
                                    element.refTDDurationMonth,
                                    element.refTDDurationYear
                                  )}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "5%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "1px solid #000",
                                borderRight: "1px solid #000",
                                borderBottomRightRadius: "4px",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text></Text>
                              </View>
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              borderRadius: "4px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                width: "6%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderLeft: "1px solid #000",
                                borderBottom: "1px solid #000",
                                borderRight: "1px solid #000",
                                // borderBottomLeftRadius: "4px",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{index + 1}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "12%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{element.refTDMedName}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "15%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  padding: "3px",
                                  textAlign: "center",
                                }}
                              >
                                <Text>{element.refTDCat}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "8%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{element.refTDStrength}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "7%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{element.refTDROA}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "9%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>{element.refTDRTF}</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "7%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>
                                  {element.refTDMorningDosage
                                    ? element.refTDMorningDosage
                                    : "-"}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "7%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>
                                  {element.refTDAfternoonDosage
                                    ? element.refTDAfternoonDosage
                                    : "-"}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "7%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>
                                  {element.refTDEveningDosage
                                    ? element.refTDEveningDosage
                                    : "-"}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "7%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRight: "1px solid #000",
                                borderBottom: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>
                                  {element.refTDNightDosage
                                    ? element.refTDNightDosage
                                    : "-"}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "10%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "1px solid #000",
                                borderRight: "1px solid #000",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text>
                                  {getDaysInMonth(
                                    element.refTDDurationMonth,
                                    element.refTDDurationYear
                                  )}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                width: "5%",
                                height: "38px",
                                fontSize: "8px",
                                color: "#000",
                                fontFamily: "PopRegular",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "1px solid #000",
                                borderRight: "1px solid #000",
                                // borderBottomRightRadius: "4px",
                              }}
                            >
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Text></Text>
                              </View>
                            </View>
                          </View>
                        )}
                      </>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );

    /* -----------------Mobile----------------------*/

    // try {
    //   // Generate PDF as Blob
    //   const pdfBlob = await pdf(doc).toBlob();

    //   // Convert Blob to Base64
    //   const base64data = await blobToBase64(pdfBlob);

    //   // Save PDF file
    //   await Filesystem.writeFile({
    //     path: `${patientDetails?.refUserCustId}_${reportDate}.pdf`,
    //     data: base64data,
    //     directory: Directory.Documents
    //   });

    //   console.log("PDF saved successfully!");
    // } catch (error) {
    //   console.error("Error generating or saving PDF:", error);
    // }


    /*-------------------------Mobile Ends---------------------------*/
    
    
    try {
      // Generate PDF as Blob
      const pdfBlob = await pdf(doc).toBlob();

      // Create a URL for the Blob
      const url = URL.createObjectURL(pdfBlob);

      // Create an anchor element and trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${patientDetails?.refUserCustId}_${reportDate}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
    }

    setShowToast(true);

    setLoading(false);
  };

  function getDaysInMonth(month: any, year: any) {
    return new Date(year, month, 0).getDate();
  }

  return (
    <div>
      {Loading ? (
        <>
          <button className="medCustom-button01">
            <i className="pi pi-spin pi-spinner"></i>
          </button>
        </>
      ) : (
        <>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={"File Downloaded in Documents/"}
            duration={3000}
          />
          <button
            onClick={() => {
              handleDownloadPDF();
              setLoading(true);
            }}
        className="medCustom-button01">
            {t("reports.Download Report")}

          </button>
        </>
      )}
    </div>
  );
};

export default ReportPDF;
