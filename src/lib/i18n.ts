import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import esTranslation from "../locales/es.json";

const resources = {
  es: {
    translation: esTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
