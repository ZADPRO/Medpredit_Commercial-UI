// import {
//   IonBackButton,
//   IonButtons,
//   IonContent,
//   IonDatetime,
//   IonFooter,
//   IonHeader,
//   IonModal,
//   IonPage,
//   IonTitle,
//   IonToolbar,
// } from "@ionic/react";
// import { chevronBack } from "ionicons/icons";
// import React, { useState } from "react";
// import Toast from "../../CustomIonToast/CustomIonToast";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// import { Divider } from "primereact/divider";
// import decrypt from "../../../helper";
// import axios from "axios";
// import { useHistory } from "react-router";

// const AddFamily: React.FC = () => {
//   const [formPage, setFormPage] = useState(1);
//   const steps = [1, 2, 3]; // Define steps for the form
//   const [loading, setLoading] = useState(false);
//   const history = useHistory();

//   const [toastOpen, setToastOpen] = useState({ status: false, message: "", textColor: "black" });

//   const genderOpt: string[] = ["Male", "Female", "Transgender"];
//   const refMaritalStatus: string[] = ["Married", "Unmarried"];
//   const educationOpt: string[] = [
//     "Illiteracy",
//     "Primary School",
//     "Middle",
//     " Higher Secondary",
//     "Undergraduate (UG)",
//     "Postgraduate (PG)",
//   ];
//   const occupationcategoryOtp: string[] = [
//     "Professional",
//     "Semi- Professional",
//     "Clerical, Shop-Owner, Farmer",
//     "Skilled worker",
//     "Semi-skilled worker",
//     "Unskilled worker",
//     "Homemaker",
//     "Unemployed",
//     "Student",
//   ];

//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const [formData, setFormData] = useState({
//     refUserFname: "",
//     refUserLname: "",
//     refUserEmail: "",
//     refUserPassword: "",
//     refUserConPassword: "",
//     refGender: null as string | null,
//     refMaritalStatus: null as string | null,
//     refDOB: null as any | null,
//     refEducation: "",
//     refProfession: "",
//     refSector: "",
//     refAddress: "",
//     refDistrict: "",
//     refPincode: null as any | null,
//     refUserMobileno: "",
//   });

//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleDropdownChange = (e: any, field: string) => {
//     const selectedValue = e.value;
//     setFormData({
//       ...formData,
//       [field]: selectedValue,
//     });
//   };


//   const handleNextPage = () => {
//     if (formPage < steps.length) {
//       setFormPage(formPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (formPage > 1) {
//       setFormPage(formPage - 1);
//     }
//   };

//   const verifyForm1 = () => {
//     if (formData.refUserFname.length === 0) {
//       setToastOpen({ status: true, textColor: "red", message: "Enter Valid First Name" });
//       return false;
//     } else if (formData.refUserLname.length === 0) {
//       setToastOpen({ status: true, textColor: "red", message: "Enter Valid Last Name" });
//       return false;
//     } else if (!formData.refGender) {
//       setToastOpen({ status: true, textColor: "red", message: "Select Gender" });
//       return false;
//     } else if (!formData.refDOB) {
//       setToastOpen({ status: true, textColor: "red", message: "Enter Date of Birth" });
//       return false;
//     } else if (!formData.refMaritalStatus) {
//       setToastOpen({ status: true, textColor: "red", message: "Select Marital Status" });
//       return false;
//     }
//     return true;
//   };

//   const verifyForm2 = () => {
//     if (formData.refEducation.length === 0) {
//       setToastOpen({ status: true, textColor: "red", message: "Select Education" });
//       return false;
//     } else if (formData.refProfession.length === 0) {
//       setToastOpen({ status: true, textColor: "red", message: "Select Occupation Category" });
//       return false;
//     } else if (formData.refSector.length === 0) {
//       setToastOpen({ status: true, textColor: "red", message: "Enter Sector" });
//       return false;
//     }
//     return true;
//   };

//   const verifyForm3 = () => {
//     if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.refUserEmail) ||
//       formData.refUserEmail.length === 0
//     ) {
//       setToastOpen({ status: true, textColor: "red", message: "Enter Valid Email" });
//       return false;
//     } else if (formData.refAddress.length === 0) {
//       setToastOpen({ status: true, textColor: "red", message: "Enter Address" });
//       return false;
//     } else if (formData.refDistrict.length === 0) {
//       setToastOpen({ status: true, textColor: "red", message: "Enter District" });
//       return false;
//     } else if (formData.refPincode.length === 0) {
//       setToastOpen({ status: true, textColor: "red", message: "Enter Pincode" });
//       return false;
//     }
//     return true;
//   };

//   const handleSignup = async () => {
//     const tokenString = localStorage.getItem("userDetails");
//     if (tokenString) {
//       try {
//         const tokenObject = JSON.parse(tokenString);
//         const token = tokenObject.token;

//         const response = await axios.post(
//           `${import.meta.env.VITE_API_URL}/postFamilyUser`,
//           {
//             refUserId: tokenObject.userId,
//             refUserFname: formData.refUserFname,
//             refUserLname: formData.refUserLname,
//             refUserEmail: formData.refUserEmail,
//             refDOB: formData.refDOB,
//             refMaritalStatus: formData.refMaritalStatus,
//             refEducation: formData.refEducation,
//             refProfession: formData.refProfession,
//             refSector: formData.refSector,
//             refAddress: formData.refAddress,
//             refDistrict: formData.refDistrict,
//             refPincode: formData.refPincode,
//             refUserMobileno: tokenObject.phNumber,
//             refGender: formData.refGender,
//           },
//           {
//             headers: {
//               Authorization: token,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const data = decrypt(
//           response.data[1],
//           response.data[0],
//           import.meta.env.VITE_ENCRYPTION_KEY
//         );

//         console.log(data);

//         if (data.status) {
//           setToastOpen({
//             status: true,
//             textColor: "green",
//             message: "Successfully Signup",
//           });

//           setTimeout(() => {
//             history.push("/patient", {
//               direction: "forward",
//               animation: "slide",
//             });

//             setFormData({
//               refUserFname: "",
//               refUserLname: "",
//               refUserEmail: "",
//               refUserPassword: "",
//               refUserConPassword: "",
//               refGender: null as string | null,
//               refMaritalStatus: null as string | null,
//               refDOB: null as any | null,
//               refEducation: "",
//               refProfession: "",
//               refSector: "",
//               refAddress: "",
//               refDistrict: "",
//               refPincode: null as any | null,
//               refUserMobileno: "",
//             });
//           }, 3000);
//         }
//       } catch {
//         console.error("tesitng - false");
//       }
//     } else {
//       console.log("Token Invalid");
//     }
//   };

//   return (
//     <IonPage className="cus-ion-page">
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
//           </IonButtons>
//           <IonTitle>Add Family Member</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent>
//         <div style={{
//             width: "95%",
//             margin: "0 auto"
//         }}>
//         {formPage === 1 ? (
//           <>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "end",
//                 paddingTop: "0px",
//                 paddingBottom: "5px",
//                 color: "#45474b",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: "1.3rem",
//                   paddingRight: "5px",
//                   fontWeight: "700",
//                 }}
//               >
//                 0%
//               </div>
//               <div>Complete</div>
//             </div>

//             <div
//               style={{
//                 fontSize: "1.3rem",
//                 paddingRight: "5px",
//                 fontWeight: "700",
//                 paddingBottom: "20px",
//                 color: "#45474b",
//               }}
//             >
//               Personal Details
//             </div>
//           </>
//         ) : formPage === 2 ? (
//           <>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "end",
//                 paddingTop: "0px",
//                 paddingBottom: "5px",
//                 color: "#45474b",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: "1.3rem",
//                   paddingRight: "5px",
//                   fontWeight: "700",
//                 }}
//               >
//                 50%
//               </div>
//               <div>Complete</div>
//             </div>

//             <div
//               style={{
//                 fontSize: "1.3rem",
//                 paddingRight: "5px",
//                 fontWeight: "700",
//                 paddingBottom: "20px",
//                 color: "#45474b",
//               }}
//             >
//               Skills Details
//             </div>
//           </>
//         ) : formPage === 3 ? (
//           <>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "end",
//                 paddingTop: "0px",
//                 paddingBottom: "5px",
//                 color: "#45474b",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: "1.3rem",
//                   paddingRight: "5px",
//                   fontWeight: "700",
//                 }}
//               >
//                 75%
//               </div>
//               <div>Complete</div>
//             </div>

//             <div
//               style={{
//                 fontSize: "1.3rem",
//                 paddingRight: "5px",
//                 fontWeight: "700",
//                 paddingBottom: "20px",
//                 color: "#45474b",
//               }}
//             >
//               Communication Details
//             </div>
//           </>
//         ) : (
//           <></>
//         )}
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-evenly",
//             marginBottom: "0px",
//           }}
//         >
//           {steps.map((step) => (
//             <div
//               key={step}
//               style={{
//                 width: "20%",
//                 height: "4px",
//                 background: formPage >= step ? "var(--med-light-green)" : "var(--med-dark-green)",
//                 borderRadius: "4px",
//                 transition: "background 0.5s ease-in-out",
//               }}
//             ></div>
//           ))}
//         </div>


//           {/* Form Content */}
//           <div className="form-page">
//               {formPage === 1 && (
//                 <div style={{ padding: "15px" }}>
//                   {/* First Name */}
//                   <div className="inputBox">
//                     <label>
//                       First Name <span style={{ color: "red" }}>*</span>
//                     </label>
//                     <div className="p-inputgroup addFamilyInputField">
//                       <span className="addFamilyInputField_Icon">
//                         <i className="pi pi-user"></i>
//                       </span>
//                       <InputText
//                         style={{ width: "100%", textAlign: "left" }}
//                         className="addFamilyInputText"
//                         value={formData.refUserFname}
//                         onChange={handleInputChange}
//                         placeholder="Enter First Name"
//                         name="refUserFname"
//                       />
//                     </div>
//                   </div>
//                   {/* Last Name */}
//                   <div className="inputBox">
//                     <label>
//                       Last Name <span style={{ color: "red" }}>*</span>
//                     </label>
//                     <div className="p-inputgroup addFamilyInputField">
//                       <span className="addFamilyInputField_Icon">
//                         <i className="pi pi-user"></i>
//                       </span>
//                       <InputText
//                         style={{ width: "100%", textAlign: "left" }}
//                         className="addFamilyInputText"
//                         value={formData.refUserLname}
//                         onChange={handleInputChange}
//                         placeholder="Enter Last Name"
//                         name="refUserLname"
//                       />
//                     </div>
//                   </div>
//                   {/* Gender */}
//                   <div className="inputBox">
//                     <label>
//                       Gender <span style={{ color: "red" }}>*</span>
//                     </label>
//                     <div
//                       className="addFamilyInputField"
//                       style={{ width: "100%" }}
//                     >
//                       <span className="addFamilyInputField_Icon">
//                         <i className="pi pi-mars"></i>
//                       </span>
//                       <Dropdown
//                         value={formData.refGender}
//                         onChange={(e) => handleDropdownChange(e, "refGender")}
//                         options={genderOpt}
//                         style={{ textAlign: "left" }}
//                         placeholder="Select Gender"
//                         name="refGender"
//                         className="addFamilyDropdown"
//                         checkmark={true}
//                         highlightOnSelect={false}
//                       />
//                     </div>
//                   </div>
//                   {/* Date of Birth */}
//                   <div className="inputBox">
//                     <label>
//                       Date of Birth <span style={{ color: "red" }}>*</span>
//                     </label>
//                     <div className="p-inputgroup addFamilyInputField">
//                       <span className="addFamilyInputField_Icon">
//                         <i className="pi pi-calendar "></i>
//                       </span>
//                       <InputText
//                         style={{ width: "100%", textAlign: "left" }}
//                         className="addFamilyInputText"
//                         value={
//                           formData.refDOB ? formData.refDOB.split("T")[0] : ""
//                         }
//                         placeholder="Date of Birth"
//                         name="refDOB"
//                         onClick={openModal}
//                       />
//                     </div>
//                   </div>
//                   <IonModal
//                     isOpen={isOpen}
//                     id="med-modal"
//                     initialBreakpoint={1}
//                     onDidDismiss={closeModal}
//                     animated={false}
//                   >
//                     <div style={{ width: "100%", background: "#effafe" }}>
//                       <IonDatetime
//                         presentation="date"
//                         preferWheel={true}
//                         value={formData.refDOB}
//                         onIonChange={(e) => {
//                           const selectedDate = e.detail.value;
//                           setFormData({
//                             ...formData,
//                             refDOB: selectedDate,
//                           });
//                         }}
//                       ></IonDatetime>
//                       <Divider />
//                       <div
//                         style={{
//                           background: "#effafe",
//                           display: "flex",
//                           justifyContent: "space-evenly",
//                           width: "100%",
//                           marginBottom: "10px",
//                         }}
//                       >
//                         <div
//                           onClick={() => {
//                             setFormData({
//                               ...formData,
//                               refDOB: "",
//                             });
//                             closeModal();
//                           }}
//                           style={{
//                             width: "40%",
//                             background: "var(--med-light-green)",
//                             padding: "15px",
//                             textAlign: "center",
//                             fontSize: "1.1rem",
//                             color: "var(--med-dark-green)",
//                             borderRadius: "10px",
//                             fontWeight: "600",
//                           }}
//                         >
//                           Clear
//                         </div>
//                         <div
//                           onClick={closeModal}
//                           style={{
//                             width: "40%",
//                             background: "var(--med-dark-green)",
//                             padding: "15px",
//                             textAlign: "center",
//                             fontSize: "1rem",
//                             color: "var(--med-light-green)",
//                             borderRadius: "10px",
//                             fontWeight: "700",
//                           }}
//                         >
//                           Set
//                         </div>
//                       </div>
//                     </div>
//                   </IonModal>
//                   {/* Marital Status */}
//                   <div className="inputBox">
//                     <label>
//                       Marital Status <span style={{ color: "red" }}>*</span>
//                     </label>
//                     <div
//                       className="addFamilyInputField"
//                       style={{ width: "100%" }}
//                     >
//                       <span className="addFamilyInputField_Icon">
//                         <i className="pi pi-users"></i>
//                       </span>
//                       <Dropdown
//                         value={formData.refMaritalStatus}
//                         style={{ textAlign: "left" }}
//                         onChange={(e) =>
//                           handleDropdownChange(e, "refMaritalStatus")
//                         }
//                         options={refMaritalStatus}
//                         placeholder="Select Marital Status"
//                         name="refGender"
//                         className="addFamilyDropdown"
//                         checkmark={true}
//                         highlightOnSelect={false}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {formPage === 2 && (
//                 <div style={{ padding: "15px" }}>
//                   {/* Education */}
//                   <div className="inputBox">
//                     <label>
//                       Education <span style={{ color: "red" }}>*</span>
//                     </label>
//                     <div
//                       className="addFamilyInputField"
//                       style={{ width: "100%" }}
//                     >
//                       <span className="addFamilyInputField_Icon">
//                         <i className="pi pi-graduation-cap"></i>
//                       </span>
//                       <Dropdown
//                         value={formData.refEducation}
//                         name="educationOpt"
//                         onChange={(e) =>
//                           handleDropdownChange(e, "refEducation")
//                         }
//                         options={educationOpt}
//                         style={{ textAlign: "left" }}
//                         optionLabel="name"
//                         placeholder="Select Education"
//                         className="addFamilyDropdown"
//                         checkmark={true}
//                         highlightOnSelect={false}
//                       />
//                     </div>
//                   </div>
//                   {/* Occupation */}
//                   <div className="inputBox">
//                     <label>
//                       Occupation <span style={{ color: "red" }}>*</span>
//                     </label>
//                     <div
//                       className="addFamilyInputField"
//                       style={{ width: "100%" }}
//                     >
//                       <span className="addFamilyInputField_Icon">
//                         <i className="pi pi-briefcase"></i>
//                       </span>
//                       <Dropdown
//                         value={formData.refProfession}
//                         name="refProfession"
//                         style={{ textAlign: "left" }}
//                         onChange={(e) =>
//                           handleDropdownChange(e, "refProfession")
//                         }
//                         options={occupationcategoryOtp}
//                         optionLabel="name"
//                         placeholder="Occupation Category"
//                         className="addFamilyDropdown"
//                         checkmark={true}
//                         highlightOnSelect={false}
//                       />
//                     </div>
//                     {/* <label
//                       onClick={() => {
//                         setOccupationModel(true);
//                       }}
//                       style={{ marginTop: "10px", textDecoration: "underline" }}
//                     >
//                       Example
//                     </label> */}
//                   </div>
//                   {/* Sector */}
//                   <div className="inputBox">
//                     <label>
//                       Sector <span style={{ color: "red" }}>*</span>
//                     </label>
//                     <div
//                       className="addFamilyInputField"
//                       style={{ width: "100%" }}
//                     >
//                       {/* <span className="p-inputgroup-addon">
//                                               <i className="pi pi-user"></i>
//                                             </span> */}
//                       <InputText
//                         style={{ width: "100%", textAlign: "left" }}
//                         className="addFamilyInputText"
//                         value={formData.refSector}
//                         onChange={handleInputChange}
//                         placeholder="Enter Sector"
//                         name="refSector"
//                       />
//                     </div>
//                     {/* <label
//                       onClick={() => {
//                         setOccupationalSector(true);
//                       }}
//                       style={{ marginTop: "10px", textDecoration: "underline" }}
//                     >
//                       Example
//                     </label> */}
//                   </div>
//                 </div>
//               )}
//               {formPage === 3 && (
//                 <div style={{ padding: "15px" }}>
//                   {/* Education */}
//                   <div className="inputBox">
//                     <label>Email</label>
//                     <div className="p-inputgroup addFamilyInputField">
//                       <span className="addFamilyInputField_Icon">
//                         <i className="pi pi-envelope"></i>
//                       </span>
//                       <InputText
//                         style={{ width: "100%", textAlign: "left" }}
//                         className="addFamilyInputText"
//                         value={formData.refUserEmail}
//                         onChange={handleInputChange}
//                         placeholder="Enter Email"
//                         name="refUserEmail"
//                       />
//                     </div>
//                   </div>
//                   {/* Address */}
//                   <div className="inputBox">
//                     <label>
//                       Address <span style={{ color: "red" }}>*</span>
//                     </label>
//                     <div className="p-inputgroup addFamilyInputField">
//                       <span className="addFamilyInputField_Icon">
//                         <i className="pi pi-map-marker"></i>
//                       </span>
//                       <InputText
//                         style={{ width: "100%", textAlign: "left" }}
//                         className="addFamilyInputText"
//                         value={formData.refAddress}
//                         onChange={handleInputChange}
//                         placeholder="Enter Address"
//                         name="refAddress"
//                       />
//                     </div>
//                   </div>
//                   {/* District */}
//                   <div className="inputBox">
//                     <label>
//                       District <span style={{ color: "red" }}>*</span>
//                     </label>
//                     <div className="p-inputgroup addFamilyInputField">
//                       <span className="addFamilyInputField_Icon">
//                         <i className="pi pi-map-marker"></i>
//                       </span>
//                       <InputText
//                         style={{ width: "100%", textAlign: "left" }}
//                         className="addFamilyInputText"
//                         value={formData.refDistrict}
//                         onChange={handleInputChange}
//                         placeholder="Enter District"
//                         name="refDistrict"
//                       />
//                     </div>
//                   </div>
//                   {/* Pincode */}
//                   <div className="inputBox">
//                     <label>
//                       Pincode <span style={{ color: "red" }}>*</span>
//                     </label>
//                     <div className="p-inputgroup addFamilyInputField">
//                       <span className="addFamilyInputField_Icon">
//                         <i className="pi pi-map-marker"></i>
//                       </span>
//                       <InputText
//                         style={{ width: "100%", textAlign: "left" }}
//                         className="addFamilyInputText"
//                         type="number"
//                         value={formData.refPincode}
//                         onChange={(e) => {
//                           const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
//                           if (inputValue.length <= 6) {
//                             handleInputChange(e);
//                           }
//                         }}
//                         maxLength={6}
//                         placeholder="Enter Pincode"
//                         name="refPincode"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//       </IonContent>
//       <Toast 
//         isOpen={toastOpen.status} 
//         message={toastOpen.message} 
//         textColor={toastOpen.textColor} 
//         onClose={() => setToastOpen({ status: false, message: "", textColor: "black" })} 
//       />

//       <IonFooter>
//         <div
//               style={{
//                 textAlign: "center",
//                 margin: "10px",
//                 display: "flex",
//                 justifyContent: "space-between",
//               }}
//             >
//               {formPage === 1 ? (
//                 <div></div>
//               ) : (
//                 <button
//                   className="medCustom-button01"
//                   onClick={handlePreviousPage}
//                   disabled={formPage === 1}
//                   style={{width: "fit-content"}}
//                 >
//                   <i className="pi pi-arrow-left"></i>
//                 </button>
//               )}
//               {formPage === 3 ? (
//                 <>
//                   {loading ? (
//                     <button style={{width: "fit-content"}} className="medCustom-button01">
//                       <i className="pi pi-spin pi-spinner"></i>
//                     </button>
//                   ) : (
//                     <button
//                     style={{width: "fit-content"}}
//                       className="medCustom-button02"
//                       onClick={() => {
//                         if (formPage === 3) {
//                           if (verifyForm3()) {
//                             setLoading(true);
//                             handleSignup();
//                             console.log("SignUp Success");
//                           }
//                         }
//                       }}
//                     >
//                       <span>Sign Up</span>
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <button
//                 style={{width: "fit-content"}}
//                   className="medCustom-button01"
//                   onClick={() => {
//                     if (formPage === 1) {
//                       if (verifyForm1()) {
//                         handleNextPage();
//                       }
//                     } else if (formPage === 2) {
//                       if (verifyForm2()) {
//                         handleNextPage();
//                       }
//                     }
//                   }}
//                   disabled={formPage === steps.length}
//                 >
//                   <i className="pi pi-arrow-right"></i>
//                 </button>
//               )}
//             </div>
//       </IonFooter>
//     </IonPage>
//   );
// };

// export default AddFamily;
