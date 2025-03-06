import React, { useState } from "react";
<<<<<<< HEAD
import login from "../../assets/images/Login/login (1).png";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { logoApple, logoFacebook, logoGoogle } from "ionicons/icons";
import "./Login.css";

import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonModal,
} from "@ionic/react";
=======
import login from "../../assets/images/Login/login (1).png"
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { logoApple, logoFacebook, logoGoogle } from 'ionicons/icons';
import "./Login.css";
import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
import { Divider } from "primereact/divider";
import { useHistory } from "react-router-dom";
import { Checkbox } from "primereact/checkbox";
import { useTranslation } from "react-i18next";
<<<<<<< HEAD
import Lottie from "lottie-react";
import tickAnimation from "../../assets/Animations/tickanimation.json";
=======
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2

const Login: React.FC = () => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState<boolean>(false);
<<<<<<< HEAD
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation("global");

  const history = useHistory();
  

=======

  const { t, i18n } = useTranslation("global");
  
  const history = useHistory();
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="loginScreenIonic">
          <img src={login} alt="loginimg" />

<<<<<<< HEAD
          <p className="welcometext">{t("login.welcome")}👋</p>
=======
          <p className="text1">{t("login.welcome")}👋</p>
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
          <div className="inputs">
            <InputText
              type="text"
              placeholder={t("login.Mobile Number/ Email Address")}
              style={{ width: "20rem", maxWidth: "100%", borderRadius: "10px" }}
            />
            <Password
              placeholder={t("login.Password")}
              value={value}
              toggleMask
              style={{ width: "20rem", maxWidth: "100%", borderRadius: "10px" }}
              onChange={(e) => setValue(e.target.value)}
              feedback={false}
              tabIndex={1}
            />
          </div>
<<<<<<< HEAD
          <div
            style={{
              width: "20rem",
              padding: "1rem 0",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: "0.8rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox
                inputId="remember"
                onChange={() => setChecked(!checked)}
                checked={checked}
              ></Checkbox>
              <label htmlFor="remember" className="ml-2">
                {t("login.Remember Me")}
              </label>
            </div>
            <span
              onClick={() => {
                history.push("/forgotPassword", {
                  direction: "forward",
                  animation: "slide",
                });
              }}
              className="loginRegisterUser"
            >
              {t("login.Forgot Password")}?
            </span>
          </div>

          <div style={{ width: "20rem" }}>
            <button
              onClick={() => setShowModal(true)} // Show modal on login click
              className="medCustom-button01"
            >
              {t("login.Login")}
            </button>
          </div>

=======
          <div style={{width: "20rem", padding: "1rem 0", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <div style={{fontSize: "0.8rem", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Checkbox inputId="remember" onChange={() => setChecked(!checked)} checked={checked}></Checkbox>
            <label htmlFor="remember" className="ml-2">{t("login.Remember Me")}</label>
          </div>
            <span onClick={() => {
              history.push("/forgotPassword", {
                  direction: "forward",
                  animation: "slide",
                })
            }} className="loginRegisterUser">{t("login.Forgot Password")}?</span>
          </div>

          <div style={{ width: "20rem" }}>
            <button onClick={() => history.push("/home")} className="medCustom-button01">{t("login.Login")}</button>
          </div>
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
          <div style={{ color: "rgba(113, 114, 122, 1)", padding: "1rem 0" }}>
            {t("login.Not a member")}?{" "}
            <span
              className="loginRegisterUser"
              onClick={() =>
                history.push("/registerUser", {
                  direction: "forward",
                  animation: "slide",
                })
              }
            >
              {t("login.Register Now")}
            </span>
          </div>
<<<<<<< HEAD

          <Divider />
=======
          <Divider />
          <div style={{ color: "rgba(113, 114, 122, 1)" }}>
            {t("login.or continue with")}
          </div>
          <div className="loginIonicLogo">
            <IonIcon size="" icon={logoGoogle}></IonIcon>
            <IonIcon icon={logoApple}></IonIcon>
            <IonIcon icon={logoFacebook}></IonIcon>
          </div>
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
        </div>

        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          className="half-screen-modal"
        >
          <div className="modalContent">
            <div className="lottie-container">
            <Lottie
        animationData={tickAnimation}
        loop={false}
        style={{ width: 150, height: 150 }}
        onComplete={() => {
          setTimeout(() => {
            history.push("/home");
          }, 1000); 
        }}
      />
            </div>
            <p
              style={{
                fontWeight: "700",
                fontSize: "x-large",
                marginTop: "0%",
              }}
            >
              {" "}
              {t("login.Login Successful")}
             
            </p>
          
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Login;
