import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import "./ForgotPassword.css";
import { InputText } from "primereact/inputtext";
import { useHistory } from "react-router-dom";
import { chevronBack } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import forgetpassword from "../../assets/images/Forgetpassword/forgotpassword.png";

const ForgotPassword = () => {
  const { t } = useTranslation("global");
  const history = useHistory();
  const [mobile, setMobile] = useState("");
  const [toastOpen, setToastOpen] = useState({
    status: false,
    message: "",
    textColor: "white",
  });

  const handleNext = () => {
    if (/^\d{10}$/.test(mobile)) {
      history.push("/enterOTP", {
        direction: "forward",
        animation: "slide",
      });
    } else {
      setToastOpen({
        status: true,
        message: t("forgotPassword.invalidEmail"),
        textColor: "red",
      });
    }
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
    }
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
          {/* <IonIcon size="large" onClick={() => history.goBack()} icon={chevronBack}></IonIcon> */}
          <img src={forgetpassword} alt="forgetpassword" />
          <div className="forgotPassword">
            <h1 className="forgettitle">{t("forgotPassword.title")}</h1>
            <div className="forgotPasswordFields">
              <label>{t("forgotPassword.description")}</label>
              <InputText
                type="number"
                value={mobile}
                onChange={handleChange}
                placeholder={t("forgotPassword.Mobile Number")}
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
