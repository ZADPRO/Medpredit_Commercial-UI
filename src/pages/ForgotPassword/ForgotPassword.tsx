import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonPage,
  IonToast,
} from "@ionic/react";
import React, { useState } from "react";
import "./ForgotPassword.css";
import { InputText } from "primereact/inputtext";
import { useHistory } from "react-router-dom";
import { chevronBack } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import forgetpassword from "../../assets/images/Forgetpassword/forgotpassword.png";
import axios from "axios";
import decrypt from "../../helper";

const ForgotPassword = () => {
  const { t } = useTranslation("global");
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [toastOpen, setToastOpen] = useState({
    status: false,
    message: "",
    textColor: "white",
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNext = () => {
    // Step 1: Validate email first
    if (!validateEmail(email)) {
      setToastOpen({
        status: true,
        message: t("forgotPassword.invalidEmail"),
        textColor: "red",
      });
      return; // Stop execution
    }

    // Step 2: Call API
    axios
      .post(
        import.meta.env.VITE_API_COMMERCIAL_URL + "/generateOTPForPassword",
        { email: email }
      )
      .then((response) => {
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.status) {
          history.push("/enterOTP", {
            direction: "forward",
            animation: "slide",
            email: email,
            userId: data.userId.refUserId,
          });
        } else {
          setToastOpen({
            status: true,
            message: t("forgotPassword.invalidEmail"),
            textColor: "red",
          });
        }
      })
      .catch((error) => {
        // Step 3: Catch server errors (500, network, etc.)
        console.error(error);
        setToastOpen({
          status: true,
          message: t("forgotPassword.invalidEmail"),
          textColor: "red",
        });
      });
  };

  return (
    <IonPage>
      <IonContent>
        <div className="loginScreenIonic">
          <div className="flex align-items-start w-full">
            <IonButtons slot="start">
              <IonBackButton
                mode="md"
                defaultHref="/profile"
                icon={chevronBack}
              ></IonBackButton>
            </IonButtons>
          </div>

          <img src={forgetpassword} alt="forgetpassword" />
          <div className="forgotPassword">
            <h1 className="forgettitle">{t("forgotPassword.title")}</h1>
            <div className="forgotPasswordFields">
              <label>{t("forgotPassword.description")}</label>
              <InputText
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("forgotPassword.Email Address")}
                style={{
                  width: "20rem",
                  maxWidth: "100%",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div style={{ margin: "2rem 0 0 1rem" }}>
              <button onClick={handleNext} className="medCustom-button01">
                {t("forgotPassword.continue")}
              </button>
            </div>
          </div>
        </div>

        <IonToast
          style={{ "--color": toastOpen.textColor, fontWeight: "bold" }}
          isOpen={toastOpen.status}
          onDidDismiss={() =>
            setToastOpen({ status: false, textColor: "", message: "" })
          }
          message={toastOpen.message}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
