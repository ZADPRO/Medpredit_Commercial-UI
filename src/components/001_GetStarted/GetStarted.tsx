import { IonContent, IonIcon, IonPage } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import "./GetStarted.css";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router";
import getStarted01 from "../../assets/images/GetStarted/GetStarted01.png";
import getStarted02 from "../../assets/images/GetStarted/GetStarted02.png";
import getStarted03 from "../../assets/images/GetStarted/GetStarted03.png";
import { arrowBack, arrowBackSharp, arrowForward } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; // Import Framer Motion

const GetStarted: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const carouselRef = useRef<any>(null);
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation("global");

  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.decrement();
    }
  };

  const goToNextSlide = () => {
    if (currentIndex === slides.length - 1) {
    } else if (carouselRef.current) {
      carouselRef.current.increment();
    }
  };

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const slides = [0, 1, 2];

  const handleSkip = (route: string) => {
    history.replace(route, {
      direction: "forward",
      animation: "slide",
    });
  };

  useEffect(() => {
    if (currentIndex === slides.length - 1) {
      // delay for a smoother animation if needed
      setTimeout(() => setShowButton(true), 50);
    } else {
      setShowButton(false);
    }
  }, [currentIndex]);

  return (
    <IonPage>
      <IonContent className="get-started">
        <div className="get-started-wrapper">
          <div className="get-started-div">
            <Carousel
              autoPlay={false}
              infiniteLoop={false}
              showThumbs={false}
              showIndicators={true}
              showArrows={false}
              showStatus={false}
              stopOnHover={false}
              preventMovementUntilSwipeScrollTolerance
              swipeScrollTolerance={50}
              ref={carouselRef}
              onChange={handleSlideChange}
              className="get-started-carousel-div"
            >
              <div className="get-started-carousel">
                <img src={getStarted01} />
                <div
                  style={{
                    boxShadow: "0 -4px 5px rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                  }}
                >
                  <h2>{t("getStarted.carousel01_heading")}</h2>
                  <span>{t("getStarted.carousel01_text")}</span>
                </div>
              </div>
              <div className="get-started-carousel">
                <img src={getStarted02} />
                <div
                  style={{
                    boxShadow: "0 -4px 5px rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                  }}
                >
                  <h2>{t("getStarted.carousel02_heading")}</h2>
                  <span>{t("getStarted.carousel02_text")}</span>
                </div>
              </div>
              <div className="get-started-carousel">
                <img src={getStarted03} />
                <div
                  style={{
                    boxShadow: "0 -4px 5px rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                  }}
                >
                  <h2>{t("getStarted.carousel03_heading")}</h2>
                  <span>{t("getStarted.carousel03_text")}</span>
                </div>
              </div>
            </Carousel>
            <div className="get-started-slide">
              <div>
                {currentIndex != 0 ? (
                  <span
                    className="get-started-slide-button"
                    onClick={() => goToPreviousSlide()}
                  >
                    <IonIcon icon={arrowBack} />
                  </span>
                ) : (
                  <div
                    onClick={() => history.goBack()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      color: "var(--med-dark-green)",
                    }}
                  >
                    <IonIcon icon={arrowBackSharp} />
                    {t("chooseLanguage.Choose Language")}
                  </div>
                )}
              </div>
              <div>
                {currentIndex < slides.length - 1 ? (
                  <span
                    className="get-started-slide-button"
                    onClick={goToNextSlide}
                  >
                    <IonIcon icon={arrowForward} />
                  </span>
                ) : (
                  <motion.button
                    className="medCustom-button02"
                    onClick={() => history.replace("/login")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "1.5rem",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1rem",
                      transformOrigin: "right", // Expand from the right
                    }}
                    initial={{ scaleX: 0.5 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {t("home.Get Started")} <IonIcon icon={arrowForward} />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GetStarted;
