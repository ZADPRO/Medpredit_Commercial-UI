import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation("global");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>{t("privacy.Privacy Policy")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
          <h4>{t("privacy.Introduction")}</h4>
          <p>{t("privacy.IntroductionDesc1")}</p>
          <p>{t("privacy.IntroductionDesc2")}</p>

          <h4>{t("privacy.Information We Collect")}</h4>
          <div style={{paddingLeft: "1rem"}}>
          <p><b>{t("privacy.Personal Information")}:</b></p>
          <ul>
            <li>{t("privacy.Name")}</li>
            <li>{t("privacy.Email address")}</li>
            <li>{t("privacy.Contact details")}</li>
            <li>{t("privacy.Date of Birth")}</li>
            <li>{t("privacy.Marital Status")}</li>
            <li>{t("privacy.Occupation")}</li>
            <li>{t("privacy.Career details")}</li>
          </ul>
          <p><b>{t("privacy.Health-Related Information")}:</b></p>
          <ul>
            <li>{t("privacy.Self-reported symptoms")}</li>
            <li>{t("privacy.Physical and mental health data")}</li>
            <li>{t("privacy.Lifestyle-related data")}</li>
            <li>{t("privacy.Family medical history")}</li>
          </ul>
          <p><b>{t("privacy.Device & Usage Data")}:</b></p>
          <ul>
            <li>{t("privacy.Mobile number")}</li>
          </ul>
          </div>
          <h4>{t("privacy.How We Use Your Information")}</h4>
          <ul>
            <li>{t("privacy.Use 1")}</li>
            <li>{t("privacy.Use 2")}</li>
          </ul>

          <h4>{t("privacy.Data Sharing & Disclosure")}</h4>
          <p>{t("privacy.DisclosureDesc")}</p>
          <ul>
            <li>{t("privacy.With providers")}</li>
            <li>{t("privacy.With authorities")}</li>
          </ul>
          <p>{t("privacy.Confidentiality")}</p>

          <h4>{t("privacy.Data Security")}</h4>
          <p>{t("privacy.SecurityDesc")}</p>
          <ul>
            <li>{t("privacy.SSL-secured communication")}</li>
            <li>{t("privacy.256-bit encryption")}</li>
            <li>{t("privacy.Strict access controls")}</li>
          </ul>
          <p>{t("privacy.No system secure")}</p>

          <h4>{t("privacy.Your Rights")}</h4>
          <ul>
            <li>{t("privacy.Access or update")}</li>
            <li>{t("privacy.Delete account")}</li>
            <li>{t("privacy.Request data")}</li>
          </ul>
          <p>{t("privacy.Contact to exercise rights")} <u style={{ color: "blue" }}>{t("privacy.Email")}</u></p>

          <h4>{t("privacy.Third-Party Links")}</h4>
          <p>{t("privacy.Third-party disclaimer")}</p>

          <h4>{t("privacy.Changes to Policy")}</h4>
          <p>{t("privacy.Policy updates")}</p>

          <h4>{t("privacy.Contact Us")}</h4>
          <p>{t("privacy.Contact info")}</p>
          <p>{t("privacy.Email label")} <u style={{ color: "blue" }}>{t("privacy.Email")}</u></p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PrivacyPolicy;
