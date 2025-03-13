import { 
    IonBackButton, 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonPage, 
    IonTitle, 
    IonToolbar 
  } from "@ionic/react";
  import React from "react";
  
  const About: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>About</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className="ion-padding">
          <IonList>
            <IonItem routerLink="/termsofservice"  button>
              <IonLabel>Terms of Service</IonLabel>
            </IonItem>
  
            <IonItem >
              <IonLabel>
                <p>App version</p>
                <h3>v18.7.9 Live</h3>
              </IonLabel>
            </IonItem>
  
            <IonItem routerLink="/opensource" button>
              <IonLabel>Open Source Libraries</IonLabel>
            </IonItem>
  
            <IonItem routerLink="/landr" button>
              <IonLabel>Licenses and Registrations</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default About;
  