// src/pages/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Logout = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleReturnToLogin = () => {
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div>
                <h2>{t('logout.thankYou')}</h2>
                <button className="btn" onClick={handleReturnToLogin}>
                    {t('logout.backToLogin')}
                </button>
            </div>
        </div>
    );
};

export default Logout;
