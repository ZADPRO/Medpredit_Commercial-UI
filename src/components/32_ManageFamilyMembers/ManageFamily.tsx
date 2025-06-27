import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import axios from "axios";
import { addOutline, chevronBack, peopleOutline, unlink } from "ionicons/icons";
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
import { ToggleButton, ToggleButtonChangeEvent } from "primereact/togglebutton";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import Toast from "../CustomIonToast/CustomIonToast";
import { useTranslation } from "react-i18next";

interface UserInfo {
  activeStatus: string;
  headStatus: string;
  refUserId: number;
  refUserCustId: string;
  refUserMobileno: string;
  refUserFname: string;
  refUserLname?: string;
  refGender: string;
  refMaritalStatus: string;
  refDOB: string;
  refEducation: string;
  refOccupationLvl: string;
  refRId: number;
  refSector: string;
  refAddress: string;
  refDistrict: string;
  refPincode: string;
  createdAt: string;
}

interface SubscriptionInfo {
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
  const [toastOpen, setToastOpen] = useState({
    status: false,
    message: "",
    textColor: "black",
  });

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
            `${import.meta.env.VITE_API_COMMERCIAL_URL}/getFamilyMembers`,
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
              setPrimaryUser(
                data.familyMembers.find(
                  (item: any) => item.headStatus == "true"
                )
              );
              setUserData(
                data.familyMembers.filter(
                  (item: any) => item.headStatus != "true"
                )
              );
              setSubscriptionData({
                packageStatus:
                  data.checkSubscriptions.length > 0 ? true : false,
                packageData: Array.isArray(data.checkSubscriptions)
                  ? data.checkSubscriptions
                  : [],
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

  const UnLinkMember = (conPassword: string, userIndex: number) => {
    const tokenString = localStorage.getItem("userDetails");
    // console.log(conPassword, userIndex);
    if (tokenString) {
      setLoading(true);
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;
        axios
          .post(
            `${import.meta.env.VITE_API_COMMERCIAL_URL}/unlinkFamilyMember`,
            {
              refRelationId: userData[userIndex].refRId,
              password: conPassword,
              headMobileNumber: tokenObject.phNumber,
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
              setToastOpen({
                status: true,
                textColor: "green",
                message: `Unlinked ${
                  userData[userIndex].refUserFname +
                  " " +
                  userData[userIndex].refUserLname
                } Successfully`,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            } else {
              setLoading(false);
              setToastOpen({
                status: true,
                textColor: "red",
                message: `${data.message}`,
              });
              console.error("Data consoled false - chekc this");
            }
          });
      } catch (error) {
        setLoading(false);
        setToastOpen({
          status: true,
          textColor: "red",
          message: "Unexpected Error!!",
        });
        console.error("Error parsing token:", error);
      }
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

  const { t } = useTranslation("global");

  console.log(
    "totalusers: ",
    userData.length + (primaryUser != undefined ? 1 : 0)
  );
  console.log(subscriptionData);
  return (
    <IonPage className="">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>{t("manage.Manage Family")}</IonTitle>
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
                        {primaryUser.headStatus === "true" &&
                          t("login.Primary")}
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
            {t("manage.Family Member Count")}:{" "}
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
                              ? t("login.Primary")
                              : t("home.Member") + ` ${index + 1}`}
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{ fontWeight: "bold", fontSize: "0.6rem" }}
                        >
                          <span
                            style={{
                              color:
                                item.activeStatus.toLowerCase() === "active"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {t("link." + item.activeStatus.toUpperCase())}
                          </span>
                          {item.activeStatus.toLowerCase() === "active" &&
                          item.createdAt
                            ? `: ${new Date(item.createdAt).toLocaleDateString(
                                "en-gb"
                              )}`
                            : ""}
                        </span>

                        <button
                          className="manage-family-content-unlink"
                          onClick={() =>
                            presentAlert({
                              header: "Unlink Family Member",
                              message:
                                "Enter your password to confirm unlinking",
                              inputs: [
                                {
                                  name: "password",
                                  type: "password",
                                  placeholder: "Password",
                                },
                              ],
                              buttons: [
                                {
                                  text: "Cancel",
                                  role: "cancel",
                                  cssClass: "close-button",
                                },
                                {
                                  text: "Yes",
                                  handler: (alertData) => {
                                    if (
                                      !alertData.password ||
                                      alertData.password.trim() === ""
                                    ) {
                                      presentAlert({
                                        message: "Password is required.",
                                        buttons: ["OK"],
                                      });
                                      return false; // prevent closing the alert
                                    }
                                    UnLinkMember(alertData.password, index);
                                    return true;
                                  },
                                },
                              ],
                            })
                          }
                        >
                          {t("manage.Unlink")}
                        </button>
                      </div>

                      <div className="manage-family-container">
                        <table className="manage-family-table">
                          <tbody>
                            <tr>
                              <td>{t("Register User.Mobile Number")}</td>
                              <td>{item.refUserMobileno}</td>
                            </tr>
                            <tr>
                              <td>{t("userProfile.Gender")}:</td>
                              <td>{t("userProfile." + item.refGender)}</td>
                            </tr>
                            <tr>
                              <td>{t("userProfile.Marital Status")}:</td>
                              <td>
                                {t("userProfile." + item.refMaritalStatus)}
                              </td>
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
                              <td>{t("userProfile.Education")}:</td>
                              <td>
                                {item.refEducation
                                  ? t("userProfile." + item.refEducation)
                                  : "-"}
                              </td>
                            </tr>
                            <tr>
                              <td>{t("link.Sector & Occupation Lvl")}</td>
                              <td>
                                {item.refSector && item.refOccupationLvl
                                  ? `${item.refSector} & ${t(
                                      "userProfile." + item.refOccupationLvl
                                    )}`
                                  : item.refSector
                                  ? item.refSector
                                  : item.refOccupationLvl
                                  ? t("userProfile." + item.refOccupationLvl)
                                  : "-"}
                              </td>
                            </tr>
                            {/* <tr>
                              <td>Address:</td>
                              <td>
                                {item.refAddress +
                                  ", " +
                                  item.refDistrict +
                                  " - " +
                                  item.refPincode}
                              </td>
                            </tr> */}
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
            <>
              <IonFabButton>
                <IonIcon icon={addOutline}></IonIcon>
              </IonFabButton>
              <IonFabList side="start">

                <IonFabButton  style={{
                    width: "90px", // Increased width for Tamil text
                    height: "80px", // Optional: match height for circular look
                    whiteSpace: "normal", // Allow wrapping
                    textAlign: "center", // Center text
                    padding: "0px", // Add padding for readability
                  
                  }} onClick={() => history.push("/addFamilyMember")}>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {t("manage.Add")}
                  </span>
                </IonFabButton>
                <IonFabButton
                 style={{
                    width: "90px", // Increased width for Tamil text
                    height: "80px", // Optional: match height for circular look
                    whiteSpace: "normal", // Allow wrapping
                    textAlign: "center", // Center text
                    padding: "0px", // Add padding for readability
                  
                  }}
                  onClick={() =>
                    history.push({
                      pathname: "/linkFamilyMember",
                      state: { familyMembers: userData },
                    })
                  }
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {t("manage.Link")}
                  </span>
                </IonFabButton>
              </IonFabList>
            </>
          ) : (
            <IonFabButton
              onClick={() =>
                presentAlert({
                  cssClass: "custom-alert",
                  message: t(
                    "manage.Please Upgrade your membership to add family member"
                  ),
                  buttons: [
                    {
                      text: t("manage.Cancel"),
                      role: "cancel", // Close alert
                      cssClass: "close-button",
                    },
                    {
                      text: t("manage.Upgrade Now"),
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

      <Toast
        isOpen={toastOpen.status}
        message={toastOpen.message}
        textColor={toastOpen.textColor}
        onClose={() =>
          setToastOpen({ status: false, message: "", textColor: "black" })
        }
      />
    </IonPage>
  );
};

export default ManageFamily;
