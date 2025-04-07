import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import "./Profile.css";
import { chevronBack, chevronForward } from "ionicons/icons";
import { useHistory } from "react-router";

const Profile: React.FC = () => {
  const history = useHistory();

  const userDetails = localStorage.getItem("userDetails");

  const userDeatilsObj = userDetails
    ? JSON.parse(userDetails)
    : { userCustId: null, phNumber: null, firstName: null, lastName: null };

  console.log(userDeatilsObj.userId, userDeatilsObj.phNumber);

  const sections = [
    {
      title: "Account",
      items: [
        { icon: "pi pi-user", label: "Profile", path: "/userprofile" },
        { icon: "pi pi-users", label: "Manage Family", path: "/manageFamily" },
        {
          icon: "pi pi-receipt",
          label: "Manage Subscriptions",
          path: "/subscriptionPlans",
        },
        {
          icon: "pi pi-indian-rupee",
          label: "Transaction History",
          path: "/transactionHistory",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          icon: "pi pi-cog",
          label: "Notification Settings",
          path: "/notificationSettings",
        },
        {
          icon: "pi pi-language",
          label: "Choose Language",
          path: "/ChooseLanguage_02",
        },
        { icon: "pi pi-headphones", label: "Help Center", path: "/helpCenter" },
        { icon: "pi pi-comment", label: "Feedback", path: "/feedback" },
      ],
    },
    {
      title: "More",
      items: [
        { icon: "pi pi-info", label: "About", path: "/about" },
        {
          icon: "pi pi-book",
          label: "Terms and Conditions",
          path: "/termsCondition",
        },
        { icon: "pi pi-lock", label: "Privacy Policy", path: "/privacyPolicy" },
        {
          icon: "pi pi-sign-out",
          label: "Log Out",
          path: "/login",
        },
      ],
    },
  ];

  return (
    <IonPage className="cus-ion-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              mode="md"
              defaultHref="/home"
              icon={chevronBack}
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <div className="profile_top">
            <div className="profile_top_bar">
              <div className="profile_top_bar_header">
                <h2>
                  {userDeatilsObj.firstName + " " + userDeatilsObj.lastName}
                </h2>
                <p>
                  MEDPREDiT ID: <b>{userDeatilsObj.userCustId}</b>
                </p>
                <p>
                  Phone Number: <b>{userDeatilsObj.phNumber}</b>
                </p>
              </div>
              <div className="profile_top_bar_avatar">
                <span>
                  {userDeatilsObj.firstName.charAt(0) +
                    userDeatilsObj.lastName.charAt(0)}
                </span>
              </div>
            </div>
            <div className="profile_top_bar_footer">
              <h3>Join Premium</h3>
              <IonIcon icon={chevronForward} />
            </div>
          </div>
      </IonHeader>

      <IonContent>
        <div className="medpredit_profile">
          

          {sections.map((section, index) => (
            <div key={index} className="profile-body">
              <h3 className="profile-body-header">{section.title}</h3>
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  onClick={() => {
                    if (item.label == "Log Out") {
                      localStorage.clear();

                      item.path.length > 0 && location.replace(item.path);
                    } else item.path.length > 0 && history.push(item.path);
                  }}
                >
                  <div className="profile-body-item">
                    <i className={item.icon}></i>
                    <span className="profile-body-label">{item.label}</span>
                    <IonIcon icon={chevronForward} />
                  </div>
                  {itemIndex !== section.items.length - 1 && (
                    <div className="profile-body-short-divider"></div>
                  )}
                </div>
              ))}
            </div>
          ))}

          <div className="profile-delete">
            <span>Delete Account</span>
            <i className="pi pi-trash" />
          </div>

          <div className="profile-copyright">
            <p>
              &copy; {new Date().getFullYear()} Medpredit. All rights reserved.
            </p>
            <p>Empowering you with seamless healthcare solutions.</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
