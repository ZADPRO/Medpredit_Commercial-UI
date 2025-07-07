import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <>
    <IonPage>
    <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
    </>
  );
};

export default Tab1;



// import {
//   IonAlert,
//   IonBackButton,
//   IonButtons,
//   IonContent,
//   IonFooter,
//   IonHeader,
//   IonIcon,
//   IonPage,
//   IonTitle,
//   IonToolbar,
//   useIonAlert,
// } from "@ionic/react";
// import React, { useEffect, useState } from "react";
// import { useHistory, useLocation, useParams } from "react-router";
// import "../Services/ServiceAssessment.css";
// import { chevronBack } from "ionicons/icons";
// import alcohol_banner from "../../assets/images/Services/Alcohol_Banner.png";
// import stress_banner from "../../assets/images/Services/Stress_Banner.png";
// import tobacco_banner from "../../assets/images/Services/Tobacco_Banner.png";
// import physical_banner from "../../assets/images/Services/Physical_Banner.png";
// import sleep_banner from "../../assets/images/Services/Sleep_Banner.png";
// import family_banner from "../../assets/images/Services/Family_Banner.png";
// import bmi_banner from "../../assets/images/Services/Bmi_Banner.png";
// import dietary_banner from "../../assets/images/Services/Dietary_Banner.png";
// import crown from "../../assets/images/Icons/Premium Crown.png";
// import axios from "axios";
// import decrypt from "../../helper";
// import { ScoreVerify } from "../../ScoreVerify/ScoreVerify";
// import CustomIonLoading from "../../components/CustomIonLoading/CustomIonLoading";
// import { useTranslation } from "react-i18next";

// interface UserInfo {
//   refUserId: number;
//   refUserCustId: string;
//   refUserMobileno: number;
//   refUserFname: string;
//   refUserLname?: string;
// }

// interface Category {
//   refQCategoryId: number;
//   refCategoryLabel: string;
//   refPTcreatedDate: string;
//   refScoreId: number;
//   refScore: string;
//   UserScoreVerify: any[];
// }

// interface UserSubscriptionInfo {
//   packageStatus: boolean;
//   packageData: any[];
// }

// const ServiceAssessment: React.FC = () => {
//   const history = useHistory();
//   const location = useLocation() as { state: { getCategory?: boolean } };
//   const [loading, setLoading] = useState<boolean>(true);

//   const userDetails = localStorage.getItem("userDetails");

//   const userDeatilsObj = userDetails
//     ? JSON.parse(userDetails)
//     : { userId: null, userCustId: null, phNumber: null, firstName: null, lastName: null };


//   const headStatus = localStorage.getItem("headStatus") || "false";

//   const [subscriptionData, setSubscriptionData] = useState<UserSubscriptionInfo>();
//   const [freeAssessmentCount, setFreeAssesmentCount] = useState<number>(0);

//   const { serviceId } = useParams<{
//     serviceId: string;
//   }>();

//   useEffect(() => {
//     if (serviceId) {
//       localStorage.setItem("serviceId", String(serviceId));
//     }
//     const selectedService = servicesDetails.find(
//       (service) => service.serviceId === Number(serviceId)
//     );

//     if (selectedService) {
//       const serviceData = {
//         id: selectedService.serviceId,
//         label: selectedService.title,
//       };

//       localStorage.setItem("getCategory", JSON.stringify(serviceData));
//     }
//   }, [serviceId]);

//   useEffect(() => {
//     if (location.state?.getCategory) {
//       selectedUser && getCategory(selectedUser);
//     }
//   }, [location.state]);

//   const [selectedUser, setSelectedUser] = useState<number | null>(null);

//   const [userData, setUserData] = useState<Array<UserInfo>>([]);

//   const [serviceValidity, setServiceValidity] = useState<boolean>(false);
//   const [categories, setCategories] = useState<
//     { refQCategoryId: number; refCategoryLabel: string }[]
//   >([]);

//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

//   const [isOpen, setIsOpen] = useState(false);

//   const [presentAlert] = useIonAlert();

//   const { t, i18n } = useTranslation("global");

//   const servicesDetails = [
//     {
//       serviceId: 8,
//       title: t("home.Physical Activity"),
//       subTitle: t("assessment.Evaluate your daily movement and exercise habits"),
//       image: physical_banner,
//       priority: "Low",
//       points: [
//         t("assessment.Engage in at least 30 minutes of exercise daily"),
//         t("assessment.Incorporate stretching and strength training into your routine"),
//         t("assessment.Reduce prolonged sitting and take active breaks"),
//         t("assessment.Aim for at least 10,000 steps per day"),
//         t("assessment.Choose stairs over elevators for added movement"),
//       ],
//     },
//     {
//       serviceId: 9,
//       title: t("home.Stress"),
//       subTitle:
//         t("assessment.Understand how stress impacts your well-being and ways to manage it"),
//       image: stress_banner,
//       priority: "High",
//       points: [
//         t("assessment.Practice deep breathing or meditation for relaxation"),
//         t("assessment.Maintain a balanced work-life schedule"),
//         t("assessment.Engage in hobbies and activities you enjoy"),
//         t("assessment.Get adequate sleep to help manage stress levels"),
//         t("assessment.Stay socially connected with supportive people"),
//       ],
//     },
//     {
//       serviceId: 10,
//       title: t("home.Tobacco"),
//       subTitle: t("assessment.Review your tobacco use and explore healthier alternatives"),
//       image: tobacco_banner,
//       priority: "High",
//       points: [
//         t("assessment.Understand the health risks of smoking and tobacco use"),
//         t("assessment.Explore nicotine replacement therapies if needed"),
//         t("assessment.Set a quit date and create a plan to stop smoking"),
//         t("assessment.Seek support from family, friends, or professionals"),
//         t("assessment.Stay active and find healthy alternatives to manage cravings"),
//       ],
//     },
//     {
//       serviceId: 11,
//       title: t("home.Alcohol"),
//       subTitle:
//         t("assessment.Assess your alcohol consumption and its effects on your health"),
//       image: alcohol_banner,
//       priority: "High",
//       points: [
//         t("assessment.Limit alcohol intake to recommended guidelines"),
//         t("assessment.Be aware of the long-term health effects of excessive drinking"),
//         t("assessment.Stay hydrated and alternate alcoholic drinks with water"),
//         t("assessment.Consider alcohol-free days to maintain balance"),
//         t("assessment.Seek professional advice if drinking affects your health or daily life"),
//       ],
//     },
//     {
//       serviceId: 12,
//       title: t("home.Dietary"),
//       subTitle: t("assessment.Evaluate your eating habits and improve nutrition"),
//       image: dietary_banner,
//       priority: "Low",
//       points: [
//         t("assessment.Consume a balanced diet with fruits, vegetables, and lean proteins"),
//         t("assessment.Limit processed and high-sugar foods"),
//         t("assessment.Stay hydrated by drinking enough water daily"),
//         t("assessment.Plan meals in advance to make healthier choices"),
//         t("assessment.Control portion sizes and eat mindfully"),
//       ],
//     },
//     {
//       serviceId: 13,
//       title: t("home.BMI"),
//       subTitle:
//         t("assessment.Understand your Body Mass Index (BMI) and its impact on health"),
//       image: bmi_banner,
//       priority: "Low",
//       points: [
//         t("assessment.Maintain a healthy weight through a balanced diet and exercise"),
//         t("assessment.Monitor your BMI regularly to track progress"),
//         t("assessment.Reduce sugary drinks and high-calorie foods"),
//         t("assessment.Engage in strength training to support metabolism"),
//         t("assessment.Consult a healthcare provider for weight management support"),
//       ],
//     },
//     {
//       serviceId: 43,
//       title: t("home.Sleep"),
//       subTitle: t("assessment.Analyze your sleep patterns and improve rest quality"),
//       image: sleep_banner,
//       priority: "High",
//       points: [
//         t("assessment.Aim for 7-9 hours of sleep per night"),
//         t("assessment.Maintain a consistent sleep schedule, even on weekends"),
//         t("assessment.Reduce screen time before bedtime"),
//         t("assessment.Create a relaxing bedtime routine"),
//         t("assessment.Ensure your sleeping environment is dark and quiet"),
//       ],
//     },
//     {
//       serviceId: 51,
//       title: t("home.Family History"),
//       subTitle: t("assessment.Identify hereditary health risks and preventive measures"),
//       image: family_banner,
//       priority: "Low",
//       points: [
//         t("assessment.Be aware of family history-related health conditions"),
//         t("assessment.Schedule regular health screenings and check-ups"),
//         t("assessment.Maintain a healthy lifestyle to reduce genetic risk factors"),
//         t("assessment.Discuss family medical history with a healthcare provider"),
//         t("assessment.Encourage family members to adopt healthy habits together"),
//       ],
//     },
//   ];

//   const getValidity = (refQCategoryId: number) => {
//     switch (refQCategoryId) {
//       case 8:
//         return 14;
//       case 9:
//         return 14;
//       case 10:
//         return 14;
//       case 11:
//         return 14;
//       case 12:
//         return 14;
//       case 13:
//         return 14;
//       case 43:
//         return 14;
//       case 51:
//         return 14;
//       case 202:
//         return 1;
//       case 203:
//         return 1;
//       case 204:
//         return 1;
//       case 205:
//         return 1;
//       case 206:
//         return 1;
//       case 207:
//         return 1;
//       case 213:
//         return 1;
//       case 214:
//         return 1;
//       case 215:
//         return 1;
//       case 216:
//         return 1;
//       case 217:
//         return 1;
//       case 218:
//         return 1;
//       case 219:
//         return 1;
//       case 220:
//         return 1;
//       case 221:
//         return 1;
//       case 222:
//         return 1;
//       case 223:
//         return 1;
//       case 224:
//         return 1;
//       default:
//         return 0;
//     }
//   };

//   function calculateDaysDifference(dateString: any) {
//     // Convert the given date string to a Date object
//     const givenDate: any = new Date(dateString);

//     // Get the current date and set time to midnight for accurate day difference
//     const currentDate: any = new Date();
//     currentDate.setHours(0, 0, 0, 0);


//     // Calculate the difference in milliseconds
//     const diffInMs = givenDate - currentDate;

//     // Convert milliseconds to days
//     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//     return diffInDays;
//   }

//   const getCategory = (userId: number) => {
//     const tokenString = localStorage.getItem("userDetails");
//     if (tokenString) {
//       setLoading(true);
//       try {
//         const tokenObject = JSON.parse(tokenString);
//         const token = tokenObject.token;

//         axios
//           .post(
//             `${import.meta.env.VITE_API_URL}/getCategory`,
//             {
//               SubCategoryId: "4", //Risk Factor
//               patientId: userId.toString(),
//               employeeId: null,
//               hospitalId: "undefined",
//               refLanCode: localStorage.getItem("refLanCode")
//             },
//             {
//               headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//               },
//             }
//           )
//           .then((response) => {
//             const data = decrypt(
//               response.data[1],
//               response.data[0],
//               import.meta.env.VITE_ENCRYPTION_KEY
//             );
//             console.log(data);
//             setCategories(data.data);
//             setSubscriptionData({
//               packageStatus: data.checkSubscriptions.length > 0 ? true : false,
//               packageData: Array.isArray(data.checkSubscriptions) ? data.checkSubscriptions : []
//             });

//             servicesDetails.find((item) => item.serviceId === Number(serviceId))
//               ?.priority === "High"
//               ? setFreeAssesmentCount(
//                 data.isHigherQuestion[0].assessmenttakenno
//               )
//               : setFreeAssesmentCount(
//                 data.isLowerQuestion[0].assessmenttakenno
//               );

//             const tempCategory = data.data.find((item: Category) => item.refQCategoryId === Number(serviceId)) || null;
//             setSelectedCategory(tempCategory);
//             setLoading(false);
//             // setLoadingStatus(false);
//             console.log("----------->Val", data.data);
//           });
//       } catch (error) {
//         setLoading(false);
//         console.error("Error parsing token:", error);
//       }
//     } else {
//       console.error("No token found in localStorage.");
//     }

//     console.log(history.location.pathname);
//   }
//   console.log(loading);
//   const searchPatient = () => {
//     const tokenString = localStorage.getItem("userDetails");

//     const userDeatilsObj = tokenString
//       ? JSON.parse(tokenString)
//       : { userCustId: null, phNumber: null };

//     //   console.log(userDeatilsObj.userId, userDeatilsObj.phNumber);

//     if (tokenString) {
//       try {
//         const tokenObject = JSON.parse(tokenString);
//         const token = tokenObject.token;

//         axios
//           .post(
//             `${import.meta.env.VITE_API_COMMERCIAL_URL}/getFamilyMembers`,
//             {
//               mobileNumber: userDeatilsObj.phNumber,
//             },
//             {
//               headers: {
//                 Authorization: token,
//                 "Content-Type": "application/json",
//               },
//             }
//           )
//           .then((response) => {
//             const data = decrypt(
//               response.data[1],
//               response.data[0],
//               import.meta.env.VITE_ENCRYPTION_KEY
//             );

//             console.log(data);

//             // setLoadingStatus(false);

//             if (data.status) {

//               setUserData(data.familyMembers);
//               // setSelectedUser(data.data[0].refUserId)
//               setSelectedUser(tokenObject.userId);

//               // setSubscriptionData({
//               //   packageStatus: data.checkSubscriptions.length > 0 ? true : false, 
//               //   packageData: Array.isArray(data.checkSubscriptions) ? data.checkSubscriptions : []
//               // });
//               //   if (data.data.length === 0) {
//               //     setStatus({
//               //       status: true,
//               //       message: "No Result Found",
//               //     });
//               //   } else {
//               //     setURLMobileNo(data.data[0].refUserMobileno);
//               //     setUrluserId(data.data[0].refUserId);
//               //   }ge
//             } else {
//               console.error("Data consoled false - chekc this");
//             }
//           })
//           .catch((error) => {
//             console.error("Error fetching patient data:", error);
//           });
//       } catch (error) {
//         console.error("Error parsing token:", error);
//       }
//     } else {
//       console.error("No token found in localStorage.");
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     if (headStatus == "true") {
//       searchPatient();
//     } else {
//       setUserData([
//         {
//           refUserId: userDeatilsObj.userId,
//           refUserCustId: userDeatilsObj.userCustId,
//           refUserMobileno: userDeatilsObj.phNumber,
//           refUserFname: userDeatilsObj.firstName,
//           refUserLname: userDeatilsObj.lastName,
//         },
//       ]);
//       setSelectedUser(userDeatilsObj.userId);
//     }
//   }, []);

//   useEffect(() => {
//     selectedUser && getCategory(selectedUser)
//   }, [selectedUser])


//   useEffect(() => {
//     const tempValidity = selectedCategory?.refPTcreatedDate &&
//       getValidity(selectedCategory?.refQCategoryId) >
//       -calculateDaysDifference(selectedCategory?.refPTcreatedDate) || false;

//     setServiceValidity(tempValidity);
//   }, [selectedCategory]);

//   console.log((Number(freeAssessmentCount) || 0) >= 2);
//   console.log(userData);

//   // console.log("servicesDetails.find((item) => item.title === title)?.serviceId ", servicesDetails.find((item) => item.title === title)?.serviceId );

//   return (
//     <IonPage className="">
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
//             <h2 style={{ margin: "0" }}>
//               {
//                 servicesDetails.find(
//                   (item) => item.serviceId === Number(serviceId)
//                 )?.title
//               }
//             </h2>
//           </IonButtons>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         {/* <div className="medpredit_serviceAssess"> */}

//         <div className="serviceAssess_content">
//           {/* {subscriptionData?.packageStatus == false ? (
//             <div className="serviceAssess_content_free">
//               <span>
//                 Free Assessment: <b>{freeAssessmentCount > 0 ? 1 : 0  + "/" + 1}</b>
//               </span>
//             </div>
//           ) : (
//             <></>
//           )} */}
//           <div className="serviceAssess_content_member">
//             {userData.map((item) => {
//               const shortName =
//                 item.refUserFname.charAt(0) + item.refUserLname?.charAt(0);

//               const getTruncatedName = (
//                 fname: string,
//                 lname: string,
//                 maxLength: number
//               ) => {
//                 const fullName = `${fname} ${lname}`;
//                 return fullName.length > maxLength
//                   ? fullName.slice(0, maxLength) + "..."
//                   : fullName;
//               };

//               return (
//                 <div
//                   key={item.refUserId}
//                   className={`serviceAssess_content_memberWrapper ${selectedUser === item.refUserId ? "selected" : ""
//                     }`}
//                   onClick={(e) => {
//                     setSelectedUser(item.refUserId);
//                     e.currentTarget.scrollIntoView({
//                       behavior: "smooth",
//                       block: "nearest",
//                       inline: "center",
//                     });
//                   }}
//                 >
//                   <div className="serviceAssess_content_memberList">
//                     {shortName}
//                     {selectedUser === item.refUserId && (
//                       <span className="tick-mark">✔</span>
//                     )}
//                   </div>
//                   <span>
//                     {getTruncatedName(
//                       item.refUserFname,
//                       item.refUserLname ? item.refUserLname : "",
//                       7
//                     )}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//           {serviceValidity ? (
//             <div
//               style={{
//                 width: "80%",
//                 margin: "0 auto",
//                 border: "2px solid darkgreen",
//                 borderRadius: "10px",
//                 padding: "1rem",
//                 fontSize: "0.9rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "0.5rem",
//               }}
//             >
//               <span>
//                 {t("assessment.Last Taken On")}:{" "}
//                 <b>
//                   {selectedCategory?.refPTcreatedDate &&
//                     new Date(
//                       selectedCategory.refPTcreatedDate
//                     ).toLocaleDateString("en-GB")}
//                 </b>
//               </span>

//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "0.4rem",
//                 }}
//               >
//                 <span>{t("assessment.Status")}: </span>
//                 {selectedCategory?.refScore && (
//                   <ScoreVerify
//                     userScoreVerify={selectedCategory?.UserScoreVerify} // Pass the totalScore directly
//                     refScore={selectedCategory?.refScore}
//                   />
//                 )}
//               </div>
//               <u
//                 onClick={() =>
//                   history.push({
//                     pathname: "/reports",
//                     state: {
//                       selectedUser: selectedUser,
//                       selectedUserInfo: userData.find(item => item.refUserId == selectedUser)
//                     },
//                   })
//                 }
//               >
//                 {t("assessment.View Report")}
//               </u>
//             </div>
//           ) : (
//             <></>
//           )}

//           {serviceValidity && (
//             <span
//               style={{
//                 fontSize: "0.8rem",
//                 fontWeight: "bold",
//                 display: "flex",
//                 justifyContent: "center",
//                 paddingTop: "1rem",
//                 color: "#00a184"
//               }}
//             >
//               {t("assessment.This Assessment Score Remains Active For")}{" "}
//               {getValidity(Number(serviceId))} {t("assessment.Days")}.
//             </span>
//           )}
//           {/* <h1>
//             {
//               servicesDetails.find((item) => item.serviceId === serviceId)
//                 ?.title
//             }
//           </h1> */}

//           <img
//             style={{ marginTop: "1rem" }}
//             src={
//               servicesDetails.find(
//                 (item) => item.serviceId === Number(serviceId)
//               )?.image
//             }
//           />
//           <p>
//             {
//               servicesDetails.find(
//                 (item) => item.serviceId === Number(serviceId)
//               )?.subTitle
//             }
//           </p>
//           <ol>
//             {servicesDetails
//               .find((item) => item.serviceId === Number(serviceId))
//               ?.points.map((point) => (
//                 <li>{point}</li>
//               ))}
//           </ol>
//         </div>
//         {/* </div> */}
//       </IonContent>
//       <IonFooter>
//         {serviceValidity == true && (
//           <IonToolbar className="cus-ion-toolbar-disabled">
//             <IonTitle>{t("assessment.Assessment Taken")}</IonTitle>
//           </IonToolbar>
//         )}
//         {/* {serviceValidity == false && (
//           <IonToolbar>
//           <IonTitle
//             onClick={() =>
//               history.push(`/serviceQuestion/${serviceId}/${selectedUser}`)
//             }
//           >
//             Start Assessment
//           </IonTitle>
//         </IonToolbar>
//         )} */}
//         {serviceValidity == false &&
//           (subscriptionData?.packageStatus == false &&
//             (Number(freeAssessmentCount) || 0) >= 1 ? (
//             <IonToolbar className="cus-ion-toolbar-premium">
//               <div
//                 onClick={() =>
//                   presentAlert({
//                     cssClass: "custom-alert",
//                     message:
//                       t("manage.Please Upgrade your membership to proceed assessment"),
//                     buttons: [
//                       {
//                         text: t("manage.Cancel"),
//                         role: "cancel", // Close alert
//                         cssClass: "close-button",
//                       },
//                       {
//                         text: t("manage.Upgrade Now"),
//                         handler: () => history.replace("/subscriptionPlans"),
//                       },
//                     ],
//                   })
//                 }
//               >
//                 <span>{t("assessment.Start Assessment")}</span>
//                 <img style={{ width: "2rem", height: "3rem" }} src={crown} />
//               </div>
//             </IonToolbar>
//           ) : (
//             <IonToolbar>
//               <IonTitle
//                 onClick={() =>
//                   history.push(`/serviceQuestion/${serviceId}/${selectedUser}`)
//                 }
//               >
//                 {t("assessment.Start Assessment")}
//               </IonTitle>
//             </IonToolbar>
//           ))}
//       </IonFooter>

//       <CustomIonLoading isOpen={loading} />
//     </IonPage>
//   );
// };

// export default ServiceAssessment;









// import {
//   IonBackButton,
//   IonButton,
//   IonButtons,
//   IonContent,
//   IonFooter,
//   IonHeader,
//   IonIcon,
//   IonPage,
//   IonTitle,
//   IonToolbar,
// } from "@ionic/react";
// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import decrypt from "../../helper";
// import { arrowUndoSharp, chevronBack } from "ionicons/icons";
// import { useHistory, useLocation, useParams } from "react-router";
// import "./Questions.css";
// import MultipleSelect from "./MultipleSelect";
// import YesNo from "./YesNo";
// import NumberInputBoxT4 from "./NumberInputBoxT4";
// import NumberInputBoxT6 from "./NumberInputBoxT6";
// import HrsMins from "./HrsMins";
// import TextInputBox from "./TextInputBox";
// import TimeInputBox from "./TimeInputBox";
// import TimeInputBox24 from "./TimeInputBox24";
// import Label from "./Label";
// import GraphValues from "./GraphValues";
// import Hrs24 from "./Hrs24";
// import TreatmentDetailsQuestion from "./TreatmentDetailsQuestion";
// import YearNMonth from "./YearNMonth";
// import MultipleSelectInput from "./MultipleSelectInput";
// import { useTranslation } from "react-i18next";

// interface QuestionSet {
//   nameOfMedicine: string;
//   category: string | null;
//   strength: number | null;
//   roa: string | null;
//   relationToFood: string | null;
//   morningdosage: number | null;
//   morningtime: Date | null;
//   afternoondosage: number | null;
//   afternoontime: Date | null;
//   eveningdosage: number | null;
//   eveningtime: Date | null;
//   nightdosage: number | null;
//   nighttime: Date | null;
//   monthsduration: number | null;
//   yearsduration: number | null;
// }

// const Questions: React.FC = () => {
//   const { t } = useTranslation("global");
//   const tokenString: any = localStorage.getItem("userDetails");
//   const tokenObject = JSON.parse(tokenString);
//   const token = tokenObject.token;
//   const history = useHistory();

//   const { selectedServiceId, selectedUserId } = useParams<{
//     selectedServiceId: string;
//     selectedUserId: string;
//   }>();

//   const [submitButton, setSubmitButton] = useState(true);
//   const [scrollIndex, setScrollIndex] = useState(0);

//   const SubmitActive = (isActive: boolean) => {
//     setSubmitButton(isActive);
//   };

//   // useEffect(() => {
//   //   const getCategory = {
//   //     id: cardTitle,
//   //     label: refCategoryLabel,
//   //   };

//   //   localStorage.setItem("getQuestions", JSON.stringify(getCategory));
//   // }, []);

//   // INTERFACE FOR QUESTIONS
//   const [questionData, setQuestionsData] = useState<
//     {
//       questionType: string;
//       questionText: string;
//       questionId: any;
//       options: [
//         {
//           backwardQId: string;
//           forwardQId: string;
//           refOptionId: number;
//           refOptionLabel: string;
//         }
//       ];
//     }[]
//   >([]);

//   const [visibleQuestions, setVisibleQuestions] = useState<
//     {
//       questionType: string;
//       questionText: string;
//       questionId: any;
//       options: [
//         {
//           backwardQId: string;
//           forwardQId: string;
//           refOptionId: number;
//           refOptionLabel: string;
//         }
//       ];
//     }[]
//   >([]);

//   const [enabledIndex, setEnabledIndex] = useState<number>(0);

//   const [submittedAnswer, setSubmittedAnswer] = useState<any>();

//   const [responses, setResponses] = useState<
//     { questionId: any; questionType: any; answer: any }[]
//   >([]);

//   const getQuestions = () => {
//     axios
//       .post(
//         `${import.meta.env.VITE_API_URL}/getQuestions`,
//         {
//           questionId: selectedServiceId,
//           patientId: selectedUserId,
//           refLanCode: localStorage.getItem("refLanCode"),
//         },
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         const data = decrypt(
//           response.data[1],
//           response.data[0],
//           import.meta.env.VITE_ENCRYPTION_KEY
//         );
//         if (data.status) {
//           console.log(data.questions);

//           setQuestionsData(data.questions);
//           console.log("data.questions", data.questions);
//           setVisibleQuestions([data.questions[0]]);
//         }
//       });
//   };

//   const getNextQuestions = (
//     questionId: any,
//     questionType: any,
//     answer: any,
//     forwardQId: any
//   ) => {
//     setSubmitButton(true);
//     console.log("forwardQId:", forwardQId);
//     console.log("Answer submitted for questionId:", questionId, answer);
//     console.log("################--->", questionId);
//     localStorage.setItem("testQuestion", questionId);

//     // Convert forwardQId to a number, if not null
//     let nextQuestionId = forwardQId ? parseInt(forwardQId, 10) : null;

//     // Update the responses state
//     setResponses((prevResponses) => {
//       const responseMap = new Map(
//         prevResponses.map((res) => [
//           res.questionId,
//           { questionType: res.questionType, answer: res.answer },
//         ])
//       );

//       responseMap.set(questionId, { questionType, answer });

//       const updatedResponses = Array.from(responseMap.entries()).map(
//         ([id, value]) => ({
//           questionId: id,
//           questionType: value.questionType,
//           answer: value.answer,
//         })
//       );

//       // Submit the final updated responses if no next question exists
//       if (!nextQuestionId) {
//         setSubmitButton(false);
//         setSubmittedAnswer(updatedResponses); // Use the updated responses here
//         console.log("Submitting responses:", updatedResponses);
//       }

//       return updatedResponses;
//     });

//     if (questionId === 33) {
//       const prevQuestion = responses[1].answer;
//       const currentQuestion = answer;
//       console.log(prevQuestion, currentQuestion, forwardQId);

//       if (currentQuestion === 118) {
//         if (prevQuestion === 113) {
//           const nextQuestion = questionData.find(
//             (q) => parseInt(q.questionId, 10) === 39
//           );

//           if (nextQuestion) {
//             setVisibleQuestions((prevVisibleQuestions) => [
//               ...prevVisibleQuestions,
//               nextQuestion,
//             ]);
//             setEnabledIndex((prevIndex) => prevIndex + 1);
//           }
//         } else {
//           const nextQuestion = questionData.find(
//             (q) => parseInt(q.questionId, 10) === 34
//           );

//           if (nextQuestion) {
//             setVisibleQuestions((prevVisibleQuestions) => [
//               ...prevVisibleQuestions,
//               nextQuestion,
//             ]);
//             setEnabledIndex((prevIndex) => prevIndex + 1);
//           }
//         }
//       } else {
//         const nextQuestion = questionData.find(
//           (q) => parseInt(q.questionId, 10) === nextQuestionId
//         );

//         if (nextQuestion) {
//           setVisibleQuestions((prevVisibleQuestions) => [
//             ...prevVisibleQuestions,
//             nextQuestion,
//           ]);
//           setEnabledIndex((prevIndex) => prevIndex + 1);
//         }
//       }
//     } else {
//       const nextQuestion = questionData.find(
//         (q) => parseInt(q.questionId, 10) === nextQuestionId
//       );

//       console.log("nextQuestion", visibleQuestions);

//       console.log("nextQuestion", nextQuestion);

//       if (nextQuestion) {
//         setVisibleQuestions((prevVisibleQuestions) => [
//           ...prevVisibleQuestions,
//           nextQuestion,
//         ]);
//         setEnabledIndex((prevIndex) => prevIndex + 1);
//       }
//     }
//   };

//   const [loadingStatus, setLoadingStatus] = useState(false);

//   const submitResponse = () => {
//     console.log("submittedAnswer", submittedAnswer);
//     console.log("serviceId", selectedServiceId, selectedUserId);
//     setLoadingStatus(true);

//     try {
//       axios
//         .post(
//           `${import.meta.env.VITE_API_URL}/postAnswers`,
//           {
//             patientId: selectedUserId,
//             categoryId: selectedServiceId.toString(),
//             answers:
//               Number(selectedServiceId) === 201
//                 ? questionSets
//                 : submittedAnswer,
//             // employeeId: localStorage.getItem("currentDoctorId")
//             //   ? localStorage.getItem("currentDoctorId")
//             //   : null,
//             // hospitalId: localStorage.getItem("hospitalId")
//             //   ? localStorage.getItem("hospitalId")
//             //   : null,
//             employeeId: null,
//             hospitalId: "undefined",
//             refLanCode: localStorage.getItem("refLanCode"),
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

//           console.log("--->====>", data);

//           if (data.status) {
//             const getCategory = localStorage.getItem("getCategory");
//             if (getCategory) {
//               const getQuestionsToken = JSON.parse(getCategory);
//               getQuestions();
//               setResponses([]);
//               // history.push(
//               //   `/subCategories/${getQuestionsToken.id}/${getQuestionsToken.label}`
//               // );
//               setLoadingStatus(false);
//               // history.replace(`/serviceAssessment/${selectedServiceId}`, {
//               //   getCategory: true,
//               // });
//               history.push("/successCategory", {
//                 selectedUserId: selectedUserId,
//               });
//               setSubmittedAnswer([]);
//             } else {
//               console.error("getCategory is null or undefined");

//               setLoadingStatus(false);
//               history.replace(`/serviceAssessment/${selectedServiceId}`, {
//                 getCategory: true,
//               });
//               setSubmittedAnswer([]);
//             }
//           }
//         });
//     } catch (error) {
//       setLoadingStatus(false);
//       console.error("Error submitting responses:", error);
//     }
//   };

//   const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);

//   const handleData = (data: any) => {
//     setQuestionSets(data);
//   };

//   const handleQuestionEdit = (
//     questionId: any,
//     questionType: any,
//     refOptionId: number,
//     forwardQnId: any
//   ) => {
//     console.log("handleQuestionEdit");
//     if (responses) {
//       console.log("handleQuestionEdit --------------- 1");

//       responses.map((res) => {
//         if (res.questionId === questionId) {
//           console.log("Response found - editing");
//           const index = visibleQuestions.findIndex(
//             (visibleQns) => visibleQns.questionId === questionId
//           );
//           if (index !== -1) {
//             const newVisibleQuestions = visibleQuestions.slice(0, index + 1);
//             console.log("Visible qns", visibleQuestions);
//             console.log("Response data", responses);
//             console.log("Edited");
//             setVisibleQuestions(newVisibleQuestions);
//           }
//         }
//       });
//     }
//     console.log("forwardQnId", forwardQnId);
//     getNextQuestions(questionId, questionType, refOptionId, forwardQnId);
//   };
//   console.log("Visible qns", visibleQuestions);

//   const handleMultipleSelectEdit = (
//     questionId: any,
//     questionType: any,
//     selectedOptions: any[],
//     forwardQnId: any
//   ) => {
//     if (responses) {
//       responses.map((res) => {
//         if (res.questionId === questionId) {
//           console.log("Response found - editing");
//           const index = visibleQuestions.findIndex(
//             (visibleQns) => visibleQns.questionId === questionId
//           );
//           if (index !== -1) {
//             const newVisibleQuestions = visibleQuestions.slice(0, index + 1);
//             console.log("Visible qns", visibleQuestions);
//             console.log("Response data", responses);
//             console.log("Edited");
//             setVisibleQuestions(newVisibleQuestions);
//           }
//         }
//       });
//     }
//     getNextQuestions(questionId, questionType, selectedOptions, forwardQnId);
//   };

//   const handleHrsEdit = (
//     questionId: any,
//     questionType: any,
//     hrsValue: any,
//     minsValue: any,
//     forwardQnId: any
//   ) => {
//     console.log("questionType", questionType);
//     if (responses) {
//       responses.map((res) => {
//         if (res.questionId === questionId) {
//           console.log("Response found - editing");
//           const index = visibleQuestions.findIndex(
//             (visibleQns) => visibleQns.questionId === questionId
//           );
//           if (index !== -1) {
//             const newVisibleQuestions = visibleQuestions.slice(0, index + 1);
//             console.log("Visible qns", visibleQuestions);
//             console.log("Response data", responses);
//             console.log("Edited");
//             setVisibleQuestions(newVisibleQuestions);
//           }
//         }
//       });
//     }

//     const resultValue =
//       hrsValue == null && minsValue == null ? null : `${hrsValue}:${minsValue}`;

//     getNextQuestions(questionId, questionType, resultValue, forwardQnId);
//   };

//   useEffect(() => {
//     if (token) {
//       try {
//         getQuestions();
//       } catch (error) {
//         console.log("Error fetching questions", error);
//       }
//     }
//   }, [token]);

//   const [backwardQ, setBackwardQ] = useState({
//     id: 0,
//     label: "",
//   });

//   useEffect(() => {
//     const categoryString: any = localStorage.getItem("getCategory");
//     const categoryObject = JSON.parse(categoryString);

//     if (categoryString) {
//       setBackwardQ({
//         id: categoryObject.id,

//         label: categoryObject.label,
//       });
//     }
//   }, []);

//   // const handleInfoClick = () => {
//   //   if (cardTitle === "8") {
//   //     history.push("/physicalActivity/showCards");
//   //   }
//   //   if (cardTitle === "10") {
//   //     history.push("/tobacoo/showCards");
//   //   }
//   //   if (cardTitle === "9") {
//   //     history.push("/stress/showCards");
//   //   }
//   //   if (cardTitle === "11") {
//   //     history.push("/alcohol/showCards");
//   //   }
//   // };

//   // const handleInstructionsClick = () => {
//   //   if (cardTitle === "8") {
//   //     history.push("/physicalActivity/instructions");
//   //   }
//   //   if (cardTitle === "10") {
//   //     history.push("/tobacoo/instructions");
//   //   }
//   //   if (cardTitle === "9") {
//   //     history.push("/stress/instructions");
//   //   }
//   //   if (cardTitle === "11") {
//   //     history.push("/alcohol/instructions");
//   //   }
//   // };

//   console.log("eee", responses);

//   useEffect(() => {
//     responses.map((item, index) => {
//       if (item.answer == null || item.answer == "") {
//         SubmitActive(true);
//       }
//     });
//   }, [responses]);

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   // Refs for each question
//   const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // Auto-scroll when the enabledIndex changes
//   useEffect(() => {
//     if (questionRefs.current[scrollIndex]) {
//       questionRefs.current[scrollIndex]?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }, [scrollIndex]);

//   useEffect(() => {
//     if (visibleQuestions.length > 0) {
//       handleNextQuestion();
//     }
//   }, [visibleQuestions]); // Runs whenever visibleQuestions updates

//   const handleNextQuestion = () => {
//     if (visibleQuestions.length > 1) {
//       const previousQuestion = visibleQuestions[visibleQuestions.length - 2];
//     }

//     if (visibleQuestions.length > 0) {
//       setScrollIndex(visibleQuestions.length - 1);
//     }
//   };

//   console.log("indexes", scrollIndex, visibleQuestions.length);

//   const handleUndo = () => {
//     setVisibleQuestions((prevQuestions) => {
//       if (prevQuestions.length === 1) return prevQuestions;
//       const newQuestions = prevQuestions.slice(0, -1);
//       return newQuestions;
//     });
//     setSubmitButton(true);
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
//           </IonButtons>
//           {/* <IonTitle>{"Question: " + visibleQuestions.length}</IonTitle> */}
//           <IonTitle>{`${t("reports.ques")} ${visibleQuestions.length}`}</IonTitle>

//           <IonButtons slot="end">
//             <IonButton onClick={() => handleUndo()}>
//               <IonIcon icon={arrowUndoSharp} />
//             </IonButton>
//           </IonButtons>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent className="ion-padding">
//         {visibleQuestions.length > 0 &&
//           visibleQuestions.map((question, index) => (
//             <div
//               key={index}
//               ref={(el) => (questionRefs.current[index] = el)}
//               className={
//                 visibleQuestions.length - 1 != index ? "questions_MainDiv" : ""
//               }
//             >
//               {question.questionType === "1" && (
//                 <YesNo
//                   label={question}
//                   onOptionSelect={(refOptionId, forwardQId) => {
//                     // if (index === enabledIndex) {
//                     //   // getNextQuestions(
//                     //   //   question.questionId,
//                     //   //   refOptionId,
//                     //   //   forwardQId
//                     //   // );
//                     // }
//                   }}
//                   onEdit={(questionType, refOptionId, forwardQId) => {
//                     handleQuestionEdit(
//                       question.questionId,
//                       questionType,
//                       refOptionId,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "2" && (
//                 <MultipleSelect
//                   label={question}
//                   onOptionSelect={(selectedOptions, forwardQId) => {
//                     // if (index === enabledIndex) {
//                     //   // getNextQuestions(
//                     //   //   question.questionId,
//                     //   //   refOptionId,
//                     //   //   forwardQId
//                     //   // );
//                     // }
//                   }}
//                   onEdit={(selectedOptions, forwardQId) => {
//                     handleMultipleSelectEdit(
//                       question.questionId,
//                       question.questionType,
//                       selectedOptions,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "6" && (
//                 <NumberInputBoxT6
//                   type="number"
//                   label={question}
//                   onClickOpt={(value, questionId, forwardQId) => {
//                     if (index === enabledIndex) {
//                       console.log("-------------------->onEdit Triggered");
//                       // getNextQuestions(
//                       //   questionId,
//                       //   question.questionType,
//                       //   parseInt(value),
//                       //   forwardQId
//                       // );
//                     }
//                   }}
//                   onEdit={(questionType, value, forwardQId) => {
//                     handleQuestionEdit(
//                       question.questionId,
//                       questionType,
//                       value,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "5" && (
//                 <HrsMins
//                   type="text"
//                   label={question}
//                   SubmitActive={SubmitActive}
//                   onEdit={(questionType, hrsValue, minsValue, forwardQId) => {
//                     handleHrsEdit(
//                       question.questionId,
//                       questionType,
//                       hrsValue,
//                       minsValue,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "4" && (
//                 <NumberInputBoxT4
//                   type="number"
//                   label={question}
//                   onClickOpt={(value, questionId, forwardQId) => {
//                     if (index === enabledIndex) {
//                       console.log("-------------------->onEdit Triggered");
//                       // getNextQuestions(
//                       //   questionId,
//                       //   question.questionType,
//                       //   parseInt(value),
//                       //   forwardQId
//                       // );
//                     }
//                   }}
//                   onEdit={(questionType, value, forwardQId) => {
//                     handleQuestionEdit(
//                       question.questionId,
//                       questionType,
//                       value,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "3" && (
//                 <TextInputBox
//                   type="text"
//                   label={question}
//                   onClickOpt={(value, questionId, forwardQId) => {
//                     if (index === enabledIndex) {
//                       console.log("-------------------->onEdit Triggered");
//                       // getNextQuestions(
//                       //   questionId,
//                       //   question.questionType,
//                       //   parseInt(value),
//                       //   forwardQId
//                       // );
//                     }
//                   }}
//                   onEdit={(questionType, value, forwardQId) => {
//                     handleQuestionEdit(
//                       question.questionId,
//                       questionType,
//                       value,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "7" && (
//                 <TimeInputBox
//                   type="text"
//                   label={question}
//                   onEdit={(questionType, value, forwardQId) => {
//                     handleQuestionEdit(
//                       question.questionId,
//                       questionType,
//                       value,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "8" && (
//                 <TimeInputBox24
//                   type="text"
//                   label={question}
//                   onEdit={(questionType, value, forwardQId) => {
//                     handleQuestionEdit(
//                       question.questionId,
//                       questionType,
//                       value,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "9" && (
//                 <Label
//                   label={question}
//                   onEdit={(questionType, value, forwardQId) => {
//                     handleQuestionEdit(
//                       question.questionId,
//                       questionType,
//                       value,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "10" && (
//                 <GraphValues
//                   SubmitActive={SubmitActive}
//                   label={question}
//                   onEdit={(questionType, value, forwardQId) => {
//                     handleQuestionEdit(
//                       question.questionId,
//                       questionType,
//                       value,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "11" && (
//                 <Hrs24
//                   type="text"
//                   label={question}
//                   onEdit={(questionType, hrsValue, minsValue, forwardQId) => {
//                     handleHrsEdit(
//                       question.questionId,
//                       questionType,
//                       hrsValue,
//                       minsValue,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "12" && (
//                 <YearNMonth
//                   type="text"
//                   label={question}
//                   onClickOpt={(value, questionId, forwardQId) => {
//                     if (index === enabledIndex) {
//                       console.log("-------------------->onEdit Triggered");
//                       // getNextQuestions(
//                       //   questionId,
//                       //   question.questionType,
//                       //   parseInt(value),
//                       //   forwardQId
//                       // );
//                     }
//                   }}
//                   onEdit={(questionType, value, forwardQId) => {
//                     handleQuestionEdit(
//                       question.questionId,
//                       questionType,
//                       value,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "13" && (
//                 <MultipleSelectInput
//                   label={question}
//                   onOptionSelect={(selectedOptions, forwardQId) => {
//                     if (index === enabledIndex) {
//                       // getNextQuestions(
//                       //   question.questionId,
//                       //   refOptionId,
//                       //   forwardQId
//                       // );
//                     }
//                   }}
//                   onEdit={(selectedOptions, forwardQId) => {
//                     handleMultipleSelectEdit(
//                       question.questionId,
//                       question.questionType,
//                       selectedOptions,
//                       forwardQId
//                     );
//                   }}
//                 />
//               )}

//               {question.questionType === "99" && (
//                 <TreatmentDetailsQuestion
//                   SubmitActive={SubmitActive}
//                   handleData={handleData}
//                 />
//               )}
//             </div>
//           ))}
//       </IonContent>
//       <IonFooter>
//         <IonToolbar>
//           {loadingStatus ? (
//             <>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "100%", // Ensures vertical centering if the parent has a defined height
//                 }}
//               >
//                 <button
//                   disabled={submitButton}
//                   // onClick={submitResponse}
//                   className={`questionSubmitButton ${
//                     submitButton ? "disabled" : ""
//                   }`}
//                 >
//                   <i className="pi pi-spin pi-spinner"></i>
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <button
//                 disabled={submitButton}
//                 onClick={() => {
//                   submitResponse();
//                 }}
//                 className={`questionSubmitButton ${
//                   submitButton ? "disabled" : ""
//                 }`}
//               >
//                 {t("manage.Submit")}
//               </button>
//             </div>
//           )}
//         </IonToolbar>
//       </IonFooter>
//     </IonPage>
//   );
// };

// export default Questions;

