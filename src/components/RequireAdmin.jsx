// components/RequireAdmin.jsx
import { useAuth } from "../utils/AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  // console.log(`email:${email},isAdmin:${isAdmin}`);
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) {
    console.log("isAdmin:",isAdmin);
    return <div>Administrator permissions are required.</div>;
  }
  return children;
}



