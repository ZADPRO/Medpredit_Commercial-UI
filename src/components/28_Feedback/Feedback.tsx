import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonModal,
  IonIcon,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { color, motion } from "framer-motion";
import feedbackSound from "../../assets/Soundeffets/feedbackSound.mp3";
import "./Feedback.css";
import { chevronBack, star, starOutline } from "ionicons/icons";

const Feedback: React.FC = () => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const [rating, setRating] = useState(0);
  const playSound = () => {
    const audio = new Audio(feedbackSound);
    audio.play();
  };

  return (
    <IonPage className="cus-ion-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
                      <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
                    </IonButtons>
          <IonTitle style={{ fontSize: "20px", fontWeight: "bold" }}>
            Send Feedback
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        className="ion-padding"
       
      >
    < div className="Feedbackscreen">
       <IonCard
          style={{
            width: "90%",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <IonText style={{ fontSize: "18px", fontWeight: "bold", color: "var(--med-dark-green)" }}>
            We’d love to hear your thoughts {selectedEmoji && selectedEmoji}!
            Your feedback helps us improve and provide a better experience.
          </IonText>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px 0",
              fontSize: "25px",
            }}
          >
            {["😡", "😐", "😊"].map((emoji, index) => (
              <motion.span
                key={index}
                style={{
                  padding: "0 10px",
                  cursor: "pointer",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",

                  fontSize: selectedEmoji === emoji ? "35px" : "25px",
                  transition: "0.3s",
                }}
                whileTap={{ scale: 2 }}
                onClick={() => {
                  setSelectedEmoji(emoji);
                  if (emoji === "😡") setRating(1);
                  else if (emoji === "😐") setRating(3);
                  else if (emoji === "😊") setRating(5);
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>

          {selectedEmoji && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
              }}
            >
              {[1, 2, 3, 4, 5].map((starValue) => (
                <IonIcon
                  key={starValue}
                  icon={starValue <= rating ? star : starOutline}
                  style={{
                    fontSize: "28px",
                    cursor: "pointer",
                    margin: "0 5px",
                    color: "#FFD700",
                  }}
                  onClick={() => setRating(starValue)}
                />
              ))}
            </div>
          )}

          <IonInput
            placeholder="Tell us more about your experience..."
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              marginTop: "10px",
            }}
          />

          <IonButton
            id="open-modal"
            expand="block"
            style={{ marginTop: "15px", color: "var(--med-light-green)", "--background": "var(--med-dark-green)" }}
            onClick={playSound}
          >
            Submit Feedback
          </IonButton>
        </IonCard>
        {/* <IonModal
          id="example-modal"
          ref={modalRef}
          trigger="open-modal"
          className="custom-modal"
        >
          <IonContent className="custom-content ion-padding">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <IonCard
                style={{
                  width: "90%",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <IonText style={{ fontSize: "18px", fontWeight: "bold" }}>
                  🎉 Thank you for your feedback!
                </IonText>
                <p>Your feedback helps us improve our service.</p>

                <IonButton
                  expand="block"
                  style={{ backgroundColor: "", color: "white" }}
                >
                  Chat with Support
                </IonButton>

                <IonButton
                  fill="clear"
                  onClick={() => modalRef.current?.dismiss()}
                >
                  Close
                </IonButton>
              </IonCard>
            </motion.div>
          </IonContent>
        </IonModal> */}
       </div>

       
      </IonContent>
    </IonPage>
  );
};

export default Feedback;
