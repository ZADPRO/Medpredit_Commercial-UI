import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import global_tamil from "../src/translations/tamil/global.json";
import global_english from "../src/translations/english/global.json";
import global_hindi from "../src/translations/hindi/global.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "tamil",
  resources: {
    tamil: {
      global: global_tamil,
    },
    english: {
      global: global_english,
    },
    hindi: {
      global: global_hindi,
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>{" "}
    </PrimeReactProvider>{" "}
  </React.StrictMode>
);
