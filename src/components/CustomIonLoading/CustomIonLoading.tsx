import React, { useRef } from 'react';
import {
  createAnimation,
  IonSpinner,
  IonModal
} from '@ionic/react';

interface CustomIonLoadingProps {
  isOpen: boolean;
}

const CustomIonLoading: React.FC<CustomIonLoadingProps> = ({ isOpen }) => {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(1)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(300)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction('reverse');
  };
  return (
    <IonModal enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}showBackdrop={false} isOpen={isOpen} backdropDismiss={false} className="custom-loading-modal">
      <div className="loading-container">
        <IonSpinner name="crescent" />
      </div>
    </IonModal>
  );
};

export default CustomIonLoading;