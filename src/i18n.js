// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)          // public/locales/** から JSON をフェッチ
  .use(LanguageDetector)     // ブラウザ言語を自動判定
  .use(initReactI18next)     // react-i18next を初期化
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ja'],
    interpolation: { escapeValue: false },
    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;
