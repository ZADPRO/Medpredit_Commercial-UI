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
  
  const UserProfile: React.FC = () => {
    const [selectedSegment, setSelectedSegment] =
      useState<string>("Personal Details");
    const [isEditing, setIsEditing] = useState(false);
  
    const userDetails = localStorage.getItem("userDetails");
  
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
    const [occupationData, setOccupationData] = useState([
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
    ]);
  
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
  
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
              if(data.result.length > 0) {
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
        setToastOpen({ status: true, textColor: "red", position: "top",  message: "Please Complete your Profile" });
      }
    }, []);
  
    const handleSave = () => {
      if (verifyForm1() && verifyForm2() && verifyForm3()) {
        updateUSerDetails();
        if (localStorage.getItem("detailsFlag") === "true") {
          setToastOpen({ status: true, textColor: "green",  message: "Profile Complete!" });
          setTimeout(() => {
            history.replace("/home");
            localStorage.setItem("detailsFlag", "false");
          }, 3000);
        } else{
          setToastOpen({ status: true, textColor: "green", message: "Profile Saved" });
        }
      };
    };
  
    const updateUSerDetails = async() => {
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
      <IonPage>
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
            <IonTitle>My Profile</IonTitle>
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
            onIonChange={(e) => setSelectedSegment(e.detail.value as string)} // ✅ Fix: Cast as string
          >
            <IonSegmentButton
              value="Personal Details"
              contentId="Personal Details"
            >
              <IonLabel>Personal</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Career Details" contentId="Career Details">
              <IonLabel>Career</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value="Contact Details"
              contentId="Contact Details"
            >
              <IonLabel>Contact</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <IonSegmentView id="userProfile-ion-segment-view">
            <IonSegmentContent id="Personal Details">
              <div className="inputBox">
                <label>
                  First Name <span style={{ color: "red" }}>*</span>
                </label>
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
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
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
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
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
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
                    style={{ textAlign: "left" }}
                    placeholder="Select Gender"
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
                  Date of Birth <span style={{ color: "red" }}>*</span>
                </label>
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
                  }`}
                >
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
                id="ion-custom-modal-01"
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
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
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
                    placeholder="Select Marital Status"
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
                <label>Education <span style={{ color: "red" }}>*</span></label>
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
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
                    style={{ textAlign: "left" }}
                    optionLabel="name"
                    placeholder="Select Education"
                    className="addFamilyDropdown"
                    disabled={!isEditing ? true : false}
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                </div>
              </div>
              {/* Occupation */}
              <div className="inputBox">
                <label>Occupation <span style={{ color: "red" }}>*</span></label>
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
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
                    options={occupationcategoryOtp}
                    optionLabel="name"
                    placeholder="Occupation Category"
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
                  Example
                </label>
              </div>
              {/* Sector */}
              <div className="inputBox">
                <label>Sector <span style={{ color: "red" }}>*</span></label>
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
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
            </IonSegmentContent>
            <IonSegmentContent id="Contact Details">
              {/* Mobile Number */}
              <div className="inputBox">
                <label>
                  Mobile Number <span style={{ color: "red" }}>*</span>
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
                    placeholder="Enter Mobile Number"
                    name="refUserMobileno"
                  />
                </div>
              </div>
              <div className="inputBox">
                <label>Email <span style={{ color: "red" }}>*</span></label>
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
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
                    placeholder="Enter Email"
                    name="refUserEmail"
                  />
                </div>
              </div>
              {/* Address */}
              <div className="inputBox">
                <label>Address <span style={{ color: "red" }}>*</span></label>
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
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
                    placeholder="Enter Address"
                    name="refAddress"
                  />
                </div>
              </div>
              {/* District */}
              <div className="inputBox">
                <label>District <span style={{ color: "red" }}>*</span></label>
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
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
                    placeholder="Enter District"
                    name="refDistrict"
                  />
                </div>
              </div>
              {/* Pincode */}
              <div className="inputBox">
                <label>Pincode <span style={{ color: "red" }}>*</span></label>
                <div
                  className={`p-inputgroup addFamilyInputField ${
                    !isEditing ? "inputDisabled" : ""
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
                    placeholder="Enter Pincode"
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
              <IonTitle onClick={() => handleSave()}>Save</IonTitle>
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
  