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

const TermsCondition: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const contentRef = useRef<HTMLIonContentElement | null>(null);


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
      subtitle: "1. Introduction",
      details: [
        {
          label: "Overview",
          text: "Welcome to Medpredit! These Terms and Conditions ('Terms') govern your use of the Medpredit mobile application ('App'), operated by Medpredit Technologies ('we,' 'our,' 'us'). Medpredit provides healthcare-related services, including online consultations, appointment scheduling, prescription management, health tracking, and more.",
        },
        {
          label: "Agreement",
          text: "By accessing or using the App, you agree to comply with these Terms and Conditions. If you do not agree to these Terms, you must immediately stop using the App.",
        },
      ],
    },
    {
      subtitle: "2. Acceptance of Terms",
      details: [
        {
          label: "User Agreement",
          text: "By using Medpredit, you confirm that you accept and agree to these Terms. If you do not agree with these Terms, you should not use the App.",
        },
      ],
    },
    {
      subtitle: "3. Services Provided",
      details: [
        {
          label: "Online Consultations",
          text: "Connect with licensed healthcare providers (doctors, therapists, specialists, etc.) for virtual consultations.",
        },
        {
          label: "Appointment Booking",
          text: "Schedule appointments with healthcare professionals and service providers.",
        },
        {
          label: "Prescription Management",
          text: "Manage and track your prescriptions.",
        },
        {
          label: "Health Record Management",
          text: "Store, access, and share your medical records securely.",
        },
        {
          label: "Health Content and Tools",
          text: "Access health-related articles, blogs, and tools to help monitor your well-being.",
        },
      ],
    },
    {
      subtitle: "4. User Eligibility",
      details: [
        {
          label: "Age Requirement",
          text: "You must be at least 18 years old, or have the consent of a parent or guardian if you are under 18.",
        },
        {
          label: "Legal Capacity",
          text: "You must have the legal capacity to enter into a binding agreement.",
        },
      ],
    },
    {
      subtitle: "5. Registration and Account",
      details: [
        {
          label: "Account Creation",
          text: "To access certain services, you will need to create an account with Medpredit. You must provide accurate and complete information during registration and keep your account details up-to-date.",
        },
        {
          label: "Account Security",
          text: "You are responsible for maintaining the confidentiality of your account credentials and all activities conducted under your account.",
        },
      ],
    },
    {
      subtitle: "6. Use of the App",
      details: [
        { label: "Lawful Use", text: "Use the App only for lawful purposes." },
        { label: "No Disruptions", text: "Do not disrupt or interfere with the functioning of the App." },
        { label: "No Impersonation", text: "Do not impersonate any individual or entity or misrepresent your affiliation with anyone." },
        { label: "No Harmful Content", text: "Do not upload, post, or transmit harmful content, including but not limited to malware, viruses, or illegal material." },
      ],
    },
    {
      subtitle: "7. Healthcare Services",
      details: [
        {
          label: "Service Disclaimer",
          text: "The healthcare services provided through the App are not a substitute for in-person medical care.",
        },
        {
          label: "Consultation Advice",
          text: "You should always consult with a physician or other qualified healthcare provider before making any medical decisions.",
        },
        {
          label: "Right to Refuse",
          text: "Healthcare providers have the right to refuse service if they believe it is not in the patient’s best interest.",
        },
      ],
    },
    {
      subtitle: "8. Prescriptions and Medications",
      details: [
        {
          label: "Responsibility",
          text: "It is your responsibility to ensure that prescriptions are filled at licensed pharmacies and follow the instructions provided by the healthcare provider. Medpredit is not responsible for any errors or issues related to prescriptions or medications.",
        },
      ],
    },
    {
      subtitle: "9. User Content",
      details: [
        {
          label: "Data Submission",
          text: "By submitting health-related information, including medical records, health data, or communications to healthcare providers, you grant Medpredit a non-exclusive, worldwide license to use, process, and display this information for the purpose of delivering services through the App.",
        },
      ],
    },
    {
      subtitle: "10. Privacy and Data Protection",
      details: [
        {
          label: "Privacy Policy",
          text: "Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect, use, and protect your personal and medical data. By using Medpredit, you consent to the collection and use of your information as described in the Privacy Policy.",
        },
      ],
    },
    {
      subtitle: "11. Fees and Payments",
      details: [
        {
          label: "Service Fees",
          text: "Certain services on Medpredit may require payment. You agree to pay any applicable fees for services provided through the App, such as consultation fees, prescription charges, or appointment fees.",
        },
        {
          label: "Payment Authorization",
          text: "Payments are processed securely, and you authorize Medpredit to charge your payment method accordingly.",
        },
      ],
    },
    {
      subtitle: "12. Third-Party Services",
      details: [
        {
          label: "Third-Party Disclaimer",
          text: "Medpredit may link to third-party websites or services not operated by us. We are not responsible for the content, privacy policies, or practices of third-party services. You access these services at your own risk.",
        },
      ],
    },
  ];
  
  return (
    <IonPage className="cus-ion-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          </IonButtons>
          <IonTitle>Terms and Conditions</IonTitle>
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
                  <span>{item.text}</span>
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
