import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFooter,
  IonHeader,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
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

const AddFamily: React.FC = () => {
  const [formPage, setFormPage] = useState(1);
  const steps = [1, 2, 3, 4]; // Define steps for the form
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const userDetails = localStorage.getItem("userDetails");

  const userDeatilsObj = userDetails
    ? JSON.parse(userDetails)
    : { userCustId: null, phNumber: null, firstName: null, lastName: null };

  const [toastOpen, setToastOpen] = useState({ status: false, message: "", textColor: "black" });

  const genderOpt: string[] = ["Male", "Female", "Transgender"];
  const refMaritalStatus: string[] = ["Married", "Unmarried"];
  const educationOpt: string[] = [
    "Illiteracy",
    "Primary School",
    "Middle",
    " Higher Secondary",
    "Undergraduate (UG)",
    "Postgraduate (PG)",
  ];
  const occupationcategoryOtp: string[] = [
    "Professional",
    "Semi- Professional",
    "Clerical, Shop-Owner, Farmer",
    "Skilled worker",
    "Semi-skilled worker",
    "Unskilled worker",
    "Homemaker",
    "Unemployed",
    "Student",
  ];

  const [occupationModel, setOccupationModel] = useState(false);
  const [occupationalSector, setOccupationalSector] = useState(false);

  const occupationData = [
        {
          category: "Professional",
          heading: "Top level management of any organisation",
          content:
            "Example: Directors, Managers, advisory board members, consultants etc",
        },
        {
          category: "Semi Professional",
          heading: "Mid level management of any organisation",
          content:
            "Example: Assistant directors, Assistant managers, assistant engineers, junior consultant doctors etc",
        },
        {
          category: "Clerical shop owners, land lords",
          heading: "",
          content: "who are involved in accounting and supervisors, desk top work",
        },
        {
          category: "Skilled workers",
          heading: "Technicians with a degree certificate related to the work",
          content:
            "Tailor, mason, carpenter, Electrician, plumber, factory machine operator",
        },
        {
          category: "Semi skilled workers",
          heading: "Technicians without degree certificate related to the work",
          content:
            "Technicians with a degree certificate related to the work Tailor, mason, carpenter, Electrician, plumber, factory machine operator",
        },
        {
          category: "Unskilled worker",
          heading: "Helpers",
          content:
            "sweepers, gardeners, helpers in construction site, house keeping, office unskilled assistants etc",
        },
        {
          category: "Home makers",
          heading: "",
          content: "Family member who are involved in domestic chores of a family",
        },
        {
          category: "Unemployed",
          heading: "",
          content: "Those who are not employed in any of the organisation",
        },
        {
          category: "Student",
          heading: "",
          content:
            "Those who are involved in learning activity and not employed in any organisation.",
        },
      ];
      
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
    realtionType: ""
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
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid First Name" });
      return false;
    } else if (formData.refUserLname.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid Last Name" });
      return false;
    } else if (!formData.refGender) {
      setToastOpen({ status: true, textColor: "red", message: "Select Gender" });
      return false;
    } else if (!formData.refDOB) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Date of Birth" });
      return false;
    } else if (!formData.refMaritalStatus) {
      setToastOpen({ status: true, textColor: "red", message: "Select Marital Status" });
      return false;
    }
    return true;
  };

  const verifyForm2 = () => {
    if (formData.refEducation.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Select Education" });
      return false;
    } else if (formData.refProfession.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Select Occupation Category" });
      return false;
    } else if (formData.refSector.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Sector" });
      return false;
    }
    return true;
  };

  const verifyForm3 = () => {
    if (formData.refUserEmail.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/. test(formData.refUserEmail)) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid Email" });
      return false;
  }
  else if (formData.refAddress.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Address" });
      return false;
    } else if (formData.refDistrict.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter District" });
      return false;
    } else if (formData.refPincode.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Pincode" });
      return false;
    }
    return true;
  };


  const verifyForm4 = () => {
    if(formData.realtionType.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Select Relation Type" });
      return false;
    } 
    else if (formData.isSame == false) {
      if(!formData.mobilenumber || !/^\d{10}$/.test(formData.mobilenumber)) {
        setToastOpen({
          status: true,
          textColor: "red",
          message: "Enter Valid Mobile Number",
        });
        return false;
      }
      else if (
        formData.userpassword.length === 0 || // Check if password is empty
        !/[a-zA-Z]/.test(formData.userpassword) || // Must contain at least one letter
        !/\d/.test(formData.userpassword) || // Must contain at least one digit
        !/[!@#$%^&*(),.?":{}|<>]/.test(formData.userpassword) || // Must contain at least one special character
        formData.userpassword.length < 8
      ) {
        setToastOpen({ status: true, textColor: "red", message: "Enter Valid Password" });
        return false;
      }

      else if (formData.userpassword !== formData.refUserConPassword) {
        setToastOpen({
          status: true,
          message: "Passwords do not match",
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
            realtionType: formData.realtionType
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
            history.replace("/manageFamily", {refreshFamily: true});

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
            });
          }, 3000);
        } else {
          setLoading(false);
          setToastOpen({
            status: true,
            message: "Already Mobile Number Exists",
            textColor: "red"
          });
        }
      } catch {
        console.error("tesitng - false");
      }
    } else {
      console.log("Token Invalid");
    }
  };

  console.log(formData.refUserMobileno)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>Add Family Member</IonTitle>
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
                <div>Complete</div>
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
                Personal Details
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
                <div>Complete</div>
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
                Skills Details
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
                <div>Complete</div>
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
                Communication Details
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
                <div>Complete</div>
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
                Account Details
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
                  First Name <span style={{ color: "red" }}>*</span>
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
                    placeholder="Enter First Name"
                    name="refUserFname"
                  />
                </div>
              </div>
              {/* Last Name */}
              <div className="inputBox">
                <label>
                  Last Name <span style={{ color: "red" }}>*</span>
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
                    placeholder="Enter Last Name"
                    name="refUserLname"
                  />
                </div>
              </div>
              {/* Gender */}
              <div className="inputBox">
                <label>
                  Gender <span style={{ color: "red" }}>*</span>
                </label>
                <div className="addFamilyInputField" style={{ width: "100%" }}>
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-mars"></i>
                  </span>
                  <Dropdown
                    value={formData.refGender}
                    onChange={(e) => handleDropdownChange(e, "refGender")}
                    options={genderOpt}
                    style={{ textAlign: "left" }}
                    placeholder="Select Gender"
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
                  Date of Birth <span style={{ color: "red" }}>*</span>
                </label>
                <div className="p-inputgroup addFamilyInputField">
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-calendar "></i>
                  </span>
                  <InputText
                    style={{ width: "100%", textAlign: "left" }}
                    className="addFamilyInputText"
                    value={formData.refDOB ? formData.refDOB.split("T")[0] : ""}
                    placeholder="Date of Birth"
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
                  Marital Status <span style={{ color: "red" }}>*</span>
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
                    placeholder="Select Marital Status"
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
              {/* Education */}
              <div className="inputBox">
                <label>
                  Education <span style={{ color: "red" }}>*</span>
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
                    optionLabel="name"
                    placeholder="Select Education"
                    className="addFamilyDropdown"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                </div>
              </div>
              {/* Occupation */}
              <div className="inputBox">
                <label>
                  Occupation <span style={{ color: "red" }}>*</span>
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
                    options={occupationcategoryOtp}
                    optionLabel="name"
                    placeholder="Occupation Category"
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
                  Example
                </label>
              </div>
              {/* Sector */}
              <div className="inputBox">
                <label>
                  Sector <span style={{ color: "red" }}>*</span>
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
                    placeholder="Enter Sector"
                    name="refSector"
                  />
                </div>
                <label
                  onClick={() => {
                    setOccupationalSector(true);
                  }}
                  style={{ marginTop: "10px", textDecoration: "underline" }}
                >
                  Example
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
                            Occupational Category
                          </th>
                          <th
                            style={{
                              width: "60%",
                              fontSize: "1rem",
                              padding: "12px",
                              borderBottom: "1px solid #e0e0e0",
                            }}
                          >
                            Definition with example
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
                    Close
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
                  <div className="doctor-modal-header">Occupation Sector</div>

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
                      <b>Production and Manufacturing</b>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <li>Agriculture and fishing</li>
                      <li>Mining and Quarrying</li>
                      <li>Forestry</li>
                      <li>Food processing</li>
                      <li>Factories and industries</li>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                          marginTop: "5px",
                          paddingLeft: "10px",
                        }}
                      >
                        <li>Textiles</li>
                        <li>Automobiles</li>
                        <li>Electrical and electronics</li>
                        <li>Mechanical</li>
                        <li>Constructions</li>
                      </div>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <b>Service sectors</b>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <li>Health care</li>
                      <li>Education</li>
                      <li>Sales and marketing</li>
                      <li>IT and software solutions</li>
                      <li>Finance and banking</li>
                      <li>Transport and logistics- road and railways</li>
                      <li>Hotels and lodges</li>
                      <li>Media</li>
                      <li>Judicial</li>
                      <li>Defence and police</li>
                      <li>Disaster management and rescue</li>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <b>Others</b>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <li>Research and development</li>
                      <li>Consultancy</li>
                      <li>Advisories</li>
                      <li>Intelligence</li>
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
                    Close
                  </button>
                </div>
              </IonModal>
            </div>
          )}
          {formPage === 3 && (
            <div style={{ padding: "15px" }}>
              {/* Education */}
              <div className="inputBox">
                <label>Email</label>
                <div className="p-inputgroup addFamilyInputField">
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-envelope"></i>
                  </span>
                  <InputText
                    style={{ width: "100%", textAlign: "left" }}
                    className="addFamilyInputText"
                    value={formData.refUserEmail}
                    onChange={handleInputChange}
                    placeholder="Enter Email"
                    name="refUserEmail"
                  />
                </div>
              </div>
              {/* Address */}
              <div className="inputBox">
                <label>
                  Address <span style={{ color: "red" }}>*</span>
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
                    placeholder="Enter Address"
                    name="refAddress"
                  />
                </div>
              </div>
              {/* District */}
              <div className="inputBox">
                <label>
                  District <span style={{ color: "red" }}>*</span>
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
                    placeholder="Enter District"
                    name="refDistrict"
                  />
                </div>
              </div>
              {/* Pincode */}
              <div className="inputBox">
                <label>
                  Pincode <span style={{ color: "red" }}>*</span>
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
                    placeholder="Enter Pincode"
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
                  Relation Type <span style={{ color: "red" }}>*</span>
                </label>
                <div className="addFamilyInputField" style={{ width: "100%" }}>
                  <span className="addFamilyInputField_Icon">
                    <i className="pi pi-mars"></i>
                  </span>
                  <Dropdown
                    value={formData.realtionType}
                    onChange={(e) => handleDropdownChange(e, "realtionType")}
                    options={familyRelationOpt}
                    style={{ textAlign: "left" }}
                    placeholder="Select Relation"
                    name="realtionType"
                    className="addFamilyDropdown"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                </div>
              </div>

              <div className="inputBox">
                <label>Use Same Account Login</label>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem"
                }}>
                  <InputSwitch
                    checked={formData.isSame}
                    onChange={(e: InputSwitchChangeEvent) =>
                      setFormData({ ...formData, isSame: e.value })
                    }
                  />
                  <span style={{fontSize: "0.8rem", fontWeight: "300"}}>{"(" + formData.refUserMobileno + ")"}</span>
                </div>
              </div>

              {formData.isSame == false && (
                <>
                  <div className="inputBox">
                    <label>
                      Enter Number <span style={{ color: "red" }}>*</span>
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
                          placeholder="Enter Phone Number"
                          name="mobilenumber"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="inputBox">
                    <label>
                      Password <span style={{ color: "red" }}>*</span>
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
                        placeholder="Enter Password"
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
                      &nbsp; Atleast One Character
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
                      &nbsp; Atleast One Number
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        color: "#45474b",
                      }}
                    >
                      {/[!@#$%^&*(),.?":{}|<>]/.test(
                        formData.userpassword
                      ) ? (
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
                      &nbsp; Atleast One Special Character
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
                      &nbsp; Minimum 8 Characters
                    </div>
                  </div>

                  <div className="inputBox">
                    <label>
                      Confirm Password <span style={{ color: "red" }}>*</span>
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
                        placeholder="Re-Enter Password"
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
                style={{ display: "flex", alignItems: "center", fontSize: "1rem", color: "#45474b" }}
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
                &nbsp; Confirm Password
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
                  <span>Sign Up</span>
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
    </IonPage>
  );
};

export default AddFamily;
