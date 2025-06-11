import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";

const MRPdfUpload: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              mode="md"
              defaultHref="/profile"
              icon={chevronBack}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>PDF Records</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default MRPdfUpload;
