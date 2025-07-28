// src/pages/Home.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();         // 🔑 翻訳関数を取得

  return (
    <div className="container">
      {/* 翻訳キーを使って文言を取得 */}
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  );
}
// src/pages/Home.jsx