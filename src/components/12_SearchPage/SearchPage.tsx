import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import "./SearchPage.css";
import { chevronBack } from "ionicons/icons";

const SearchPage: React.FC = () => {
  const { t } = useTranslation("global");
  const [searchText, setSearchText] = useState("");

  const services = [
    { serviceId: 9, title: t("home.Stress"), path: "/serviceAssessment" },
    { serviceId: 11, title: t("home.Alcohol"), path: "/serviceAssessment" },
    { serviceId: 43, title: t("home.Sleep"), path: "/serviceAssessment" },
    { serviceId: 10, title: t("home.Tobacco"), path: "/serviceAssessment" },
    { serviceId: 12, title: t("home.Dietary"), path: "/serviceAssessment" },
    { serviceId: 13, title: t("home.BMI"), path: "/serviceAssessment" },
    {
      serviceId: 8,
      title: t("home.Physical Activity"),
      path: "/serviceAssessment",
    },
    {
      serviceId: 51,
      title: t("home.Family History"),
      path: "/serviceAssessment",
    },
  ];

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage className="searchbar-page cus-ion-page">
      <IonHeader className="searchBar-page-header">
        <IonToolbar className="searchbar-page-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" mode="md" icon={chevronBack} />
          </IonButtons>
          <IonSearchbar
            value={searchText}
            mode="md"
            onIonInput={(e) => setSearchText(e.detail.value ?? "")}
            placeholder={t("home.Search Service")}
            className="searchbar-page-searchbar"
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
  {filteredServices.length > 0 ? (
    <IonList>
      {filteredServices.map((service) => (
        <IonItem
          key={service.serviceId}
          routerLink={`${service.path}/${service.serviceId}`}
        >
          <IonLabel>{service.title}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  ) : (
    <div className="searchbar-page-no-results">
      {t("home.No results found")}
    </div>
  )}
</IonContent>

    </IonPage>
  );
};

export default SearchPage;
