import {
  IonBackButton,
  IonButton,
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

  const privacyPolicySections = [
    {
      title: "1. " + t("privacy.Information We Collect"),
      content: [
        {
          subtitle: "A. " + t("privacy.Personal Information"),
          details: [
            "<b>" + t("privacy.Personal InformationAns11") + ":</b> " + t("privacy.Personal InformationAns12"),
            "<b>" + t("privacy.Personal InformationAns21") + ":</b> " + t("privacy.Personal InformationAns22"),
            "<b>" + t("privacy.Personal InformationAns31") + ":</b> " + t("privacy.Personal InformationAns32"),
          ],
        },
        {
          subtitle: "B. " + t("privacy.Health Information"),
          details: [
            "<b>" + t("privacy.Health InformationAns11") + ":</b> " + t("privacy.Health InformationAns12"),
            "<b>" + t("privacy.Health InformationAns21") + ":</b> " + t("privacy.Health InformationAns22"),
            "<b>" + t("privacy.Health InformationAns31") + ":</b> " + t("privacy.Health InformationAns32"),
          ],
        },
        {
          subtitle: "C. " + t("privacy.Usage Data"),
          details: [
            "<b>" + t("privacy.Usage DataAns11") + ":</b> " + t("privacy.Usage DataAns12"),
            "<b>" + t("privacy.Usage DataAns21") + ":</b> " + t("privacy.Usage DataAns22"),
          ],
        },
      ],
    },
    {
      title: "2. " + t("privacy.How We Use Your Information"),
      content: [
        "<b>" + t("privacy.How We Use Your InformationAns11") + ":</b> " + t("privacy.How We Use Your InformationAns12"),
        "<b>To" + t("privacy.How We Use Your InformationAns21") + ":</b> " + t("privacy.How We Use Your InformationAns22"),
        "<b>" + t("privacy.How We Use3 Your InformationAns1") + ":</b> " + t("privacy.How We Use Your InformationAns32"),
        "<b>" + t("privacy.How We Use Your InformationAns41") + ":</b> " + t("privacy.How We Use Your InformationAns42"),
        "<b>" + t("privacy.How We Use Your InformationAns51") + ":</b> " + t("privacy.How We Use Your InformationAns52"),
      ],
    },
    {
      title: "3. " + t("privacy.Sharing of Your Information"),
      content: [
        "<b>" + t("privacy.Sharing of Your InformationAns11") + ":</b> " + t("privacy.Sharing of Your InformationAns12"),
        "<b>" + t("privacy.Sharing of Your InformationAns21") + ":</b> " + t("privacy.Sharing of Your InformationAns22"),
        "<b>" + t("privacy.Sharing of Your InformationAns31") + ":</b> " + t("privacy.Sharing of Your InformationAns32"),
        "<b>" + t("privacy.Sharing of Your InformationAns41") + ":</b> " + t("privacy.Sharing of Your InformationAns42"),
      ],
    },
    {
      title: "4. " + t("privacy.Data Retention"),
      content: [
        "<b>" + t("privacy.Data RetentionAns11") + ":</b> " + t("privacy.Data RetentionAns12"),
      ],
    },
    {
      title: "5. " + t("privacy.Data Security"),
      content: [
        "<b>" + t("privacy.Data SecurityAns11") + ":</b> " + t("privacy.Data SecurityAns12"),
        "<b>" + t("privacy.Data SecurityAns21") + ":</b> " + t("privacy.Data SecurityAns22"),
      ],
    },
    {
      title: "6. " + t("privacy.Your Rights and Choices"),
      content: [
        "<b>" + t("privacy.Your Rights and ChoicesAns11") + ":</b> " + t("privacy.Your Rights and ChoicesAns12"),
        "<b>" + t("privacy.Your Rights and ChoicesAns21") + ":</b> " + t("privacy.Your Rights and ChoicesAns22"),
        "<b>" + t("privacy.Your Rights and ChoicesAns31") + ":</b> " + t("privacy.Your Rights and ChoicesAns32"),
        "<b>" + t("privacy.Your Rights and ChoicesAns41") + ":</b> " + t("privacy.Your Rights and ChoicesAns42"),
        "<b>" + t("privacy.Your Rights and ChoicesAns51") + ":</b> " + t("privacy.Your Rights and ChoicesAns52"),
        "<b>" + t("privacy.Your Rights and ChoicesAns61") + ":</b> " + t("privacy.Your Rights and ChoicesAns62")
      ],
    },
    {
      title: "7. " + t("privacy.International Transfers"),
      content: [
        "<b>" + t("privacy.International TransfersAns11") + ":</b> " + t("privacy.International TransfersAns12"),
        "<b>" + t("privacy.International TransfersAns21") + ":</b> " + t("privacy.International TransfersAns22")
      ],
    },
    {
      title: "8. " + t("privacy.Children's Privacy"),
      content: [
        "<b>" + t("privacy.Children's PrivacyAns11") + ":</b> " + t("privacy.Children's PrivacyAns12"),
        "<b>" + t("privacy.Children's PrivacyAns21") + ":</b> " + t("privacy.Children's PrivacyAns22")
      ],
    },
    {
      title: "9. " + t("privacy.Changes to This Privacy Policy"),
      content: [
        "<b>" + t("privacy.Changes to This Privacy PolicyAns11") + ":</b> " + t("privacy.Changes to This Privacy PolicyAns12"),
        "<b>" + t("privacy.Changes to This Privacy PolicyAns21") + ":</b> " + t("privacy.Changes to This Privacy PolicyAns22"),
        "<b>" + t("privacy.Changes to This Privacy PolicyAns31") + ":</b> " + t("privacy.Changes to This Privacy PolicyAns32")
      ],
    }
  ];

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
          <h3>{t("privacy.Medpredit Privacy Policy")}</h3>
          <p>
            {t("privacy.content")}
          </p>

          {privacyPolicySections.map((item, index) => (
            <div key={index}>
              <h4>{item.title}</h4>
              {item.content.map((contentItem, i) =>
                typeof contentItem === "string" ? (
                  <p style={{ paddingLeft: "1rem" }} key={i} dangerouslySetInnerHTML={{ __html: contentItem }} />
                ) : (
                  <div key={i}>
                    <h5>{contentItem.subtitle}</h5>
                    <ul>
                      {contentItem.details.map((detail, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: detail }} />
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PrivacyPolicy;
