import { IonToast } from "@ionic/react";
import { close } from "ionicons/icons";

interface ToastProps {
  isOpen: boolean;
  message: string;
  textColor?: string;
  position?: "bottom" | "top" | "middle";
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ isOpen, message, position = "bottom", duration = 3000 , textColor = "black", onClose }) => {
  return (
    <IonToast
      style={{ "--color": textColor, fontWeight: "bold" }}
      position={position}
      isOpen={isOpen}
      onDidDismiss={onClose}
      message={message}
      duration={duration}
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
