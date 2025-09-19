import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import "./TutorialCarousel.css";

import tutorial1 from "../../assets/Tutorial/1.png";
import tutorial2 from "../../assets/Tutorial/2.png";
import tutorial3 from "../../assets/Tutorial/3.png";
import tutorial4 from "../../assets/Tutorial/4.png";

const images = [tutorial1, tutorial2, tutorial3];

const TutorialCarousel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Submit (last image)
      onClose();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <IonPage>
      <IonContent className="tutorial-carousel-content">
        <div className="carousel-wrapper">
          <img
            src={images[currentIndex]}
            alt={`Tutorial Step ${currentIndex + 1}`}
            className="carousel-image"
          />

          <button className="skip-btn" onClick={handleSkip}>
            Skip
          </button>

          <div className="navigation-buttons">
            <button
              className="back-btn"
              onClick={handleBack}
              disabled={currentIndex === 0}
            >
              Back
            </button>

            <button className="next-btn" onClick={handleNext}>
              {currentIndex === images.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TutorialCarousel;
