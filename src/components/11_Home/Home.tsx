import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonicSafeString,
  IonPage,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  chevronDown,
  chevronForward,
  notificationsOutline,
  personOutline,
  search,
} from "ionicons/icons";
import { Carousel } from "react-responsive-carousel";
import carousel1 from "../../assets/images/banner_image.jpg";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { useHistory } from "react-router";
import alcohol from "../../assets/images/Home/alchohol.png";
import physical from "../../assets/images/Home/physical activities.png";
import stress from "../../assets/images/Home/stress.png";
import tobacco from "../../assets/images/Home/tobacco.png";
import knowAboutDisease1 from "../../assets/images/Home/know about.jpg";
import indiaFlag from "../../assets/images/Home/India Flag.png";
import heartIcon from "../../assets/images/Home/heart.png";
import goodImage from "../../assets/images/Home/good.svg";
import averageImage from "../../assets/images/Home/average.svg";
import riskImage from "../../assets/images/Home/risk.svg";

const Home: React.FC = () => {
  const history = useHistory();

  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Ionic scroll event
  const handleScroll = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop;
    setIsScrolled(scrollTop > 20); // Add class when scrolled 20px
  };

  const services = [
    {
      title: "Stress",
      subtitle: "Manage Stress for a Healthier Life",
      image: stress,
      path: "/serviceAssestment"
    },
    {
      title: "Physical Activity",
      subtitle: "Boost Health with Regular Physical Activities",
      image: physical,
      path: "/serviceAssestment"
    },
    {
      title: "Alcohol",
      subtitle: "Limit Alcohol for Better Health and Wellness",
      image: alcohol,
      path: "/serviceAssestment"
    },
    {
      title: "Tobacco",
      subtitle: "Avoid Tobacco for a Healthier Future",
      image: tobacco,
      path: "/serviceAssestment"
    },
  ];

  const plans = [
    {
      title: "Intro",
      price: "400",
      members: "2 Family Members",
      styleClass: "intro",
    },
    {
      title: "Pro",
      price: "800",
      members: "6 Family Members",
      styleClass: "pro",
    },
    {
      title: "Base",
      price: "600",
      members: "4 Family Members",
      styleClass: "base",
    },
  ];

  const knowAbout = [
    {
      bgImage: knowAboutDisease1,
      title: "What is the Replication Crisis?",
      subTitle: "This article will look at this subject, providing a brief overview of this subject.",
      bgColor: "#F2F6D0"
    },
    {
      bgImage: knowAboutDisease1,
      title: "What is the Replication Crisis?",
      subTitle: "This article will look at this subject, providing a brief overview of this subject.",
      bgColor: "#EFDCAB"
    },
    {
      bgImage: knowAboutDisease1,
      title: "What is the Replication Crisis?",
      subTitle: "This article will look at this subject, providing a brief overview of this subject.",
      bgColor: "#D98324"
    },
    {
      bgImage: knowAboutDisease1,
      title: "What is the Replication Crisis?",
      subTitle: "This article will look at this subject, providing a brief overview of this subject.",
      bgColor: "#F2F6D0"
    },

  ];
  
  return (
    <IonPage>
      <IonContent fullscreen scrollEvents={true} onIonScroll={handleScroll}>
        <div className="medpredit_home">
          <div className="home-top">
            <div className={`home-top-bar ${isScrolled ? "scrolled" : ""}`}>
              <div className="home-top-bar-greetings">
                <span style={{ fontSize: "0.8rem" }}>Hi,</span>
                <h2
                  style={{ fontSize: "1.3rem", margin: "0", fontWeight: "600" }}
                >
                  KrishnaRaj
                </h2>
              </div>
              <div className="home-top-bar-icons">
                <IonIcon icon={notificationsOutline} />
                <IonIcon
                  onClick={() =>
                    history.push("/profile", {
                      direction: "forward",
                      animation: "slide",
                    })
                  }
                  icon={personOutline}
                />
              </div>
            </div>
            <div className="home-search-bar">
              <input
                className="home-search-input"
                placeholder="Search Service"
              />
              <div
                style={{ display: "flex", flexDirection: "row", gap: "0.2rem" }}
              >
                <button className="home-search-button">
                  <IonIcon icon={search}></IonIcon>
                </button>
              </div>
            </div>
          </div>

          <div className="home-carousel">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showArrows={false}
              showStatus={false}
              stopOnHover={false}
              interval={5000}
              preventMovementUntilSwipeScrollTolerance
              swipeScrollTolerance={50}
            >
              <div className="carouselDiv">
                <img src={carousel1} className="carousel-image" />
              </div>
              <div className="carouselDiv">
                <img src={carousel1} className="carousel-image" />
              </div>
              <div className="carouselDiv">
                <img src={carousel1} className="carousel-image" />
              </div>
            </Carousel>
          </div>

          {/* <div className="home-services">
            <div className="home-services-title">
              <h2
                style={{ fontSize: "1.3rem", margin: "0", fontWeight: "600" }}
              >
                Services
              </h2>
              <span className="medCustom-chip01">View All</span>
            </div>

            <div className="home-services-list">
              {services.map((item) => (
                <div>
                  <IonIcon icon={accessibility} />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div> */}

          <div className="home-services">
            <div className="home-services-title">
              <h2
                style={{ fontSize: "1.3rem", margin: "0", fontWeight: "600" }}
              >
                Services
              </h2>
              <span style={{ fontSize: "0.6rem" }}>
                Stay Informed and Take Control of Your Health
              </span>
              {/* <span className="medCustom-chip01">View All</span> */}
            </div>
            <div style={{ width: "100%" }}>
              <IonGrid className="home-custom-grid">
                <IonRow>
                  {services.map((card, index) => (
                    <IonCol size="6" key={index} className="home-card-col">
                      <IonCard className="home-custom-card" onClick={() => history.push(card.path, { title: `${card.title}` })}>
                        <div className="home-card-content">
                          <IonCardHeader className="home-card-header">
                            <IonCardTitle className="home-card-title">
                              {card.title}
                            </IonCardTitle>
                          </IonCardHeader>
                          <IonCardContent className="home-card-subtitle">
                            {card.subtitle}
                          </IonCardContent>
                        </div>
                        <div className="home-card-image-container">
                          <img
                            src={card.image}
                            alt="Card Image"
                            className="home-card-image"
                          />
                        </div>
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
              <div
                style={{
                  paddingBottom: "1rem",
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>More</span>
                <IonIcon icon={chevronDown} />
              </div>
            </div>
          </div>

          <div className="home-pricing">
            <Divider style={{ margin: "0" }} align="center">
              <div className="inline-flex align-items-center">
                <b
                  style={{ color: "var(--med-dark-green)", fontSize: "1.3rem" }}
                >
                  Get Premium
                </b>
              </div>
            </Divider>
            <p
              style={{
                fontSize: "0.5rem",
                marginBottom: "1.25rem",
                textAlign: "center",
              }}
            >
              Stay Informed and Take Control of Your Health
            </p>
            <div className="home-pricing-card">
              <Card className="home-pricing-card-content">
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>Intro</span>
                <div>
                  <p>2 Family Members</p>
                  <p>2 Family Members</p>
                  <p>2 Family Members</p>
                  <p>2 Family Members</p>
                </div>
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  Rs.400/ Month
                </span>
                <div className="home-pricing-card-getstarted">Get Started</div>
              </Card>
              <Card className="home-pricing-card-content">
                <span style={{ fontSize: "1.4rem", fontWeight: "bolder" }}>Pro</span>
                <div>
                  <p>6 Family Members</p>
                  <p>6 Family Members</p>
                  <p>6 Family Members</p>
                  <p>6 Family Members</p>
                </div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                  }}
                >
                  Rs.800/ Month
                </span>
                <div className="home-pricing-card-getstarted-pro">Get Started</div>
              </Card>
              <Card className="home-pricing-card-content">
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>Base</span>
                <div>
                  <p>4 Family Members</p>
                  <p>4 Family Members</p>
                  <p>4 Family Members</p>
                  <p>4 Family Members</p>
                </div>
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  Rs.600/ Month
                </span>
                <div className="home-pricing-card-getstarted">Get Started</div>
              </Card>
            </div>
          </div>
          <div className="home-riskFactor">
            <div className="home-riskFactor-title">
              <div>
                <h2
                  style={{ fontSize: "1.3rem", margin: "0", fontWeight: "600" }}
                >
                  Risk Factor
                </h2>
                <span style={{ fontSize: "0.6rem" }}>
                  Stay Informed and Take Control of Your Health
                </span>
              </div>

              <span>View All</span>
            </div>

            <div className="home-riskFactor-content">
              <div className="home-riskFactor-score01">
                  <div className="home-riskFactor-card01">
                    <div style={{display: "flex", gap: "0.3rem"}}>
                      <img src={goodImage}/>
                      <span>Good</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                      <span style={{ color: "rgba(87, 142, 37, 1)", fontSize: "1.5rem",  }}>
                        8
                      </span>
                      <span>/8</span>
                    </div>
                  </div>
                  <div className="home-riskFactor-card01">
                    <div style={{display: "flex", gap: "0.3rem"}}>
                      <img src={averageImage}/>
                      <span>Average</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                      <span style={{ color: "rgba(255, 161, 11, 1)", fontSize: "1.5rem",  }}>
                        8
                      </span>
                      <span>/8</span>
                    </div>
                  </div>
                  <div className="home-riskFactor-card01">
                    <div style={{display: "flex", gap: "0.3rem"}}>
                    <img src={riskImage}/>
                      <span>Risk</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                      <span style={{ color: "rgba(240, 0, 38, 1)", fontSize: "1.5rem",  }}>
                        8
                      </span>
                      <span>/8</span>
                    </div>
                  </div>
              </div>

              <div className="home-riskFactor-score02">
                <div className="home-riskFactor-rings">
                  <div
                    style={{
                      width: "9rem",
                      height: "9rem",
                      borderRadius: "50%",
                      border: "0.5rem solid #F00026",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.3rem",
                    }}
                  >
                    <div
                      style={{
                        width: "7rem",
                        height: "7rem",
                        borderRadius: "50%",
                        border: "0.5rem solid #FFA10B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0rem",
                      }}
                    >
                      <div
                        style={{
                          width: "5rem",
                          height: "5rem",
                          borderRadius: "50%",
                          border: "0.5rem solid #578E25",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0.4rem",
                        }}
                      >
                        <span
                          style={{ fontWeight: "bold", fontSize: "0.7rem" }}
                        >
                          100/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="home-knowAbout">
            <div className="home-knowAbout-title">
              <div>
                <h2
                  style={{ fontSize: "1.3rem", margin: "0", fontWeight: "600" }}
                >
                  Know About Disease
                </h2>
                <span style={{ fontSize: "0.6rem" }}>
                Stay Informed and Take Control of Your Health
                </span>
              </div>

              <span>View All</span>
            </div>
            <div className="home-knowAbout-content">
                {knowAbout.map((item) => (
                  <div style={{backgroundColor: `${item.bgColor}`}} className="home-knowAbout-cards">
                    <img src={item.bgImage} />
                    <h3>{item.title}</h3>
                    <p>{item.subTitle}</p>
                  </div>
                ))}
            </div>
            </div>

            <div className="home-faq">
              <h2>FAQ</h2>
              <IonIcon size="large" src={chevronForward}/>
            </div>


            <div className="home-footer">
                <h3>Made in <img src={heartIcon}/> with</h3>
                <h1>Zadroit</h1>
                <h4><img src={indiaFlag}/>Made in India</h4>
                <h1>{" "}</h1>
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
