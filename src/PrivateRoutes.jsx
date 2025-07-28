import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const PrivateRoutes = () => {
    const { user, authLoading } = useContext(AuthContext);

    if (authLoading) return <p>Loading...</p>;

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
