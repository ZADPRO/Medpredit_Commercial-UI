import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import "../Services/ServiceAssessment.css";
import { chevronBack } from "ionicons/icons";
import img1 from "../../assets/images/banner_image.jpg";
import alcohol_banner from "../../assets/images/Services/Alcohol_Banner.png";
import stress_banner from "../../assets/images/Services/Stress_Banner.jpg";
import tobacco_banner from "../../assets/images/Services/Tobacco_Banner.png";
import physical_banner from "../../assets/images/Services/Physical_Banner.png";

const ServiceAssestment: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const title = (location.state as { title?: string })?.title;

  const servicesDetails = [
    {
      serviceId: 8,
      title: "Physical Activity",
      subTitle: "Evaluate your daily movement and exercise habits.",
      image: physical_banner,
      points: [
        "Engage in at least 30 minutes of exercise daily.",
        "Incorporate stretching and strength training into your routine.",
        "Reduce prolonged sitting and take active breaks.",
        "Aim for at least 10,000 steps per day.",
        "Choose stairs over elevators for added movement.",
      ],
    },
    {
      serviceId: 9,
      title: "Stress",
      subTitle:
        "Understand how stress impacts your well-being and ways to manage it.",
      image: stress_banner,
      points: [
        "Practice deep breathing or meditation for relaxation.",
        "Maintain a balanced work-life schedule.",
        "Engage in hobbies and activities you enjoy.",
        "Get adequate sleep to help manage stress levels.",
        "Stay socially connected with supportive people.",
      ],
    },
    {
      serviceId: 10,
      title: "Tobacco",
      subTitle: "Review your tobacco use and explore healthier alternatives.",
      image: tobacco_banner,
      points: [
        "Understand the health risks of smoking and tobacco use.",
        "Explore nicotine replacement therapies if needed.",
        "Set a quit date and create a plan to stop smoking.",
        "Seek support from family, friends, or professionals.",
        "Stay active and find healthy alternatives to manage cravings.",
      ],
    },
    {
      serviceId: 11,
      title: "Alcohol",
      subTitle:
        "Assess your alcohol consumption and its effects on your health.",
      image: alcohol_banner,
      points: [
        "Limit alcohol intake to recommended guidelines.",
        "Be aware of the long-term health effects of excessive drinking.",
        "Stay hydrated and alternate alcoholic drinks with water.",
        "Consider alcohol-free days to maintain balance.",
        "Seek professional advice if drinking affects your health or daily life.",
      ],
    },
    {
      serviceId: 12,
      title: "Dietary",
      subTitle: "",
      image: img1,
      points: [""],
    },
    {
      serviceId: 13,
      title: "BMI",
      subTitle: "",
      image: img1,
      points: [""],
    },
    {
      serviceId: 43,
      title: "Sleep",
      subTitle: "",
      image: img1,
      points: [""],
    },
    {
      serviceId: 51,
      title: "Family History",
      subTitle: "",
      image: img1,
      points: [""],
    },
  ];

  useEffect(() => {
    const selectedService = servicesDetails.find(
      (service) => service.title === title
    );

    if (selectedService) {
      const serviceData = {
        id: selectedService.serviceId,
        label: selectedService.title,
      };

      localStorage.setItem("getCategory", JSON.stringify(serviceData));
    }
  });

  // console.log("servicesDetails.find((item) => item.title === title)?.serviceId ", servicesDetails.find((item) => item.title === title)?.serviceId );

  return (
    <IonPage className="cus-ion-page">
      <IonHeader>
        <IonButtons slot="start">
          <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          {/* <span>{title}</span> */}
        </IonButtons>
      </IonHeader>
      <IonContent>
        {/* <div className="medpredit_serviceAssess"> */}
          
          <div className="serviceAssess_content">
            <h1>{title}</h1>
            <p>
              {servicesDetails.find((item) => item.title === title)?.subTitle}
            </p>
            <img
              src={servicesDetails.find((item) => item.title === title)?.image}
            />
            <ol>
              {servicesDetails
                .find((item) => item.title === title)
                ?.points.map((point) => (
                  <li>{point}</li>
                ))}
            </ol>
          </div>
        {/* </div> */}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle
            onClick={() => history.push("/serviceQuestion", { id: servicesDetails.find((item) => item.title === title)?.serviceId })}
          >
            Start Assessment
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ServiceAssestment;
