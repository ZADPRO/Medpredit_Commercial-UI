import { IonRouterOutlet, IonTabs } from "@ionic/react";

import React, { useEffect } from "react";
import { Route, useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import Splashscreen from "../../components/00_Splashscreen/Splashscreen";
import Chooselanguage from "../../components/01_Chooselang/Chooselanguage";
import Login from "../../components/02_Login/Login";
import RegisterUser from "../../components/03_RegisterUser/RegisterUser";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import EnterOTP from "../ForgotPassword/EnterOTP";
import "./MainRoutes.css";
import Home from "../../components/11_Home/Home";
import Profile from "../../components/21_Profile/Profile";
import SubscriptionPlans from "../../components/22_SubscriptionPlans/SubscriptionPlans";
import TransactionHistory from "../../components/23_TransactionHistory/TransactionHistory";
import Coupons from "../../components/24_Coupons/Coupons";
import NotificationSettings from "../../components/25_NotificationSettings/NotificationSettings";
import HelpCenter from "../../components/26_HelpCenter/HelpCenter";
import Share from "../../components/27_Share/Share";
import Feedback from "../../components/28_Feedback/Feedback";
import TermsCondition from "../../components/29_TermsCondition/TermsCondition";
import PrivacyPolicy from "../../components/30_PrivacyPolicy/PrivacyPolicy";
import ChooseLanguage_02 from "../../components/31_ChooseLanguage/ChooseLanguage_02";
import AddFamilyMember from "../../components/32_ManageFamilyMembers/AddFamilyMember";
import ChangePAssword from "../ChangePassword/ChangePAssword";
import About from "../../components/33_About/About";
import ServiceAssessment from "../Services/ServiceAssessment";
import Questions from "../Questions/Questions";
import UserProfile from "../../components/21_Profile/34_Userprofile/UserProfile";
import Termsofservice from "../../components/34_Termsofservice/Termsofservice";
import Opensource from "../../components/35_Opensource/Opensource";
import LandR from "../../components/36_L&R/LandR";
import Report from "../Reports/Report";
import TermsAndPrivacy from "../../components/03_RegisterUser/TermsAndPrivacy";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import ManageFamily from "../../components/32_ManageFamilyMembers/ManageFamily";
import SubscriptionDetail from "../Subscription/SubscriptionDetail";
import LinkFamilyMember from "../../components/32_ManageFamilyMembers/LinkFamilyMember";
import KnowAbout from "../KnowAbout/KnowAbout";
import GetStarted from "../../components/001_GetStarted/GetStarted";
import SearchPage from "../../components/12_SearchPage/SearchPage";
import { App } from "@capacitor/app";
import MedicalRecords from "../../components/40_MedicalRecords/MedicalRecords";
import MRCameraCapture from "../../components/40_MedicalRecords/MRCameraCapture";
import MRImageList from "../../components/40_MedicalRecords/MRImageList";
import MRPdfUpload from "../../components/40_MedicalRecords/MRPdfUpload";
import CategorySuccess from "../CategorySuccess/CategorySuccess";
import MedicalRecordUpload from "../../components/40_MedicalRecords/MedicalRecordUpload";
import CameraMRUpload from "../MedicalRecords/CameraMRUpload";
import PhotoMRUpload from "../MedicalRecords/PhotoMRUpload";
import PdfMRUpload from "../MedicalRecords/PdfMRUpload";
import { useNetworkCheck } from "../../hooks/useNetworkCheck";
import { useAxiosInterceptor } from "../../hooks/useAxiosInterceptor";
import NoInternet from "../NoInternet/NoInternet";
import ServerError from "../ServerError/ServerError";

const MainRoutes: React.FC = () => {
  const location = useLocation();

  // ⛓️ Add Hooks
  useNetworkCheck();
  useAxiosInterceptor();

  // useEffect(() => {
  //   const configureStatusBar = async () => {
  //     if (Capacitor.isNativePlatform()) {
  //       let bgcolor;
  //       if (location.pathname != "/home") {
  //         bgcolor = "#f8fff5";
  //       } else {
  //         bgcolor = "none";
  //       }

  //       await StatusBar.setOverlaysWebView({ overlay: false });
  //       await StatusBar.setBackgroundColor({ color: bgcolor });
  //       await StatusBar.setStyle({ style: Style.Light });
  //     }
  //   };

  //   configureStatusBar();
  // }, [location.pathname]);

  const tokenString = localStorage.getItem("userDetails");
  let roleType = 1;

  if (tokenString) {
    const tokenObject = JSON.parse(tokenString);
    roleType = tokenObject.roleType;
    console.log("roleType", roleType);
  }

  const history = useHistory();

  useEffect(() => {
    App.addListener("appUrlOpen", (event) => {
      const url = event.url; // e.g., "medpreditcommercial://open/reports/sales"
      if (url) {
        try {
          const parsedUrl = new URL(url);
          const path = parsedUrl.pathname; // "/reports/sales"
          console.log("Navigating to", path);
          history.replace(path); // Navigate inside your app
        } catch (e) {
          console.error("Invalid deep link URL", e);
        }
      }
    });

    return () => {
      App.removeAllListeners();
    };
  }, [history]);

  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route exact path="/">
          <Splashscreen />
        </Route>
        <Route path="/no-internet" component={NoInternet} />
        <Route path="/internal-server-error" component={ServerError} />
        <Route path="/chooselanguage">
          <Chooselanguage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/getStarted">
          <GetStarted />
        </Route>
        <Route path="/registerUser">
          <RegisterUser />
        </Route>
        <Route path="/termsandprivacy">
          <TermsAndPrivacy />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/changepassword">
          <ChangePAssword />
        </Route>
        <Route path="/enterOTP">
          <EnterOTP />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/searchPage">
          <SearchPage />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/userprofile">
          <UserProfile />
        </Route>
        <Route path="/manageFamily">
          <ManageFamily />
        </Route>
        <Route path="/addFamilyMember">
          <AddFamilyMember />
        </Route>
        <Route path="/subscriptionPlans">
          <SubscriptionPlans />
        </Route>
        <Route path="/subscriptionDetail">
          <SubscriptionDetail />
        </Route>
        <Route path="/transactionHistory">
          <TransactionHistory />
        </Route>
        <Route path="/coupons">
          <Coupons />
        </Route>
        <Route path="/termsofservice">
          <Termsofservice />
        </Route>
        <Route path="/opensource">
          <Opensource />
        </Route>
        <Route path="/landr">
          <LandR />
        </Route>

        <Route path="/notificationSettings">
          <NotificationSettings />
        </Route>
        <Route path="/helpCenter">
          <HelpCenter />
        </Route>
        <Route path="/share">
          <Share />
        </Route>
        <Route path="/feedback">
          <Feedback />
        </Route>
        <Route path="/termsCondition">
          <TermsCondition />
        </Route>
        <Route path="/privacyPolicy">
          <PrivacyPolicy />
        </Route>
        <Route path="/ChooseLanguage_02">
          <ChooseLanguage_02 />
        </Route>

        <Route path="/MedicalRecords">
          <MedicalRecords />
        </Route>
        <Route path="/cameraRecords">
          <MRCameraCapture />
        </Route>
        <Route path="/imageRecords">
          <MRImageList />
        </Route>
        <Route path="/pdfRecords">
          <MRPdfUpload />
        </Route>
        <Route path="/uploadMedicalRecords">
          <MedicalRecordUpload />
        </Route>

        <Route path="/cameraMR">
          <CameraMRUpload />
        </Route>
        <Route path="/photoMR">
          <PhotoMRUpload />
        </Route>
        <Route path="/pdfMR">
          <PdfMRUpload />
        </Route>

        <Route path="/addFamilyMember">
          <AddFamilyMember />
        </Route>
        <Route path="/linkFamilyMember">
          <LinkFamilyMember />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/successCategory">
          <CategorySuccess />
        </Route>
        <Route path="/knowAbout/:sentDisease">
          <KnowAbout />
        </Route>
        <Route path="/serviceAssessment/:serviceId">
          <ServiceAssessment />
        </Route>
        <Route path="/serviceQuestion/:selectedServiceId/:selectedUserId">
          <Questions />
        </Route>
        <Route path="/reports">
          <Report />
        </Route>
      </IonRouterOutlet>

      {/* {showTabBar && (
        <IonTabBar id="mainIonToolbar" slot="bottom">
          {(roleType === 1 ? doctor : doctor).map((element) => (
            <IonTabButton
              key={element.path}
              className={
                location.pathname === element.path
                  ? "mainIonTabButton gradientButton01"
                  : "mainIonTabButton"
              }
              style={{
                fontSize: "12px",
                color:
                  location.pathname === element.path ? "var(--med-light-green)" : "white",
              }}
              tab={element.name}
              href={element.path}
            >
              <IonIcon 
                icon={element.icon}/>
              <IonLabel
                style={{
                  fontSize: "12px",
                  color:
                    location.pathname === element.path ? "var(--med-light-green)" : "white",
                }}
              >
                {element.name}
              </IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      )} */}

      {/* <>
        <IonMenu contentId="main-content" type="push">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu Content</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="">
            <IonList lines="full">
              {menuBar?.map((item) => (
                <IonItem onClick={() => history.push(`${item.path}`)}>
                  <IonLabel>{item.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonMenu>
        <IonPage id="main-content">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
          <IonContent className="ion-padding">
            Tap the button in the toolbar to open the menu.
          </IonContent>
        </IonPage>
      </> */}
    </IonTabs>
  );
};

export default MainRoutes;
