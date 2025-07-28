
//Login.jsx
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { account } from '../appwriteConfig';
import { OAuthProvider } from 'appwrite';
import { useTranslation } from 'react-i18next';
import '../styles/CommonStyles.css';
import GoogleLoginButton from '../components/GoogleLoginButton';



const Login = () => {

  const { t } = useTranslation();
  const { setIsGuest, user, gUser, loginUser, logoutUser, recordLogin, isAdmin,loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const loginForm = useRef(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;
    const GUEST_EMAIL = 'guest@5garashi.com';
    const GUEST_PASS = 'guestPass';
    // 👇 ここでゲスト認証を先にチェック
    if (email === GUEST_EMAIL && password === GUEST_PASS) {
      setIsGuest(true);
      recordLogin(GUEST_EMAIL,"guest",isAdmin);
      navigate('/');
      return;
    }
    // 通常のログイン処理
    loginUser({ email, password });
  };


  const fullLogout = async () => {
    try {
      const session = await account.getSession('current');
      if (session) {
        await account.deleteSession('current');
      }
      window.location.href = 'https://accounts.google.com/Logout';
    } catch (error) {
      if (error.code === 401) {
        window.location.href = 'https://accounts.google.com/Logout';
      } else {
        console.error('Error during full logout:', error);
      }
    }
  };
  
  return (
    <div className="container">
      <div className="login-register-container">
        <form onSubmit={handleSubmit} ref={loginForm}>
          <div className="form-field-wrapper">
            <label>{t("login.emailLabel")}</label>
            <input
              required
              type="email"
              name="email"
              placeholder={t("login.emailPlaceholder")}
            />
          </div>
          <div className="form-field-wrapper">
            <label>{t("login.passwordLabel")}</label>
            <input
              type="password"
              name="password"
              placeholder={t("login.passwordPlaceholder")}
              autoComplete="password"
            />
          </div>
          <div className="form-field-wrapper" style={{ fontSize: '0.9rem' }}>
            <>Guest Mail / PW: guest@5garashi.com / guestPass</>
            <input type="submit" value={t("login.loginButton")} className="btn" />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <button type="button" onClick={() => navigate("/forgotPassword")}>
              {t("login.forgotPassword")}
            </button>
          </div>
        </form>
        <div style={{ fontSize: '0.9rem' }}>
          <p> 
            {t("login.noAccount")} <Link to="/register">{t("login.register")}</Link>
          </p>
        <hr />
        <p>{t("login.or")}</p>
        </div>

        
        <GoogleLoginButton onLogin={(idToken, decodedUser) => {
          loginWithGoogle(decodedUser);
        }} />


        {user && (
          <div style={{ marginTop: '1rem' }}>
            <button className="btn" onClick={logoutUser}>
              {t("login.logout")}
            </button>
            <button className="btn" onClick={fullLogout} style={{ marginLeft: '10px' }}>
              {t("login.fullLogout")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
