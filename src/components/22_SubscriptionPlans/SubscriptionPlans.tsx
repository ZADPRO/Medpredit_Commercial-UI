import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonFooter, 
  IonButton, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import React from 'react';
import "./SubscriptionPlans.css"

const plans = [
  {
    title: "Basic Plan",
    features: ["✔ 2 Family Members", "✔ 2 Family Members"],
    price: "Rs.400/month",
    color: "primary",
  },
  {
    title: "Intro Plan",
    features: [
      "✔ Everything in Basic",
      "✔ 4 Family Members",
      "✔ 4 Family Members",
    ],
    price: "Rs.600/month",
    color: "secondary",
  },
  {
    title: "Pro Plan",
    features: [
      "✔ Everything in Intro",
      "✔ 6 Family Members",
      "✔ 6 Family Members",
    ],
    price: "Rs.800/month",
    color: "tertiary",
  },
];

const SubscriptionPlans: React.FC = () => {
    return (
      <IonPage className='cus-ion-page'>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
            </IonButtons>
            <IonTitle>Manage Subscription</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <h2>Choose Your Plan</h2>
          <p style={{margin: "0"}}>Select a subscription plan that suits your needs.</p>

          {plans.map((plan, index) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardTitle>{plan.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className='subscribe-card-content'>
                {plan.features.map((feature, idx) => (
                  <p style={{padding: "0.2rem 0.5rem"}} key={idx}>{feature}</p>
                ))}
                <p style={{padding: "0.5rem 0", fontSize: "1rem", fontWeight: "bold"}}>{plan.price}</p>
                <button className="medCustom-button02">
                  Subscribe
                </button>
              </IonCardContent>
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    );
};

export default SubscriptionPlans;
