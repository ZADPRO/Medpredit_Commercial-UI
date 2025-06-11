import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonCardSubtitle,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./SubscriptionPlans.css";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import decrypt from "../../helper";
import CustomIonLoading from "../CustomIonLoading/CustomIonLoading";
import { Divider } from "primereact/divider";
import { useTranslation } from "react-i18next";

interface Package {
  createdAt: string;
  createdBy: string;
  refIsOffer: boolean;
  refOfferPrice: number;
  refPkgDescription: string;
  refPkgEndDate: string;
  refPkgId: number;
  refPkgName: string;
  refPkgStartDate: string;
  refPkgStatus: boolean;
  refPkgValidDays: number;
  refPkgValidMembers: number;
  refPkgAmount: number;
  updatedAt: string | null;
  updatedBy: string | null;
}

interface SubscriptionInfo {
  packageStatus: boolean;
  packageData: any;
}

const SubscriptionPlans: React.FC = () => {
  const history = useHistory();
  const location = useLocation() as { state: { refreshPage?: boolean } };
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionInfo>();

  const getPackage = () => {
    setLoading(true);
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
              setPackages(data.result);
              setSubscriptionData({
                packageStatus: data.packageStatus ?? false,
                packageData: Array.isArray(data.packageData) ? data.packageData : []
              });
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

  console.log(packages);

  useEffect(() => {
    if (location.state?.refreshPage) {
      getPackage();
    }
  }, [location.state]);

  useEffect(() => {
    getPackage();
  }, []);

  const { t, i18n } = useTranslation("global")

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>{t("manageSub.Manage Subscription")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {subscriptionData?.packageStatus == true ? (
        <IonContent>
          <Divider className="subscribe-current-divider" align="left">
            <span className="p-tag">{t("manageSub.Current Package")}</span>
          </Divider>
          {subscriptionData?.packageData.map((plan: any, index: number) => (
            <IonCard key={index} className="subscription-cards">
              <IonCardHeader>
                <IonCardTitle>{plan.refPkgName}</IonCardTitle>
                {/* <Divider/>
                  <IonCardSubtitle>Current Package</IonCardSubtitle> */}
              </IonCardHeader>

              <IonCardContent className="subscribe-card-content">
                <p className="subscribe-card-description">
                  {plan.refPkgDescription}
                </p>
                <p className="subscribe-card-features">
                  {"✔ " + plan.refPkgValidDays + " " + t("home.days validity")}
                </p>
                <p className="subscribe-card-features">
                  {"✔ 1" +
                    (plan.refPkgValidMembers > 1
                      ? ` + ${plan.refPkgValidMembers - 1}`
                      : "") +
                    " " +
                    t("home.Member")}
                </p>
                <h1 className="subscribe-card-price">
                  {"Rs. " + plan.refPkgAmount}
                </h1>
                <Divider />
                <h2>
                  {t("manageSub.Expires On")}: <b>{plan.refSubEndDate}</b>
                </h2>
              </IonCardContent>
            </IonCard>
          ))}

          {packages.filter(
            (plan) =>
              plan.refPkgValidMembers >
              subscriptionData?.packageData[0].refPkgValidMembers
          ).length != 0 && (
            <Divider className="subscribe-upgrade-divider" align="left">
              <span className="p-tag">Upgrade Package</span>
            </Divider>
          )}
          <div className="subscribe-upgrade">
            {packages !== undefined &&
              packages
                .filter(
                  (plan) =>
                    plan.refPkgValidMembers >
                    subscriptionData?.packageData[0].refPkgValidMembers
                )
                .map((plan, index) => (
                  <IonCard key={index} className="subscription-cards">
                    <IonCardHeader>
                      <IonCardTitle>{plan.refPkgName}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="subscribe-card-content">
                      <p className="subscribe-card-description">
                        {plan.refPkgDescription}
                      </p>
                      <p className="subscribe-card-features">
                        {"✔ " +
                          plan.refPkgValidDays +
                          " " +
                          t("home.days validity")}
                      </p>
                      <p className="subscribe-card-features">
                        {"✔ 1" +
                          (plan.refPkgValidMembers > 1
                            ? ` + ${plan.refPkgValidMembers - 1}`
                            : "") +
                          " " +
                          t("home.Member")}
                      </p>

                      <h1 className="subscribe-card-price">
                        {"Rs. " + plan.refPkgAmount}
                      </h1>
                      <button
                        className="medCustom-button02"
                        // onClick={() =>
                        //   history.push({
                        //     pathname: "/subscriptionDetail",
                        //     state: { plan: packages.filter((plan) => plan.refPkgValidMembers > subscriptionData?.packageData[0].refPkgValidMembers)[index].refPkgId },
                        //   })
                        // }
                        onClick={() => {
                          const tokenString =
                            localStorage.getItem("userDetails");
                          const tokenObject = JSON.parse(tokenString || "");
                          const token = tokenObject.token;
                          window.location.href =
                            "http://localhost:5173/subscription?token=" +
                            token +
                            "&packageId=" +
                            plan.refPkgId +
                            "&refLanCode=" +
                            localStorage.getItem("lang");
                        }}
                      >
                        {t("manageSub.Subscribe")}
                      </button>
                    </IonCardContent>
                  </IonCard>
                ))}
          </div>
        </IonContent>
      ) : (
        <IonContent className="ion-padding">
          <h2>{t("manageSub.Choose Your Plan")}</h2>
          <p style={{ margin: "0" }}>
            {t("manageSub.Select a subscription plan that suits your needs")}
          </p>

          {packages !== undefined &&
            packages.map((plan, index) => (
              <IonCard key={index} className="subscription-cards">
                <IonCardHeader>
                  <IonCardTitle>{plan.refPkgName}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="subscribe-card-content">
                  <p className="subscribe-card-description">
                    {plan.refPkgDescription}
                  </p>
                  <p className="subscribe-card-features">
                    {"✔ " +
                      plan.refPkgValidDays +
                      " " +
                      t("home.days validity")}
                  </p>
                  <p className="subscribe-card-features">
                    {"✔ 1" +
                      (plan.refPkgValidMembers > 1
                        ? ` + ${plan.refPkgValidMembers - 1}`
                        : "") +
                      " " +
                      t("home.Member")}
                  </p>

                  <h1 className="subscribe-card-price">
                    {"Rs. " + plan.refPkgAmount}
                  </h1>
                  <button
                    className="medCustom-button02"
                    // onClick={() =>
                    //   history.push({
                    //     pathname: "/subscriptionDetail",
                    //     state: { plan: packages[index].refPkgId },
                    //   })
                    // }
                    onClick={() => {
                      const tokenString = localStorage.getItem("userDetails");
                      const tokenObject = JSON.parse(tokenString || "");
                      const token = tokenObject.token;
                      window.location.href =
                        "http://localhost:5173/subscription?token=" +
                        token +
                        "&packageId=" +
                        plan.refPkgId +
                        "&refLanCode=" +
                        localStorage.getItem("lang");
                    }}
                  >
                    {t("manageSub.Subscribe")}
                  </button>
                </IonCardContent>
              </IonCard>
            ))}
        </IonContent>
      )}

      <CustomIonLoading isOpen={loading} />
    </IonPage>
  );
};

export default SubscriptionPlans;
