import { IonToast } from "@ionic/react";
import { close } from "ionicons/icons";

interface ToastProps {
  isOpen: boolean;
  message: string;
  textColor?: string;
  position?: "bottom" | "top" | "middle";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ isOpen, message, position = "bottom", textColor = "black", onClose }) => {
  return (
    <IonToast
      style={{ "--color": textColor, fontWeight: "bold" }}
      position={position}
      isOpen={isOpen}
      onDidDismiss={onClose}
      message={message}
      duration={3000}
      buttons={[
        {
          role: 'cancel',
          icon: close,
        },
      ]}
    />
  );
};

export default Toast;
