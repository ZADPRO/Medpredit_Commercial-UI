import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./SubscriptionDetail.css";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import decrypt from "../../helper";
import Toast from "../../components/CustomIonToast/CustomIonToast";
import Lottie from "lottie-react";
import tickAnimation from "../../assets/Animations/tickanimation.json";
import { useTranslation } from "react-i18next";
import CustomIonLoading from "../../components/CustomIonLoading/CustomIonLoading";

interface LocationState {
  plan?: any; // Replace 'any' with your actual plan type
}

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

interface GstInfo{
  refGSTId: number;
  refCGST: string;
  refSGST: string;
}

interface UpgradeInfo{
  isFirstPackage: boolean;
  minus_amount: number;
  minus_cgst: number;
  minus_sgst: number;
  newPackage_amount: number;
  newPackage_cgst: number;
  newPackage_sgst: number;
  totalPackage: number;
  totalPackageValue: number;
  totalminus: number;
}

const SubscriptionDetail: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null; // Allow null state
  const selectedPackageId = state?.plan; // Optional chaining to prevent errors

  const { t } = useTranslation("global");
  const [showModal, setShowModal] = useState<boolean>(false);
  
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

  const userDetails = localStorage.getItem("userDetails");

  const userDeatilsObj = userDetails
    ? JSON.parse(userDetails)
    : { userCustId: null, phNumber: null, firstName: null, lastName: null };

  console.log(selectedPackageId);

  const [selectPackage, setSelectedPackage] = useState<Package>();
  const [gstInfo, setGstInfo] = useState<GstInfo>();
  const [upgradeInfo, setUpgradeInfo] = useState<UpgradeInfo>();
  const [loading, setLoading] = useState<boolean>(true);

  function addDaysToDate(convertDate: string, daysToAdd: number): string {
    const date = new Date(convertDate);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0]; // Returns in YYYY-MM-DD format
  };

  useEffect(() => {
    getSelectedPackage();
  }, []);

  const getSelectedPackage = () => {
    setLoading(true);
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        console.log(token);
        axios
          .post(
            `${import.meta.env.VITE_API_COMMERCIAL_URL}/getOneValidPackage`,
            { packageId: selectedPackageId },
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
            if (data.status) {
              setSelectedPackage(data.result[0]);
              setGstInfo(data.getGST[0]);
                setUpgradeInfo({
                  isFirstPackage: data.isFirstPackage ?? false,
                  minus_amount: data.minus_amount ?? 0,
                  minus_cgst: data.minus_cgst ?? 0,
                  minus_sgst: data.minus_sgst ?? 0,
                  newPackage_amount: data.newPackage_amount ?? 0,
                  newPackage_cgst: data.newPackage_cgst ?? 0,
                  newPackage_sgst: data.newPackage_sgst ?? 0,
                  totalPackage: data.totalPackage ?? 0,
                  totalPackageValue: data.totalPackageValue ?? 0,
                  totalminus: data.totalminus ?? 0,
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
  console.log(upgradeInfo)
  console.log(selectPackage);
  // const floatPkgAmount = parseFloat(String(selectPackage?.refPkgAmount ?? "0"));
  
  let selectedPaymentMethod = "upi";
    let gstAmount;
    let grandTotal;
    
  const handlePayment = () => {
    console.log("Payment---------------------------------->");
   
    if (upgradeInfo?.isFirstPackage == true) {
      grandTotal = (selectPackage?.refPkgAmount || 0) * 100;
    } else {
      grandTotal = (upgradeInfo?.totalPackageValue || 0) * 100;
    }
    
    console.log(grandTotal);

    if (selectedPaymentMethod === "credit_card") {
      let finalAmount = selectPackage?.refPkgAmount || 0; // Convert string to number
      if (selectedPaymentMethod === "credit_card") {
        finalAmount += finalAmount * 0.03; // Add 3% extra charge
      }

      const options = {
        key: "rzp_test_JqdIktzG8fnGWd",
        amount: Math.round(finalAmount * 100), // Razorpay requires amount in paise
        currency: "INR",
        name: "Medpredit",
        description: "Payment for services",
        handler: function (response: any) {
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
          // paymentToBackend(
          //   response.razorpay_payment_id,
          //   Math.round(finalAmount * 100)
          // );
          // stepperRef.current?.nextCallback();
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9876543210",
        },
        method: {
          upi: true,
          card: false,
          netbanking: false,
          wallet: false,
        },
        theme: {
          color: "#f95005",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else if (selectedPaymentMethod === "debit_card") {
      const options = {
        key: "rzp_test_JqdIktzG8fnGWd",
        amount: grandTotal * 100,
        currency: "INR",
        name: "Ublisyoga",
        description: "Payment for services",
        handler: function (response: any) {
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
          // paymentToBackend(response.razorpay_payment_id, grandTotal * 100);

          // stepperRef.current?.nextCallback();
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9876543210",
        },
        method: {
          upi: false,
          card: true,
          netbanking: false,
          wallet: false,
        },
        theme: {
          color: "#f95005",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else if (selectedPaymentMethod === "upi") {
      const options = {
        key: "rzp_test_JqdIktzG8fnGWd",
        amount: parseInt(grandTotal.toString()),
        currency: "INR",
        name: "Medpredit",
        description: "Payment for Package",
        handler: function (response: any) {
          console.log(response);
          if (response.razorpay_payment_id) {
            setLoading(true);
            // setShowModal(true);
            sendPayment(response.razorpay_payment_id);
          }
          // paymentToBackend(response.razorpay_payment_id, grandTotal * 100);

          // stepperRef.current?.nextCallback();
        },
        prefill: {
          name: `${userDeatilsObj.firstName + " " + userDeatilsObj.lastName}`,
          // email: "johndoe@example.com",
          contact: `${userDeatilsObj.phNumber}`,
        },
        method: {
          upi: true,
          card: false,
          netbanking: false,
          wallet: false,
        },
        theme: {
          color: "rgba(12, 75, 65, 1)",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else if (selectedPaymentMethod === "net_banking") {
      const options = {
        key: "rzp_test_JqdIktzG8fnGWd",
        amount: grandTotal * 100,
        currency: "INR",
        name: "Ublisyoga",
        description: "Payment for services",
        handler: function (response: any) {
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
          // paymentToBackend(response.razorpay_payment_id, grandTotal * 100);

          // stepperRef.current?.nextCallback();
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9876543210",
        },
        method: {
          upi: false,
          card: false,
          netbanking: true,
          wallet: false,
        },
        theme: {
          color: "#f95005",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  const sendPayment = (razor_payment_id: string) => {
    console.log(razor_payment_id);
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        console.log(token);
        axios
          .post(
            `${import.meta.env.VITE_API_COMMERCIAL_URL}/purchasePackage`,
            {
              txnkey: razor_payment_id,
              packageId: selectPackage?.refPkgId,
              method: selectedPaymentMethod,
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
            if (data.status) {
              // setToastOpen({
              //   status: true,
              //   textColor: "green",
              //   message: "Payment successful!",
              // });
              setLoading(false);
              setShowModal(true);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
            <h3 style={{ margin: "0" }}>{selectPackage?.refPkgName}</h3>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {upgradeInfo?.isFirstPackage == true ? (
          <>
            <h1 className="subscription-detail-price">
              {"₹ " +
                (upgradeInfo?.totalPackageValue != undefined
                  ? upgradeInfo?.totalPackageValue
                  : "0")}
            </h1>

            <p style={{ fontStyle: "italic" }}>
              {"₹" +
                (selectPackage?.refPkgAmount != undefined
                  ? selectPackage.refPkgAmount +
                    " Base" +
                    " + " +
                    "₹" +
                    selectPackage?.refPkgAmount *
                      (Number(gstInfo?.refCGST) / 100 +
                        Number(gstInfo?.refSGST) / 100) +
                    "GST"
                  : "0")}
            </p>
            <table className="subscription-detail-table">
              <tbody>
                <tr>
                  <td>Plan Type</td>
                  <td>{selectPackage?.refPkgName}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{selectPackage?.refPkgDescription}</td>
                </tr>
                <tr>
                  <td>Plan Validity</td>
                  <td>{selectPackage?.refPkgValidDays} days</td>
                </tr>
                <tr>
                  <td>Valid Members</td>
                  <td>{selectPackage?.refPkgValidMembers}</td>
                </tr>
                <tr>
                  <td>Start Date</td>
                  <td>{new Date().toISOString().split("T")[0]}</td>
                </tr>
                <tr>
                  <td>Expiry Date</td>
                  <td>
                    {selectPackage?.refPkgValidDays &&
                      addDaysToDate(
                        new Date().toLocaleDateString(),
                        selectPackage?.refPkgValidDays
                      )}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h1
              className="subscription-detail-price"
              style={{ display: "flex", flexDirection: "row", gap: "1.5rem" }}
            >
              <s>{"₹ " +
                (upgradeInfo?.totalPackage != undefined
                  ? upgradeInfo?.totalPackage
                  : "0")}</s>
              <span>
                {"₹ " +
                  (upgradeInfo?.totalPackageValue != undefined
                    ? upgradeInfo?.totalPackageValue
                    : "0")}
              </span>
            </h1>

            <p style={{ fontStyle: "italic" }}>
              {`₹${
                (upgradeInfo?.newPackage_amount ?? 0) -
                (upgradeInfo?.minus_amount ?? 0)
              } Base + ₹${(
                (upgradeInfo?.newPackage_cgst ?? 0) +
                (upgradeInfo?.newPackage_sgst ?? 0) -
                (upgradeInfo?.minus_cgst ?? 0) -
                (upgradeInfo?.minus_sgst ?? 0)
              ).toFixed(2)} GST`}
            </p>

            <table className="subscription-detail-table">
              <tbody>
                <tr>
                  <td>Plan Type</td>
                  <td>{selectPackage?.refPkgName}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{selectPackage?.refPkgDescription}</td>
                </tr>
                <tr>
                  <td>Plan Validity</td>
                  <td>{selectPackage?.refPkgValidDays} days</td>
                </tr>
                <tr>
                  <td>Valid Members</td>
                  <td>{selectPackage?.refPkgValidMembers}</td>
                </tr>
                <tr>
                  <td>Start Date</td>
                  <td>{new Date().toISOString().split("T")[0]}</td>
                </tr>
                <tr>
                  <td>Expiry Date</td>
                  <td>
                    {selectPackage?.refPkgValidDays &&
                      addDaysToDate(
                        new Date().toLocaleDateString(),
                        selectPackage?.refPkgValidDays
                      )}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </IonContent>

      <IonFooter>
        <div
          style={{
            padding: "1rem 1.5rem",
          }}
        >
          {toastOpen.status == false && (
            <button
              onClick={() => {
                selectPackage?.refPkgAmount && handlePayment();
              }}
              style={{ borderRadius: "20px" }}
              className="medCustom-button02"
            >
              Proceed Payment
            </button>
          )}
        </div>
      </IonFooter>

      <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          className="half-screen-modal"
        >
          <div className="modalContent">
            <div className="lottie-container">
              <Lottie
                animationData={tickAnimation}
                loop={false}
                style={{ width: 150, height: 150 }}
                onComplete={() => setTimeout(() => {
                  history.replace("/subscriptionPlans", {refreshPage: true});
                  setShowModal(false);
                }, 1000)}
              />
            </div>
            <p
              style={{
                fontWeight: "700",
                fontSize: "x-large",
                marginTop: "0%",
              }}
            >
              {" "}
              {"Payment Successful"}
            </p>
          </div>
        </IonModal>

      <Toast
        isOpen={toastOpen.status}
        message={toastOpen.message}
        textColor={toastOpen.textColor}
        duration={1000}
        onClose={() => {
          setToastOpen({ status: false, message: "", textColor: "black" }),
            history.replace("/transactionHistory", {refreshPage: true});
        }}
      />

      <CustomIonLoading isOpen={loading} />
    </IonPage>
  );
};

export default SubscriptionDetail;
