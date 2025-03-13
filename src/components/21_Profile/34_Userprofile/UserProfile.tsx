import React, { useState } from "react";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonImg,
    IonFab,
    IonFabButton,
    IonIcon,
    IonLabel,
    IonItem,
    IonButton,
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { camera, createOutline } from "ionicons/icons";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import "./UserProfile.css";
import { Password } from "primereact/password";

const UserProfile: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [fullName, setFullName] = useState("Bagja Alfatih");
    const [dob, setDob] = useState("10/10/2001");
    const [gender, setGender] = useState("Male");
    const [mobile, setMobile] = useState("987645676");
    const [email, setEmail] = useState("asdfg@gmail.com");
    const [changePassword, setChangePassword] = useState("********");

    const [isEditing, setIsEditing] = useState(false);

    const handleImageUpload = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Photos,
            });
            setProfileImage(image.dataUrl || null);
        } catch (error) {
            console.error("Error selecting image:", error);
        }
    };
    const handleSave = () => {
        // Here, you can add API calls to update the profile details in the backend.
        console.log("Saved Data:", {
            fullName,
            dob,
            gender,
            mobile,
            email,
            changePassword
        });

        setIsEditing(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>My Profile</IonTitle>
                    <IonButton fill="clear" slot="end" onClick={() => setIsEditing(!isEditing)}>
                        <IonIcon icon={createOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" style={{}}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", textAlign: "center", position: "relative", marginTop: "20px" }}>
                    <div style={{ width: "130px", height: "130px", borderRadius: "50%", overflow: "hidden", border: "2px solid #ddd" }}>
                        <IonImg src={profileImage || "/assets/default-profile.png"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ position: "absolute", bottom: "0px", right: "120px", width: "40px", height: "40px", backgroundColor: "white", borderRadius: "50%", boxShadow: "0px 2px 5px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleImageUpload}>
                        <IonFabButton size="small" color="light" style={{ width: "30px", height: "30px" }}>
                            <IonIcon icon={camera} size="small" color="primary" />
                        </IonFabButton>
                    </IonFab>
                </div>

                <div style={{ marginTop: "5%" }}>

                    <IonItem lines="none">
                        <IonLabel position="stacked">Full Name</IonLabel>
                        <InputText
                            style={{ marginTop: "3%" }}
                            variant="filled"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            disabled={!isEditing}
                        />


                    </IonItem>

                    <IonItem lines="none">
                        <IonLabel position="stacked">Date of Birth</IonLabel>
                        <InputText
                            style={{ marginTop: "3%" }}
                            variant="filled"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            disabled={!isEditing}
                        />


                    </IonItem>



                    <div style={{ marginTop: "3%" }}>
                        <IonItem lines="none">
                            <IonLabel position="stacked">Mobile Number</IonLabel>
                            <InputText
                                style={{ marginTop: "3%" }}
                                variant="filled"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                disabled={!isEditing}
                            />


                        </IonItem>

                        <IonItem lines="none">
                            <IonLabel position="stacked">Email</IonLabel>
                            <InputText
                                style={{ marginTop: "3%" }}
                                variant="filled"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!isEditing}
                            />


                        </IonItem>
                    </div>

                    <div style={{ marginTop: "3%" }}>
                        <IonItem lines="none">
                            <IonLabel position="stacked">Change Password</IonLabel>
                            <Password
                                value={changePassword}
                                onChange={(e) => setChangePassword(e.target.value)}
                                feedback={false}
                                tabIndex={1}
                                disabled={!isEditing}
                            />


                        </IonItem>


                    </div>
                    <div style={{ marginTop: "8%" }}>
                        <IonButton
                            expand="full"
                            shape="round"
                            color="primary"
                            style={{ marginTop: "20px" }}
                            onClick={handleSave}
                            disabled={!isEditing}
                        >
                            Save
                        </IonButton></div>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default UserProfile;