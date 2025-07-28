import React, { useEffect, useState } from 'react';
import { account } from '../appwriteConfig';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Verify() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [message, setMessage] = useState(t("verify.verifying"));

  useEffect(() => {
    const completeVerification = async () => {
      const params = new URLSearchParams(window.location.search);
      const userId = params.get('userId');
      const secret = params.get('secret');

      if (userId && secret) {
        try {
          await account.updateVerification(userId, secret);
          setMessage(t("verify.success"));
          setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
          console.error(err);
          setMessage(t("verify.failure") + ": " + err.message);
        }
      } else {
        setMessage(t("verify.invalid_link"));
      }
    };

    completeVerification();
  }, [navigate, t]);

  return (
    <div className="container">
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>{message}</p>
    </div>
  );
}
