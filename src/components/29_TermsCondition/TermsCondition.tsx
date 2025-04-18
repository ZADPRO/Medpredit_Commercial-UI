import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonContent,
  IonFooter,
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

  const { t, i18n } = useTranslation("global");

  const handleScroll = () => {
    if (contentRef.current) {
      const scrollElement = contentRef.current.getScrollElement();
      scrollElement.then(el => {
        if (el.scrollHeight - el.scrollTop === el.clientHeight) {
          setIsScrolled(true);
        }
      });
    }
  };


  const termsAndConditions = [
    {
      subtitle: t("terms.Introduction"),
      details: [
        {
          label: t("terms.Overview"),
          text: t("terms.OverviewAns"),
        },
        {
          label: t("terms.Agreement"),
          text: t("terms.AgreementAns"),
        },
      ],
    },
    {
      subtitle: t("terms.Acceptance of Terms"),
      details: [
        {
          label: t("terms.User Agreement"),
          text: t("terms.User AgreementAns"),
        },
      ],
    },
    {
      subtitle: t("terms.Services Provided"),
      details: [
        // {
        //   label: "Online Consultations",
        //   text: "Connect with licensed healthcare providers (doctors, therapists, specialists, etc.) for virtual consultations.",
        // },
        // {
        //   label: "Appointment Booking",
        //   text: "Schedule appointments with healthcare professionals and service providers.",
        // },
        {
          label: t("terms.Health Record Management"),
          text: t("terms.Health Record ManagementAns"),
        },
        {
          label: t("terms.Health Content and Tools"),
          text: t("terms.Health Content and ToolsAns"),
        },
        {
          label: t("terms.Document Management"),
          text: t("terms.Document ManagementAns"),
        }
      ],
    },
    {
      subtitle: t("terms.User Eligibility"),
      details: [
        {
          label: t("terms.Age Requirement"),
          text: t("terms.Age RequirementAns"),
        },
        {
          label: t("terms.Legal Capacity"),
          text: t("terms.Legal CapacityAns"),
        },
      ],
    },
    {
      subtitle: t("terms.Registration and Account"),
      details: [
        {
          label: t("terms.Account Creation"),
          text: t("terms.Account CreationAns")
        },
        {
          label: t("terms.Account Security"),
          text: t("terms.Account SecurityAns"),
        },
      ],
    },
    {
      subtitle: t("terms.Use of the App"),
      details: [
        { label: t("terms.Lawful Use"), text: t("terms.Use the App only for lawful purposes") },
        { label: t("terms.No Disruptions"), text: t("terms.Do not disrupt or interfere with the functioning of the App") },
        { label: t("terms.No Impersonation"), text: t("terms.Do not impersonate any individual or entity or misrepresent your affiliation with anyone") },
        { label: t("terms.No Harmful Content"), text: t("terms.Do not upload, post, or transmit harmful content, including but not limited to malware, viruses, or illegal material") },
      ],
    },
    {
      subtitle: t("terms.Healthcare Services"),
      details: [
        {
          label: t("terms.Service Disclaimer"),
          text: t("terms.Service DisclaimerAns")
        },
        {
          label: t("terms.Consultation Advice"),
          text: t("terms.Consultation AdviceAns")
        },
        {
          label: t("terms.Right to Refuse"),
          text: t("terms.Right to RefuseAns")
        },
      ],
    },
    {
      subtitle: t("terms.Prescriptions and Medications"),
      details: [
        {
          label: t("terms.Responsibility"),
          text: t("terms.ResponsibilityAns")
        },
      ],
    },
    {
      subtitle: t("terms.User Content"),
      details: [
        {
          label: t("terms.Data Submission"),
          text: t("terms.Data SubmissionAns")
        },
      ],
    },
    {
      subtitle: t("terms.Privacy and Data Protection"),
      details: [
        {
          label: t("terms.Privacy Policy"),
          text: t("terms.Privacy PolicyAns")
        },
      ],
    },
    {
      subtitle: t("terms.Fees and Payments"),
      details: [
        {
          label: t("terms.Service Fees"),
          text: t("terms.Service FeesAns")
        },
        {
          label: t("terms.Payment Authorization"),
          text: t("terms.Payment AuthorizationAns")
        },
      ],
    },
    {
      subtitle: t("terms.Third-Party Services"),
      details: [
        {
          label: t("terms.Third-Party Disclaimer"),
          text: t("terms.Third-Party DisclaimerAns")
        },
      ],
    },
  ];

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

      <IonContent className="ion-padding">
        <div>
          {termsAndConditions.map((section, index) => (
            <div key={index}>
              <h4>{section.subtitle}</h4>
              {section.details.map((item, i) => (
                <div key={i}>
                  <strong>{item.label}: </strong>
                  <span style={{ textAlign: "justify" }}>{item.text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </IonContent>

      {/* <IonFooter>
        <div className="ion-padding ion-text-center">
          <IonButton color="medium">Disagree</IonButton>
          <IonButton color="primary" disabled={!isScrolled}>
            Agree
          </IonButton>
        </div>
      </IonFooter> */}
    </IonPage>
  );
};

export default TermsCondition;
