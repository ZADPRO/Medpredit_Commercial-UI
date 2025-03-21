import {
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabs,
  IonTabButton,
  IonTabBar,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import { IonItem, IonList } from "@ionic/react";

import React from "react";
import { Route, useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import Splashscreen from "../../components/00_Splashscreen/Splashscreen";
import Chooselanguage from "../../components/01_Chooselang/Chooselanguage";
import Login from "../../components/02_Login/Login";
import RegisterUser from "../../components/03_RegisterUser/RegisterUser";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import EnterOTP from "../ForgotPassword/EnterOTP";
import { chevronBack, home } from "ionicons/icons";
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
import AddFamilyMember from "../../components/32_AddFamilyMembers/AddFamilyMember";
import ChangePAssword from "../ChangePassword/ChangePAssword";
import About from "../../components/33_About/About";
import ServiceAssestment from "../Services/ServiceAssestment";
import Questions from "../Questions/Questions";
import UserProfile from "../../components/21_Profile/34_Userprofile/UserProfile";
import Termsofservice from "../../components/34_Termsofservice/Termsofservice";
import Opensource from "../../components/35_Opensource/Opensource";
import LandR from "../../components/36_L&R/LandR";
// import UserProfile2 from "../../components/21_Profile/34_Userprofile/UserProfile2";
import Report from "../Reports/Report";
import TermsAndPrivacy from "../../components/03_RegisterUser/TermsAndPrivacy";

const MainRoutes: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const showTabBar = [
    "/home",
    "/patient",
    "/advice",
    "/disease",
    "/profile",
    "/configure",
    "/checkup",
  ].includes(location.pathname);

  const tokenString = localStorage.getItem("userDetails");
  let roleType = 1;

  if (tokenString) {
    const tokenObject = JSON.parse(tokenString);
    roleType = tokenObject.roleType;
  }

  const doctor = [
    {
      name: "Home",
      path: "/home",
      icon: home,
    },
    {
      name: "Patient",
      path: "/patient",
      icon: home,
    },
    {
      name: "Disease",
      path: "/disease",
      icon: home,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: home,
    },
  ];

  const menuBar = [
    {
      name: "Profile",
      path: "/profile",
      icon: "",
    },
    {
      name: "UserProfile",
      path: "/userprofile",
      icon: "",
    },
    {
      name: "Subscription Plans",
      path: "/subscriptionPlans",
      icon: "",
    },
    {
      name: "Transaction History",
      path: "/transactionHistory",
      icon: "",
    },
    {
      name: "Coupons",
      path: "/coupons",
      icon: "",
    },
    {
      name: "Notification Setting",
      path: "/notificationSettings",
      icon: "",
    },
    {
      name: "Help Center",
      path: "/helpCenter",
      icon: "",
    },
    {
      name: "Share",
      path: "/share",
      icon: "",
    },
    {
      name: "Feedback",
      path: "/feedback",
      icon: "",
    },
    {
      name: "Terms and Condition",
      path: "/termsCondition",
      icon: "",
    },
    {
      name: "Privacy Policy",
      path: "/privacyPolicy",
      icon: "",
    },
    {
      name: "Choose Language",
      path: "/ChooseLanguage_02",
      icon: "",
    },
    {
      name: "Add Family Member",
      path: "/addFamilyMember",
      icon: "",
    },
  ];

  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route exact path="/">
          <Splashscreen />
        </Route>
        <Route path="/chooselanguage">
          <Chooselanguage />
        </Route>
        <Route path="/login">
          <Login />
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
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/userprofile">
          <UserProfile />
        </Route>
        {/* <Route path="/userprofile2">
          <UserProfile2/>
        </Route> */}
        <Route path="/subscriptionPlans">
          <SubscriptionPlans />
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
        <Route path="/addFamilyMember">
          <AddFamilyMember />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/serviceAssestment">
          <ServiceAssestment />
        </Route>
        <Route path="/serviceQuestion">
          <Questions />
        </Route>
        <Route path="/reports">
          <Report/> 
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
