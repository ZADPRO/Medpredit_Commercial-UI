import React, { useState } from "react";
import { IonContent, IonPage, IonToast } from "@ionic/react";
import "./RegisterUser.css";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Password } from "primereact/password";
import registerImage from '../../assets/images/Chooselanguage/REGISTRATION.png';
import { useTranslation } from "react-i18next";

const RegisterUser = () => {
  const { t, i18n } = useTranslation("global");

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const [toastOpen, setToastOpen] = useState({
    status: false,
    message: '',
    textColor: 'white'
  });

  const validateForm = () => {
    if (!firstName) {
      setToastOpen({
        status: true,
        message: t("Register User.First Name is required."),
        textColor: "red"
      });
      return false;
    }

    if (!lastName) {
      setToastOpen({
        status: true,
        message: t("Register User.Last Name is required."),
        textColor: "red"
      });
      return false;
    }

    if (!email) {
      setToastOpen({
        status: true,
        message: t("Register User.Email is required."),
        textColor: "red"
      });
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setToastOpen({
        status: true,
        message: t("Register User.Enter a valid email."),
        textColor: "red"
      });
      return false;
    }

    if (!password) {
      setToastOpen({
        status: true,
        message: t("Register User.Password is required."),
        textColor: "red"
      });
      return false;
    }

    if (password.length < 8) {
      setToastOpen({
        status: true,
        message: t("Register User.Password must be at least 8 characters."),
        textColor: "red"
      });
      return false;
    }

    if (password !== confirmPassword) {
      setToastOpen({
        status: true,
        message: t("Register User.Passwords do not match."),
        textColor: "red"
      });
      return false;
    }

    if (!checked) {
      setToastOpen({
        status: true,
        message: t("Register User.You must agree to the Terms and Conditions."),
        textColor: "red"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setToastOpen({
        status: true,
        message: t("Register User.Registration Successful!"),
        textColor: "green"
      });
      console.log("Form submitted");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="registerScreenIonic">
          <form className="registerUserForm" onSubmit={handleSubmit}>
            <img src={registerImage}/>
            <div className="registerUserFields">
              <label>{t("Register User.First Name")}</label>
              <InputText
                type="text"
                placeholder={t("Register User.First Name")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="registerUserFields">
              <label>{t("Register User.Last Name")}</label>
              <InputText
                type="text"
                placeholder={t("Register User.Last Name")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="registerUserFields">
              <label>{t("Register User.E-Mail")}</label>
              <InputText
                type="email"
                placeholder={t("Register User.E-Mail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="registerUserFields">
              <label>{t("Register User.Enter Password")}</label>
              <Password
                type="password"
                toggleMask
                placeholder={t("Register User.Must be 8 characters")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                feedback={false}
              />
            </div>

            <div className="registerUserFields">
              <label>{t("Register User.Confirm Password")}</label>
              <Password
                type="password"
                toggleMask
                placeholder={t("Register User.Match Password")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                feedback={false}
              />
            </div>

            <div style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
              <Checkbox
                inputId="terms"
                onChange={() => setChecked(!checked)}
                checked={checked}
              ></Checkbox>
              <label htmlFor="terms" className="ml-2">
                {t("Register User.I've read and agree with the")}{" "}
                <span style={{ color: "var(--med-dark-green)", fontWeight: "bold" }}>
                  {t("Register User.Terms and Conditions and the Privacy Policy")}
                </span>
              </label>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <button type="submit" className="medCustom-button01">{t("Register User.Next")}</button>
            </div>
          </form>
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

export default RegisterUser;
