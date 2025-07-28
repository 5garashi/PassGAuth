import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRouters from './utils/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext.jsx'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import RechartsPage from './pages/Recharts';
import RechartsDashboard from './pages/RechartsDashboard';
import Verify from './pages/Verify.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Layout from './components/Layout';
import RequireAdmin from './components/RequireAdmin';
import AdminSigninsPage from './pages/AdminSigninsPage';



// ステップ1で作成したコンポーネントをインポート
import OAuthCallback from './pages/OAuthCallback.jsx';

function App() {

  return (
    // <Router basename={import.meta.env.BASE_URL}>
    <Router>
      <AuthProvider>
        <Header/>
          <Routes>
            {/* 公開ページ */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/oauth-callback" element={<OAuthCallback />} />

            {/* 認証ユーザー専用ページ（PrivateRouters） */}
            <Route element={<PrivateRouters />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/recharts" element={<RechartsPage />} />
                <Route path="/rechartsDashboard" element={<RechartsDashboard />} />

                {/* 管理者のみアクセス可能 */}
                <Route
                  path="/admin/logins"
                  element={
                    <RequireAdmin>
                      <AdminSigninsPage />
                    </RequireAdmin>
                  }
                />
              </Route>
            </Route>
          </Routes>



        {/* <Routes>
          <Route path="/login" element={<Login/>}/> 
          <Route path="/register" element={<Register/>}/>
          <Route path="/logout" element={<Logout />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        
          <Route path="/oauth-callback" element={<OAuthCallback />} />
            <Route element={<PrivateRouters />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/recharts" element={<RechartsPage />} />
                <Route path="/rechartsDashboard" element={<RechartsDashboard />} />
                <Route
                  path="/admin/logins"
                  element={
                    <RequireAdmin>
                      <AdminSigninsPage />
                    </RequireAdmin>
                  }
                />
              </Route>
            </Route>
          <Route element={<PrivateRouters />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/recharts" element={<RechartsPage />} />
              <Route path="/rechartsDashboard" element={<RechartsDashboard />} />
            </Route>
            <Route
              path="/admin/logins"
              element={
                <RequireAdmin>
                  <AdminSigninsPage />
                </RequireAdmin>
              }
            />
          </Route>
        </Routes> */}
      </AuthProvider>
    </Router>
  )
}

export default App
