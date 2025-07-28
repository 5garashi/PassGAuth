import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { ID, Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import { databases } from "../appwriteConfig";
const DB_ID = import.meta.env.VITE_DB_ID
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();          // ★ 翻訳フック
  const [user, setUser]   = useState(null);
  const [gUser, setGUser] = useState(undefined); // ← Googleユーザー
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);


 
  // const isAuthenticated =
  // isGuest ||
  // (user && typeof user === 'object' && user.$id && typeof user.$id === 'string') ||
  // (gUser && typeof gUser === 'object' && gUser.sub && typeof gUser.sub === 'string');

  const isAuthenticated = useMemo(() => {
    return (
      isGuest ||
      (user && typeof user === 'object' && user.$id && typeof user.$id === 'string') ||
      (gUser && typeof gUser === 'object' && gUser.sub && typeof gUser.sub === 'string')
    );
  }, [user, gUser, isGuest]);

  /* ---------- 初回ロード ---------- */
  useEffect(() => {
    const initializeAuth = async () => {
      const savedGUser = localStorage.getItem('gUser');
      if (savedGUser) {
        setGUser(JSON.parse(savedGUser));
      }

      await checkUserStatus();
      setLoading(false); // ← 初期化が完了してから loading を解除
    };

    initializeAuth();
  }, []);
  // const checkUserStatus = async () => {
  //   try {
  //     const accountDetails = await account.get();
  //     if (!accountDetails.emailVerification) {
  //       await account.deleteSession("current");
  //       setUser(null);
  //     } else {
  //       setUser(accountDetails);
  //     }
  //   } catch {
  //     setUser(null);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      if (!accountDetails.emailVerification) {
        await account.deleteSession("current");
        setUser(null);
      } else {
        setUser(accountDetails);
        await loadAdminStatus(accountDetails.email);
      }
    } catch {
      setUser(null);
    }
  };

  const loadAdminStatus = async (email) => {
    try {
      const existing = await databases.listDocuments(DB_ID, COLLECTION_ID, [
        Query.equal("email", [email])
      ]);
      if (existing.total > 0) {
        const doc = existing.documents[0];
        setAdmin(!!doc.admin);
        console.log(`loadAdminStatus email:${email}, isAdmin:${!!doc.admin}`);
      } else {
        setAdmin(false);
        console.log(`loadAdminStatus email:${email}, isAdmin:`);
      }
      
    } catch (error) {
      console.error("Error loading admin status:", error);
      setAdmin(false);
    }
  };


  const performLogout = async () => {
    setIsGuest(false);
    setAndSaveGUser(null); // gUserとlocalStorage削除

    try {
      const session = await account.getSession('current');
      if (session) {
        await account.deleteSession('current');
      }
    } catch (error) {
      if (error.code !== 401 && !error.message.includes("missing scope")) {
        console.error(`${t("auth.logoutFailed")}:`, error);
      }
    }

    setUser(null);
  };

  /* ---------- ログイン ---------- */
  const loginUser = async ({ email, password }) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const accountDetails = await account.get();

      if (!accountDetails.emailVerification) {
        await account.createVerification(import.meta.env.VITE_REDIRECT + "verify");
        alert(t("auth.emailNotVerified"));
        await account.deleteSession("current");
        setUser(null);
      } else {
        setUser(accountDetails);
        await recordLogin(accountDetails.email, "password",isAdmin);
      }
    } catch (error) {
      alert(`${t("auth.loginFailed")}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
const loginWithGoogle = async (decodedUser) => {
  setGUser(decodedUser);
  const email = decodedUser.email;
  await recordLogin(email, "google");
  navigate('/');
};

const recordLogin = async (email, loginType = 'unknown') => {
  try {
    const ipRes = await fetch("https://api64.ipify.org?format=json");
    const { ip } = await ipRes.json();
    const now = new Date().toISOString();

    const existing = await databases.listDocuments(DB_ID, COLLECTION_ID, [
      Query.equal("email", [email])
    ]);

    // 管理者リストに含まれているかを判定、管理者リストに含まれていれば必ずtrue、それ以外はとりあえずfalse。
    const isAdminListed = ADMIN_EMAILS.includes(email);
    let finalAdmin = isAdminListed;

    if (existing.total > 0) {
      const doc = existing.documents[0];

      // 管理者リストに含まれず、データベースにデータがあれば既存のadmin設定を維持
      if (!isAdminListed && doc.admin !== undefined) {
        finalAdmin = doc.admin;
      }

      await databases.updateDocument(DB_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
        lastLogin: now,
        ip,
        loginType,
        admin: finalAdmin,
      });
    } else {
      await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
        email,
        count: 1,
        lastLogin: now,
        ip,
        loginType,
        admin: finalAdmin,
      });
    }
    console.log(`email:${email},finalAdmin:${finalAdmin}`);
    setAdmin(finalAdmin);
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms待機
    console.log(`email:${email},isAdmin:${isAdmin}`);
  } catch (error) {
    console.error("Login record error :", error);
  }
};

// const recordLogin = async (email, loginType = 'unknown') => {
//   try {
//     const ipRes = await fetch("https://api64.ipify.org?format=json");
//     const { ip } = await ipRes.json();
//     const now = new Date().toISOString();

//     const existing = await databases.listDocuments(DB_ID, COLLECTION_ID, [
//       Query.equal("email", [email])
//     ]);

//     let finalAdmin = ADMIN_EMAILS.includes(email);

//     if (existing.total > 0) {
//       const doc = existing.documents[0];
//       if (doc.admin !== undefined) {
//         finalAdmin = doc.admin;
//       }
//       await databases.updateDocument(DB_ID, COLLECTION_ID, doc.$id, {
//         count: doc.count + 1,
//         lastLogin: now,
//         ip,
//         loginType,
//         admin: finalAdmin,
//       });
//     } else {
//       await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
//         email,
//         count: 1,
//         lastLogin: now,
//         ip,
//         loginType,
//         admin: finalAdmin,
//       });
//     }

//     setAdmin(finalAdmin);
//   } catch (error) {
//     console.error("Login record error :", error);
//   }
// };


  /* ---------- 新規登録 ---------- */
  const registerUser = async ({ name, email, password1 }) => {
    try {
      await account.create(ID.unique(), email, password1, name);
      await account.createEmailPasswordSession(email, password1);
      await account.createVerification(import.meta.env.VITE_REDIRECT + "verify");
      alert(t("auth.verificationMailSent"));
      await account.deleteSession("current");
    } catch (error) {
      if (error.code === 409) {
        try {
          await account.createEmailPasswordSession(email, password1);
          const existingUser = await account.get();

          if (!existingUser.emailVerification) {
            await account.createVerification(import.meta.env.VITE_REDIRECT + "verify");
            alert(t("auth.verificationMailResent"));
          } else {
            alert(t("auth.emailAlreadyVerified"));
          }
          await account.deleteSession("current");
        } catch {
          alert(t("auth.existingUserLoginFailed"));
        }
      } else {
        alert(`${t("auth.registrationFailed")}: ${error.message}`);
      }
    }
  };

  /* ---------- ログアウト ---------- */
  // 外部から呼ぶ用：UIロジックやリダイレクト処理はここで
  const logoutUser = async () => {
    try {
      await performLogout();
    } catch (error) {
      console.error(`${t("auth.logoutFailed")}:`, error);
    }
  };

  /* ---------- パスワードリセットメール ---------- */
  const sendPasswordResetEmail = async (email) => {
    try {
      await account.createRecovery(email, import.meta.env.VITE_REDIRECT + "/ResetPassword");

    } catch (error) {
      console.error(`${t("auth.mailSendFailedWithReason")}: ${error.message}`);
      // alert(t("auth.mailSendFailed"));
    }
  };

  /* ---------- パスワード再設定 ---------- */
  const resetPassword = async (userId, secret, newPassword, confirmPassword) => {
    try {
      await account.updateRecovery(userId, secret, newPassword, confirmPassword);
      alert(t("auth.passwordResetSuccess"));
      navigate("/login");
    } catch (error) {
      alert(`${t("auth.passwordResetFailed")}: ${error.message}`);
    }
  };

  const setAndSaveGUser = (userData) => {
    setGUser(userData);
    if (userData) {
      localStorage.setItem('gUser', JSON.stringify(userData));
    } else {
      localStorage.removeItem('gUser');
    }
  };

const adminEmailsEnv = import.meta.env.VITE_ADMIN_EMAILS || "";
const ADMIN_EMAILS = adminEmailsEnv.split(",").map(email => email.trim());

const [admin, setAdmin] = useState(false); // 管理者状態を保持
// const [admin, setAdmin] = useState(false); // 管理者状態を保持

// isAdmin は admin 状態だけを参照する（user/gUser に依存しない）
// const isAdmin = useMemo(() => {
//   const email = user?.email || gUser?.email;
//   return ADMIN_EMAILS.includes(email);
// }, [user, gUser]);

const isAdmin = useMemo(() => admin, [admin]);

// const isAdmin = useMemo(() => {
//   const email = user?.email || gUser?.email;
//   return admin !== undefined ? admin : false;
// }, [user, gUser, admin]);

  const contextData = {
    user,
    gUser,       
    setAndSaveGUser,  
    isGuest,
    setIsGuest, 
    loginUser,
    logoutUser,
    registerUser,
    sendPasswordResetEmail,
    resetPassword,
    isAuthenticated,
    performLogout, 
    recordLogin,
    isAdmin, 
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>{t("auth.loading")}</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
