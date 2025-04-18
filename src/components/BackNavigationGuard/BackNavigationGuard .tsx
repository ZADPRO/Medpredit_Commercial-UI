import { useState, useEffect } from 'react';
import { useHistory, useLocation, Prompt } from 'react-router-dom';
import { IonAlert } from '@ionic/react';
import { App as CapacitorApp } from '@capacitor/app';

const BackNavigationGuard = ({ when }: { when: boolean }) => {
  const history = useHistory();
  const location = useLocation();

  const [showAlert, setShowAlert] = useState(false);
  const [nextLocation, setNextLocation] = useState<string | null>(null);
  const [isHardwareBack, setIsHardwareBack] = useState(false);

  // Handle hardware back button
  useEffect(() => {
    let removeListener: (() => void) | undefined;

    CapacitorApp.addListener('backButton', () => {
      if (when) {
        setIsHardwareBack(true);
        setShowAlert(true);
      } else {
        history.goBack();
      }
    }).then(listener => {
      removeListener = listener.remove;
    });

    return () => {
      if (removeListener) removeListener();
    };
  }, [when, history]);

  // Called when user tries in-app navigation
  const handlePrompt = (location: any) => {
    if (when) {
      setNextLocation(location.pathname);
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const handleLeave = () => {
    setShowAlert(false);

    if (isHardwareBack) {
      history.goBack();
    } else if (nextLocation && nextLocation !== location.pathname) {
      history.push(nextLocation);
    }

    setNextLocation(null);
    setIsHardwareBack(false);
  };

  return (
    <>
      <IonAlert
        isOpen={showAlert}
        header="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to leave?"
        buttons={[
          {
            text: 'Cancel',
            handler: () => {
              setShowAlert(false);
              setIsHardwareBack(false);
              setNextLocation(null);
            },
          },
          {
            text: 'Leave',
            handler: handleLeave,
          },
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />

      <Prompt when={when} message={handlePrompt} />
    </>
  );
};

export default BackNavigationGuard;
