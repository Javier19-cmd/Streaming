import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const token = localStorage.getItem('token');
    return token && typeof token == 'string';
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;