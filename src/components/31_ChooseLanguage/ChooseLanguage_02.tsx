import React, { useEffect, useState } from "react";

import logo from "../../assets/images/Icons/Medpredit Icon.png";

import tamil from "../../assets/images/Chooselanguage/Tamil1.png";
import english from "../../assets/images/Chooselanguage/English.png";
import hindi from "../../assets/images/Chooselanguage/Hindi.png";

import { useTranslation } from "react-i18next";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router";
import axios from "axios";
import decrypt from "../../helper";
import { chevronBack } from "ionicons/icons";
import CustomIonLoading from "../CustomIonLoading/CustomIonLoading";

interface Category {
  refLId: any;
  refLKey: string;
  refLName: string;
  refLimage: string;
  refLlandcode: string;
}

const Chooselanguage_02: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_COMMERCIAL_URL}/getLanguage`).then((response) => {
      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      if (data.status) {
        setLoading(false);
        setCategories(data.getLanguage);
      }


      console.log(data)
    })
  }, [])

  // const categories = [
  //   { name: "English", key: "1", langCode: "english", image: english },
  //   { name: "हिंदी", key: "2", langCode: "hindi", image: hindi },
  // ];


  const [categories, setCategories] = useState<Category[]>([])

  const { t, i18n } = useTranslation("global");

  const handleChangeLang = (lang: string) => {
    console.log("lang", lang);
    i18n.changeLanguage(lang);
  };

  const history = useHistory();

  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("refLanCode") ? localStorage.getItem("refLanCode") : categories[0]?.refLKey
  );

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category.refLKey);
    handleChangeLang(category.refLlandcode);
    localStorage.setItem("refLanCode", category.refLKey);
    localStorage.setItem("lang", category.refLlandcode)
    location.replace("/")
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" icon={chevronBack} defaultHref="/home" />
          </IonButtons>
          <IonTitle>{t("chooseLanguage.language")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ionContentsLoginScreen">
          {/* Centered content */}
          <div className="language-container">
            {/* <div className="pageLanguage-logo">
              <img src={logo} />
              <h2>{t("chooseLanguage.subtitle")}</h2>
            </div> */}
            {/* <p className="text">{t("chooseLanguage.language")}</p> */}
            <div className="card">
              {categories.map((category) => (
                <div
                  key={category.refLKey}
                  className={`language-option ${selectedCategory === category.refLKey ? "selected" : ""
                    }`}
                  onClick={() => handleSelectCategory(category)}
                >
                  <div className="radio-group">
                    <input
                      type="radio"
                      id={category.refLKey}
                      name="category"
                      value={category.refLKey}
                      checked={selectedCategory === category.refLKey}
                      onChange={() => handleSelectCategory(category)}
                    />
                    <label htmlFor={category.refLKey}>{category.refLName}</label>
                  </div>
                  <div className="imageForLang">
                    <img src={category.refLId === "1" ? english : category.refLId === "2" ? hindi : english} alt={category.refLName} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Button at the bottom */}
          {/* <div className="button-container">
            <button
              onClick={() =>
                history.push("/login", {
                  direction: "forward",
                  animation: "slide",
                })
              }
              className="select-button"
            >
              {t("chooseLanguage.select")}
            </button>
          </div> */}
        </div>
      </IonContent>
      <CustomIonLoading isOpen={loading} />
    </IonPage>
  );
};

export default Chooselanguage_02;
