import { useState } from 'react';
import { 
  IonContent, IonHeader, IonLabel, IonPage, IonSegment, 
  IonSegmentButton, IonToolbar, IonCard, IonCardContent 
} from '@ionic/react';

const NotificationSettings: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>("all");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSegment 
            value={selectedSegment} 
            onIonChange={(e) => setSelectedSegment(e.detail.value as string)} // ✅ Fix: Cast as string
          >
            <IonSegmentButton value="all">
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="report">
              <IonLabel>Report</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="plan">
              <IonLabel>Plan</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {selectedSegment === "all" && (
          <IonCard>
            <IonCardContent>
              <p>All notifications will be shown here.</p>
            </IonCardContent>
          </IonCard>
        )}
        {selectedSegment === "report" && (
          <IonCard>
            <IonCardContent>
              <p>Report-related notifications.</p>
            </IonCardContent>
          </IonCard>
        )}
        {selectedSegment === "plan" && (
          <IonCard>
            <IonCardContent>
              <p>Plan-related notifications.</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NotificationSettings;
