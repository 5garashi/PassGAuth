// src/pages/OAuthCallback.jsx
import React, { useEffect } from 'react';
import { Account } from 'appwrite';
import client from '../appwriteConfig';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      console.log('OAuthCallback useEffect triggered');
      console.log('Client:', client);
      try {
        const account = new Account(client);
        console.log('Account instance created:', account);
        const session = await account.getSession('current');
        console.log('Session retrieved:', session);
        console.log(session.provider);
        console.log(session.providerUid);
        console.log(session.providerAccessToken);

        const user = await account.get();
        console.log('User:', user);

        if (user) {
          navigate(
            `/rechartsDashboard?email=${encodeURIComponent(user.email)}&id=${encodeURIComponent(user.$id)}`
            // `/profile?email=${encodeURIComponent(user.email)}&id=${encodeURIComponent(user.$id)}`
          );
        } else {
          throw new Error('User not authenticated');
        }
      } catch (error) {
        console.error('OAuth process failed:', error);
        alert(t('oauthCallback.failed'));
        navigate('/login?error=session_failed');
      }
    };

    handleOAuthCallback();
  }, [navigate, t]);

  return <p>{t('oauthCallback.processing')}</p>;
};

export default OAuthCallback;
