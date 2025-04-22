import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { Divider } from "primereact/divider";
import React from "react";
import { useTranslation } from "react-i18next";

const TermsAndPrivacy: React.FC = () => {
    const { t, i18n } = useTranslation("global");
  
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
    <IonPage className="cus-ion-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/login" icon={chevronBack} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div>
          <h4>Terms and Conditons</h4>
          {termsAndConditions.map((section, index) => (
            <div key={index}>
              <h4>{section.subtitle}</h4>
              {section.details.map((item, i) => (
                <div key={i}>
                  <strong>{item.label}: </strong>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
          <Divider/>
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
                  <p
                    style={{ paddingLeft: "1rem" }}
                    key={i}
                    dangerouslySetInnerHTML={{ __html: contentItem }}
                  />
                ) : (
                  <div key={i}>
                    <h5>{contentItem.subtitle}</h5>
                    <ul>
                      {contentItem.details.map((detail, j) => (
                        <li
                          key={j}
                          dangerouslySetInnerHTML={{ __html: detail }}
                        />
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

export default TermsAndPrivacy;
