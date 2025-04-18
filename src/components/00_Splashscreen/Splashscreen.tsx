import React, { useEffect } from "react";
import "./Splashscreen.css";
import { useHistory } from "react-router-dom";
import { IonContent, IonPage } from "@ionic/react";
const Splashscreen: React.FC = () => {

  const history = useHistory();

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
          history.replace(localStorage.getItem("refLanCode") ? "/login" : "/chooselanguage", {
            direction: "forward",
            animation: "slide",
          });
        }
      }
      else {
        history.replace(localStorage.getItem("refLanCode") ? "/login" : "/chooselanguage", {
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
          <div className="logoImage ">
            {/* <img src={logo} alt="Medpredit Logo" className="logo" /> */}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splashscreen;
