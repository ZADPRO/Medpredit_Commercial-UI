import { IonPage } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';

const NotificationSettings: React.FC = () => {
    const history = useHistory();
    return (
        <IonPage>
            <span>NotificationSettings</span>
        </IonPage>
    );
};

export default NotificationSettings;