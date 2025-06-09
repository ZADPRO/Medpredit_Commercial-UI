import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {


  const { t, i18n } = useTranslation("global");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>{t("about.About")}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {/* <IonItem
          routerLink="/termsandprivacy" button
          >
            <IonLabel>{t("about.Terms of Service")}</IonLabel>
          </IonItem> */}

          <IonItem>
            <IonLabel>
              <p>{t("about.App version")}</p>
              <h3>v1.0.0 {t("about.Live")}</h3>
            </IonLabel>
          </IonItem>

          {/* <IonItem
          routerLink="/opensource" button
          >
            <IonLabel>{t("about.Open Source Libraries")}</IonLabel>
          </IonItem> */}

          {/* <IonItem
          routerLink="/landr" button
          >
            <IonLabel>{t("about.Licenses and Registrations")}</IonLabel>
          </IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default About;
