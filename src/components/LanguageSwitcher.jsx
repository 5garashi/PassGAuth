//LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const buttonStyle = {
    marginLeft: '0.5rem',
    border: 'gray 1px solid',
    borderRadius: '5px',
    padding: '0.2rem 0.5rem',
    cursor: 'pointer',
    background: 'white',
  };

  return (
    <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
      5garashi.com
      {currentLang !== 'en' && (
        <button onClick={() => handleLanguageChange('en')} style={buttonStyle}>
          English
        </button>
      )}
      {currentLang !== 'ja' && (
        <button onClick={() => handleLanguageChange('ja')} style={buttonStyle}>
          日本語
        </button>
      )}
    </div>
  );
}
