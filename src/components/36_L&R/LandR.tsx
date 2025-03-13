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
const LandR: React.FC = () => {
    return (
        <>
          <IonPage>
                        <  IonHeader>
                            <IonToolbar>
                                <IonButtons slot="start">
                                    <IonBackButton defaultHref="/home" />
                                </IonButtons>
                                <IonTitle>Licenses and Registrations</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent className="ion-padding">
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, illo delectus repellendus ducimus, nostrum dolorum eius ullam ab necessitatibus quasi eaque quia vel corporis nesciunt quas. Architecto, magnam. Placeat, aliquam?
                            </div>
                        </IonContent>
                    </IonPage>
        </>
    );
};

export default LandR;