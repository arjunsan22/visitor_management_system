import { ReusableSpinner } from "../components/common/ReusableSpinner";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ allowedRole }) => {

    const { user,loading } = useAuth();
    
    if (loading) {
        return <ReusableSpinner fullScreen={true} />;
    }
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};