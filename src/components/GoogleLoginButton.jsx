import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../utils/AuthContext'; 
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginButton({ onLogin }) {
  const { setAndSaveGUser } = useAuth();
  const navigate = useNavigate();

  return (
    <GoogleOAuthProvider clientId="391282413696-roioh22dva466f7l6iuarafnnftctg52.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={credentialResponse => {
          const idToken = credentialResponse.credential;
          const decoded = jwtDecode(idToken);
          console.log("Google user:", decoded);
          setAndSaveGUser(decoded);  // ローカルストレージ保存もここで完結
          onLogin(idToken, decoded);
          // navigate('/');
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
}
