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
  const location = useLocation<{ selectedUserId: string }>(); // ✅ Step 2
  const selectedUserId = location.state?.selectedUserId;

  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

  const [pendingQuizzes, setPendingQuizzes] = useState<
    { id: string; title: string; description: string }[]
  >([]);

  const getRemainingCategory = () => {
    if (!selectedUserId) {
      console.error("No selectedUserId found in navigation state");
      return;
    }

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

        console.log("--->====>", data);

        if (data.status && Array.isArray(data.data)) {
          const filteredPending = data.data
            .filter((item: any) => item.refScore == null)
            .map((item: any) => ({
              id: item.refQCategoryId,
              title: item.refCategoryLabel,
              description: "You haven't completed this quiz yet.",
            }));

          setPendingQuizzes(filteredPending);
        }
      });
  };

  useEffect(() => {
    getRemainingCategory();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="successPage">
        <IonIcon icon={checkmarkCircleOutline} className="successIcon" />
        <h2 className="successTitle">Quiz Completed Successfully!</h2>
        <p className="successSubtitle">
          Well done! Keep learning and stay sharp.
        </p>

        <h3 className="pendingHeading">Pending Quizzes</h3>

        <IonList lines="none" className="pendingList">
          {pendingQuizzes.map((quiz) => (
            <IonItem
              key={quiz.id}
              className="pendingCard"
              button
              detail={false}
            >
              <IonLabel>
                <h4 className="quizTitle">{quiz.title}</h4>
                <p className="quizDescription">{quiz.description}</p>
              </IonLabel>
              <IonLabel slot="end" className="startNow">
                Start
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CategorySuccess;
