import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PublicOnlyRoute = () => {

    const { user } = useAuth();

    if (user) {

        if (user.role === "security") {
            return <Navigate to="/security/dashboard" replace />;
        }

        if (user.role === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }
    }

    return <Outlet />;


};
