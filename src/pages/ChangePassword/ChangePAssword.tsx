import { IonContent, IonModal, IonPage } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import chnagepassword from "../../assets/images/Changepassword/Changepassword.png";
import { useTranslation } from "react-i18next";
import { Password } from "primereact/password";
import "./ChangePAssword.css";
import Lottie from "lottie-react";
import tickAnimation from "../../assets/Animations/tickanimation.json";

const ChangePAssword = () => {
  const [token, setTokens] = useState<string | number | undefined>();
  const { t } = useTranslation("global");
  const history = useHistory();

  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toastOpen, setToastOpen] = useState({
    status: false,
    message: "",
    textColor: "white",
  });
  const validateForm = () => {
    if (!password) {
      setToastOpen({
        status: true,
        message: t("Register User.Password is required."),
        textColor: "red",
      });
      return false;
    }

    if (password.length < 8) {
      setToastOpen({
        status: true,
        message: t("Register User.Password must be at least 8 characters."),
        textColor: "red",
      });
      return false;
    }

    if (password !== confirmPassword) {
      setToastOpen({
        status: true,
        message: t("Register User.Passwords do not match."),
        textColor: "red",
      });
      return false;
    }

    return true;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
      setToastOpen({
        status: true,
        message: t("Register User.Registration Successful!"),
        textColor: "green",
      });
      console.log("Form submitted");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="loginScreenIonic">
          <img src={chnagepassword} alt="chnagepassword" />
          <form className="registerUserForm" onSubmit={handleSubmit}>
            <div className="passwordfeilfd">
              <div className="Changepasswordfeild">
                <label>{t("changepassword.New Password")}</label>
                <Password
                  type="password"
                  toggleMask
                  placeholder={t("Register User.Must be 8 characters")}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  feedback={false}
                />
              </div>

              <div className="Changepasswordfeild">
                <label>{t("Register User.Confirm Password")}</label>
                <Password
                  type="password"
                  toggleMask
                  placeholder={t("changepassword.Confirm Password")}
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  feedback={false}
                />
                <div style={{ marginTop: "2rem" }}>
                  <button
                    type="submit"
                    className="medCustom-button01"
                    onClick={() => setShowModal(true)}
                  >
                    {t("changepassword.Finish")}
                  </button>
                </div>
              </div>
            </div>
          </form>
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChangePAssword;
