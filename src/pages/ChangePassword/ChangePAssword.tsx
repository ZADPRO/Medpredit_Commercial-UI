import { IonContent, IonModal, IonPage, IonToast } from "@ionic/react";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import chnagepassword from "../../assets/images/Changepassword/Changepassword.png";
import { useTranslation } from "react-i18next";
import { Password } from "primereact/password";
import "./ChangePAssword.css";
import Lottie from "lottie-react";
import tickAnimation from "../../assets/Animations/tickanimation.json";
import axios from "axios";
import decrypt from "../../helper";

const ChangePAssword = () => {
  const { t } = useTranslation("global");
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation<{ email: string; userId: number }>();
  const email = location.state?.email;
  const userId = location.state?.userId;

  const [toastOpen, setToastOpen] = useState({
    status: false,
    message: "",
    textColor: "white",
  });
  const validateForm = () => {
    console.log("password", password);
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

    console.log("confirmPassword", confirmPassword);
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

      axios
        .post(import.meta.env.VITE_API_COMMERCIAL_URL + "/enterNewPassword", {
          userId: userId,
          password: password,
          email: email,
        })
        .then((response) => {
          const data = decrypt(
            response.data[1],
            response.data[0],
            import.meta.env.VITE_ENCRYPTION_KEY
          );
          console.log("data", data);
          if (data.status) {
            history.replace("/login");
            setShowModal(false);
          }
        });
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
                  <button type="submit" className="medCustom-button01">
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
                      // history.push("/home");
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

      <IonToast
        style={{ "--color": toastOpen.textColor, fontWeight: "bold" }}
        isOpen={toastOpen.status}
        onDidDismiss={() =>
          setToastOpen({ status: false, textColor: "", message: "" })
        }
        message={toastOpen.message}
        duration={3000}
      />
    </IonPage>
  );
};

export default ChangePAssword;
