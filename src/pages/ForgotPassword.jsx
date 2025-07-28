import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useTranslation } from "react-i18next";
import "../styles/CommonStyles.css";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { sendPasswordResetEmail } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      alert(t("forgotPassword.success"));
    } catch (error) {
      console.error(error);
      alert(t("forgotPassword.error"));
    }
  };

  return (
    <div className="container">
      <div className="login-register-container">
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          {t("forgotPassword.title")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field-wrapper">
            <label htmlFor="email">{t("forgotPassword.emailLabel")}</label>
            <input
              id="email"
              type="email"
              placeholder={t("forgotPassword.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <button type="submit" className="btn">
            {t("forgotPassword.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
