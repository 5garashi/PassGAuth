// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { account } from '../appwriteConfig';
import { useTranslation } from 'react-i18next';
import ToggleLanguageButton from './ToggleLanguageButton';

export default function Header() {
  const navigate = useNavigate();
  const { user, gUser, setAndSaveGUser, isGuest, setIsGuest, logoutUser, isAuthenticated, performLogout, isAdmin } = useAuth();

  const { t } = useTranslation();
  const isProtectedPath = [
    '/profile',
    '/rechartsDashboard',
    '/recharts'
  ].some((path) => location.pathname.startsWith(path));

  const [isGoogleUser, setIsGoogleUser] = React.useState(false);

  const logoutClick = async () => {
    await performLogout();
    navigate('/logout');
  };

  React.useEffect(() => {
    setIsGoogleUser(!!gUser);
  }, [gUser]);

  const fullLogout = async () => {
    await performLogout();
    window.location.href = 'https://accounts.google.com/Logout';
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isProtectedPath && (
          <span className="protected-banner">
            Protected{'\n'}Page
          </span>
        )}
        <img
          src={`${import.meta.env.BASE_URL}5garashiLogo.gif`}
          alt="5garashi logo"
          style={{ height: '2em', marginRight: '10px' }}
        />
        <Link to="/">{t('header.siteName')}</Link>
      </div>

      <div className="links--wrapper">
        {isAuthenticated ? (
          <>
            {(user?.email || gUser?.email) && (
              <span className="user-email" style={{ fontSize: '0.9rem' }}>
                {user?.email || gUser?.email}
              </span>
            )}
            <Link to="/profile" className="header--link">{t('nav.profile')}</Link>
            <Link to="/rechartsDashboard" className="header--link">{t('nav.rechartsDashboard')}</Link>

            {isAdmin && (
              <Link to="/admin/logins" className="header--link">Admin</Link>
            )}

            <button onClick={logoutClick} className="btn">
              {t('auth.logout')}
            </button>

            {isGoogleUser && (
              <button onClick={fullLogout} className="btn" style={{ marginLeft: '10px' }}>
                {t('auth.fullLogout')}
              </button>
            )}
          </>
        ) : (
          <h1 style={{ textAlign: 'left' }}>{t('header.welcome')}</h1>
        )}

        <ToggleLanguageButton />
      </div>
    </header>
  );
}

