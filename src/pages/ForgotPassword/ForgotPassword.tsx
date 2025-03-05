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
  });

  const handleNext = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      history.push('/enterOTP', {
        direction: 'forward',
        animation: 'slide',
      });
    } else {
      setToastOpen({
        status: true,
        message: t("forgotPassword.invalidEmail"),
        textColor: 'red',
      });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
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
              </button>
            </div>
          </div>
        </div>

        <IonToast
          style={{ "--color": toastOpen.textColor, fontWeight: "bold" }}
          isOpen={toastOpen.status}
          onDidDismiss={() => setToastOpen({ status: false, textColor: "", message: "" })}
          message={toastOpen.message}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
