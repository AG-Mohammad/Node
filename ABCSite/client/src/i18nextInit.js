import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import translationEN from "./assets/Locals/en/translation.json";
import translationAR from "./assets/Locals/ar/translation.json";

const fallbackLng = (sessionStorage.getItem("lang")? sessionStorage.getItem("lang"):["en"]);
const availableLanguages = ["en", "ar"];

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,

    detection: {
      checkWhitelist: true,
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
