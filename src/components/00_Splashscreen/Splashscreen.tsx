import React, { useEffect } from "react";
import "./Splashscreen.css";
import { useHistory } from "react-router-dom";
import { IonContent, IonPage } from "@ionic/react";
import { useTranslation } from "react-i18next";
const Splashscreen: React.FC = () => {

  const history = useHistory();
  const { t } = useTranslation("global");

  useEffect(() => {
    const timer = setTimeout(() => {
      const tokenString = localStorage.getItem("userDetails");

      if (tokenString) {
        const tokenObject = JSON.parse(tokenString);
        const userId = tokenObject.userId;
        const flag = localStorage.getItem("detailsFlag");

        if (userId !== null) {
          if (flag == "true") {
            history.replace("/userProfile", {
              direction: "forward",
              animation: "slide",
            });
          } else {
            history.replace("/home", {
              direction: "forward",
              animation: "slide",
            });
          }
        }
        else {
          history.replace("/chooselanguage", {
            direction: "forward",
            animation: "slide",
          });
        }
      }
      else {
        history.replace("/chooselanguage", {
          direction: "forward",
          animation: "slide",
        });
      }
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timeout
  }, [history]);

  return (
    <IonPage>
      <IonContent>
        <div className="bg-container">
          {/* <div className="logoImage ">
            {/* <img src={logo} alt="Medpredit Logo" className="logo" /> */}
          {/*} </div> */}
          <div className="splashScreen-oneLiner">
      <span
        data-text={t("splashScreen.Predict")}
        style={{ "--delay": "0.2s" } as React.CSSProperties}
      >
        {t("splashScreen.Predict")}
      </span>
      <span
        data-text="•"
        style={{ "--delay": "0.2s" } as React.CSSProperties}
        className="dot"
      >
        •
      </span>
      <span
        data-text={t("splashScreen.Prevent")}
        style={{ "--delay": "0.4s" } as React.CSSProperties}
      >
        {t("splashScreen.Prevent")}
      </span>
      <span
        data-text="•"
        style={{ "--delay": "0.2s" } as React.CSSProperties}
        className="dot"
      >
        •
      </span>
      <span
        data-text={t("splashScreen.Progress")}
        style={{ "--delay": "0.6s" } as React.CSSProperties}
      >
        {t("splashScreen.Progress")}
      </span>
    </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splashscreen;
