// ResetPassword.jsx
import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/CommonStyles.css";

const ResetPassword = () => {
  const { resetPassword: handleResetPassword } = useAuth();
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const secret = params.get("secret");

  const { t } = useTranslation();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      alert(t("resetPassword.mismatch"));
      return;
    }
    try {
      await handleResetPassword(userId, secret, password1, password2);
      console.log(t("resetPassword.success"));
    } catch (error) {
      console.error(error);
      alert(t("resetPassword.error"));
    }
  };

  return (
    <div className="container">
      <div className="login-register-container">
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          {t("resetPassword.title")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field-wrapper">
            <label htmlFor="password1">{t("resetPassword.newPassword")}</label>
            <input
              id="password1"
              type="password"
              placeholder={t("resetPassword.placeholder.newPassword")}
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div className="form-field-wrapper">
            <label htmlFor="password2">{t("resetPassword.confirmPassword")}</label>
            <input
              id="password2"
              type="password"
              placeholder={t("resetPassword.placeholder.confirmPassword")}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <button type="submit" className="btn">
            {t("resetPassword.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
// ResetPassword.jsx