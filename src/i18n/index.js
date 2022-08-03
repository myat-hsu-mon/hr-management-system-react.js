import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import localeEn from "./locales/en.json";
import localeMm from "./locales/mm.json";

const resources = {
  en: {
    translation: localeEn,
  },
  mm: {
    translation: localeMm,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
