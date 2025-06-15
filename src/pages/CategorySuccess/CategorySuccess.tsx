import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { chevronBack, checkmarkCircleOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";

import "./CategorySuccess.css";
import axios from "axios";
import decrypt from "../../helper";
import { useLocation } from "react-router";

const CategorySuccess: React.FC = () => {
  const location = useLocation<{ selectedUserId: string }>();
  const selectedUserId = location.state?.selectedUserId;

  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

  const [pendingAssessments, setPendingAssessments] = useState<
    { id: string; title: string; description: string }[]
  >([]);

  const getRemainingCategory = () => {
    if (!selectedUserId) return;

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/getCategory`,
        {
          SubCategoryId: "4",
          patientId: selectedUserId,
          employeeId: null,
          hospitalId: "1",
          refLanCode: "1",
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

        if (data.status && Array.isArray(data.data)) {
          const filteredPending = data.data
            .filter((item: any) => item.refScore == null)
            .map((item: any) => ({
              id: item.refQCategoryId,
              title: item.refCategoryLabel,
              description: "You haven't completed this assessment yet.",
            }));
          setPendingAssessments(filteredPending);
        }
      });
  };

  useEffect(() => {
    getRemainingCategory();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="categorySuccessContent">
        <div className="successCard m-2">
          <IonIcon
            icon={checkmarkCircleOutline}
            className="animatedSuccessIcon"
          />
          <h2 className="mainSuccessTitle">You're All Done!</h2>
          <p className="mainSuccessSubtitle">
            Great work finishing your assessment. Here’s what’s next:
          </p>

          {pendingAssessments.length > 0 ? (
            <>
              <h3 className="pendingHeader">Pending Assessments</h3>
              <IonList lines="none" className="pendingQuizList">
                {pendingAssessments.map((assessment) => (
                  <IonItem
                    key={assessment.id}
                    className="pendingQuizItem"
                    button
                  >
                    <IonLabel>
                      <h4 className="quizTitle">{assessment.title}</h4>
                      <p className="quizDesc">{assessment.description}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </>
          ) : (
            <p className="noPendingQuizText">
              🎉 No pending assessments. Enjoy your day!
            </p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CategorySuccess;
