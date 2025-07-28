import React from 'react';
import { useTranslation } from 'react-i18next';
import NavLinks from '../components/NavLinks';
import { useAuth } from '../utils/AuthContext'; // useAuth をインポート

const Profile = () => {
  const { t } = useTranslation();
  const { isAdmin, user, gUser } = useAuth(); // フック内で呼び出し
  const email = user?.email || gUser?.email || "unknown";
  console.log(`email:${email},isAdmin:${isAdmin}`);
  return (
    <>
      <div className="container">
        <h1>{t('profile.welcome')}</h1>
      </div>
    </>

  );
};

export default Profile;
