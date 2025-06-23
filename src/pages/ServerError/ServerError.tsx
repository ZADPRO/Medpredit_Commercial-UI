import { IonContent, IonPage } from "@ionic/react";
import React from "react";

import Lottie from "lottie-react";

import noInternet from "../../assets/Animations/internalServerError.json";

const ServerError: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="flex animationLottie">
          <Lottie
            animationData={noInternet}
            loop={true}
            style={{ width: "70%", height: "70%" }}
          />{" "}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ServerError;
