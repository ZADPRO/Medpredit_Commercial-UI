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

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Terms and Conditions</IonTitle>
        </IonToolbar>
      </IonHeader>


      <IonContent className="ion-padding" ref={contentRef} onIonScroll={handleScroll} scrollEvents={true}>
        <div style={{ height: "100%", overflowY: "auto", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <h3>1. Acceptance of Terms</h3>
          <p>By using this website or service, you agree to comply with and be bound by these terms and conditions...</p>
          <h3>2. Use of the Service</h3>
          <p>You agree to use this website or service only for lawful purposes...</p>
          <h3>3. User Account</h3>
          <p>Some features may require you to create an account...</p>
          <h3>4. Privacy Policy</h3>
          <p>Your use of this website or service is governed by our Privacy Policy...</p>
        </div>
      </IonContent>


      <IonFooter>

        <div className="ion-padding ion-text-center">
          <IonButton color="medium">Disagree</IonButton>
          <IonButton color="primary" disabled={!isScrolled}>Agree</IonButton>
        </div>

      </IonFooter>
    </IonPage>
  );
};

export default TermsCondition;
