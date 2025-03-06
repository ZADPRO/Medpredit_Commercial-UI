<<<<<<< HEAD
import { IonContent, IonIcon, IonPage, IonToast } from "@ionic/react";
import React, { useState } from "react";
import "./ForgotPassword.css";
import { InputText } from "primereact/inputtext";
import { useHistory } from "react-router-dom";
import { chevronBack } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import forgetpassword from "../../assets/images/Forgetpassword/forgotpassword.png";

const ForgotPassword = () => {
  const { t, i18n } = useTranslation("global");

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [toastOpen, setToastOpen] = useState({
    status: false,
    message: "",
    textColor: "white",
=======
import { IonContent, IonIcon, IonPage, IonToast } from '@ionic/react';
import React, { useState } from 'react';
import './ForgotPassword.css';
import { InputText } from 'primereact/inputtext';
import { useHistory } from 'react-router-dom';
import { chevronBack } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
    const { t, i18n } = useTranslation("global");

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [toastOpen, setToastOpen] = useState({
    status: false,
    message: '',
    textColor: 'white',
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
  });

  const handleNext = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
<<<<<<< HEAD
      history.push("/enterOTP", {
        direction: "forward",
        animation: "slide",
=======
      history.push('/enterOTP', {
        direction: 'forward',
        animation: 'slide',
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      });
    } else {
      setToastOpen({
        status: true,
        message: t("forgotPassword.invalidEmail"),
<<<<<<< HEAD
        textColor: "red",
=======
        textColor: 'red',
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
<<<<<<< HEAD
      <div className="loginScreenIonic">
          {/* <IonIcon
            size="large"
            onClick={() => history.goBack()}
            icon={chevronBack}
          ></IonIcon> */}
          <img src={forgetpassword} alt="forgetpassword" />
          <div className="forgotPassword">
            <h1 className="forgettitle">{t("forgotPassword.title")}</h1>
            <div className="forgotPasswordFields">
              <label>{t("forgotPassword.description")}</label>
              <InputText
                type="text"
                placeholder={t("login.Mobile Number/ Email Address")}
                style={{
                  width: "200rem",
                  maxWidth: "100%",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div style={{ margin: "2rem 0 0 1rem" }}>
              <button onClick={handleNext} className="medCustom-button01">
                {t("forgotPassword.continue")}
=======
        <div className="forgotPassIonicScreen">
          <div></div>
          <div className="forgotPassword">
            <IonIcon size="large" onClick={() => history.goBack()} icon={chevronBack}></IonIcon>
            <h1>{t("forgotPassword.title")}</h1>
            <div className="forgotPasswordFields">
              <label>{t("forgotPassword.description")}</label>
              <InputText
                type="email"
                placeholder={t("forgotPassword.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ margin: '2rem 0 0 1rem' }}>
              <button onClick={handleNext} className="medCustom-button01">
              {t("forgotPassword.next")}
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
              </button>
            </div>
          </div>
        </div>

        <IonToast
          style={{ "--color": toastOpen.textColor, fontWeight: "bold" }}
          isOpen={toastOpen.status}
<<<<<<< HEAD
          onDidDismiss={() =>
            setToastOpen({ status: false, textColor: "", message: "" })
          }
=======
          onDidDismiss={() => setToastOpen({ status: false, textColor: "", message: "" })}
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
          message={toastOpen.message}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
