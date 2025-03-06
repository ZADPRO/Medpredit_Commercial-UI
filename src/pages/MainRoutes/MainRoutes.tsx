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
} from "@ionic/react";
import React from "react";
import { Route, useLocation } from "react-router";
import Splashscreen from "../../components/00_Splashscreen/Splashscreen";
import Chooselanguage from "../../components/01_Chooselang/Chooselanguage";
import Login from "../../components/02_Login/Login";
import RegisterUser from "../../components/03_RegisterUser/RegisterUser";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import EnterOTP from "../ForgotPassword/EnterOTP";
import Tab1 from "../Tab1";
import { chevronBack, home } from "ionicons/icons";
import './MainRoutes.css';
import ChangePAssword from "../ChangePassword/ChangePAssword";

const MainRoutes: React.FC = () => {
  const location = useLocation();

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
      icon: home
    },
    {
      name: "Patient",
      path: "/patient",
      icon: home
    },
    {
      name: "Disease",
      path: "/disease",
      icon: home
    },
    {
      name: "Profile",
      path: "/profile",
      icon: home
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
          <RegisterUser/>
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword/>
        </Route>
        <Route path="/changepassword">
          <ChangePAssword/>
        </Route>
        <Route path="/enterOTP">
          <EnterOTP/>
        </Route>
        <Route path="/home">
          <Tab1/>
        </Route>
      </IonRouterOutlet>

      {showTabBar && (
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
      )}
    </IonTabs>
  );
};

export default MainRoutes;
