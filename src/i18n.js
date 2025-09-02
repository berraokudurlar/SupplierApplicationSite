import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import en from './locales/en.json';
import tr from './locales/tr.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    lng: 'tr', // default language
    fallbackLng: 'tr', // fallback if translation is missing
    interpolation: {
      escapeValue: false, // react already safes from XSS
    },
  });

export default i18n;
