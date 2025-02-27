import React, { useState } from "react";
import login from "../../assets/images/Login/Login.png";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import "./Login.css";
import { IonButton, IonContent, IonPage } from "@ionic/react";
const Login: React.FC = () => {
  const [value, setValue] = useState("");
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="loginScreenIonic">
          <img src={login} alt={"loginimg"} />

          <p className="text1">Hi, Welcome!👋</p>
          <div className="inputs">
            <InputText
              type="text"
              placeholder="Mobile Number/ Email Address"
              style={{ width: "20rem", maxWidth: "100%", borderRadius: "10px" }}
            />
            <Password
              placeholder="Password"
              value={value}
              toggleMask
              style={{ width: "20rem", maxWidth: "100%", borderRadius: "10px" }}
              onChange={(e) => setValue(e.target.value)}
              feedback={false}
              tabIndex={1}
            />
          </div>
          <p className="forgotPassword">Forgot Password?</p>

          <IonButton expand="block">Login</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
