import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
    const history = useHistory();

  const menuBar = [
    {
      name: "Profile",
      path: "/profile",
      icon: "",
    },
    {
      name: "Subscription Plans",
      path: "/subscriptionPlans",
      icon: "",
    },
    {
      name: "Transaction History",
      path: "/transactionHistory",
      icon: "",
    },
    {
      name: "Coupons",
      path: "/coupons",
      icon: "",
    },
    {
      name: "Notification Setting",
      path: "/notificationSettings",
      icon: "",
    },
    {
      name: "Help Center",
      path: "/helpCenter",
      icon: "",
    },
    {
      name: "Share",
      path: "/share",
      icon: "",
    },
    {
      name: "Feedback",
      path: "/feedback",
      icon: "",
    },
    {
      name: "Terms and Condition",
      path: "/termsCondition",
      icon: "",
    },
    {
      name: "Privacy Policy",
      path: "/privacyPolicy",
      icon: "",
    },
    {
      name: "Choose Language",
      path: "/ChooseLanguage_02",
      icon: "",
    },
    {
      name: "Add Family Member",
      path: "/addFamilyMember",
      icon: "",
    },
  ]

  return (
    <IonPage>
      <span>Home</span>
      
    </IonPage>
  );
};

export default Home;
