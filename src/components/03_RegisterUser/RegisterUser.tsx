import React, { useState } from "react";
<<<<<<< HEAD
import { IonContent, IonModal, IonPage, IonToast } from "@ionic/react";
=======
import { IonContent, IonPage, IonToast } from "@ionic/react";
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
import "./RegisterUser.css";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Password } from "primereact/password";
<<<<<<< HEAD
import registerImage from "../../assets/images/Register/registerimg.png";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import tickAnimation from "../../assets/Animations/tickanimation.json";
import { useHistory } from "react-router-dom";

=======
import registerImage from '../../assets/images/Chooselanguage/REGISTRATION.png';
import { useTranslation } from "react-i18next";
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2

const RegisterUser = () => {
  const { t, i18n } = useTranslation("global");

<<<<<<< HEAD
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const [toastOpen, setToastOpen] = useState({
    status: false,
    message: "",
    textColor: "white",
=======
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
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
  });

  const validateForm = () => {
    if (!firstName) {
      setToastOpen({
        status: true,
        message: t("Register User.First Name is required."),
<<<<<<< HEAD
        textColor: "red",
=======
        textColor: "red"
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      });
      return false;
    }

    if (!lastName) {
      setToastOpen({
        status: true,
        message: t("Register User.Last Name is required."),
<<<<<<< HEAD
        textColor: "red",
      });
      return false;
    }
    if (!mobile) {
      setToastOpen({
        status: true,
        message: t("Register User.Mobile number is required."),
        textColor: "red",
=======
        textColor: "red"
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      });
      return false;
    }

    if (!email) {
      setToastOpen({
        status: true,
        message: t("Register User.Email is required."),
<<<<<<< HEAD
        textColor: "red",
=======
        textColor: "red"
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      });
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setToastOpen({
        status: true,
        message: t("Register User.Enter a valid email."),
<<<<<<< HEAD
        textColor: "red",
=======
        textColor: "red"
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      });
      return false;
    }

    if (!password) {
      setToastOpen({
        status: true,
        message: t("Register User.Password is required."),
<<<<<<< HEAD
        textColor: "red",
=======
        textColor: "red"
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      });
      return false;
    }

    if (password.length < 8) {
      setToastOpen({
        status: true,
        message: t("Register User.Password must be at least 8 characters."),
<<<<<<< HEAD
        textColor: "red",
=======
        textColor: "red"
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      });
      return false;
    }

    if (password !== confirmPassword) {
      setToastOpen({
        status: true,
        message: t("Register User.Passwords do not match."),
<<<<<<< HEAD
        textColor: "red",
=======
        textColor: "red"
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      });
      return false;
    }

    if (!checked) {
      setToastOpen({
        status: true,
        message: t("Register User.You must agree to the Terms and Conditions."),
<<<<<<< HEAD
        textColor: "red",
=======
        textColor: "red"
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
<<<<<<< HEAD
      setShowModal(true);
      setToastOpen({
        status: true,
        message: t("Register User.Registration Successful!"),
        textColor: "green",
=======
      setToastOpen({
        status: true,
        message: t("Register User.Registration Successful!"),
        textColor: "green"
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
      });
      console.log("Form submitted");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="registerScreenIonic">
          <form className="registerUserForm" onSubmit={handleSubmit}>
<<<<<<< HEAD
            <img src={registerImage} style={{width:"100%", height:"35vh", marginTop:"2%"}} />
            <div className="title">Registration</div>
=======
            <img src={registerImage}/>
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
            <div className="registerUserFields">
              <label>{t("Register User.First Name")}</label>
              <InputText
                type="text"
                placeholder={t("Register User.First Name")}
                value={firstName}
<<<<<<< HEAD
                required
=======
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="registerUserFields">
              <label>{t("Register User.Last Name")}</label>
              <InputText
                type="text"
                placeholder={t("Register User.Last Name")}
                value={lastName}
<<<<<<< HEAD
                required
=======
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="registerUserFields">
              <label>{t("Register User.E-Mail")}</label>
              <InputText
                type="email"
                placeholder={t("Register User.E-Mail")}
                value={email}
<<<<<<< HEAD
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="registerUserFields">
              <label>{t("Register User.Mobile Number")}</label>
              <InputText
                type="number"
                placeholder={t("Register User.Mobile Number")}
                value={mobile}
                required
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
=======
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2

            <div className="registerUserFields">
              <label>{t("Register User.Enter Password")}</label>
              <Password
                type="password"
                toggleMask
                placeholder={t("Register User.Must be 8 characters")}
                value={password}
<<<<<<< HEAD
                required
=======
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
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
<<<<<<< HEAD
                required
=======
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
                onChange={(e) => setConfirmPassword(e.target.value)}
                feedback={false}
              />
            </div>

<<<<<<< HEAD
            <div
              style={{
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
              }}
            >
=======
            <div style={{ fontSize: "0.8rem", display: "flex", alignItems: "center" }}>
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
              <Checkbox
                inputId="terms"
                onChange={() => setChecked(!checked)}
                checked={checked}
              ></Checkbox>
              <label htmlFor="terms" className="ml-2">
                {t("Register User.I've read and agree with the")}{" "}
<<<<<<< HEAD
                <span
                  style={{ color: "var(--med-dark-green)", fontWeight: "bold" }}
                >
                  {t(
                    "Register User.Terms and Conditions and the Privacy Policy"
                  )}
=======
                <span style={{ color: "var(--med-dark-green)", fontWeight: "bold" }}>
                  {t("Register User.Terms and Conditions and the Privacy Policy")}
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2
                </span>
              </label>
            </div>

            <div style={{ marginTop: "2rem" }}>
<<<<<<< HEAD
              <button
                type="submit"
                className="medCustom-button01"
                // onClick={() => setShowModal(true)}
              >
                {t("Register User.Next")}
              </button>
            </div>
          </form>
        </div>
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          className="half-screen-modalReg"
        >
          <div className="modalContent">
            <div className="lottie-containerlogin">
              <Lottie
                animationData={tickAnimation}
                loop={false}
                style={{ width: 150, height: 150 }}
              />
            </div>
            <p
              style={{
                fontWeight: "700",
                fontSize: "x-large",
                marginTop: "0%",
              }}
            >
              Registration Successful!
            </p>
            <div style={{ marginTop: "2rem" }}>
            <button
  type="submit"
  className="medCustom-button01"
  onClick={() => {
    setShowModal(false); 
    setTimeout(() => {
      history.push("/login"); 
    }, 1000); 
  }}
>
  {t("Done")}
</button>

              
            </div>
          </div>
        </IonModal>
=======
              <button type="submit" className="medCustom-button01">{t("Register User.Next")}</button>
            </div>
          </form>
        </div>
>>>>>>> e62ed9601a5b991d93e1c3e94031177b2e8a7da2

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

export default RegisterUser;
