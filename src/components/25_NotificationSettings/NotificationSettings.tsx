import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useTranslation } from "react-i18next";

const NotificationSettings: React.FC = () => {
  const { t, i18n } = useTranslation("global");
  const [selectedSegment, setSelectedSegment] = useState<string>("all");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>{t("notificationSettings.Notification Settings")}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonSegment
          value={selectedSegment}
          onIonChange={(e) => setSelectedSegment(e.detail.value as string)} // ✅ Fix: Cast as string
        >
          <IonSegmentButton value="all">
            <IonLabel>{t("notificationSettings.All")}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="report">
            <IonLabel>{t("notificationSettings.Report")}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="plan">
            <IonLabel>{t("notificationSettings.Plan")}</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {selectedSegment === "all" && (
          <IonCard>
            <IonCardContent>
              <p>{t("notificationSettings.All notifications will be shown here")}.</p>
            </IonCardContent>
          </IonCard>
        )}
        {selectedSegment === "report" && (
          <IonCard>
            <IonCardContent>
              <p>{t("notificationSettings.Report-related notifications")}.</p>
            </IonCardContent>
          </IonCard>
        )}
        {selectedSegment === "plan" && (
          <IonCard>
            <IonCardContent>
              <p>{t("notificationSettings.Plan-related notifications")}.</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NotificationSettings;
