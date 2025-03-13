import React, { useState } from "react";
import { IonContent, IonModal, IonPage, IonToast } from "@ionic/react";
import "./RegisterUser.css";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Password } from "primereact/password";
import registerImage from "../../assets/images/Register/registerimg.png";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import tickAnimation from "../../assets/Animations/tickanimation.json";
import { useHistory } from "react-router-dom";
import { Divider } from "primereact/divider";
import axios from "axios";
import decrypt from "../../helper";

const RegisterUser = () => {
  const { t, i18n } = useTranslation("global");
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const [formData, setFormData] = useState({
    refUserFname: "",
    refUserLname: "",
    refUserEmail: "",
    refUserPassword: "",
    refUserConPassword: "",
    // refGender: null as string | null,
    // refMaritalStatus: null as string | null,
    // refDOB: null as any | null,
    refGender: "-",
    refMaritalStatus: "-",
    refDOB: "-",
    refEducation: "-",
    refProfession: "-",
    refSector: "-",
    refAddress: "-",
    refDistrict: "-",
    // refPincode: null as any | null,
    refPincode: "-",
    refUserMobileno: "",
  });
  interface ToastState {
    status: boolean;
    message: string;
    textColor?: string; // Optional textColor
  };

  interface ToastState {
    status: boolean;
    message: string;
    textColor?: string; // Optional textColor
  }

  const [toastOpen, setToastOpen] = useState<ToastState>({
    status: false,
    message: "",
    textColor: "white"
  });

  const validateForm = () => {
    if (!formData.refUserFname) {
      setToastOpen({
        status: true,
        message: t("Register User.First Name is required."),
        textColor: "red",
      });
      return false;
    }

    if (!formData.refUserLname) {
      setToastOpen({
        status: true,
        message: t("Register User.Last Name is required."),
        textColor: "red",
      });
      return false;
    }
    if (!formData.refUserMobileno || !/^\d{10}$/.test(formData.refUserMobileno)) {
      setToastOpen({
        status: true,
        message: t("Register User.Mobile number must be 10 digits."),
        textColor: "red",
      });
      return false;
    }
    

    if (!formData.refUserEmail) {
      setToastOpen({
        status: true,
        message: t("Register User.Email is required."),
        textColor: "red",
      });
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.refUserEmail)) {
      setToastOpen({
        status: true,
        message: t("Register User.Enter a valid email."),
        textColor: "red",
      });
      return false;
    }

    if (!formData.refUserPassword) {
      setToastOpen({
        status: true,
        message: t("Register User.Password is required."),
        textColor: "red",
      });
      return false;
    }

    if (formData.refUserPassword.length < 8) {
      setToastOpen({
        status: true,
        message: t("Register User.Password must be at least 8 characters."),
        textColor: "red",
      });
      return false;
    }

    if (formData.refUserPassword !== formData.refUserConPassword) {
      setToastOpen({
        status: true,
        message: t("Register User.Passwords do not match."),
        textColor: "red",
      });
      return false;
    }

    if (!checked) {
      setToastOpen({
        status: true,
        message: t("Register User.You must agree to the Terms and Conditions."),
        textColor: "red",
      });
      return false;
    }

    return true;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleSigup();
      setToastOpen({
        status: true,
        message: t("Register User.Registration Successful!"),
        textColor: "green",
      });
      console.log("Form submitted");
    }
  };

  const handleSigup = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_COMMERCIAL_URL}/usersignup`,
        {
          refUserFname: formData.refUserFname,
          refUserLname: formData.refUserLname,
          refUserEmail: formData.refUserEmail,
          refUserPassword: formData.refUserPassword,
          refDOB: formData.refDOB,
          refMaritalStatus: formData.refMaritalStatus,
          refEducation: formData.refEducation,
          refProfession: formData.refProfession,
          refSector: formData.refSector,
          refAddress: formData.refAddress,
          refDistrict: formData.refDistrict,
          refPincode: formData.refPincode,
          refUserMobileno: formData.refUserMobileno,
          refGender: formData.refGender,
        }
      );
      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      console.log(data);

      if (data.status) {
        setToastOpen({
          status: true,
          textColor: "green",
          message: "Successfully Signup",
        });

        
      setShowModal(true);

        setTimeout(() => {
          history.push("/login", {
            direction: "backward",
            animation: "slide",
          });

          setFormData({
            refUserFname: "",
            refUserLname: "",
            refUserEmail: "",
            refUserPassword: "",
            refUserConPassword: "",
            // refGender: null as string | null,
            // refMaritalStatus: null as string | null,
            refGender: "-",
            refMaritalStatus: "-",
            refDOB: null as any | null,
            refEducation: "",
            refProfession: "",
            refSector: "",
            refAddress: "",
            refDistrict: "",
            refPincode: null as any | null,
            refUserMobileno: "",
          });
        }, 3000);
      } else {
        // setLoading(false);
        setToastOpen({
          status: true,
          message: "Already Mobile Number Exits",
        });
      }
    } catch {
      console.error("tesitng - false");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="registerScreenIonic">
          <form className="registerUserForm" onSubmit={handleSubmit}>
            <img src={registerImage} style={{ width: "100%", height: "35vh", marginTop: "2%" }} />
            <div className="title">Registration</div>
            <div className="registerUserFields">
              <label>{t("Register User.First Name")}</label>
              <InputText
                type="text"
                name="refUserFname"
                placeholder={t("Register User.First Name")}
                value={formData.refUserFname}
                required
                onChange={handleInputChange}
              />
            </div>

            <div className="registerUserFields">
              <label>{t("Register User.Last Name")}</label>
              <InputText
                type="text"
                name="refUserLname"
                placeholder={t("Register User.Last Name")}
                value={formData.refUserLname}
                required
                onChange={handleInputChange}
              />
            </div>

            <div className="registerUserFields">
              <label>{t("Register User.E-Mail")}</label>
              <InputText
                type="email"
                name="refUserEmail"
                placeholder={t("Register User.E-Mail")}
                value={formData.refUserEmail}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="registerUserFields">
              <label>{t("Register User.Mobile Number")}</label>
              <InputText
                type="number"
                name="refUserMobileno"
                placeholder={t("Register User.Mobile Number")}
                value={formData.refUserMobileno}
                required
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,10}$/.test(input)) {
                    handleInputChange(e);
                  }
                }}
              />
            </div>

            <div className="registerUserFields">
              <label>{t("Register User.Enter Password")}</label>
              <Password
                type="password"
                name="refUserPassword"
                toggleMask
                placeholder={t("Register User.Must be 8 characters")}
                value={formData.refUserPassword}
                required
                onChange={handleInputChange}
                
              />
            </div>

            <div className="registerUserFields">
              <label>{t("Register User.Confirm Password")}</label>
              <Password
                type="password"
                name="refUserConPassword"
                toggleMask
                placeholder={t("Register User.Match Password")}
                value={formData.refUserConPassword}
                required
                onChange={handleInputChange}
                feedback={false}
              />
            </div>

            <div
              style={{
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox
                inputId="terms"
                onChange={() => setChecked(!checked)}
                checked={checked}
              ></Checkbox>
              <label htmlFor="terms" className="ml-2">
                {t("Register User.I've read and agree with the")}{" "}
                <span
                  style={{ color: "var(--med-dark-green)", fontWeight: "bold" }}
                >
                  {t(
                    "Register User.Terms and Conditions and the Privacy Policy"
                  )}
                </span>
              </label>
            </div>

            <div style={{ marginTop: "2rem" }}>
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

export default RegisterUser;
