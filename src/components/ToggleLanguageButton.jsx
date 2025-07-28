// src/components/ToggleLanguageButton.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ToggleLanguageButton() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const nextLang = currentLang === 'en' ? 'ja' : 'en';

  // public フォルダから国旗画像を参照
  const flagImagePath = `${import.meta.env.BASE_URL}flags/${nextLang}.png`;

  return (
    <button
      onClick={() => i18n.changeLanguage(nextLang)}
      title={nextLang === 'en' ? 'Switch to English' : '日本語に切り替え'}
      style={{
        marginLeft: '1rem',
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
      }}
    >
      <img
        src={flagImagePath}
        alt={nextLang === 'en' ? 'Switch to English' : '日本語に切り替え'}
        style={{
          width: '32px',
          height: '24px',
          objectFit: 'cover',
          borderRadius: '4px',
          boxShadow: '0 0 3px rgba(0,0,0,0.2)',
        }}
      />
    </button>
  );
}
