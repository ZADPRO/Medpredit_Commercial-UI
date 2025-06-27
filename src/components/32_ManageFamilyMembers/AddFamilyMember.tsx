import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  chevronBack,
  information,
  informationCircleOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import Toast from "../CustomIonToast/CustomIonToast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import decrypt from "../../helper";
import axios from "axios";
import { useHistory } from "react-router";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { Password } from "primereact/password";
import { useTranslation } from "react-i18next";
import BackNavigationGuard from "../BackNavigationGuard/BackNavigationGuard ";

const AddFamily: React.FC = () => {
  const { t } = useTranslation("global");
  const [formPage, setFormPage] = useState(1);
  const steps = [1, 2, 3, 4]; // Define steps for the form
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const userDetails = localStorage.getItem("userDetails");

  const userDeatilsObj = userDetails
    ? JSON.parse(userDetails)
    : { userCustId: null, phNumber: null, firstName: null, lastName: null };

  const [toastOpen, setToastOpen] = useState({
    status: false,
    message: "",
    textColor: "black",
  });
  const genderOpt: any = [
    {
      label: t("userProfile.Male"),
      value: "Male",
    },
    {
      label: t("userProfile.Female"),
      value: "Female",
    },
    {
      label: t("userProfile.Transgender"),
      value: "Transgender",
    },
  ];
  const refMaritalStatus: any = [
    {
      label: t("userProfile.Married"),
      value: "Married",
    },
    {
      label: t("userProfile.Unmarried"),
      value: "Unmarried",
    },
  ];
  const educationOpt: { label: string; value: string }[] = [
    { label: t("userProfile.Illiteracy"), value: "Illiteracy" },
    { label: t("userProfile.Primary School"), value: "Primary School" },
    { label: t("userProfile.Middle School"), value: "Middle School" },
    { label: t("userProfile.Higher Secondary"), value: "Higher Secondary" },
    { label: t("userProfile.Undergraduate"), value: "Undergraduate" },
    { label: t("userProfile.Postgraduate"), value: "Postgraduate" },
  ];
  const occupationCategoryOpt: { label: string; value: string }[] = [
    { label: t("userProfile.Professional"), value: "Professional" },
    { label: t("userProfile.SemiProfessional"), value: "SemiProfessional" },
    {
      label: t("userProfile.ClericalShopOwnerFarmer"),
      value: "ClericalShopOwnerFarmer",
    },
    { label: t("userProfile.SkilledWorker"), value: "SkilledWorker" },
    { label: t("userProfile.SemiSkilledWorker"), value: "SemiSkilledWorker" },
    { label: t("userProfile.UnskilledWorker"), value: "UnskilledWorker" },
    { label: t("userProfile.Homemaker"), value: "Homemaker" },
    { label: t("userProfile.Unemployed"), value: "Unemployed" },
    { label: t("userProfile.Student"), value: "Student" },
  ];

  const [occupationModel, setOccupationModel] = useState(false);
  const [occupationalSector, setOccupationalSector] = useState(false);

  const occupationData = [
    {
      category: t("userProfile.Professional"),
      heading: t("userProfile.Top level management of any organisation"),
      content: t("userProfile.Example1"),
    },
    {
      category: t("userProfile.SemiProfessional"),
      heading: t("userProfile.Mid level management of any organisation"),
      content: t("userProfile.Example2"),
    },
    {
      category: t("userProfile.ClericalShopOwnerFarmer"),
      heading: "",
      content: t("userProfile.Example3"),
    },
    {
      category: t("userProfile.SkilledWorker"),
      heading: t(
        "userProfile.Technicians with a degree certificate related to the work"
      ),
      content: t(
        "userProfile.Tailor, mason, carpenter, Electrician, plumber, factory machine operator"
      ),
    },
    {
      category: t("userProfile.SemiSkilledWorker"),
      heading: t(
        "userProfile.Technicians without degree certificate related to the work"
      ),
      content: t("userProfile.Example4"),
    },
    {
      category: t("userProfile.UnskilledWorker"),
      heading: t("userProfile.Helpers"),
      content: t(
        "userProfile.sweepers, gardeners, helpers in construction site, house keeping, office unskilled assistants etc"
      ),
    },
    {
      category: t("userProfile.Homemaker"),
      heading: "",
      content: t(
        "userProfile.Family member who are involved in domestic chores of a family"
      ),
    },
    {
      category: t("userProfile.Unemployed"),
      heading: "",
      content: t(
        "userProfile.Those who are not employed in any of the organisation"
      ),
    },
    {
      category: t("userProfile.Student"),
      heading: "",
      content: t(
        "userProfile.Those who are involved in learning activity and not employed in any organisation"
      ),
    },
  ];

  const familyRelationOpt: { label: string; value: string }[] = [
    { label: t("link.Father"), value: "Father" },
    { label: t("link.Mother"), value: "Mother" },
    { label: t("link.Brother"), value: "Brother" },
    { label: t("link.Sister"), value: "Sister" },
    { label: t("link.Spouse"), value: "Spouse" },
    { label: t("link.Son"), value: "Son" },
    { label: t("link.Daughter"), value: "Daughter" },
    { label: t("link.Other"), value: "Other" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [formData, setFormData] = useState({
    refUserFname: "",
    refUserLname: "",
    refUserEmail: "",
    refUserPassword: "",
    refUserConPassword: "",
    refGender: null as string | null,
    refMaritalStatus: null as string | null,
    refDOB: null as any | null,
    refEducation: "",
    refProfession: "",
    refSector: "",
    refAddress: "",
    refDistrict: "",
    refPincode: "",
    refUserMobileno: userDeatilsObj.phNumber,
    isSame: false,
    mobilenumber: "",
    userpassword: "",
    realtionType: "",
    otherRelationType: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropdownChange = (e: any, field: string) => {
    const selectedValue = e.value;
    setFormData({
      ...formData,
      [field]: selectedValue,
    });
  };

  const handleNextPage = () => {
    if (formPage < steps.length) {
      setFormPage(formPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (formPage > 1) {
      setFormPage(formPage - 1);
    }
  };

  const verifyForm1 = () => {
    if (formData.refUserFname.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: t("add.Enter Valid First Name"),
      });
      return false;
    } else if (formData.refUserLname.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: t("add.Enter Valid Last Name"),
      });
      return false;
    } else if (!formData.refGender) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: t("userProfile.Select") + " " + t("userProfile.Gender"),
      });
      return false;
    } else if (!formData.refDOB) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: t("userProfile.Select") + " " + t("userProfile.Date of Birth"),
      });
      return false;
    } else if (!formData.refMaritalStatus) {
      setToastOpen({
        status: true,
        textColor: "red",
        message:
          t("userProfile.Select") + " " + t("userProfile.Marital Status"),
      });
      return false;
    }
    return true;
  };

  const verifyForm2 = () => {
    if (formData.refEducation.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: t("userProfile.Select") + " " + t("userProfile.Education"),
      });
      return false;
    } else if (formData.refProfession.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message:
          t("userProfile.Select") +
          " " +
          t("userProfile.Occupational Category"),
      });
      return false;
    } else if (formData.refSector.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: t("Register User.Enter") + " " + t("userProfile.Sector"),
      });
      return false;
    }
    return true;
  };

  const verifyForm3 = () => {
    if (
      formData.refUserEmail.length > 0 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.refUserEmail)
    ) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: t("link.Enter Valid Email ID"),
      });
      return false;
    } else if (formData.refAddress.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: t("Register User.Enter") + " " + t("userProfile.Address"),
      });
      return false;
    } else if (formData.refDistrict.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: t("Register User.Enter") + " " + t("userProfile.District"),
      });
      return false;
    } else if (formData.refPincode.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: t("Register User.Enter") + " " + t("userProfile.Pincode"),
      });
      return false;
    }
    return true;
  };

  const verifyForm4 = () => {
    if (formData.realtionType.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: t("link.Select a Relation Type"),
      });
      return false;
    } else if (formData.realtionType == "Others") {
      if (formData.otherRelationType.length === 0) {
        setToastOpen({
          status: true,
          textColor: "red",
          message: "Specify Relation Type",
        });
        return false;
      }
    } else if (formData.isSame == false) {
      if (!formData.mobilenumber || !/^\d{10}$/.test(formData.mobilenumber)) {
        setToastOpen({
          status: true,
          textColor: "red",
          message: t("link.Enter Valid Mobile Number"),
        });
        return false;
      } else if (
        formData.userpassword.length === 0 || // Check if password is empty
        !/[a-zA-Z]/.test(formData.userpassword) || // Must contain at least one letter
        !/\d/.test(formData.userpassword) || // Must contain at least one digit
        !/[!@#$%^&*(),.?":{}|<>]/.test(formData.userpassword) || // Must contain at least one special character
        formData.userpassword.length < 8
      ) {
        setToastOpen({
          status: true,
          textColor: "red",
          message: t("add.Enter Valid Password"),
        });
        return false;
      } else if (formData.userpassword !== formData.refUserConPassword) {
        setToastOpen({
          status: true,
          message: t("Register User.Passwords do not match"),
          textColor: "red",
        });
        return false;
      }
    }
    return true;
  };

  const handleSignup = async () => {
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        const response = await axios.post(
          `${import.meta.env.VITE_API_COMMERCIAL_URL}/postFamilyMembers`,
          {
            refUserId: tokenObject.userId,
            refUserFname: formData.refUserFname,
            refUserLname: formData.refUserLname,
            refUserEmail: formData.refUserEmail,
            refDOB: formData.refDOB,
            refMaritalStatus: formData.refMaritalStatus,
            refEducation: formData.refEducation,
            refProfession: formData.refProfession,
            refSector: formData.refSector,
            refAddress: formData.refAddress,
            refDistrict: formData.refDistrict,
            refPincode: formData.refPincode,
            refUserMobileno: tokenObject.phNumber,
            refGender: formData.refGender,
            isSame: formData.isSame,
            mobilenumber: formData.mobilenumber,
            userpassword: formData.userpassword,
            realtionType:
              formData.realtionType == "Others"
                ? formData.otherRelationType
                : formData.realtionType,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        console.log(data);

        if (data.status) {
          setToastOpen({
            status: true,
            textColor: "green",
            message: "Successfully Signup",
          });

          setTimeout(() => {
            history.replace("/manageFamily", { refreshFamily: true });

            setFormData({
              refUserFname: "",
              refUserLname: "",
              refUserEmail: "",
              refUserPassword: "",
              refUserConPassword: "",
              refGender: null as string | null,
              refMaritalStatus: null as string | null,
              refDOB: null as any | null,
              refEducation: "",
              refProfession: "",
              refSector: "",
              refAddress: "",
              refDistrict: "",
              refPincode: "",
              refUserMobileno: tokenObject.phNumber,
              isSame: false,
              mobilenumber: "",
              userpassword: "",
              realtionType: "",
              otherRelationType: "",
            });
          }, 3000);
        } else {
          setLoading(false);
          setToastOpen({
            status: true,
            message: "Already Mobile Number Exists",
            textColor: "red",
          });
        }
      } catch {
        console.error("tesitng - false");
      }
    } else {
      console.log("Token Invalid");
    }
  };

  return (
    <IonPage className="">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>{t("add.Add Family Member")}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div
          style={{
            width: "95%",
            margin: "0 auto",
          }}
        >
          {formPage === 1 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  paddingTop: "0px",
                  paddingBottom: "5px",
                  color: "#45474b",
                }}
              >
                <div
                  style={{
                    fontSize: "1.3rem",
                    paddingRight: "5px",
                    fontWeight: "700",
                  }}
                >
                  0%
                </div>
                <div>{t("add.Complete")}</div>
              </div>

              <div
                style={{
                  fontSize: "1.3rem",
                  paddingRight: "5px",
                  fontWeight: "700",
                  paddingBottom: "20px",
                  color: "#45474b",
                }}
              >
                {t("add.Personal Details")}
              </div>
            </>
          ) : formPage === 2 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  paddingTop: "0px",
                  paddingBottom: "5px",
                  color: "#45474b",
                }}
              >
                <div
                  style={{
                    fontSize: "1.3rem",
                    paddingRight: "5px",
                    fontWeight: "700",
                  }}
                >
                  25%
                </div>
                <div>{t("add.Complete")}</div>
              </div>

              <div
                style={{
                  fontSize: "1.3rem",
                  paddingRight: "5px",
                  fontWeight: "700",
                  paddingBottom: "20px",
                  color: "#45474b",
                }}
              >
                {t("add.Skills Details")}
              </div>
            </>
          ) : formPage === 3 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  paddingTop: "0px",
                  paddingBottom: "5px",
                  color: "#45474b",
                }}
              >
                <div
                  style={{
                    fontSize: "1.3rem",
                    paddingRight: "5px",
                    fontWeight: "700",
                  }}
                >
                  50%
                </div>
                <div>{t("add.Complete")}</div>
              </div>

              <div
                style={{
                  fontSize: "1.3rem",
                  paddingRight: "5px",
                  fontWeight: "700",
                  paddingBottom: "20px",
                  color: "#45474b",
                }}
              >
                {t("add.Communication Details")}
              </div>
            </>
          ) : formPage === 4 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  paddingTop: "0px",
                  paddingBottom: "5px",
                  color: "#45474b",
                }}
              >
                <div
                  style={{
                    fontSize: "1.3rem",
                    paddingRight: "5px",
                    fontWeight: "700",
                  }}
                >
                  75%
                </div>
                <div>{t("add.Complete")}</div>
              </div>

              <div
                style={{
                  fontSize: "1.3rem",
                  paddingRight: "5px",
                  fontWeight: "700",
                  paddingBottom: "20px",
                  color: "#45474b",
                }}
              >
                {t("add.Account Details")}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "0px",
          }}
        >
          {steps.map((step) => (
            <div
              key={step}
              style={{
                width: "20%",
                height: "4px",
                background:
                  formPage >= step
                    ? "var(--med-light-green)"
                    : "var(--med-dark-green)",
                borderRadius: "4px",
                transition: "background 0.5s ease-in-out",
              }}
            ></div>
          ))}
        </div>

        {/* Form Content */}
        <div className="form-page">
          {formPage === 1 && (
            <div style={{ padding: "15px" }}>
              {/* First Name */}
              <div className="inputBox">
                <label>
                  {t("Register User.First Name")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="p-inputgroup addFamilyInputField">
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText
                    style={{ width: "100%", textAlign: "left" }}
                    className="addFamilyInputText"
                    value={formData.refUserFname}
                    onChange={handleInputChange}
                    placeholder={
                    
                     t("Register User.First")+
                      " " +
                      t("Register User.Enter")
                    }
                    name="refUserFname"
                  />
                </div>
              </div>
              {/* Last Name */}
              <div className="inputBox">
                <label>
                  {t("Register User.Last Name")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="p-inputgroup addFamilyInputField">
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText
                    style={{ width: "100%", textAlign: "left" }}
                    className="addFamilyInputText"
                    value={formData.refUserLname}
                    onChange={handleInputChange}
                    placeholder={
                      t("Register User.Last") + " " + t("Register User.Enter")
                    }
                    name="refUserLname"
                  />
                </div>
              </div>
              {/* Gender */}
              <div className="inputBox">
                <label>
                  {t("userProfile.Gender")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="addFamilyInputField" style={{ width: "100%" }}>
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-mars"></i>
                  </span>
                  <Dropdown
                    value={formData.refGender}
                    onChange={(e) => handleDropdownChange(e, "refGender")}
                    options={genderOpt}
                    optionValue="value"
                    optionLabel="label"
                    style={{ textAlign: "left" }}
                    placeholder={
                      t("userProfile.Select") + " " + t("userProfile.Gender")
                    }
                    name="refGender"
                    className="addFamilyDropdown"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                </div>
              </div>
              {/* Date of Birth */}
              <div className="inputBox">
                <label>
                  {t("userProfile.Date of Birth")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="p-inputgroup addFamilyInputField">
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-calendar "></i>
                  </span>
                  <InputText
                    style={{ width: "100%", textAlign: "left" }}
                    className="addFamilyInputText"
                    value={formData.refDOB ? formData.refDOB.split("T")[0] : ""}
                    placeholder={
                      t("userProfile.Select") +
                      " " +
                      t("userProfile.Date of Birth")
                    }
                    name="refDOB"
                    onClick={openModal}
                  />
                </div>
              </div>
              <IonModal
                isOpen={isOpen}
                id="med-modal"
                initialBreakpoint={1}
                onDidDismiss={closeModal}
                animated={false}
              >
                <div style={{ width: "100%", background: "#effafe" }}>
                  <IonDatetime
                    presentation="date"
                    preferWheel={true}
                    value={formData.refDOB}
                    max={new Date().toISOString().split("T")[0]}
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
                  {t("userProfile.Marital Status")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="addFamilyInputField" style={{ width: "100%" }}>
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
                    optionValue="value"
                    optionLabel="label"
                    placeholder={t("userProfile.Marital Status")}
                    name="refGender"
                    className="addFamilyDropdown"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                </div>
              </div>
            </div>
          )}
          {formPage === 2 && (
            <div style={{ padding: "15px" }}>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <IonIcon icon={informationCircleOutline} color="primary" />
                <label style={{ fontSize: "0.8rem" }}>
                  {t("userProfile.CareerInfo")}
                </label>
              </div>

              {/* Education */}
              <div className="inputBox">
                <label>
                  {t("userProfile.Education")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="addFamilyInputField" style={{ width: "100%" }}>
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-graduation-cap"></i>
                  </span>
                  <Dropdown
                    value={formData.refEducation}
                    name="educationOpt"
                    onChange={(e) => handleDropdownChange(e, "refEducation")}
                    options={educationOpt}
                    style={{ textAlign: "left" }}
                    optionLabel="label"
                    optionValue="value"
                    placeholder={
                      t("userProfile.Select") + " " + t("userProfile.Education")
                    }
                    className="addFamilyDropdown"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                </div>
              </div>
              {/* Occupation */}
              <div className="inputBox">
                <label>
                  {t("userProfile.Occupation")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="addFamilyInputField" style={{ width: "100%" }}>
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-briefcase"></i>
                  </span>
                  <Dropdown
                    value={formData.refProfession}
                    name="refProfession"
                    style={{ textAlign: "left" }}
                    onChange={(e) => handleDropdownChange(e, "refProfession")}
                    options={occupationCategoryOpt}
                    optionLabel="label"
                    optionValue="value"
                    placeholder={t("userProfile.Occupational Category")}
                    className="addFamilyDropdown"
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
                <label>
                  {t("userProfile.Sector")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="addFamilyInputField" style={{ width: "100%" }}>
                  {/* <span className="p-inputgroup-addon">
                                              <i className="pi pi-user"></i>
                                            </span> */}
                  <InputText
                    style={{ width: "100%", textAlign: "left" }}
                    className="addFamilyInputText"
                    value={formData.refSector}
                    onChange={handleInputChange}
                    placeholder={
                      t("Register User.Enter") + " " + t("userProfile.Sector")
                    }
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
                  <div className="doctor-modal-header">
                    {t("userProfile.Occupation Sector")}
                  </div>

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
                      <li>
                        {t(
                          "userProfile.Transport and logistics- road and railways"
                        )}
                      </li>
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
            </div>
          )}
          {formPage === 3 && (
            <div style={{ padding: "15px" }}>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <IonIcon icon={informationCircleOutline} color="primary" />
                <label style={{ fontSize: "0.8rem" }}>
                  {t("userProfile.ContactInfo")}
                </label>
              </div>
              {/* Education */}
              <div className="inputBox">
                <label>{t("Register User.E-Mail")}</label>
                <div className="p-inputgroup addFamilyInputField">
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-envelope"></i>
                  </span>
                  <InputText
                    style={{ width: "100%", textAlign: "left" }}
                    className="addFamilyInputText"
                    value={formData.refUserEmail}
                    onChange={handleInputChange}
                    placeholder={
                      t("Register User.Enter") + " " + t("Register User.E-Mail")
                    }
                    name="refUserEmail"
                  />
                </div>
              </div>
              {/* Address */}
              <div className="inputBox">
                <label>
                  {t("userProfile.Address")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="p-inputgroup addFamilyInputField">
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <InputText
                    style={{ width: "100%", textAlign: "left" }}
                    className="addFamilyInputText"
                    value={formData.refAddress}
                    onChange={handleInputChange}
                    placeholder={
                      t("Register User.Enter") + " " + t("userProfile.Address")
                    }
                    name="refAddress"
                  />
                </div>
              </div>
              {/* District */}
              <div className="inputBox">
                <label>
                  {t("userProfile.District")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="p-inputgroup addFamilyInputField">
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <InputText
                    style={{ width: "100%", textAlign: "left" }}
                    className="addFamilyInputText"
                    value={formData.refDistrict}
                    onChange={handleInputChange}
                    placeholder={
                      t("Register User.Enter") + " " + t("userProfile.District")
                    }
                    name="refDistrict"
                  />
                </div>
              </div>
              {/* Pincode */}
              <div className="inputBox">
                <label>
                  {t("userProfile.Pincode")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="p-inputgroup addFamilyInputField">
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
                    placeholder={
                      t("Register User.Enter") + " " + t("userProfile.Pincode")
                    }
                    name="refPincode"
                  />
                </div>
              </div>
            </div>
          )}

          {formPage === 4 && (
            <div style={{ padding: "15px" }}>
              <div className="inputBox">
                <label>
                  {t("link.Relation Type")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="addFamilyInputField" style={{ width: "100%" }}>
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-mars"></i>
                  </span>
                  <Dropdown
                    value={formData.realtionType}
                    onChange={(e) => handleDropdownChange(e, "realtionType")}
                    options={familyRelationOpt}
                    optionValue="value"
                    optionLabel="label"
                    style={{ textAlign: "left" }}
                    placeholder={t("link.Select a Relation Type")}
                    name="realtionType"
                    className="addFamilyDropdown"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                </div>
              </div>

              {formData.realtionType == "Others" && (
                <div className="inputBox">
                  <label>
                    Others - Please Specify{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="p-inputgroup addFamilyInputField">
                    <span className="addFamilyInputField_Icon">
                      <i className="pi pi-user"></i>
                    </span>
                    <InputText
                      style={{ width: "100%", textAlign: "left" }}
                      className="addFamilyInputText"
                      value={formData.otherRelationType}
                      onChange={handleInputChange}
                      placeholder="Enter Relation Type"
                      name="otherRelationType"
                    />
                  </div>
                </div>
              )}

              <div className="inputBox">
                <label>{t("add.Use Same Account Login")}</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <InputSwitch
                    checked={formData.isSame}
                    onChange={(e: InputSwitchChangeEvent) =>
                      setFormData({ ...formData, isSame: e.value })
                    }
                  />
                  <span style={{ fontSize: "0.8rem", fontWeight: "300" }}>
                    {"(" + formData.refUserMobileno + ")"}
                  </span>
                </div>
              </div>

              {formData.isSame == false && (
                <>
                  <div className="inputBox">
                    <label>
                      {t("link.Enter Number")}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <div className="p-inputgroup addFamilyInputField">
                      <span className="addFamilyInputField_Icon">
                        <i className="pi pi-user"></i>
                      </span>
                      <div>
                        <InputText
                          type="number"
                          style={{ width: "100%", textAlign: "left" }}
                          className="addFamilyInputText"
                          value={formData.mobilenumber}
                          onChange={(e) => {
                            const numericValue = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);
                            setFormData((prevData) => ({
                              ...prevData,
                              mobilenumber: numericValue,
                            }));
                          }}
                          placeholder={t("link.Enter Phone Number")}
                          name="mobilenumber"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="inputBox">
                    <label>
                      {t("login.Password")}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                      className="addFamilyInputField"
                      style={{ width: "100%" }}
                    >
                      <span className="addFamilyInputField_Icon">
                        <i className="pi pi-key"></i>
                      </span>
                      <Password
                        style={{ width: "100%", textAlign: "left" }}
                        className="addFamilyInputText"
                        onCopy={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        value={formData.userpassword}
                        onChange={handleInputChange}
                        placeholder={t("Register User.Enter Password")}
                        name="userpassword"
                        toggleMask
                        feedback={false}
                        tabIndex={1}
                      />
                    </div>
                  </div>

                  <div
                    className="inputBox"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      fontWeight: "600",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        color: "#45474b",
                      }}
                    >
                      {/[a-zA-Z]/.test(formData.userpassword) ? (
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            background: "green",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <i
                            style={{ fontSize: "15px", color: "#fff" }}
                            className="pi pi-check"
                          ></i>
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            background: "red",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <i
                            style={{ fontSize: "15px", color: "#fff" }}
                            className="pi pi-times"
                          ></i>
                        </div>
                      )}
                      &nbsp; {t("Register User.Atleast One Character")}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        color: "#45474b",
                      }}
                    >
                      {/\d/.test(formData.userpassword) ? (
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            background: "green",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <i
                            style={{ fontSize: "15px", color: "#fff" }}
                            className="pi pi-check"
                          ></i>
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            background: "red",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <i
                            style={{ fontSize: "15px", color: "#fff" }}
                            className="pi pi-times"
                          ></i>
                        </div>
                      )}
                      &nbsp; {t("Register User.Atleast One Number")}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        color: "#45474b",
                      }}
                    >
                      {/[!@#$%^&*(),.?":{}|<>]/.test(formData.userpassword) ? (
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            background: "green",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <i
                            style={{ fontSize: "15px", color: "#fff" }}
                            className="pi pi-check"
                          ></i>
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            background: "red",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <i
                            style={{ fontSize: "15px", color: "#fff" }}
                            className="pi pi-times"
                          ></i>
                        </div>
                      )}
                      &nbsp; {t("Register User.Atleast One Special Character")}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        color: "#45474b",
                      }}
                    >
                      {formData.userpassword.length > 7 ? (
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            background: "green",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <i
                            style={{ fontSize: "15px", color: "#fff" }}
                            className="pi pi-check"
                          ></i>
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            background: "red",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <i
                            style={{ fontSize: "15px", color: "#fff" }}
                            className="pi pi-times"
                          ></i>
                        </div>
                      )}
                      &nbsp; {t("Register User.Minimum 8 Characters")}
                    </div>
                  </div>

                  <div className="inputBox">
                    <label>
                      {t("Register User.Confirm Password")}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                      className="addFamilyInputField"
                      style={{ width: "100%" }}
                    >
                      <span className="addFamilyInputField_Icon">
                        <i className="pi pi-key"></i>
                      </span>
                      <Password
                        style={{ width: "100%", textAlign: "left" }}
                        className="addFamilyInputText"
                        onCopy={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        value={formData.refUserConPassword}
                        onChange={handleInputChange}
                        placeholder={t("Register User.Confirm Password")}
                        name="refUserConPassword"
                        toggleMask
                        feedback={false}
                        tabIndex={1}
                      />
                    </div>
                  </div>

                  <div
                    className="inputBox"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      fontWeight: "600",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        color: "#45474b",
                      }}
                    >
                      {formData.userpassword === formData.refUserConPassword &&
                      formData.userpassword.length > 0 ? (
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            background: "green",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <i
                            style={{ fontSize: "15px", color: "#fff" }}
                            className="pi pi-check"
                          ></i>
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            background: "red",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <i
                            style={{ fontSize: "15px", color: "#fff" }}
                            className="pi pi-times"
                          ></i>
                        </div>
                      )}
                      &nbsp; {t("Register User.Confirm Password")}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </IonContent>
      <Toast
        isOpen={toastOpen.status}
        message={toastOpen.message}
        textColor={toastOpen.textColor}
        onClose={() =>
          setToastOpen({ status: false, message: "", textColor: "black" })
        }
      />

      <IonFooter>
        <div
          style={{
            textAlign: "center",
            margin: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {formPage === 1 ? (
            <div></div>
          ) : (
            <button
              className="medCustom-button01"
              onClick={handlePreviousPage}
              disabled={formPage === 1}
              style={{ width: "fit-content" }}
            >
              <i className="pi pi-arrow-left"></i>
            </button>
          )}
          {formPage === 4 ? (
            <>
              {loading ? (
                <button
                  style={{ width: "fit-content" }}
                  className="medCustom-button01"
                >
                  <i className="pi pi-spin pi-spinner"></i>
                </button>
              ) : (
                <button
                  style={{ width: "fit-content" }}
                  className="medCustom-button02"
                  onClick={() => {
                    if (formPage === 4) {
                      if (verifyForm4()) {
                        setLoading(true);
                        handleSignup();
                        console.log("SignUp Success");
                      }
                    }
                  }}
                >
                  <span>{t("add.Sign Up")}</span>
                </button>
              )}
            </>
          ) : (
            <button
              style={{ width: "fit-content" }}
              className="medCustom-button01"
              onClick={() => {
                if (formPage === 1) {
                  if (verifyForm1()) {
                    handleNextPage();
                  }
                } else if (formPage === 2) {
                  if (verifyForm2()) {
                    handleNextPage();
                  }
                } else if (formPage === 3) {
                  if (verifyForm3()) {
                    handleNextPage();
                  }
                }
              }}
              disabled={formPage === steps.length}
            >
              <i className="pi pi-arrow-right"></i>
            </button>
          )}
        </div>
      </IonFooter>
      {/* <BackNavigationGuard when={true} /> */}
    </IonPage>
  );
};

export default AddFamily;
