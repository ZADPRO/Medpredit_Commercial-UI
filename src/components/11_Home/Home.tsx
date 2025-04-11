import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonicSafeString,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  chevronDown,
  chevronForward,
  chevronUp,
  chevronUpCircle,
  colorPalette,
  document,
  newspaperOutline,
  notificationsOutline,
  peopleOutline,
  personAddOutline,
  personOutline,
  search,
} from "ionicons/icons";
import { Carousel } from "react-responsive-carousel";
import carousel1 from "../../assets/images/Home/BANNER1.jpg";
import carousel2 from "../../assets/images/Home/BANNER2.jpg";
import carousel3 from "../../assets/images/Home/BANNER3.jpg";
import carousel4 from "../../assets/images/Home/BANNER4.jpg";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { useHistory, useLocation } from "react-router";
import { motion } from "framer-motion";
import alcohol from "../../assets/images/Services/alchohol.png";
import physical from "../../assets/images/Services/physical-activities.png";
import stress from "../../assets/images/Services/stress.png";
import tobacco from "../../assets/images/Services/tobacco.png";
import dietary from "../../assets/images/Services/dietary.png";
import bmi from "../../assets/images/Services/bmi.png";
import sleep from "../../assets/images/Services/sleep.png";
import family_history from "../../assets/images/Services/family_history.png";
import diabetesKnowAbout from "../../assets/images/Services/Diabetes KnowAbout.png";
import hypertensionKnowAbout from "../../assets/images/Services/Hypertension KnowAbout.png";
import coronaryKnowAbout from "../../assets/images/Services/Coronary KnowAbout.png";
import stokeKnowAbout from "../../assets/images/Services/Stroke KnowAbout.png";
import indiaFlag from "../../assets/images/Home/India Flag.png";
import heartIcon from "../../assets/images/Home/heart.png";
import goodImage from "../../assets/images/Home/good.svg";
import averageImage from "../../assets/images/Home/average.svg";
import riskImage from "../../assets/images/Home/risk.svg";
import personAdd from "../../assets/images/Icons/PersonAdd.png";
import personEdit from "../../assets/images/Icons/PersonEdit.png";
import { StatusBar } from "@capacitor/status-bar";
import axios from "axios";
import decrypt from "../../helper";
import CustomIonLoading from "../CustomIonLoading/CustomIonLoading";

const Home: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const userDetails = localStorage.getItem("userDetails");

  const userDeatilsObj = userDetails
    ? JSON.parse(userDetails)
    : { firstName: null, lastName: null };

  console.log(userDeatilsObj);

  const headStatus = localStorage.getItem("headStatus") || "false";

  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Ionic scroll event
  const handleScroll = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop;
    setIsScrolled(scrollTop > 20); // Track scroll state
  
    // Update StatusBar color dynamically
    StatusBar.setBackgroundColor({ color: scrollTop > 20 ? "#f3f3f3" : "#f8fff5" });
  };

  const [packages, setPackages] = useState<any>([]); 

  const [freeAssessment, setFreeAssessment] = useState({
    higherCount: 0,
    lowerCount: 0
  });

  const services = [
    {
      serviceId: 9,
      title: "Stress",
      subtitle: "Manage Stress for a Healthier Life",
      image: stress,
      path: "/serviceAssessment",
    },
    {
      serviceId: 11,
      title: "Alcohol",
      subtitle: "Limit Alcohol for Better Health and Wellness",
      image: alcohol,
      path: "/serviceAssessment",
    },
    {
      serviceId: 43,
      title: "Sleep",
      subtitle: "Improve Sleep for Better Physical and Mental Health",
      image: sleep,
      path: "/serviceAssessment",
    },
    {
      serviceId: 10,
      title: "Tobacco",
      subtitle: "Avoid Tobacco for a Healthier Future",
      image: tobacco,
      path: "/serviceAssessment",
    },
    {
      serviceId: 12,
      title: "Dietary",
      subtitle: "Maintain a Balanced Diet for Optimal Health",
      image: dietary,
      path: "/serviceAssessment",
    },
    {
      serviceId: 13,
      title: "BMI",
      subtitle: "Manage Weight for a Healthier Lifestyle",
      image: bmi,
      path: "/serviceAssessment",
    },
    {
      serviceId: 8,
      title: "Physical Activity",
      subtitle: "Boost Health with Regular Physical Activities",
      image: physical,
      path: "/serviceAssessment",
    },
    {
      serviceId: 51,
      title: "Family History",
      subtitle: "Understand Family History for Preventive Care",
      image: family_history,
      path: "/serviceAssessment",
    },
  ];

  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? services : services.slice(0, 4);

  const [renderAll, setRenderAll] = useState(false);

  // Handle the animation logic
  const toggleShowAll = () => {
    if (!showAll) {
      setRenderAll(true); // Show all items before animation
      setShowAll(true);
    } else {
      setShowAll(false);
      // Delay hiding extra items to allow the animation to complete
      setTimeout(() => setRenderAll(false), 500);
    }
  };

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
      bgImage: diabetesKnowAbout,
      title: "What is Diabetes?",
      subTitle:
        "Diabetes is a long-term condition where the body cannot properly produce or use insulin, resulting in high blood sugar levels.",
      bgColor: "#F2F6D0",
    },
    {
      bgImage: hypertensionKnowAbout,
      title: "What is Hypertension?",
      subTitle:
        "Hypertension is when the blood pressure in the arteries stays too high for too long, raising the risk of heart disease and stroke.",
      bgColor: "#EFDCAB",
    },
    {
      bgImage: coronaryKnowAbout,
      title: "What is Coronary artery disease?",
      subTitle:
        "Coronary artery disease (CAD) occurs when heart arteries narrow due to plaque buildup, significantly increasing heart attack risk.",
      bgColor: "#D98324",
    },
    {
      bgImage: stokeKnowAbout,
      title: "What is Stroke?",
      subTitle:
        "Stroke is when blood flow to the brain is blocked or ruptured, often causing brain damage and impairing vital functions.",
      bgColor: "#F2F6D0",
    },
  ];
  

  const getPackage = () => {
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;
  
        console.log(token)
        axios
          .get(`${import.meta.env.VITE_API_COMMERCIAL_URL}/getAllValidPackage`, {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );
            console.log(data);
            if (data.status) {
              let tempPackages = data.result.sort((a: any, b: any) => a.refPkgValidMembers - b.refPkgValidMembers);

              tempPackages = tempPackages.slice(0,3);

              tempPackages = [tempPackages[0], tempPackages[2], tempPackages[1]];     // Rearrange the package list for UI
              setPackages(tempPackages);
              
              // setSubscriptionData({
              //   packageStatus: data.packageStatus ?? false, 
              //   packageData: Array.isArray(data.packageData) ? data.packageData : []
              // });
            setLoading(false);
            } else {
              console.error("Data consoled false - chekc this");
              setLoading(false);
            }
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const getHomeDetails = () => {
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;
        axios
          .get(`${import.meta.env.VITE_API_COMMERCIAL_URL}/getdashboard`, {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );
            console.log(data);
            if (data.status) {
              localStorage.setItem(
                "subValid",
                data.checkSubscriptions.length > 0 ? "true" : "false"
              );
              setFreeAssessment({
                higherCount: Number(data.isHigherQuestion[0].assessmenttakenno),
                lowerCount: Number(data.isLowerQuestion[0].assessmenttakenno)
              })
            }
            setLoading(false);
          })
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getPackage();
    getHomeDetails();
  }, []);

  useEffect(() => {
    getHomeDetails();
  }, [location.state]);

  console.log(packages);
  return (
    <IonPage className="cus-ion-page">
      <IonHeader>
        <div className="home-top">
          <div className={`home-top-bar ${isScrolled ? "scrolled" : ""}`}>
            <div className="home-top-bar-greetings">
              <span style={{ fontSize: "0.8rem" }}>Hi,</span>
              <h2
                style={{ fontSize: "1.3rem", margin: "0", fontWeight: "600" }}
              >
                {userDeatilsObj.firstName}
              </h2>
            </div>
            <div className="home-top-bar-icons">
              <IonIcon
                onClick={() =>
                  history.push("/reports", {
                    direction: "forward",
                    animation: "slide",
                  })
                }
                icon={newspaperOutline}
              />
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
        </div>
      </IonHeader>

      <IonContent scrollEvents={true} onIonScroll={handleScroll}>
        <div className="medpredit_home">
          <div className="home-search-bar">
            <input className="home-search-input" placeholder="Search Service" />
            <div
              style={{ display: "flex", flexDirection: "row", gap: "0.2rem" }}
            >
              <button className="home-search-button">
                <IonIcon icon={search}></IonIcon>
              </button>
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
              <div
                className="carouselDiv"
                onClick={() => history.push("/reports")}
              >
                <img src={carousel1} className="carousel-image" />
              </div>
              <div
                className="carouselDiv"
                onClick={() => history.push("/serviceAssessment/9")}
              >
                <img src={carousel2} className="carousel-image" />
              </div>
              <div
                className="carouselDiv"
                onClick={() => history.push("/manageFamily")}
              >
                <img src={carousel3} className="carousel-image" />
              </div>
              <div className="carouselDiv">
                <img src={carousel4} className="carousel-image" />
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
                <motion.div
                  initial={{ height: "auto" }}
                  animate={{ height: showAll ? "auto" : "16rem" }} // Adjust for 4 items
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="home-pricing">
                    <Divider style={{ margin: "0" }} align="center">
                      <div className="inline-flex align-items-center">
                        <b className="home-services-category-title">
                          Comprehensive Care
                        </b>
                      </div>
                    </Divider>
                    {localStorage.getItem("subValid") == "false" && (
                      <p
                        style={{
                          marginTop: "0",
                          fontSize: "0.65rem",
                          textAlign: "center",
                        }}
                      >
                        Free Assesstment Taken: {freeAssessment.higherCount > 0 ? 1 : 0 }/1
                      </p>
                    )}
                  </div>
                  <IonRow>
                    {services.slice(0, 4).map((card, index) => (
                      <IonCol size="6" key={index} className="home-card-col">
                        <IonCard
                          className="home-custom-card"
                          onClick={() =>
                            history.push(card.path + `/${card.serviceId}`)
                          }
                        >
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
                  <div style={{ marginTop: "1rem" }} />
                  <div className="home-pricing">
                    <Divider style={{ margin: "0" }} align="center">
                      <div className="inline-flex align-items-center">
                        <b className="home-services-category-title">
                          Basic Care
                        </b>
                      </div>
                    </Divider>
                    {localStorage.getItem("subValid") == "false" && (
                      <p
                        style={{
                          marginTop: "0",
                          fontSize: "0.65rem",
                          textAlign: "center",
                        }}
                      >
                        Free Assesstment Taken: {freeAssessment.lowerCount > 0 ? 1: 0}/1
                      </p>
                    )}
                  </div>
                  <IonRow>
                    {services.slice(4, 8).map((card, index) => (
                      <IonCol size="6" key={index} className="home-card-col">
                        <IonCard
                          className="home-custom-card"
                          onClick={() =>
                            history.push(card.path + `/${card.serviceId}`)
                          }
                        >
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
                </motion.div>
              </IonGrid>
              <div
                style={{
                  paddingBottom: "1rem",
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={toggleShowAll}
              >
                <span>{showAll ? "Less" : "More"}</span>
                <IonIcon icon={showAll ? chevronUp : chevronDown} />
              </div>
            </div>
          </div>

          {headStatus == "true" &&
            localStorage.getItem("subValid") == "false" && (
              <div className="home-pricing">
                <Divider style={{ margin: "0" }} align="center">
                  <div className="inline-flex align-items-center">
                    <b
                      style={{
                        color: "var(--med-dark-green)",
                        fontSize: "1.3rem",
                      }}
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
                  {packages.length > 0 &&
                    packages.map((plan: any, index: number) => {
                      if (index != 1)
                        return (
                          <Card
                            key={index}
                            className="home-pricing-card-content"
                          >
                            <span
                              style={{ fontSize: "1rem", fontWeight: "bold" }}
                            >
                              {plan.refPkgName}
                            </span>
                            <div>
                              <p>{plan.refPkgValidDays + " days validity"}</p>
                              <p>
                                {"1" +
                                  (plan.refPkgValidMembers > 1
                                    ? ` + ${plan.refPkgValidMembers - 1}`
                                    : "") +
                                  " Member"}
                              </p>
                            </div>
                            <span
                              style={{
                                fontSize: "0.6rem",
                                fontWeight: "bold",
                                fontStyle: "italic",
                              }}
                            >
                              {"Rs. " + plan.refPkgAmount}
                            </span>
                            <div
                              className="home-pricing-card-getstarted"
                              onClick={() =>
                                history.push({
                                  pathname: "/subscriptionPlans",
                                })
                              }
                            >
                              Get Started
                            </div>
                          </Card>
                        );
                      else
                        return (
                          <Card
                            key={index}
                            className="home-pricing-card-content"
                          >
                            <span
                              style={{
                                fontSize: "1.4rem",
                                fontWeight: "bolder",
                              }}
                            >
                              {plan.refPkgName}
                            </span>
                            <div>
                              <p>{plan.refPkgValidDays + " days validity"}</p>
                              <p>
                                {"1" +
                                  (plan.refPkgValidMembers > 1
                                    ? ` + ${plan.refPkgValidMembers - 1}`
                                    : "") +
                                  " Member"}
                              </p>
                            </div>
                            <span
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "bolder",
                                fontStyle: "italic",
                              }}
                            >
                              {"Rs. " + plan.refPkgAmount}
                            </span>
                            <div
                              className="home-pricing-card-getstarted-pro"
                              onClick={() =>
                                history.push({
                                  pathname: "/subscriptionPlans",
                                })
                              }
                            >
                              Get Started
                            </div>
                          </Card>
                        );
                    })}
                </div>
                {/* <div className="home-pricing-card">
              <Card className="home-pricing-card-content">
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Intro
                </span>
                <div>
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
                <span style={{ fontSize: "1.4rem", fontWeight: "bolder" }}>
                  Pro
                </span>
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
                <div className="home-pricing-card-getstarted-pro">
                  Get Started
                </div>
              </Card>
              <Card className="home-pricing-card-content">
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Base
                </span>
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
            </div> */}
              </div>
            )}
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

              {/* <span>View All</span> */}
            </div>

            <div className="home-riskFactor-content">
              <div className="home-riskFactor-score01">
                <div className="home-riskFactor-card01">
                  <div style={{ display: "flex", gap: "0.3rem" }}>
                    <img src={goodImage} />
                    <span>Good</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        color: "rgba(87, 142, 37, 1)",
                        fontSize: "1.5rem",
                      }}
                    >
                      6
                    </span>
                    <span>/8</span>
                  </div>
                </div>
                <div className="home-riskFactor-card01">
                  <div style={{ display: "flex", gap: "0.3rem" }}>
                    <img src={averageImage} />
                    <span>Average</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        color: "rgba(255, 161, 11, 1)",
                        fontSize: "1.5rem",
                      }}
                    >
                      1
                    </span>
                    <span>/8</span>
                  </div>
                </div>
                <div className="home-riskFactor-card01">
                  <div style={{ display: "flex", gap: "0.3rem" }}>
                    <img src={riskImage} />
                    <span>Risk</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        color: "rgba(240, 0, 38, 1)",
                        fontSize: "1.5rem",
                      }}
                    >
                      1
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

              {/* <span>View All</span> */}
            </div>
            <div className="home-knowAbout-content">
              {knowAbout.map((item, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: `${item.bgColor}` }}
                  className="home-knowAbout-cards"
                >
                  <img src={item.bgImage} />
                  <h3>{item.title}</h3>
                  <p>{item.subTitle}</p>
                  <div
                    style={{
                      padding: "1rem 0 0 0",
                      textAlign: "start",
                      fontSize: "0.8rem",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    Read More <i className="pi pi-arrow-right" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="home-faq">
            <h2>FAQ</h2>
            <IonIcon size="large" src={chevronForward} />
          </div>

          <div className="home-footer">
            <h3>
              Made with <img src={heartIcon} /> by
            </h3>
            <h1>ZAdroit</h1>
            <h4>
              <img src={indiaFlag} />
              Made in India
            </h4>
            <h1> </h1>
          </div>
        </div>

        {/* <IonFab slot="fixed" vertical="bottom" horizontal="end" edge={false}>
          <IonFabButton>
            <IonIcon icon={peopleOutline}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <img src={personAdd} />
            </IonFabButton>
            <IonFabButton>
              <img src={personEdit} />
            </IonFabButton>
          </IonFabList>
        </IonFab> */}
      </IonContent>
      <CustomIonLoading isOpen={loading} />
    </IonPage>
  );
};

export default Home;
