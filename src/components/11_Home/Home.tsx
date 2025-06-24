import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  chevronDown,
  chevronUp,
  newspaperOutline,
  personOutline,
  search,
} from "ionicons/icons";

import folderIcon from "../../assets/MedicalRecords/folder.svg";

import { Carousel } from "react-responsive-carousel";
import carousel1_eng from "../../assets/images/Home/BANNER1_ENG.jpg";
import carousel2_eng from "../../assets/images/Home/BANNER2_ENG.jpg";
import carousel3_eng from "../../assets/images/Home/BANNER3_ENG.jpg";
import carousel4_eng from "../../assets/images/Home/BANNER4_ENG.jpg";
import carousel1_hin from "../../assets/images/Home/BANNER1_HINDI.jpg";
import carousel2_hin from "../../assets/images/Home/BANNER2_HINDI.jpg";
import carousel3_hin from "../../assets/images/Home/BANNER3_HINDI.jpg";
import carousel4_hin from "../../assets/images/Home/BANNER4_HINDI.jpg";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { useHistory } from "react-router";
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
import { StatusBar } from "@capacitor/status-bar";
import axios from "axios";
import decrypt from "../../helper";
import CustomIonLoading from "../CustomIonLoading/CustomIonLoading";
import { useTranslation } from "react-i18next";

import TutorialCarousel from "../41_TutorialCarousel/TutorialCarousel";

import PINoPlan from "../../assets/UserIcons/noPlan.png";
import PIBasicPlan from "../../assets/UserIcons/basic.png";
import PIStandardPlan from "../../assets/UserIcons/standard.png";
import PIFamilyPlan from "../../assets/UserIcons/familyPlan.png";
import PIProPlan from "../../assets/UserIcons/proPlan.png";

const Home: React.FC = () => {
  const history = useHistory();
  const userDetails = localStorage.getItem("userDetails");

  const [userProfileIcon, setUserProfileIcon] = useState("");

  const userDeatilsObj = userDetails
    ? JSON.parse(userDetails)
    : { firstName: null, lastName: null };

  console.log(userDeatilsObj);
  const { t } = useTranslation("global");
  const headStatus = localStorage.getItem("headStatus") || "false";

  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Ionic scroll event
  const handleScroll = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop;
    setIsScrolled(scrollTop > 20); // Track scroll state

    // Update StatusBar color dynamically
    StatusBar.setBackgroundColor({
      color: scrollTop > 20 ? "#f3f3f3" : "#f8fff5",
    });
  };

  const [packages, setPackages] = useState<any>([]);

  const [freeAssessment, setFreeAssessment] = useState({
    higherCount: 0,
    lowerCount: 0,
  });

  const language = localStorage.getItem("lang") || "english";

  const carouselImages =
    language === "hindi"
      ? [carousel1_hin, carousel2_hin, carousel3_hin, carousel4_hin]
      : [carousel1_eng, carousel2_eng, carousel3_eng, carousel4_eng];

  const services = [
    {
      serviceId: 9,
      title: t("home.Stress"),
      subtitle: t("home.Manage Stress for a Healthier Life"),
      image: stress,
      path: "/serviceAssessment",
    },
    {
      serviceId: 11,
      title: t("home.Alcohol"),
      subtitle: t("home.Limit Alcohol for Better Health and Wellness"),
      image: alcohol,
      path: "/serviceAssessment",
    },
    {
      serviceId: 43,
      title: t("home.Sleep"),
      subtitle: t("home.Improve Sleep for Better Physical and Mental Health"),
      image: sleep,
      path: "/serviceAssessment",
    },
    {
      serviceId: 10,
      title: t("home.Tobacco"),
      subtitle: t("home.Avoid Tobacco for a Healthier Future"),
      image: tobacco,
      path: "/serviceAssessment",
    },
    {
      serviceId: 12,
      title: t("home.Dietary"),
      subtitle: t("home.Maintain a Balanced Diet for Optimal Health"),
      image: dietary,
      path: "/serviceAssessment",
    },
    {
      serviceId: 13,
      title: t("home.BMI"),
      subtitle: t("home.Manage Weight for a Healthier Lifestyle"),
      image: bmi,
      path: "/serviceAssessment",
    },
    {
      serviceId: 8,
      title: t("home.Physical Activity"),
      subtitle: t("home.Boost Health with Regular Physical Activities"),
      image: physical,
      path: "/serviceAssessment",
    },
    {
      serviceId: 51,
      title: t("home.Family History"),
      subtitle: t("home.Understand Family History for Preventive Care"),
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

  const knowAbout = [
    {
      id: 1,
      disease: "diabetes",
      bgImage: diabetesKnowAbout,
      title: t("home.What is Diabetes"),
      subTitle: t("home.What is Diabetesans"),
      bgColor: "#F2F6D0",
    },
    {
      id: 2,
      disease: "hypertension",
      bgImage: hypertensionKnowAbout,
      title: t("home.What is Hypertension"),
      subTitle: t("home.What is Hypertensionans"),
      bgColor: "#EFDCAB",
    },
    {
      id: 3,
      disease: "coronary heart disease",
      bgImage: coronaryKnowAbout,
      title: t("home.What is Coronary artery disease"),
      subTitle: t("home.What is Coronary artery diseaseans"),
      bgColor: "#D98324",
    },
    {
      id: 4,
      disease: "stroke",
      bgImage: stokeKnowAbout,
      title: t("home.What is Stroke"),
      subTitle: t("home.What is StrokeAns"),
      bgColor: "#F2F6D0",
    },
  ];

  const getPackage = () => {
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        console.log(token);
        axios
          .get(
            `${import.meta.env.VITE_API_COMMERCIAL_URL}/getAllValidPackage`,
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );
            console.log(data);
            if (data.status) {
              let tempPackages = data.result.sort(
                (a: any, b: any) => a.refPkgValidMembers - b.refPkgValidMembers
              );

              tempPackages = tempPackages.slice(0, 3);

              tempPackages = [
                tempPackages[0],
                tempPackages[2],
                tempPackages[1],
              ]; // Rearrange the package list for UI
              setPackages(tempPackages);
              console.log("tempPackages", data);
              if (data.packageStatus && data.packageData[0]) {
                const refPkgId = data.packageData[0].refPkgId;
                console.log("refPkgId", refPkgId);

                switch (refPkgId) {
                  case 0:
                    setUserProfileIcon(PIBasicPlan);
                    break;
                  case 1:
                    setUserProfileIcon(PIStandardPlan);
                    break;
                  case 2:
                    setUserProfileIcon(PIFamilyPlan);
                    break;
                  case 3:
                    setUserProfileIcon(PIProPlan);
                    break;
                  default:
                    setUserProfileIcon(PINoPlan);
                    break;
                }
              } else {
                setUserProfileIcon(PINoPlan);
              }

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
              setLoading(false);
              localStorage.setItem(
                "subValid",
                data.checkSubscriptions.length > 0 ? "true" : "false"
              );
              setFreeAssessment({
                higherCount: Number(data.isHigherQuestion[0].assessmenttakenno),
                lowerCount: Number(data.isLowerQuestion[0].assessmenttakenno),
              });
            }
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("tutorial");
    if (tutorialSeen === "present") {
      console.log("tutorialSeen", tutorialSeen);
      setShowTutorial(true);
    }
    setLoading(true);
    getPackage();
    getHomeDetails();
  }, []);

  console.log(packages);

  const handleCloseTutorial = () => {
    localStorage.setItem("tutorial", "absent");
    setShowTutorial(false);
  };

  return (
    <IonPage className="">
      <IonHeader>
        <IonToolbar>
          <div className="home-top">
            <div className={`home-top-bar ${isScrolled ? "scrolled" : ""}`}>
              <div className="home-top-bar-greetings">
                <span style={{ fontSize: "0.8rem" }}>{t("home.Hi")},</span>
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
                {/* <IonIcon icon={notificationsOutline} /> */}
                <img
                  src={userProfileIcon}
                  className=""
                  style={{ width: "40px" }}
                  alt=""
                  onClick={() => {
                    console.log("Chekcing daa");
                    history.push("/profile", {
                      direction: "forward",
                      animation: "slide",
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollEvents={true} onIonScroll={handleScroll}>
        <div className="medpredit_home">
          <div
            className="home-search-bar"
            onClick={() => history.push("/searchPage")}
          >
            <input
              className="home-search-input"
              placeholder={t("home.Search Service")}
            />
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
                onClick={() =>
                  history.push("/reports", {
                    direction: "forward",
                    animation: "slide",
                  })
                }
              >
                <img src={carouselImages[0]} className="carousel-image" />
              </div>
              <div
                className="carouselDiv"
                onClick={() => history.push("/serviceAssessment/9")}
              >
                <img src={carouselImages[1]} className="carousel-image" />
              </div>
              <div
                className="carouselDiv"
                onClick={() =>
                  headStatus == "true"
                    ? history.push("/manageFamily")
                    : history.push("/profile")
                }
              >
                <img src={carouselImages[2]} className="carousel-image" />
              </div>
              {/* <div className="carouselDiv">
                <img src={carouselImages[3]} className="carousel-image" />
              </div> */}
            </Carousel>
          </div>
          <div className="medicalRecordUploads mx-3 my-4 flex flex-column">
            <div className="flex content align-items-center justify-content-between m-0 border-round-lg px-3 py-2 gap-4 shadow-1">
              <div className="flex flex-column">
                <p
                  className="mx-0 my-1 font-bold"
                  style={{
                    color: "#0c4b41",
                  }}
                >
                 {t("home.Upload Medical Records")}
                </p>
              </div>
              {/* <img src={folderIcon} alt="" /> */}
              <div className="iconCont">
                <i className="pi pi-upload" />
              </div>
            </div>
          </div>
          <div className="home-services">
            <div className="home-services-title">
              <h2
                style={{ fontSize: "1.3rem", margin: "0", fontWeight: "600" }}
              >
                {t("home.Services")}
              </h2>
              <span style={{ fontSize: "0.6rem" }}>
                {t("home.Stay Informed and Take Control of Your Health")}
              </span>
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
                          {t("home.Comprehensive Care")}
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
                        {t("home.Free Assesstment Taken")}:{" "}
                        {freeAssessment.higherCount > 0 ? 1 : 0}/1
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
                          {t("home.Basic Care")}
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
                        {t("home.Free Assesstment Taken")}:{" "}
                        {freeAssessment.lowerCount > 0 ? 1 : 0}/1
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
                <span>{showAll ? t("home.Less") : t("home.More")}</span>
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
                      {t("home.Get Premium")}
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
                  {t("home.Stay Informed and Take Control of Your Health")}
                </p>
                <div className="home-pricing-card">
                  {packages.length > 0 &&
                    packages.map((plan: any, index: number) => {
                      if (index != 1)
                        return (
                          <Card
                            key={index}
                            className="home-pricing-card-content"
                            onClick={() =>
                              history.push({
                                pathname: "/subscriptionPlans",
                              })
                            }
                          >
                            <span
                              style={{ fontSize: "1rem", fontWeight: "bold" }}
                            >
                              {plan.refPkgName}
                            </span>
                            <div>
                              <p>
                                {plan.refPkgValidDays +
                                  " " +
                                  t("home.days validity")}
                              </p>
                              <p>
                                {"1" +
                                  (plan.refPkgValidMembers > 1
                                    ? ` + ${plan.refPkgValidMembers - 1} `
                                    : ` `) +
                                  t("home.Member")}
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
                            <div className="home-pricing-card-getstarted">
                              {t("home.Get Started")}
                            </div>
                          </Card>
                        );
                      else
                        return (
                          <Card
                            key={index}
                            className="home-pricing-card-content"
                            onClick={() =>
                              history.push({
                                pathname: "/subscriptionPlans",
                              })
                            }
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
                              <p>
                                {plan.refPkgValidDays +
                                  " " +
                                  t("home.days validity")}
                              </p>
                              <p>
                                {"1" +
                                  (plan.refPkgValidMembers > 1
                                    ? ` + ${plan.refPkgValidMembers - 1}`
                                    : "") +
                                  t("home.Member")}
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
                            <div className="home-pricing-card-getstarted-pro">
                              {t("home.Get Started")}
                            </div>
                          </Card>
                        );
                    })}
                </div>
              </div>
            )}
          <div className="home-knowAbout">
            <div className="home-knowAbout-title">
              <div>
                <h2
                  style={{ fontSize: "1.3rem", margin: "0", fontWeight: "600" }}
                >
                  {t("home.Know About Disease")}
                </h2>
                <span style={{ fontSize: "0.6rem" }}>
                  {t("home.Stay Informed and Take Control of Your Health")}
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
                  onClick={() => history.push(`/knowAbout/${item.id}`)}
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
                    onClick={() => history.push(`/knowAbout/${item.id}`)}
                  >
                    {t("home.Read More")} <i className="pi pi-arrow-right" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="home-footer">
            <h3>
              {t("home.made with")} <img src={heartIcon} /> {t("home.by")}
            </h3>
            <h1>ZAdroit</h1>
            <h4>
              <img src={indiaFlag} />
              {t("home.Made in India")}
            </h4>
            <h1> </h1>
          </div>
        </div>
      </IonContent>
      <CustomIonLoading isOpen={loading} />
      {showTutorial && <TutorialCarousel onClose={handleCloseTutorial} />}
    </IonPage>
  );
};

export default Home;
