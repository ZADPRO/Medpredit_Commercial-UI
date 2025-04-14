import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { chevronBack } from "ionicons/icons";
import "./TransactionHistory.css";
import React, { useEffect, useState } from "react";
import decrypt from "../../helper";
import CustomIonLoading from "../CustomIonLoading/CustomIonLoading";
import { useHistory } from "react-router";

interface Transaction {
  refTransactionId: number;
  refTransactionDate: string;
  refPkgAmount: number;
  refTransactionAmount: number;
  refTransactionCGST: number;
  refTransactionSGST: number;
  refTransactionMethod: string;
  refPkgValidDays: number;
};

const TransactionHistory: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  const [transHistory, setTransHistory] = useState<Transaction[]>([]);

  const getTransHistory = () => {
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      setLoading(true);
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;

        console.log(token);
        axios
          .get(
            `${
              import.meta.env.VITE_API_COMMERCIAL_URL
            }/getPaymentTransactionHistory`,
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
              setTransHistory(
                data.result.sort((a: Transaction, b: Transaction) => b.refTransactionId - a.refTransactionId)
              );
              
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

  useEffect(() => {
    getTransHistory();
  }, []);


  const formatDate = (dateString: string | number | Date, format: "dd-mmm-yyyy" | "dd/mm/yyyy"): string => {
    const date = new Date(dateString);
    
    if (format === "dd-mmm-yyyy") {
      return date
        .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        .replace(/ /g, "-"); // Converts "01 Jan 2025" → "01-Jan-2025"
    } else if (format === "dd/mm/yyyy") {
      return date
        .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }); 
      // Converts "01/01/2025"
    }
  
    return ""; // Fallback (should not happen due to strict type)
  };
  
  function addDaysToDate(convertDate: string, daysToAdd: number): string {
    const date = new Date(convertDate);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0]; // Returns in YYYY-MM-DD format
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>Transaction History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="transaction-history">
          {transHistory.length > 0 ? (
            transHistory.map((item, index) => (
              <div className="transaction-history-cards">
                <div className="transaction-history-cards-head">
                  <p>{formatDate(item.refTransactionDate, "dd-mmm-yyyy")}</p>
                  <p style={{ fontWeight: "bold" }}>
                    {"₹" +
                      (item.refTransactionAmount +
                        (item.refTransactionCGST + item.refTransactionSGST))}
                  </p>
                </div>
                <p>
                  {new Date(item.refTransactionDate).toLocaleTimeString(
                    "en-gb",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </p>

                <p>
                  {"₹" +
                    item.refTransactionAmount +
                    " (+₹" +
                    (item.refTransactionCGST + item.refTransactionSGST) +
                    " GST)"}
                </p>
                <p>
                  Plan Validity:{" "}
                  {formatDate(item.refTransactionDate, "dd/mm/yyyy") +
                    " - " +
                    formatDate(
                      addDaysToDate(
                        item.refTransactionDate,
                        item.refPkgValidDays
                      ),
                      "dd/mm/yyyy"
                    )}
                </p>
                <p>
                  Transaction Method:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {item.refTransactionMethod.toUpperCase()}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <div style={{
              paddingLeft: "0.5rem",
              color: "var(--med-dark-green)"
            }}>
              <h3>No Transactions Yet</h3>
              <p style={{
                lineHeight: "1.5rem"
              }}>
                <u style={{
                  color: "var(--med-light-green)",
                  fontWeight: "bold"
                }}
                onClick={() => history.replace("/subscriptionPlans")
                }>Start your subscription</u> to begin your journey!
              </p>
            </div>
          )}
        </div>
      </IonContent>

      <CustomIonLoading isOpen={loading} />
    </IonPage>
  );
};

export default TransactionHistory;
