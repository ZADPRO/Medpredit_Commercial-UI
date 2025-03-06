<<<<<<< HEAD
import { IonContent, IonModal, IonPage } from "@ionic/react";
import { InputOtp } from "primereact/inputotp";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.css";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import otp from "../../assets/Animations/otp.json";
import otpsent from "../../assets/Animations/otpsent.json";
import "./EnterOTP.css";

const EnterOTP = () => {
  const [token, setTokens] = useState<string | number | undefined>();
  const { t } = useTranslation("global");
  const history = useHistory();

  // Timer state
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    setTimer(120);
    setCanResend(false);
    // Add logic to resend OTP here
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="loginScreenIonic">
          <div></div>
          <div className="forgotPassword">
            <div className="lottie-containerotp">
              <Lottie
                animationData={otpsent}
                loop={true}
                style={{ width: 450, height: 350 }}
              />
            </div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              {t("verifyOTP.title")}
            </h1>
            <div className="forgotPasswordFields">
              <label style={{ display: "flex", justifyContent: "center" }}>
                {t("verifyOTP.description")}
              </label>
=======
import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { InputOtp } from "primereact/inputotp";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './ForgotPassword.css'
import { useTranslation } from "react-i18next";

const EnterOTP = () => {
    const [token, setTokens] = useState<string | number | undefined>();
  const { t, i18n } = useTranslation("global");
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="forgotPassIonicScreen">
          <div></div>
          <div className="forgotPassword">
            <IonIcon
              size="large"
              onClick={() => history.goBack()}
              icon={chevronBack}
            ></IonIcon>
            <h1>{t("verifyOTP.title")}</h1>
            <div className="forgotPasswordFields">
              <label>{t("verifyOTP.description")}</label>
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
              <InputOtp
                value={token}
                onChange={(e) => setTokens(e.value ?? undefined)}
                className="custom-otp-input"
                integerOnly
              />
            </div>
<<<<<<< HEAD

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "3%",
              }}
            >
              {timer > 0 ? (
                <span>{`00:${timer.toString().padStart(2, "0")}`}</span>
              ) : (
                <button
                  onClick={handleResend}
                  className="resend-button"
                  disabled={!canResend}
                >
                  {t("verifyOTP.resendmsg")}
                </button>
              )}
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "3%",
                }}
              >
                {t("verifyOTP.resendmsg")}
              </div>
            </div>
            <div style={{ margin: "2rem 0 0 1rem" }}>
              <button
               onClick={() => {
                // history.goBack(); 
                setShowModal(true); 
              }}
=======
            <div style={{ margin: '2rem 0 0 1rem' }}>
              <button
                onClick={() => history.goBack()}
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
                className="medCustom-button01"
              >
                {t("verifyOTP.verify")}
              </button>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          className="half-screen-modal"
        >
          <div className="modalContent">
            <div className="lottie-container">
         
            </div>
            <p
              style={{
                fontWeight: "700",
                fontSize: "x-large",
            marginTop:"10%"
          
              }}
            >
              {" "}
              {t("verifyOTP.verifySuccessful")}
             
            </p>
          
          </div>
        </IonModal>
=======
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      </IonContent>
    </IonPage>
  );
};

export default EnterOTP;
