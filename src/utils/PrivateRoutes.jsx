import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && location.pathname === '/') {
    return <Navigate to="/rechartsDashboard" replace />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
// import { Outlet, Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const PrivateRoutes = () => {
//   const { isAuthenticated, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (isAuthenticated && location.pathname === '/') {
//     return <Navigate to="/rechartsDashboard" replace />;
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoutes;


// import { Outlet, Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from './AuthContext';
  


// const PrivateRoutes = () => {
//   const { user, isGuest, gUser,isAuthenticated   } = useAuth();

//   const location = useLocation();

//   console.log(`PrivateRoutes user:${user}, gUser:${gUser}, isGuest:${isGuest}`);

//   // 認証状態チェック中
//   if (user === undefined && gUser === undefined && !isGuest) {
//     return <div>Loading...</div>;
//   }

//   // ★ 追加：ログイン済かつ "/" にアクセスした場合にだけ dashboard へリダイレクト
//   if (isAuthenticated && location.pathname === '/') {
//     return <Navigate to="/rechartsDashboard" replace />;
//   }

//   // 通常の保護ルートレンダリング
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoutes;