import { 
  IonBackButton, 
  IonButton, 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonSearchbar, 
  IonLabel
} from "@ionic/react";
import React, { useState } from "react";
import { chevronBack, chevronDownOutline, chevronUpOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import "./HelpCenter.css";

const faqs = [
  { question: "What is Medpredit?", answer: "Medpredit is a medical service that..." },
  { question: "What is Medpredit?", answer: "Medpredit is a medical service that..." },
  { question: "What is Medpredit?", answer: "Medpredit is a medical service that..." },
  { question: "What is Medpredit?", answer: "Medpredit is a medical service that..." },
  { question: "What is Medpredit?", answer: "Medpredit is a medical service that..." },
  { question: "What is Medpredit?", answer: "Medpredit is a medical service that..." },
  
];

const HelpCenter: React.FC = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          </IonButtons>
          <IonTitle>Help Center</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* <h2 className="ion-text-center">We’re here to help you</h2>
        <p className="ion-text-center">Share your concern or check our FAQ below.</p>

    
        <IonSearchbar
          value={search}
          onIonInput={(e) => setSearch(e.detail.value!)}
          placeholder="Search help"
        ></IonSearchbar>

       
   <div style={{marginTop:"3%"}}>    <IonLabel> <strong>FAQ</strong></IonLabel></div>
        <div>
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question ion-padding"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <IonIcon icon={openIndex === index ? chevronUpOutline : chevronDownOutline} />
              </button>
              {openIndex === index && (
                <p className="faq-answer ion-padding">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

       
        <div className="ion-text-center ion-margin-top">
          <p>Still stuck? Help is a mail away</p>
          <IonButton expand="full" color="danger">Send a Message</IonButton>
        </div> */}
      </IonContent>
    </IonPage>
  );
};

export default HelpCenter;
