import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSkeletonText,
  IonToolbar,
} from "@ionic/react";
import { chevronBack, checkmarkCircleOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";

import "./CategorySuccess.css";
import axios from "axios";
import decrypt from "../../helper";
import { useLocation, useHistory } from "react-router";

const CategorySuccess: React.FC = () => {
  const location = useLocation<{ selectedUserId: string }>();
  const selectedUserId = location.state?.selectedUserId;

  const tokenString: any = localStorage.getItem("userDetails");
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

  const history = useHistory();

  const [pendingAssessments, setPendingAssessments] = useState<
    { id: string; title: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getRemainingCategory = () => {
    if (!selectedUserId) return;

    setLoading(true);

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
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getRemainingCategory();
  }, []);

  const handleAssessmentClick = (assessmentId: string) => {
    if (!selectedUserId) return;

    // Clear the history stack and start from /home → /serviceQuestion
    history.replace("/home"); // Step 1: replace history with home
    history.push(`/serviceQuestion/${assessmentId}/${selectedUserId}`); // Step 2: push new assessment route
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>

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

          {loading ? (
            <>
              <h3 className="pendingHeader">Loading Pending Assessments...</h3>
              <IonList lines="none" className="pendingQuizList">
                {[...Array(3)].map((_, index) => (
                  <IonItem key={index}>
                    <IonLabel>
                      <h4>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </h4>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </>
          ) : pendingAssessments.length > 0 ? (
            <>
              <p onClick={() => history.replace("/home")}>Go to Home</p>
              <h3 className="pendingHeader">Pending Assessments</h3>
              <IonList lines="none" className="pendingQuizList">
                {pendingAssessments.map((assessment) => (
                  <IonItem
                    key={assessment.id}
                    className="pendingQuizItem"
                    button
                    onClick={() => handleAssessmentClick(assessment.id)}
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
