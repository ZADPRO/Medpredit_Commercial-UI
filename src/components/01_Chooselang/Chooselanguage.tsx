import React, { useState } from "react";
import "./Chooselanguage.css";

import logo from "../../assets/images/Splashscreen/logo.png";

import tamil from "../../assets/images/Chooselanguage/Tamil.png";
import english from "../../assets/images/Chooselanguage/English.png";
import hindi from "../../assets/images/Chooselanguage/Hindi.png";

import { useTranslation } from "react-i18next";
import { IonContent, IonPage } from "@ionic/react";

interface Category {
  name: string;
  key: string;
  langCode: string;
}

const Chooselanguage: React.FC = () => {
  const categories = [
    { name: "English", key: "E", langCode: "english", image: english },
    { name: "Tamil", key: "T", langCode: "tamil", image: tamil },
    { name: "Hindi", key: "H", langCode: "hindi", image: hindi },
  ];

  const { t, i18n } = useTranslation("global");

  const handleChangeLang = (lang: string) => {
    console.log("lang", lang);
    i18n.changeLanguage(lang);
  };

  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    handleChangeLang(category.langCode);
  };

  return (
    <IonPage className="pagelanguage">
      <IonContent fullscreen>
        <div className="ionContentsLoginScreen">
          {/* Centered content */}
          <div className="language-container">
            <p className="text">Choose your Language</p>
            <p>{t("chooseLanguage.home")}</p>

            <div className="card">
              {categories.map((category) => (
                <div
                  key={category.key}
                  className={`language-option ${
                    selectedCategory.key === category.key ? "selected" : ""
                  }`}
                  onClick={() => handleSelectCategory(category)}
                >
                  <div className="radio-group">
                    <input
                      type="radio"
                      id={category.key}
                      name="category"
                      value={category.key}
                      checked={selectedCategory.key === category.key}
                      onChange={() => handleSelectCategory(category)}
                    />
                    <label htmlFor={category.key}>{category.name}</label>
                  </div>
                  <div className="imageForLang">
                    <img src={category.image} alt={category.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Button at the bottom */}
          <div className="button-container">
            <button className="select-button">Select</button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chooselanguage;
