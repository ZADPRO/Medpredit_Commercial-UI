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
import { useTranslation } from "react-i18next";

const Profile: React.FC = () => {
  const history = useHistory();

  const { t } = useTranslation("global");

  const userDetails = localStorage.getItem("userDetails");

  const userDeatilsObj = userDetails
    ? JSON.parse(userDetails)
    : { userCustId: null, phNumber: null, firstName: null, lastName: null };

  const headStatus = localStorage.getItem("headStatus") || "false";
  console.log(userDeatilsObj.userId, userDeatilsObj.phNumber);

  const sections = [
    {
      title: t("profile.Account"),
      items: [
        {
          icon: "pi pi-user",
          label: t("profile.Profile"),
          path: "/userprofile",
        },
        {
          icon: "pi pi-users",
          label: t("profile.Manage Family"),
          path: "/manageFamily",
          headStatus: true,
        },
        {
          icon: "pi pi-receipt",
          label: t("profile.Manage Subscriptions"),
          path: "/subscriptionPlans",
          headStatus: true,
        },
        {
          icon: "pi pi-indian-rupee",
          label: t("profile.Transaction History"),
          path: "/transactionHistory",
          headStatus: true,
        },
      ],
    },
    {
      title: t("profile.Settings"),
      items: [
        // {
        //   icon: "pi pi-cog",
        //   label: t("profile.Notification Settings"),
        //   path: "/notificationSettings",
        // },
        {
          icon: "pi pi-language",
          label: t("profile.Choose Language"),
          path: "/ChooseLanguage_02",
        },
        // { icon: "pi pi-headphones", label: t("profile.Help Center"), path: "/helpCenter" },
        // { icon: "pi pi-comment", label: t("profile.Feedback"), path: "/feedback" },
      ],
    },
    // {
    //   title: t("profile.MedicalRecords"),
    //   items: [
    //     {
    //       icon: "pi pi-upload",
    //       label: t("profile.UploadMedicalRecords"),
    //       path: "/MedicalRecords",
    //     },
    //   ],
    // },
    {
      title: t("profile.More"),
      items: [
        { icon: "pi pi-info", label: t("profile.About"), path: "/about" },
        {
          icon: "pi pi-book",
          label: t("profile.Terms and Conditions"),
          path: "/termsCondition",
        },
        {
          icon: "pi pi-lock",
          label: t("profile.Privacy Policy"),
          path: "/privacyPolicy",
        },
        {
          icon: "pi pi-sign-out",
          label: t("profile.Log Out"),
          path: "/login",
        },
      ],
    },
  ];

  const handleDelete = () => {
    window.location.href = "https://www.medpredit.com/dashboard";
  };

  return (
    <IonPage className="">
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
                {t("profile.Phone Number")}: <b>{userDeatilsObj.phNumber}</b>
              </p>
            </div>
            <div className="profile_top_bar_avatar">
              <span>
                {userDeatilsObj.firstName.charAt(0) +
                  userDeatilsObj.lastName.charAt(0)}
              </span>
            </div>
          </div>
          {headStatus == "true" &&
            localStorage.getItem("subValid") == "false" && (
              <div
                className="profile_top_bar_footer"
                onClick={() => history.push("/subscriptionPlans")}
              >
                <h3>{t("profile.Join Premium")}</h3>
                <IonIcon icon={chevronForward} />
              </div>
            )}
        </div>
      </IonHeader>

      <IonContent>
        <div className="medpredit_profile">
          {sections.map((section, index) => (
            <div key={index} className="profile-body">
              <h3 className="profile-body-header">{section.title}</h3>
              {section.items
                .filter((item) => {
                  if (headStatus == "false") {
                    return !item.headStatus; // if userStatus is true, remove items with headStatus
                  }
                  return true; // else show all items
                })
                .map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    onClick={() => {
                      if (item.label == t("profile.Log Out")) {
                        const refLanCode = localStorage.getItem("refLanCode")
                          ? localStorage.getItem("refLanCode")
                          : "1";
                        const lang = localStorage.getItem("lang")
                          ? localStorage.getItem("lang")
                          : "english";
                        localStorage.clear();
                        localStorage.setItem(
                          "refLanCode",
                          refLanCode ? refLanCode : "1"
                        );
                        localStorage.setItem("lang", lang ? lang : "english");

                        item.path.length > 0 && location.replace(item.path);
                      } else item.path.length > 0 && history.push(item.path);
                    }}
                  >
                    <div className="profile-body-item">
                      <i className={item.icon}></i>
                      <span className="profile-body-label">{item.label}</span>
                      {item.label != t("profile.Log Out") && (
                        <IonIcon icon={chevronForward} />
                      )}
                    </div>
                    {itemIndex !== section.items.length - 1 && (
                      <div className="profile-body-short-divider"></div>
                    )}
                  </div>
                ))}
            </div>
          ))}

          <div className="profile-delete" onClick={() => handleDelete()}>
            <span>{t("profile.Delete Account")}</span>
            <i className="pi pi-trash" />
          </div>

          <div className="profile-copyright">
            <p>
              &copy; {new Date().getFullYear()} Medpredit.{" "}
              {t("profile.All rights reserved")}
            </p>
            <p>
              {t("profile.Empowering you with seamless healthcare solutions")}
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
