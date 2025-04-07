import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import axios from "axios";
import { addOutline, chevronBack, peopleOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import profileImg from "../../assets/images/Icons/ProfileIcon.png";
import decrypt from "../../helper";
import "./ManageFamily.css";
import { Divider } from "primereact/divider";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { useHistory, useLocation } from "react-router"; 
import crownimg from "../../assets/images/Icons/Crown.svg";
import familyImage from "../../assets/images/Manage Family/family.png";
import CustomIonLoading from "../CustomIonLoading/CustomIonLoading";

interface UserInfo {
  activeStatus: string;
  headStatus: string;
  refUserId: number;
  refUserCustId: string;
  refUserMobileno: number;
  refUserFname: string;
  refUserLname?: string;
  refGender: string;
  refMaritalStatus: string;
  refDOB: string;
  refEducation: string;
  refOccupationLvl: string;
  refSector: string
  refAddress: string;
  refDistrict: string;
  refPincode: string;
  createdAt: string;
}

interface SubscriptionInfo{
  packageStatus: boolean;
  packageData: any[];
}

const ManageFamily: React.FC = () => {
  const [userData, setUserData] = useState<Array<UserInfo>>([]);
  const [primaryUser, setPrimaryUser] = useState<UserInfo>();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionInfo>();
  const history = useHistory();
  const location = useLocation() as { state: { refreshFamily?: boolean } };
  const [loading, setLoading] = useState<boolean>(false);
  
  const [presentAlert] = useIonAlert();
  
  const searchPatient = () => {
    const tokenString = localStorage.getItem("userDetails");

    const userDeatilsObj = tokenString
      ? JSON.parse(tokenString)
      : { userCustId: null, phNumber: null };

    //   console.log(userDeatilsObj.userId, userDeatilsObj.phNumber);

    if (tokenString) {
      setLoading(true);
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getPatientData`,
            {
              mobileNumber: userDeatilsObj.phNumber,
            },
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

            // setLoadingStatus(false);

            if (data.status) {
              setPrimaryUser(data.data.find((item: any) => item.headStatus == "true"));
              setUserData(data.data.filter((item: any) => item.headStatus != "true"));
              setSubscriptionData({
                packageStatus: data.packageStatus ?? false, 
                packageData: Array.isArray(data.packageData) ? data.packageData : []
              });
              setLoading(false);
            } else {
              setLoading(false);
              console.error("Data consoled false - chekc this");
            }
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error fetching patient data:", error);
          });
      } catch (error) {
        setLoading(false);
        console.error("Error parsing token:", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  };
  
  useEffect(() => {
    searchPatient();
  }, []);

  useEffect(() => {
    if (location.state?.refreshFamily) {
        searchPatient();
    }
}, [location.state]);

console.log("totalusers: ", userData.length + (primaryUser != undefined ? 1 : 0));
console.log(subscriptionData);
  return (
    <IonPage className="cus-ion-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>Manage Family</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="manage-family">
          {primaryUser !== undefined && (
            <Accordion className="manage-family-container">
              <AccordionTab
                disabled
                header={
                  <div className="manage-family-header">
                    {/* Avatar */}
                    <div className="manage-family-card-avatar">
                      <span>
                        {primaryUser.refUserFname.charAt(0) +
                          (primaryUser.refUserLname?.charAt(0) || "")}
                      </span>
                    </div>

                    {/* User Info */}
                    <div className="manage-family-card-content">
                      <span className="manage-family-name">
                        {primaryUser.refUserFname +
                          " " +
                          (primaryUser.refUserLname || "")}
                      </span>
                      <span>{primaryUser.refUserCustId}</span>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontStyle: "italic",
                          fontWeight:
                            primaryUser.headStatus === "true"
                              ? "bold"
                              : "normal",
                        }}
                      >
                        {primaryUser.headStatus === "true" && "Primary"}
                      </span>
                    </div>

                    {/* Edit Icon */}
                    {/* <span className="manage-family-ml-auto">
                        <i className="pi pi-pencil" />
                      </span> */}
                  </div>
                }
              ></AccordionTab>
            </Accordion>
          )}
          <div
            style={{
              width: "90%",
              margin: "1rem auto",
              padding: "1rem",
              background: "var(--med-dark-green)",
              color: "var(--med-light-green)",
              borderRadius: "10px",
            }}
          >
            Family Member Count:{" "}
            <span style={{ fontWeight: "bold" }}>{userData.length}</span>
          </div>

          {userData.length > 0 ? (
            <Accordion className="manage-family-container">
              {userData.length > 0 &&
                userData.map((item, index) => (
                  <AccordionTab
                    key={index}
                    header={
                      <div className="manage-family-header">
                        {/* Avatar */}
                        <div className="manage-family-card-avatar">
                          <span>
                            {item.refUserFname.charAt(0) +
                              (item.refUserLname?.charAt(0) || "")}
                          </span>
                        </div>

                        {/* User Info */}
                        <div className="manage-family-card-content">
                          <span className="manage-family-name">
                            {item.refUserFname +
                              " " +
                              (item.refUserLname || "")}
                          </span>
                          <span>{item.refUserCustId}</span>
                          <span
                            style={{
                              fontSize: "0.7rem",
                              fontStyle: "italic",
                              fontWeight:
                                item.headStatus === "true" ? "bold" : "normal",
                            }}
                          >
                            {item.headStatus === "true"
                              ? "Primary"
                              : `Member ${index + 1}`}
                          </span>
                        </div>

                        {/* Edit Icon */}
                        {/* <span className="manage-family-ml-auto">
                          <i className="pi pi-pencil" />
                        </span> */}
                      </div>
                    }
                  >
                    <div className="manage-family-content">
                      <span style={{ fontWeight: "bold", fontSize: "0.6rem" }}>
                        <span
                          style={{
                            color:
                              item.activeStatus.toLowerCase() === "active"
                                ? "green"
                                : "red",
                          }}
                        >
                          {item.activeStatus.toUpperCase()}
                        </span>
                        {item.activeStatus.toLowerCase() === "active" &&
                        item.createdAt
                          ? `: ${new Date(item.createdAt).toLocaleDateString(
                              "en-gb"
                            )}`
                          : ""}
                      </span>

                      <div className="manage-family-container">
                        <table className="manage-family-table">
                          <tbody>
                            <tr>
                              <td>Gender:</td>
                              <td>{item.refGender}</td>
                            </tr>
                            <tr>
                              <td>Maritial Status:</td>
                              <td>{item.refMaritalStatus}</td>
                            </tr>
                            <tr>
                              <td>DOB:</td>
                              <td>
                                {item.refDOB
                                  ? new Date(item.refDOB).toLocaleDateString(
                                      "en-gb"
                                    )
                                  : "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <td>Education:</td>
                              <td>{item.refEducation}</td>
                            </tr>
                            <tr>
                              <td>Sector & Occupation Lvl</td>
                              <td>
                                {item.refSector + " & " + item.refOccupationLvl}
                              </td>
                            </tr>
                            <tr>
                              <td>Address:</td>
                              <td>
                                {item.refAddress +
                                  ", " +
                                  item.refDistrict +
                                  " - " +
                                  item.refPincode}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </AccordionTab>
                ))}
            </Accordion>
          ) : (
            <div>
              <img src={familyImage} />
            </div>
          )}
        </div>

        <IonFab slot="fixed" vertical="bottom" horizontal="end" edge={false}>
          {subscriptionData?.packageStatus == true &&
          subscriptionData?.packageData[0].refPkgValidMembers >
            userData.length + (primaryUser != undefined ? 1 : 0) ? (
            <IonFabButton onClick={() => history.push("/addFamilyMember")}>
              <IonIcon icon={addOutline}></IonIcon>
            </IonFabButton>
          ) : (
            <IonFabButton
              onClick={() =>
                presentAlert({
                  cssClass: "custom-alert",
                  message:
                    "Please Upgrade your membership to add family member",
                  buttons: [
                    {
                      text: "Cancel",
                      role: "cancel", // Close alert
                      cssClass: "close-button",
                    },
                    {
                      text: "Upgrade Now",
                      handler: () => history.replace("/subscriptionPlans"),
                    },
                  ],
                })
              }
            >
              <IonIcon icon={addOutline}></IonIcon>
            </IonFabButton>
          )}
        </IonFab>
      </IonContent>
      <CustomIonLoading isOpen={loading} />
    </IonPage>
  );
};

export default ManageFamily;
