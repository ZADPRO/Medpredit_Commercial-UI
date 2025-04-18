import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack, closeSharp, createOutline, settings } from "ionicons/icons";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import axios from "axios";
import decrypt from "../../../helper";
import Toast from "../../CustomIonToast/CustomIonToast";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const UserProfile: React.FC = () => {
  const [selectedSegment, setSelectedSegment] =
    useState<string>("Personal Details");
  const [isEditing, setIsEditing] = useState(false);

  const userDetails = localStorage.getItem("userDetails");

  const { t, i18n } = useTranslation("global");

  const userDeatilsObj = userDetails
    ? JSON.parse(userDetails)
    : { userId: null, token: null };

  console.log(userDeatilsObj);

  const history = useHistory();
  const [toastOpen, setToastOpen] = useState<{
    status: boolean;
    message: string;
    position?: "bottom" | "top" | "middle"; // Make position optional
    textColor?: string;
  }>({
    status: false,
    message: "",
    position: "bottom",
    textColor: "black", // Optional fields don't require a default value
  });
  const [isOpen, setIsOpen] = useState(false);

  const [occupationModel, setOccupationModel] = useState(false);
  const [occupationalSector, setOccupationalSector] = useState(false);
  const occupationData = [
    {
      category: t("userProfile.Professional"),
      heading: t("userProfile.Top level management of any organisation"),
      content:
        t("userProfile.Example1"),
    },
    {
      category: t("userProfile.SemiProfessional"),
      heading: t("userProfile.Mid level management of any organisation"),
      content:
        t("userProfile.Example2"),
    },
    {
      category: t("userProfile.ClericalShopOwnerFarmer"),
      heading: "",
      content: t("userProfile.Example3"),
    },
    {
      category: t("userProfile.SkilledWorker"),
      heading: t("userProfile.Technicians with a degree certificate related to the work"),
      content:
        t("userProfile.Tailor, mason, carpenter, Electrician, plumber, factory machine operator"),
    },
    {
      category: t("userProfile.SemiSkilledWorker"),
      heading: t("userProfile.Technicians without degree certificate related to the work"),
      content:
        t("userProfile.Example4"),
    },
    {
      category: t("userProfile.UnskilledWorker"),
      heading: t("userProfile.Helpers"),
      content:
        t("userProfile.sweepers, gardeners, helpers in construction site, house keeping, office unskilled assistants etc"),
    },
    {
      category: t("userProfile.Homemaker"),
      heading: "",
      content: t("userProfile.Family member who are involved in domestic chores of a family"),
    },
    {
      category: t("userProfile.Unemployed"),
      heading: "",
      content: t("userProfile.Those who are not employed in any of the organisation"),
    },
    {
      category: t("userProfile.Student"),
      heading: "",
      content:
        t("userProfile.Those who are involved in learning activity and not employed in any organisation"),
    },
  ];

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const genderOpt: any = [{
    label: t("userProfile.Male"),
    value: "Male"
  }, {
    label: t("userProfile.Female"),
    value: "Female"
  }, {
    label: t("userProfile.Transgender"),
    value: "Transgender"
  }];
  const refMaritalStatus: any = [{
    label: t("userProfile.Male"),
    value: "Married"
  }, {
    label: t("userProfile.Female"),
    value: "Unmarried"
  }];
  const educationOpt: { label: string; value: string }[] = [
    { label: t("userProfile.Illiteracy"), value: "Illiteracy" },
    { label: t("userProfile.PrimarySchool"), value: "PrimarySchool" },
    { label: t("userProfile.MiddleSchool"), value: "MiddleSchool" },
    { label: t("userProfile.HigherSecondary"), value: "HigherSecondary" },
    { label: t("userProfile.Undergraduate"), value: "Undergraduate" },
    { label: t("userProfile.Postgraduate"), value: "Postgraduate" },
  ];
  const occupationCategoryOpt: { label: string; value: string }[] = [
    { label: t("userProfile.Professional"), value: "Professional" },
    { label: t("userProfile.SemiProfessional"), value: "SemiProfessional" },
    { label: t("userProfile.ClericalShopOwnerFarmer"), value: "ClericalShopOwnerFarmer" },
    { label: t("userProfile.SkilledWorker"), value: "SkilledWorker" },
    { label: t("userProfile.SemiSkilledWorker"), value: "SemiSkilledWorker" },
    { label: t("userProfile.UnskilledWorker"), value: "UnskilledWorker" },
    { label: t("userProfile.Homemaker"), value: "Homemaker" },
    { label: t("userProfile.Unemployed"), value: "Unemployed" },
    { label: t("userProfile.Student"), value: "Student" },
  ];


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropdownChange = (e: any, field: string) => {
    const selectedValue = e.value;
    console.log(e.value)
    setFormData({
      ...formData,
      [field]: selectedValue,
    });
  };

  const [formData, setFormData] = useState({
    id: "",
    refUserFname: "",
    refUserLname: "",
    refUserEmail: "",
    refGender: null as string | null,
    refMaritalStatus: null as string | null,
    refDOB: null as any | null,
    refEducation: "",
    refOccupationLvl: "",
    activeStatus: "",
    updatedBy: "",
    refSector: "",
    refAddress: "",
    refDistrict: "",
    refPincode: null as any | null,
    refUserMobileno: "",
  });

  const fetchUserDetals = () => {
    try {
      axios
        .post(
          `${import.meta.env.VITE_API_COMMERCIAL_URL}/getUsers`,
          {
            userId: userDeatilsObj.userId,
          },
          {
            headers: {
              Authorization: userDeatilsObj.token,
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
            if (data.result.length > 0) {
              setFormData(data.result[0]);
            }
          }
        });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetals();
    if (localStorage.getItem("detailsFlag") === "true") {
      setIsEditing(true);
      setToastOpen({ status: true, textColor: "red", position: "top", message: "Please Complete your Profile" });
    }
  }, []);

  const handleSave = () => {
    if (verifyForm1() && verifyForm2() && verifyForm3()) {
      updateUSerDetails();
      if (localStorage.getItem("detailsFlag") === "true") {
        setToastOpen({ status: true, textColor: "green", message: "Profile Complete!" });
        setTimeout(() => {
          history.replace("/home");
          localStorage.setItem("detailsFlag", "false");
        }, 3000);
      } else {
        setToastOpen({ status: true, textColor: "green", message: "Profile Saved" });
      }
    };
  };

  const updateUSerDetails = async () => {
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;
        console.log(token);
        const response = await axios.post(
          `${import.meta.env.VITE_API_COMMERCIAL_URL}/userupdate`,
          {
            id: userDeatilsObj.userId,
            refUserFname: formData.refUserFname,
            refUserLname: formData.refUserLname,
            refUserEmail: formData.refUserEmail,
            refDOB: formData.refDOB,
            refMaritalStatus: formData.refMaritalStatus,
            refEducation: formData.refEducation,
            refOccupationLvl: formData.refOccupationLvl,
            refSector: formData.refSector,
            refAddress: formData.refAddress,
            refDistrict: formData.refDistrict,
            refPincode: formData.refPincode,
            refGender: formData.refGender,
            activeStatus: formData.activeStatus,
            updatedBy: userDeatilsObj.userId,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        console.log(data);

        if (data.status) {
          fetchUserDetals();
          setIsEditing(false);
          updateLocalStorage();
        }
      } catch {
        console.error("tesitng - false");
      }
    } else {
      console.log("Token Invalid");
    }
  };

  const updateLocalStorage = () => {
    const userDetails = JSON.parse(
      localStorage.getItem("userDetails") || "{}"
    );
    // Update only firstName and lastName
    userDetails.firstName = formData.refUserFname;
    userDetails.lastName = formData.refUserLname;
    userDetails.phNumber = formData.refUserMobileno;
    // Save back to localStorage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  };

  const verifyForm1 = () => {
    if (formData.refUserFname.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid First Name" });
      return false;
    } else if (formData.refUserLname.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid Last Name" });
      return false;
    } else if (!formData.refGender || formData.refGender === "-") {
      setToastOpen({ status: true, textColor: "red", message: "Select Gender" });
      return false;
    } else if (!formData.refDOB || formData.refDOB === "-") {
      setToastOpen({ status: true, textColor: "red", message: "Enter Date of Birth" });
      return false;
    } else if (!formData.refMaritalStatus || formData.refMaritalStatus === "-") {
      setToastOpen({ status: true, textColor: "red", message: "Select Marital Status" });
      return false;
    }
    return true;
  };

  const verifyForm2 = () => {
    if (formData.refEducation.length === 0 || formData.refEducation === "-") {
      setToastOpen({ status: true, textColor: "red", message: "Select Education" });
      return false;
    } else if (formData.refOccupationLvl == null || formData.refOccupationLvl === "-" || formData.refOccupationLvl.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Select Occupation Category" });
      return false;
    } else if (formData.refSector.length === 0 || formData.refSector === "-") {
      setToastOpen({ status: true, textColor: "red", message: "Enter Sector" });
      return false;
    }
    return true;
  };

  const verifyForm3 = () => {
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.refUserEmail) ||
      formData.refUserEmail.length === 0
    ) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid Email" });
      return false;
    } else if (formData.refAddress.length === 0 || formData.refAddress === "-") {
      setToastOpen({ status: true, textColor: "red", message: "Enter Address" });
      return false;
    } else if (formData.refDistrict.length === 0 || formData.refDistrict === "-") {
      setToastOpen({ status: true, textColor: "red", message: "Enter District" });
      return false;
    } else if (formData.refPincode.length === 0 || formData.refPincode === "-") {
      setToastOpen({ status: true, textColor: "red", message: "Enter Pincode" });
      return false;
    }
    return true;
  };

  return (
    <IonPage className="cus-ion-page">
      <IonHeader>
        <IonToolbar>
          {localStorage.getItem("detailsFlag") == "false" && (
            <IonButtons slot="start">
              <IonBackButton
                mode="md"
                icon={chevronBack}
                defaultHref="/home"
              />
            </IonButtons>
          )}
          <IonTitle>{t("userProfile.My Profile")}</IonTitle>
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => setIsEditing(!isEditing)}
          >
            <IonIcon icon={isEditing ? closeSharp : createOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonSegment
          id="userProfile-ion-segment"
          value={selectedSegment}
          onIonChange={(e) => setSelectedSegment(e.detail.value as string)}
        >
          <IonSegmentButton
            value="Personal Details"
            contentId="Personal Details"
          >
            <IonLabel>{t("userProfile.Personal")}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Career Details" contentId="Career Details">
            <IonLabel>{t("userProfile.Career")}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="Contact Details"
            contentId="Contact Details"
          >
            <IonLabel>{t("userProfile.Contact")}</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonSegmentView id="userProfile-ion-segment-view">
          <IonSegmentContent id="Personal Details">
            <div className="inputBox">
              <label>
                {t("Register User.First Name")} <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  disabled={!isEditing}
                  value={formData.refUserFname}
                  onChange={handleInputChange}
                  placeholder={t("Register User.Enter") + " " + t("Register User.First Name")}
                  name="refUserFname"
                />
              </div>
            </div>
            {/* Last Name */}
            <div className="inputBox">
              <label>
                {t("Register User.Last Name")} <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refUserLname}
                  onChange={handleInputChange}
                  placeholder={t("Register User.Enter") + " " + t("Register User.Last Name")}
                  name="refUserLname"
                />
              </div>
            </div>
            {/* Gender */}
            <div className="inputBox">
              <label>
                {t("userProfile.Gender")} <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
                style={{ width: "100%" }}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-mars"></i>
                </span>
                <Dropdown
                  value={formData.refGender}
                  onChange={(e) => handleDropdownChange(e, "refGender")}
                  options={genderOpt}
                  optionLabel="label"
                  optionValue="value"
                  style={{ textAlign: "left" }}
                  placeholder={t("userProfile.Select") + " " + t("userProfile.Gender")}
                  name="refGender"
                  className="addFamilyDropdown"
                  disabled={!isEditing ? true : false}
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
            </div>
            {/* Date of Birth */}
            <div className="inputBox">
              <label>
                {t("userProfile.Date of Birth")} <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-calendar "></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refDOB ? (formData.refDOB == "-" ? new Date().toISOString().split("T")[0] : formData.refDOB.split("T")[0]) : ""}
                  placeholder={t("userProfile.Date of Birth")}
                  name="refDOB"
                  onClick={openModal}
                />
              </div>
            </div>
            <IonModal
              isOpen={isOpen}
              id="ion-custom-modal-01"
              initialBreakpoint={1}
              onDidDismiss={closeModal}
              animated={false}
            >
              <div style={{ width: "100%", background: "#effafe" }}>
                <IonDatetime
                  presentation="date"
                  preferWheel={true}
                  value={(formData.refDOB == "-" || !formData.refDOB) ? new Date().toISOString().split("T")[0] : formData.refDOB}
                  onIonChange={(e) => {
                    const selectedDate = e.detail.value;
                    setFormData({
                      ...formData,
                      refDOB: selectedDate,
                    });
                  }}
                ></IonDatetime>
                <Divider />
                <div
                  style={{
                    background: "#effafe",
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    onClick={() => {
                      setFormData({
                        ...formData,
                        refDOB: "",
                      });
                      closeModal();
                    }}
                    style={{
                      width: "40%",
                      background: "var(--med-light-green)",
                      padding: "15px",
                      textAlign: "center",
                      fontSize: "1.1rem",
                      color: "var(--med-dark-green)",
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Clear
                  </div>
                  <div
                    onClick={closeModal}
                    style={{
                      width: "40%",
                      background: "var(--med-dark-green)",
                      padding: "15px",
                      textAlign: "center",
                      fontSize: "1rem",
                      color: "var(--med-light-green)",
                      borderRadius: "10px",
                      fontWeight: "700",
                    }}
                  >
                    Set
                  </div>
                </div>
              </div>
            </IonModal>
            {/* Marital Status */}
            <div className="inputBox">
              <label>
                {t("userProfile.Marital Status")} <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
                style={{ width: "100%" }}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-users"></i>
                </span>
                <Dropdown
                  value={formData.refMaritalStatus}
                  style={{ textAlign: "left" }}
                  onChange={(e) =>
                    handleDropdownChange(e, "refMaritalStatus")
                  }
                  options={refMaritalStatus}
                  placeholder={t("userProfile.Select") + " " + t("userProfile.Marital Status")}
                  name="refGender"
                  className="addFamilyDropdown"
                  disabled={!isEditing ? true : false}
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
            </div>
          </IonSegmentContent>
          <IonSegmentContent id="Career Details">
            {/* Education */}
            <div className="inputBox">
              <label>{t("userProfile.Education")} <span style={{ color: "red" }}>*</span></label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
                style={{ width: "100%" }}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-graduation-cap"></i>
                </span>
                <Dropdown
                  value={formData.refEducation}
                  name="educationOpt"
                  onChange={(e) => handleDropdownChange(e, "refEducation")}
                  options={educationOpt}
                  optionValue="value"
                  style={{ textAlign: "left" }}
                  optionLabel="label"
                  placeholder={t("userProfile.Select") + " " + t("userProfile.Education")}
                  className="addFamilyDropdown"
                  disabled={!isEditing ? true : false}
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
            </div>
            {/* Occupation */}
            <div className="inputBox">
              <label>{t("userProfile.Occupation")} <span style={{ color: "red" }}>*</span></label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
                style={{ width: "100%" }}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-briefcase"></i>
                </span>
                <Dropdown
                  value={formData.refOccupationLvl}
                  name="refOccupationLvl"
                  style={{ textAlign: "left" }}
                  onChange={(e) => handleDropdownChange(e, "refOccupationLvl")}
                  options={occupationCategoryOpt}
                  optionLabel="label"
                  optionValue="value"
                  placeholder={t("userProfile.Occupation") + " " + t("userProfile.Category")}
                  className="addFamilyDropdown"
                  disabled={!isEditing ? true : false}
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
              <label
                onClick={() => {
                  setOccupationModel(true);
                }}
                style={{ marginTop: "10px", textDecoration: "underline" }}
              >
                {t("userProfile.Example")}
              </label>
            </div>
            {/* Sector */}
            <div className="inputBox">
              <label>{t("userProfile.Sector")} <span style={{ color: "red" }}>*</span></label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
                style={{ width: "100%" }}
              >
                {/* <span className="p-inputgroup-addon">
                                                <i className="pi pi-user"></i>
                                              </span> */}
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refSector}
                  onChange={handleInputChange}
                  placeholder={t("Register User.Enter") + " " + t("userProfile.Sector")}
                  name="refSector"
                />
              </div>
              <label
                onClick={() => {
                  setOccupationalSector(true);
                }}
                style={{ marginTop: "10px", textDecoration: "underline" }}
              >
                {t("userProfile.Example")}
              </label>
            </div>

            {/* Occupation Model */}
            <IonModal
              isOpen={occupationModel}
              id="med-modal"
              initialBreakpoint={1}
              onDidDismiss={() => {
                setOccupationModel(false);
              }}
              animated={false}
            >
              <div className="doctor-modal-content">
                {/* Header */}

                {/* Content */}
                <div
                  style={{
                    marginBottom: "10px",
                    overflow: "auto",
                    height: "50vh",
                  }}
                >
                  <table
                    className="table custom-table"
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#f4f4f9",
                          textAlign: "left",
                        }}
                      >
                        <th
                          style={{
                            width: "40%",
                            fontSize: "1rem",
                            padding: "12px",
                            borderBottom: "1px solid #e0e0e0",
                          }}
                        >
                          {t("userProfile.Occupational Category")}
                        </th>
                        <th
                          style={{
                            width: "60%",
                            fontSize: "1rem",
                            padding: "12px",
                            borderBottom: "1px solid #e0e0e0",
                          }}
                        >
                          {t("userProfile.Definition with example")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {occupationData.map((element: any, index: number) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                          }}
                        >
                          <td
                            align="center"
                            style={{
                              padding: "10px",
                              borderBottom: "1px solid #e0e0e0",
                              fontWeight: "bold",
                            }}
                          >
                            {element.category}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              borderBottom: "1px solid #e0e0e0",
                              fontSize: "0.9rem",
                            }}
                          >
                            <div>
                              <b>{element.heading}</b>
                            </div>
                            <div style={{ marginTop: "5px" }}>
                              {element.content}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Close Button */}
                <button
                  className="doctor-modal-close-btn ion-activatable ripple-parent rectangle"
                  onClick={() => {
                    setOccupationModel(false);
                  }}
                >
                  <IonRippleEffect></IonRippleEffect>
                  {t("userProfile.Close")}
                </button>
              </div>
            </IonModal>

            {/* Occupational Sector */}
            <IonModal
              isOpen={occupationalSector}
              id="med-modal"
              initialBreakpoint={1}
              onDidDismiss={() => {
                setOccupationalSector(false);
              }}
              animated={false}
            >
              <div className="doctor-modal-content">
                {/* Header */}
                <div className="doctor-modal-header">{t("userProfile.Occupation Sector")}</div>

                {/* Content */}
                <div
                  style={{
                    marginBottom: "10px",
                    overflow: "auto",
                    height: "50vh",
                  }}
                  className="ion-padding"
                >
                  <div>
                    <b>{t("userProfile.Production and Manufacturing")}</b>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      marginTop: "10px",
                    }}
                  >
                    <li>{t("userProfile.Agriculture and fishing")}</li>
                    <li>{t("userProfile.Mining and Quarrying")}</li>
                    <li>{t("userProfile.Forestry")}</li>
                    <li>{t("userProfile.Food processing")}</li>
                    <li>{t("userProfile.Factories and industries")}</li>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        marginTop: "5px",
                        paddingLeft: "10px",
                      }}
                    >
                      <li>{t("userProfile.Textiles")}</li>
                      <li>{t("userProfile.Automobiles")}</li>
                      <li>{t("userProfile.Electrical and electronics")}</li>
                      <li>{t("userProfile.Mechanical")}</li>
                      <li>{t("userProfile.Constructions")}</li>
                    </div>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <b>{t("userProfile.Service sectors")}</b>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      marginTop: "10px",
                    }}
                  >
                    <li>{t("userProfile.Health care")}</li>
                    <li>{t("userProfile.Education")}</li>
                    <li>{t("userProfile.Sales and marketing")}</li>
                    <li>{t("userProfile.IT and software solutions")}</li>
                    <li>{t("userProfile.Finance and banking")}</li>
                    <li>{t("userProfile.Transport and logistics- road and railways")}</li>
                    <li>{t("userProfile.Hotels and lodges")}</li>
                    <li>{t("userProfile.Media")}</li>
                    <li>{t("userProfile.Judicial")}</li>
                    <li>{t("userProfile.Defence and police")}</li>
                    <li>{t("userProfile.Disaster management and rescue")}</li>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <b>{t("userProfile.Others")}</b>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      marginTop: "10px",
                    }}
                  >
                    <li>{t("userProfile.Research and development")}</li>
                    <li>{t("userProfile.Consultancy")}</li>
                    <li>{t("userProfile.Advisories")}</li>
                    <li>{t("userProfile.Intelligence")}</li>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  className="doctor-modal-close-btn ion-activatable ripple-parent rectangle"
                  onClick={() => {
                    setOccupationalSector(false);
                  }}
                >
                  <IonRippleEffect></IonRippleEffect>
                  {t("userProfile.Close")}
                </button>
              </div>
            </IonModal>
          </IonSegmentContent>
          <IonSegmentContent id="Contact Details">
            {/* Mobile Number */}
            <div className="inputBox">
              <label>
                {t("Register User.Mobile Number")} <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className="p-inputgroup addFamilyInputField inputDisabled"
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-phone"></i>
                </span>
                <InputText
                  type="number"
                  className="addFamilyInputText"
                  value={formData.refUserMobileno}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) {
                      handleInputChange(e);
                    }
                  }}
                  maxLength={10} // Ensures max length of 10
                  placeholder={t("Register User.Enter") + " " + t("Register User.Mobile Number")}
                  name="refUserMobileno"
                />
              </div>
            </div>
            <div className="inputBox">
              <label>{t("Register User.E-Mail")} <span style={{ color: "red" }}>*</span></label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-envelope"></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refUserEmail}
                  onChange={handleInputChange}
                  placeholder={t("Register User.Enter") + " " + t("Register User.E-Mail")}
                  name="refUserEmail"
                />
              </div>
            </div>
            {/* Address */}
            <div className="inputBox">
              <label>{t("userProfile.Address")} <span style={{ color: "red" }}>*</span></label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-map-marker"></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refAddress}
                  onChange={handleInputChange}
                  placeholder={t("Register User.Enter") + " " + t("userProfile.Address")}
                  name="refAddress"
                />
              </div>
            </div>
            {/* District */}
            <div className="inputBox">
              <label>{t("userProfile.District")} <span style={{ color: "red" }}>*</span></label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-map-marker"></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refDistrict}
                  onChange={handleInputChange}
                  placeholder={t("Register User.Enter") + " " + t("userProfile.District")}
                  name="refDistrict"
                />
              </div>
            </div>
            {/* Pincode */}
            <div className="inputBox">
              <label>{t("userProfile.Pincode")} <span style={{ color: "red" }}>*</span></label>
              <div
                className={`p-inputgroup addFamilyInputField ${!isEditing ? "inputDisabled" : ""
                  }`}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-map-marker"></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  type="number"
                  value={formData.refPincode}
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    if (inputValue.length <= 6) {
                      handleInputChange(e);
                    }
                  }}
                  maxLength={6}
                  placeholder={t("Register User.Enter") + " " + t("userProfile.Pincode")}
                  name="refPincode"
                />
              </div>
            </div>
          </IonSegmentContent>
        </IonSegmentView>
      </IonContent>
      {isEditing && (
        <IonFooter>
          <IonToolbar>
            <IonTitle onClick={() => handleSave()}>{t("userProfile.Save")}</IonTitle>
          </IonToolbar>
        </IonFooter>
      )}

      <Toast
        isOpen={toastOpen.status}
        message={toastOpen.message}
        textColor={toastOpen.textColor}
        position={toastOpen.position}
        onClose={() => setToastOpen({ status: false, message: "", textColor: "black" })}
      />
    </IonPage>
  );
};

export default UserProfile;
