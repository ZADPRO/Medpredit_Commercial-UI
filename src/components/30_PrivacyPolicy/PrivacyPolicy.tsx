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

const PrivacyPolicy: React.FC = () => {
  const privacyPolicySections = [
    {
      title: "1. Information We Collect",
      content: [
        {
          subtitle: "A. Personal Information",
          details: [
            "<b>Account Information:</b> When you register for the App, we collect your name, email address, phone number, and other contact details.",
            "<b>Payment Information:</b> We may collect payment details when you make transactions through the App, such as credit card information, billing address, and payment method information (processed securely through third-party payment providers).",
            "<b>Profile Information:</b> We may collect information about your health preferences, medical history, allergies, current medications, and other details you provide to create your medical profile on the App.",
          ],
        },
        {
          subtitle: "B. Health Information",
          details: [
            "<b>Health Records:</b> When you use the App to track your health data, such as symptoms, diagnoses, treatments, and test results, we may collect and store that information.",
            "<b>Consultation Data:</b> If you consult a healthcare provider through the App, we may collect the details of the consultation, including medical advice, prescriptions, and any related documents.",
            "<b>Medical Devices Data:</b> If you connect your medical devices or wearables to the App, we may collect data related to your health and fitness metrics (e.g., heart rate, blood pressure, sleep patterns).",
          ],
        },
        {
          subtitle: "C. Usage Data",
          details: [
            "<b>App Activity:</b> We may collect information about how you interact with the App, including your IP address, device type, browser type, operating system, and activity within the App (e.g., pages viewed, features accessed).",
            "<b>Cookies and Tracking Technologies:</b> We use cookies and similar technologies to collect information about how you use the App, personalize your experience, and track performance. You can control cookie preferences through your device settings.",
          ],
        },
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "<b>To Provide Healthcare Services:</b> To facilitate online consultations, medical advice, appointment scheduling, prescription management, and tracking of your health data.",
        "<b>To Improve Our Services:</b> To enhance the functionality and user experience of the App, analyze usage patterns, and identify areas for improvement.",
        "<b>To Communicate with You:</b> To send notifications, updates, reminders, and other communications related to your use of the App, including reminders for appointments, health alerts, and new features.",
        "<b>For Legal Compliance:</b> To comply with applicable laws and regulations, including medical records retention, reporting obligations, and responding to legal requests.",
        "<b>To Process Payments:</b> To manage transactions, billing, and payment processing for services provided through the App.",
      ],
    },
    {
      title: "3. Sharing of Your Information",
      content: [
        "<b>Healthcare Providers:</b> We share your health information with the healthcare providers you engage with through the App, including doctors, specialists, and other medical professionals, to provide the necessary medical advice and services.",
        "<b>Service Providers:</b> We may share your information with third-party service providers who help us operate the App, process payments, manage data storage, and perform other functions on our behalf. These providers are contractually obligated to protect your information.",
        "<b>Legal Requirements:</b> We may disclose your information when required by law, such as in response to subpoenas, court orders, or government regulations, or to protect the rights, property, or safety of Medpredit, its users, or others.",
        "<b>Business Transfers:</b> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.",
      ],
    },
    {
      title: "4. Data Retention",
      content: [
        "<b>Retention Period:</b> We will retain your personal and health information for as long as necessary to provide the services you request, comply with our legal obligations, resolve disputes, and enforce our agreements. After that period, your information will be securely deleted or anonymized, in accordance with applicable data retention policies.",
      ],
    },
    {
      title: "5. Data Security",
      content: [
        "<b>Security Measures:</b> We implement a range of security measures to protect your personal and health information, including encryption, access controls, and secure servers.",
        "<b>Data Transmission Risk:</b> However, no method of data transmission over the internet or electronic storage is completely secure, and we cannot guarantee the absolute security of your data.",
      ],
    },
      {
        title: "6. Your Rights and Choices",
        content: [
          "<b>Access:</b> You can request a copy of the personal information we hold about you.",
          "<b>Correction:</b> You can update or correct your information if it is inaccurate or incomplete.",
          "<b>Deletion:</b> You can request that we delete your personal and health information, subject to applicable legal and regulatory requirements.",
          "<b>Data Portability:</b> You may request that we provide your data in a portable, machine-readable format.",
          "<b>Withdraw Consent:</b> If we are processing your data based on your consent, you can withdraw consent at any time.",
          "<b>Opt-Out of Marketing Communications:</b> You can opt out of receiving marketing emails and notifications from us by following the instructions in the communication or adjusting your preferences in the App."
        ],
      },
      {
        title: "7. International Transfers",
        content: [
          "<b>Cross-Border Data Processing:</b> Your personal information may be transferred to and processed in countries other than the country in which you reside.",
          "<b>Data Protection Measures:</b> These countries may have different data protection laws, but we take appropriate steps to ensure that your personal data is handled securely and in accordance with this Privacy Policy."
        ],
      },
      {
        title: "8. Children's Privacy",
        content: [
          "<b>Age Restriction:</b> Medpredit is not intended for use by children under the age of 18, and we do not knowingly collect personal information from children.",
          "<b>Parental Action:</b> If you are a parent or guardian and believe that we have collected information about your child, please contact us, and we will take steps to delete such information."
        ],
      },
      {
        title: "9. Changes to This Privacy Policy",
        content: [
          "<b>Policy Updates:</b> We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal obligations.",
          "<b>Notification of Changes:</b> When we make changes, we will post the updated policy on this page and update the 'Last updated' date at the top of this document.",
          "<b>User Responsibility:</b> Please review this Privacy Policy periodically to stay informed of any changes."
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
          <IonTitle>Privacy Policy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
          <h3>Medpredit Privacy Policy</h3>
          <p>
            Medpredit Technologies ("Medpredit," "we," "our," or "us") is
            committed to protecting your privacy and ensuring that your personal
            information is handled in a safe and responsible manner. This
            Privacy Policy outlines how we collect, use, disclose, and safeguard
            your information when you use the Medpredit mobile application
            ("App") and its associated services. By using the App, you consent
            to the collection and use of your personal data as described in this
            Privacy Policy.
          </p>

          {privacyPolicySections.map((item, index) => (
        <div key={index}>
          <h4>{item.title}</h4>
          {item.content.map((contentItem, i) =>
            typeof contentItem === "string" ? (
              <p style={{paddingLeft: "1rem"}} key={i} dangerouslySetInnerHTML={{ __html: contentItem }} />
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
