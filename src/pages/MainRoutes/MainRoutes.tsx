import {
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabs,
  IonTabButton,
  IonTabBar,
} from "@ionic/react";
import React from "react";
import { Route, useLocation } from "react-router";
import Splashscreen from "../../components/00_Splashscreen/Splashscreen";
import Chooselanguage from "../../components/01_Chooselang/Chooselanguage";
import Login from "../../components/02_Login/Login";

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
    },
    {
      name: "Patient",
      path: "/patient",
    },
    {
      name: "Disease",
      path: "/disease",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];

  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route path="/">
          <Splashscreen />
        </Route>
        <Route path="/chooselanguage">
          <Chooselanguage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </IonRouterOutlet>

      {showTabBar && (
        <IonTabBar id="mainIonToolbar" slot="bottom">
          {(roleType === 1 ? doctor : []).map((element) => (
            <IonTabButton
              key={element.path}
              className={
                location.pathname === element.path
                  ? "mainIonTabButton gradientButton01"
                  : "mainIonTabButton"
              }
              tab={element.name}
              href={element.path}
            >
              <IonLabel
                style={{
                  fontSize: "12px",
                  color:
                    location.pathname === element.path ? "white" : "#0375c6",
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
