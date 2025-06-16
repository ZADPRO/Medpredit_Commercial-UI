import { IonContent, IonModal, IonPage } from "@ionic/react";
import { InputOtp } from "primereact/inputotp";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./ForgotPassword.css";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import otpsent from "../../assets/Animations/otpsent.json";
import "./EnterOTP.css";
import axios from "axios";
import decrypt from "../../helper";

const EnterOTP = () => {
  const [token, setTokens] = useState<string | number | undefined>();
  const { t } = useTranslation("global");

  const [toastOpen, setToastOpen] = useState({
    status: false,
    message: "",
    textColor: "white",
  });

  const history = useHistory();

  const location = useLocation<{ email: string; userId: number }>();
  const email = location.state?.email;
  const userId = location.state?.userId;

  // Now you can use `email` inside this component
  console.log("Email passed to EnterOTP:", email, userId);

  // Timer state
  const [timer, setTimer] = useState(300);
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
    setTimer(300);
    setCanResend(false);
    // Add logic to resend OTP here
  };

  const verifyOTPToBackend = () => {
    axios
      .post(
        import.meta.env.VITE_API_COMMERCIAL_URL + "/validateOTPForPassword",
        {
          email: email,
          otp: token,
          userId: userId,
        }
      )
      .then((response) => {
        console.log("res", response);
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("line 46");
        console.log("data", data);
        if (data.status) {
          history.push("/changepassword", {
            direction: "forward",
            animation: "slide",
            email: email,
            userId: userId,
          });
        } else {
          setToastOpen({
            status: true,
            message: t("forgotPassword.invalidEmail"),
            textColor: "red",
          });
        }
      });
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
              <InputOtp
                value={token}
                onChange={(e) => setTokens(e.value ?? undefined)}
                className="custom-otp-input"
                integerOnly
                length={6}
              />
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
                    verifyOTPToBackend();
                    // setShowModal(true);
                  }}
                  className="medCustom-button01"
                >
                  {t("verifyOTP.verify")}
                </button>
              </div>
            </div>
          </div>
          <IonModal
            isOpen={showModal}
            onDidDismiss={() => setShowModal(false)}
            className="half-screen-modal"
          >
            <div className="modalContent">
              <div className="lottie-container"></div>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "x-large",
                  marginTop: "10%",
                }}
              >
                {" "}
                {t("verifyOTP.verifySuccessful")}
              </p>
            </div>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EnterOTP;
