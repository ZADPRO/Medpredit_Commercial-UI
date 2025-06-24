import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const appVersion = "1.0.0"; // You can dynamically fetch this if needed
  const { t } = useTranslation("global");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>{t("about.About Us")}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          {/* App Name & Tagline */}
          <IonRow className="ion-text-center ion-margin-bottom">
            <IonCol>
              <h2>Medpredit</h2>
              <IonText color="medium">
                <p>{t("about.Your Partner in Personalized Health & Wellness")}</p>
              </IonText>
            </IonCol>
          </IonRow>

          {/* App Version */}
          <IonRow>
            <IonCol>
              <IonLabel className="about-label">{t("about.App Version")}</IonLabel>
              <IonText color="dark">
                <p>{appVersion}</p>
              </IonText>
            </IonCol>
          </IonRow>

          {/* Developed By */}
          <IonRow>
            <IonCol>
              <IonLabel className="about-label">{t("about.Developed By")}</IonLabel>
              <IonText color="dark">
                <p>Zadroit IT Solutions</p>
              </IonText>
            </IonCol>
          </IonRow>

          {/* Description */}
          <IonRow>
            <IonCol>
              <IonLabel className="about-label">{t("about.About")}</IonLabel>
              <IonText color="medium">
                <p>
                  {t("about.About Description")}
                </p>
              </IonText>
            </IonCol>
          </IonRow>

          {/* Contact Information */}
          <IonRow>
            <IonCol>
              <IonLabel className="about-label">{t("about.Contact Us")}</IonLabel>
              <IonText color="primary">
                <p>support@medpredit.com</p>
              </IonText>
            </IonCol>
          </IonRow>

          {/* Copyright */}
          <IonRow className="ion-margin-top">
            <IonCol className="ion-text-center">
              <IonText color="medium">
                <p>
                  &copy; {new Date().getFullYear()} {t("about.Medpredit. All rights reserved.")}
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default About;
