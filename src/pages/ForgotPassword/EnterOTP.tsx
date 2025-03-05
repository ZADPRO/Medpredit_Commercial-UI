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
              <InputOtp
                value={token}
                onChange={(e) => setTokens(e.value ?? undefined)}
                className="custom-otp-input"
                integerOnly
              />
            </div>
            <div style={{ margin: '2rem 0 0 1rem' }}>
              <button
                onClick={() => history.goBack()}
                className="medCustom-button01"
              >
                {t("verifyOTP.verify")}
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EnterOTP;
