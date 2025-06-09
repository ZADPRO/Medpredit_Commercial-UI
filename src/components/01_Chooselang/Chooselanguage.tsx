import React, { useEffect, useState } from "react";
import "./Chooselanguage.css";

import logo from "../../assets/images/Icons/Medpredit Icon.png";

import tamil from "../../assets/images/Chooselanguage/Tamil1.png";
import english from "../../assets/images/Chooselanguage/English.png";
import hindi from "../../assets/images/Chooselanguage/Hindi.png";

import { useTranslation } from "react-i18next";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import axios from "axios";
import decrypt from "../../helper";
import CustomIonLoading from "../CustomIonLoading/CustomIonLoading";

interface Category {
  refLId: any;
  refLKey: string;
  refLName: string;
  refLimage: string;
  refLlandcode: string;
}

const Chooselanguage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_COMMERCIAL_URL}/getLanguage`)
      .then((response) => {
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.status) {
          setLoading(false);
          setCategories(data.getLanguage);
          setSelectedCategory(
            localStorage.getItem("refLanCode")
              ? localStorage.getItem("refLanCode")
              : (data.getLanguage.length > 0 ? data.getLanguage[0].refLKey : "1")
          );
          localStorage.getItem("refLanCode") == undefined && localStorage.setItem("refLanCode", data.getLanguage.length > 0 ? data.getLanguage[0].refLKey : "1");
          localStorage.getItem("lang") == undefined && localStorage.setItem("lang", data.getLanguage.length > 0 ? data.getLanguage[0].refLlandcode: "english");
        }

        console.log(data);
      });
  }, []);

  // const categories = [
  //   { name: "English", key: "1", langCode: "english", image: english },
  //   { name: "हिंदी", key: "2", langCode: "hindi", image: hindi },
  // ];

  const [categories, setCategories] = useState<Category[]>([]);

  const { t, i18n } = useTranslation("global");

  const handleChangeLang = (lang: string) => {
    console.log("lang", lang);
    i18n.changeLanguage(lang);
  };

  const history = useHistory();

  const [selectedCategory, setSelectedCategory]: any = useState();

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category.refLKey);
    handleChangeLang(category.refLlandcode);
    localStorage.setItem("refLanCode", category.refLKey);
    localStorage.setItem("lang", category.refLlandcode);
  };

  return (
    <IonPage className="pagelanguage">
      <IonContent fullscreen>
        <div className="ionContentsLoginScreen">
          {/* Centered content */}
          <div className="language-container">
            <div className="pageLanguage-logo">
              <img src={logo} />
              <h2>{t("chooseLanguage.subtitle")}</h2>
            </div>
            {/* <p className="text">{t("chooseLanguage.language")}</p> */}
            <div className="card">
              {categories.map((category) => (
                <div
                  key={category.refLKey}
                  className={`language-option ${
                    selectedCategory === category.refLKey ? "selected" : ""
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
                    <label htmlFor={category.refLKey}>
                      {category.refLName}
                    </label>
                  </div>
                  <div className="imageForLang">
                    <img
                      src={
                        category.refLId === "1"
                          ? english
                          : category.refLId === "2"
                          ? hindi
                          : english
                      }
                      alt={category.refLName}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Button at the bottom */}
          <div className="button-container">
            <button
              onClick={() =>
                
                history.push("/getStarted", {
                  direction: "forward",
                  animation: "slide",
                })
              }
              className="select-button"
            >
              {t("chooseLanguage.select")}
            </button>
          </div>
        </div>
      </IonContent>
      <CustomIonLoading isOpen={loading} />
    </IonPage>
  );
};

export default Chooselanguage;
