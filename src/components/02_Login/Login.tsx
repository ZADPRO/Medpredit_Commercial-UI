import React, { useState } from "react";
import login from "../../assets/images/Login/login (1).png";
import login1 from "../../assets/images/Login/login img.png";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { close, logoApple, logoFacebook, logoGoogle } from "ionicons/icons";
import "./Login.css";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonModal,
  IonText,
  IonList,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import tickAnimation from "../../assets/Animations/tickanimation.json";
import axios from "axios";
import decrypt from "../../helper";
import CustomIonLoading from "../CustomIonLoading/CustomIonLoading";

const Login: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userSelectionModal, setUserSelectionModal] = useState<boolean>(false);
  const [userSelectionList, setUserSelectionList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { t } = useTranslation("global");

  const history = useHistory();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isSignIn: boolean = false
  ) => {
    // setToastMessage("");
    // setShowToast(false);
    const { name, value } = e.target;
    if (isSignIn) {
      if ((name == "username" && value.length <= 10) || name == "password") {
        setSignInData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleLogIn = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_COMMERCIAL_URL}/usersignin`,
        signInData
      );

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log(data);
      if (data.status) {
        setLoading(false);
        setErrorMessage("");
        if (data.users.length > 1) {
          setUserSelectionList(
            data.users.sort((a: any, b: any) => a.refUserId - b.refUserId)
          );
          setUserSelectionModal(true);
        } else {
          const userDetails = {
            token: "Bearer " + data.token,
            userId: data.users[0].refUserId,
            userCustId: data.users[0].refUserCustId,
            firstName: data.users[0].refUserFname,
            lastName: data.users[0].refUserLname,
            phNumber: data.users[0].refUserMobileno,
          };

          localStorage.setItem("userDetails", JSON.stringify(userDetails));

          localStorage.setItem("detailsFlag", data.isDetails);

          localStorage.setItem("firstLogin", data.isDetails);

          localStorage.setItem("headStatus", data.users[0].headStatus);
          setShowModal(true);
          setSignInData({
            username: "",
            password: "",
          });
        }
      } else {
        setLoading(false);
        setErrorMessage(t("login.Invalid username or password"));

        // setToastMessage("*Invalid username or password");
        // setShowToast(true);
      }
    } catch (error) {
      console.error("Error during Sign In:", error);
      setLoading(false);
      setErrorMessage(t("login.An error occurred. Please try again"));
      // setToastMessage("An error occurred. Please try again.");
      // setShowToast(true);
      // setLoadingStatus(false);
    }
  };

  const handleSubLogin = async (selectedUser: any) => {
    setUserSelectionModal(false);
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_COMMERCIAL_URL}/handleMultipleUserSignin`,
        {
          username: signInData.username,
          password: signInData.password,
          userId: selectedUser.refUserId,
        }
      );
      console.log(response);
      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log(data);

      if (data.status) {
        const userDetails = {
          token: "Bearer " + data.token,
          userId: selectedUser.refUserId,
          userCustId: selectedUser.refUserCustId,
          firstName: selectedUser.refUserFname,
          lastName: selectedUser.refUserLname,
          phNumber: selectedUser.refUserMobileno,
        };
        setLoading(false);
        setErrorMessage("");

        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        localStorage.setItem("detailsFlag", data.isDetails);

        localStorage.setItem("headStatus", selectedUser.headStatus);
        setShowModal(true);
        setSignInData({
          username: "",
          password: "",
        });
      } else {
        console.log("Error during Sign In:");
        setLoading(false);
        setErrorMessage(t("login.An error occurred. Please try again"));
      }
    } catch (error) {
      console.error("Error during Sign In:", error);
      setLoading(false);
      setErrorMessage(t("login.An error occurred. Please try again"));
    }
  };

  const routeCondition = () => {
    const flag = localStorage.getItem("firstLogin");

    if (flag == "true") {
      setTimeout(() => {
        history.push("/userProfile");
        setShowModal(false);
      }, 1000);
    } else {
      setTimeout(() => {
        history.push("/home");
        setShowModal(false);
      }, 1000);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={true}>
        <div className="loginScreenIonic">
          <img src={login1} alt="loginimg" />
          <p className="welcometext">{t("login.welcome")}👋</p>
          <div className="inputs">
            <InputText
              type="number"
              name="username"
              placeholder={t("login.Mobile Number/ Email Address")}
              style={{ width: "20rem", maxWidth: "100%", borderRadius: "10px" }}
              value={signInData.username}
              onChange={(e) => handleInputChange(e, true)}
            />
            <Password
              name="password"
              placeholder={t("login.Password")}
              toggleMask
              style={{ width: "20rem", maxWidth: "100%", borderRadius: "10px" }}
              value={signInData.password}
              onChange={(e) => handleInputChange(e, true)}
              feedback={false}
              tabIndex={1}
            />
          </div>
          <div style={{ paddingTop: "0.5rem" }}>
            {errorMessage && <IonText color="danger">{errorMessage}</IonText>}{" "}
          </div>
          <div
            style={{
              width: "20rem",
              padding: "1rem 0",
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            {/* <div
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
            </div> */}
            <span
              onClick={() => {
                history.push("/forgotPassword", {
                  direction: "forward",
                  animation: "slide",
                });
              }}
              className="loginRegisterUser text-sm"
            >
              {t("login.Forgot Password")}?
            </span>
          </div>

          <div style={{ width: "20rem" }}>
            <button
              onClick={() => handleLogIn()} // Show modal on login click
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
        </div>

        <IonModal
          isOpen={userSelectionModal}
          onDidDismiss={() => setUserSelectionModal(false)}
          initialBreakpoint={1}
          id="ion-custom-modal-02"
        >
          <div className="report-modalContent">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h4>{t("login.Select User")}</h4>
              <IonIcon
                onClick={() => {
                  setUserSelectionModal(false);
                }}
                style={{ "font-size": "1.5rem" }}
                icon={close}
              />
            </div>
            <IonList className="reports-user-list">
              {userSelectionList?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="reports-user-data"
                  onClick={() => handleSubLogin(item)}
                >
                  <div className="reports-user-profile">
                    <i className="pi pi-user"></i>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>{item.refUserFname + " " + item.refUserLname}</span>
                      {item.headStatus == "true" && (
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                            color: "var(--med-dark-green)",
                          }}
                        >
                          {t("login.Primary")}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* <RadioButton
                            value={item.refUserCustId}
                            checked={tempselectedUser === item.refUserId}
                            onChange={() => settempSelectedUser(item.refUserId)}
                          /> */}
                </div>
              ))}
            </IonList>

            {/* <div
                      onClick={() => {
                        if (tempselectedUser) {
                          setCanDismissModal1(true);
                          !selectedUser && setCanDismissModal2(false);
                          setShowModal1(false);
                          setShowModal2(true);
                          const foundUser = userData.find(
                            (item) => item.refUserId === tempselectedUser
                          );
          
                          const reportSelectedUser = {
                            reUserId: foundUser?.refUserId,
                            refGender: foundUser?.refGender,
                          };
          
                          setReportUser(reportSelectedUser);
                        }
                      }}
                    >
                      <button className="medCustom-button01">Next</button>
                    </div> */}
          </div>
        </IonModal>

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
                onComplete={() => routeCondition()}
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
      <CustomIonLoading isOpen={loading} />
    </IonPage>
  );
};

export default Login;
