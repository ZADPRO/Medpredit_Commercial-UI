import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { chevronBack, close, search } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import decrypt from "../../helper";
import { useHistory, useLocation } from "react-router";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Toast from "../CustomIonToast/CustomIonToast";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import CustomIonLoading from "../CustomIonLoading/CustomIonLoading";

interface LocationState {
  familyMembers?: any; // Replace 'any' with your actual plan type
}

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

const LinkFamilyMember: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const location= useLocation();
  const state = location.state as LocationState | null;
  const history = useHistory();
  const familyMembers = state?.familyMembers; 
  const [userData, setUserData] = useState<Array<UserInfo>>([]);
  
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    refUserMobileno: "",
    refUserPassword: "",
    refUserRelation: "",
  });

  const familyRelationOpt: string[] = [
    "Father",
    "Mother",
    "Brother",
    "Sister",
    "Spouse",
    "Son",
    "Daughter",
    "Other"
  ];
  const [selectedUser, setSelectedUser] = useState<UserInfo>();

  const [toastOpen, setToastOpen] = useState({ status: false, message: "", textColor: "black" });

  console.log(familyMembers);

  const linkUser = () => {
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      setLoading(true);
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        axios
          .post(
            `${import.meta.env.VITE_API_COMMERCIAL_URL}/linkFamilyMember`,
            {
              refUserId: selectedUser?.refUserId,
              headMobileNumber: tokenObject.phNumber, 
              relationName: formData.refUserRelation,
              password: formData.refUserPassword
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
              setLoading(false);
              setToastOpen({ status: true, textColor: "green", message: "Account Linked Successfully"});
              setTimeout(() => {
                history.replace("/manageFamily", {refreshFamily: true});
              }, 1000);
            } else {
              setLoading(false);
              setToastOpen({ status: true, textColor: "red", message: `${data.message}` });
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
    }
  }

  const searchUser = () => {
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
            `${import.meta.env.VITE_API_COMMERCIAL_URL}/getParticularUserMobileNumber`,
            {
              mobileNumber: formData.refUserMobileno,
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
              if(data.userData.length > 0) {
                const uniqueUsers: UserInfo[] = data.userData
                .filter(
                  (user: UserInfo, index: number, self: any) =>
                    index ===
                    self.findIndex((u: UserInfo) => u.refUserId === user.refUserId)
                )
                .filter(
                  (user: UserInfo) =>
                    !familyMembers.some(
                      (member: any) => member.refUserId === user.refUserId
                    )
                );

              setUserData(uniqueUsers);
              setLoading(false);
              setIsOpen(true);
              }
              
              else {
                setToastOpen({ status: true, textColor: "red", message: `No User available for ${formData.refUserMobileno}` });
                setLoading(false);
              }
              
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

  const handleItemClick = (user: UserInfo) => {
    console.log("Clicked user:", user);
    setSelectedUser(user);
    setIsOpen(false);
  };
  
  const verifyForm = () => {
    if(formData.refUserRelation.length < 1) {
      setToastOpen({ status: true, textColor: "red", message: "Select a Relation Type" });
      return false;
    }
    else if(formData.refUserPassword.length < 1) {
      setToastOpen({ status: true, textColor: "red", message: "Enter your password to verify" });
      return false;
    }
    return true;
  }

  console.log(userData);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>Link Family</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div>
          <div className="inputBox">
            <label>
              Enter Number
              {/* <span style={{ color: "red" }}>*</span> */}
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div className="p-inputgroup addFamilyInputField">
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-user"></i>
                </span>
                <div>
                  <InputText
                    type="number"
                    style={{ width: "100%", textAlign: "left" }}
                    className="addFamilyInputText"
                    value={formData.refUserMobileno}
                    onChange={(e) => {
                      const numericValue = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setFormData((prevData) => ({
                        ...prevData,
                        refUserMobileno: numericValue,
                      }));
                    }}
                    placeholder="Enter Phone Number"
                    name="refUserMobileno"
                  />
                </div>
              </div>
              <Button
                style={{
                  backgroundColor: "var(--med-dark-green)",
                  color: "var(--med-light-green)",
                  borderRadius: "10px",
                }}
                icon="pi pi-search"
                onClick={() => {
                  if (formData.refUserMobileno.length == 10) {
                    searchUser();
                  } else {
                    setToastOpen({
                      status: true,
                      textColor: "red",
                      message: "Enter Valid Mobile Number",
                    });
                  }
                }}
              />
            </div>
          </div>

          <Divider />
          {selectedUser && (
            <div>
              <Accordion className="manage-family-container">
                <AccordionTab
                  header={
                    <div className="manage-family-header">
                      {/* Avatar */}
                      <div className="manage-family-card-avatar">
                        <span>
                          {selectedUser.refUserFname.charAt(0) +
                            (selectedUser.refUserLname?.charAt(0) || "")}
                        </span>
                      </div>

                      {/* User Info */}
                      <div className="manage-family-card-content">
                        <span className="manage-family-name">
                          {selectedUser.refUserFname +
                            " " +
                            (selectedUser.refUserLname || "")}
                        </span>
                        <span>{selectedUser.refUserCustId}</span>
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
                            selectedUser.activeStatus.toLowerCase() === "active"
                              ? "green"
                              : "red",
                        }}
                      >
                        {selectedUser.activeStatus.toUpperCase()}
                      </span>
                      {selectedUser.activeStatus.toLowerCase() === "active" &&
                      selectedUser.createdAt
                        ? `: ${new Date(
                            selectedUser.createdAt
                          ).toLocaleDateString("en-gb")}`
                        : ""}
                    </span>

                    <div className="manage-family-container">
                      <table className="manage-family-table">
                        <tbody>
                          <tr>
                            <td>Gender:</td>
                            <td>{selectedUser.refGender}</td>
                          </tr>
                          <tr>
                            <td>Maritial Status:</td>
                            <td>{selectedUser.refMaritalStatus}</td>
                          </tr>
                          <tr>
                            <td>DOB:</td>
                            <td>
                              {selectedUser.refDOB
                                ? new Date(
                                    selectedUser.refDOB
                                  ).toLocaleDateString("en-gb")
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td>Education:</td>
                            <td>{selectedUser.refEducation}</td>
                          </tr>
                          <tr>
                            <td>Sector & Occupation Lvl</td>
                            <td>
                              {selectedUser.refSector +
                                " & " +
                                selectedUser.refOccupationLvl}
                            </td>
                          </tr>
                          <tr>
                            <td>Address:</td>
                            <td>
                              {selectedUser.refAddress +
                                ", " +
                                selectedUser.refDistrict +
                                " - " +
                                selectedUser.refPincode}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </AccordionTab>
              </Accordion>

              <div className="inputBox">
                <label>
                  Relation Type <span style={{ color: "red" }}>*</span>
                </label>
                <div className="addFamilyInputField" style={{ width: "100%" }}>
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-mars"></i>
                  </span>
                  <Dropdown
                    value={formData.refUserRelation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        refUserRelation: e.target.value,
                      })
                    }
                    options={familyRelationOpt}
                    style={{ textAlign: "left" }}
                    placeholder="Select Relation"
                    name="refUserRelation"
                    className="addFamilyDropdown"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                </div>
              </div>

              <div className="inputBox">
                <label>Verify Password <span style={{ color: "red" }}>*</span></label>
                <div className="addFamilyInputField" style={{ width: "100%" }}>
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-key"></i>
                  </span>
                              <Password
                                type="password"
                                name="refUserPassword"
                                toggleMask
                                placeholder="Enter Password"
                                value={formData.refUserPassword}
                                required
                                onChange={(e) => setFormData((prevData) => ({
                                  ...prevData,
                                  refUserPassword: e.target.value,
                                }))}
                                feedback={false}
                              />
                              </div>
              </div>
            </div>
          )}
        </div>

        <IonModal
          id="ion-custom-modal-03"
          onDidDismiss={() => setIsOpen(false)}
          isOpen={isOpen}
        >
          <IonContent>
            <IonToolbar>
              <IonTitle>Select User</IonTitle>
            </IonToolbar>
            <IonList>
              {userData.map((item, index) => (
                <IonItem
                  key={item.refUserId}
                  button
                  onClick={() => handleItemClick(item)}
                >
                  <div className="profile_top_bar_avatar" style={{marginRight: "1rem"}}>
              <span>
                {item.refUserFname.charAt(0) +
                  item.refUserLname?.charAt(0)}
              </span>
              </div>
                  <IonLabel>
                    <h2>{item.refUserFname + " " + item.refUserLname}</h2>
                    <p>{item.refUserCustId}</p>
                    <p>{item.refGender}</p>
                    <p>{item.refDistrict}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>

      {selectedUser &&
      <IonFooter>
        <IonToolbar>
          <IonTitle onClick={() => {
            if(verifyForm()) {
              linkUser();
            }
          }}>Link User</IonTitle>
        </IonToolbar>
      </IonFooter>
}

      <Toast
        isOpen={toastOpen.status}
        message={toastOpen.message}
        textColor={toastOpen.textColor}
        onClose={() =>
          setToastOpen({ status: false, message: "", textColor: "black" })
        }
      />

<CustomIonLoading isOpen={loading} />

    </IonPage>
  );
};

export default LinkFamilyMember;
