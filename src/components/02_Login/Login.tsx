import React, { useState } from "react";
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
import { Divider } from "primereact/divider";
import { useHistory } from "react-router-dom";
import { Checkbox } from "primereact/checkbox";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import tickAnimation from "../../assets/Animations/tickanimation.json";

const Login: React.FC = () => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation("global");

  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="loginScreenIonic">
          <img src={login} alt="loginimg" />
          <p className="welcometext">{t("login.welcome")}👋</p>
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

          <Divider />
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
