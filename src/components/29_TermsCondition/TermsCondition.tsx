import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const TermsCondition: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const { t } = useTranslation("global");

  const handleScroll = () => {
    if (contentRef.current) {
      contentRef.current.getScrollElement().then((el) => {
        if (el.scrollHeight - el.scrollTop === el.clientHeight) {
          setIsScrolled(true);
        }
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          </IonButtons>
          <IonTitle>{t("terms.Terms and Conditions")}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className="ion-padding"
        ref={contentRef}
        onIonScroll={handleScroll}
      >
        <div>
          <h4>{t("terms.Introduction")}</h4>
          <p>{t("terms.IntroductionAns")}</p>

          <h4>{t("terms.Acceptance of Terms")}</h4>
          <p>{t("terms.Acceptance of Terms Ans")}</p>

          <h4>{t("terms.Services Provided")}</h4>
          <p>{t("terms.Services Provided Ans 1")}</p>
          <p>
            <b>{t("terms.Please Note")}: </b>
            {t("terms.Services Provided Ans 2")}
          </p>

          <h4>{t("terms.Registration and Account")}</h4>
          <p>{t("terms.Registration and Account Ans")}</p>

          <h4>{t("terms.Subscription and Payments")}</h4>
          <ul>
            <li>{t("terms.Subscription and Payments Ans 1")}</li>
            <li>{t("terms.Subscription and Payments Ans 2")}</li>
            <li>{t("terms.Subscription and Payments Ans 3")}</li>
            <li>{t("terms.Subscription and Payments Ans 4")}</li>
            <li>{t("terms.Subscription and Payments Ans 5")}</li>
          </ul>

          <h4>{t("terms.Privacy and Data")}</h4>
          <p>{t("terms.Privacy and Data Ans")}</p>

          <h4>{t("terms.User Conduct")}</h4>
          <p>{t("terms.User Conduct Ans")}</p>
          <ul>
            <li>{t("terms.User Conduct Point 1")}</li>
            <li>{t("terms.User Conduct Point 2")}</li>
            <li>{t("terms.User Conduct Point 3")}</li>
          </ul>

          <h4>{t("terms.Disclaimers")}</h4>
          <ul>
            <li>{t("terms.Disclaimer Point 1")}</li>
            <li>{t("terms.Disclaimer Point 2")}</li>
            <li>{t("terms.Disclaimer Point 3")}</li>
          </ul>

          <h4>{t("terms.Intellectual Property")}</h4>
          <p>{t("terms.Intellectual Property Ans")}</p>

          <h4>{t("terms.Contact Us")}</h4>
          <p>{t("terms.Contact Us Ans")}</p>
          <p>{t("terms.Contact Email")} <u style={{ color: "blue" }}>{t("terms.Medpredit Email")}</u></p>

          <h4>{t("terms.Refund Policy")}</h4>
          <ul>
            <li>{t("terms.Refund Policy Ans 1")}</li>
            <li>{t("terms.Refund Policy Ans 2")}</li>
            <li>{t("terms.Refund Policy Ans 3")}</li>
          </ul>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TermsCondition;
