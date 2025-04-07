import { IonModal, IonSpinner } from "@ionic/react";

interface CustomIonLoadingProps {
  isOpen: boolean;
}

const CustomIonLoading: React.FC<CustomIonLoadingProps> = ({ isOpen }) => {
  return (
    <IonModal isOpen={isOpen} backdropDismiss={false} className="custom-loading-modal">
      <div className="loading-container">
        <IonSpinner name="crescent" />
      </div>
    </IonModal>
  );
};

export default CustomIonLoading;