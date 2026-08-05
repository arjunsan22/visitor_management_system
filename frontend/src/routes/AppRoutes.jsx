import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";

import Dashboard from "../pages/admin/Dashboard";
import Visitors from "../pages/admin/Visitors";
import SecurityManagement from "../pages/admin/SecurityManagement";

import SecurityDashboard from "../pages/security/SecurityDashboard";
import Scanner from "../pages/security/Scanner";
import VisitorDetails from "../pages/security/VisitorDetails";

import VisitorPass from "../pages/visitor/VisitorPass";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Auth */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Admin */}
                <Route
                    path="/admin/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin/visitors"
                    element={<Visitors />}
                />

                <Route
                    path="/admin/security"
                    element={<SecurityManagement />}
                />

                {/* Security */}
                <Route
                    path="/security/dashboard"
                    element={<SecurityDashboard />}
                />

                <Route
                    path="/security/scanner"
                    element={<Scanner />}
                />

                <Route
                    path="/security/visitor/:token"
                    element={<VisitorDetails />}
                />

                {/* Visitor */}
                <Route
                    path="/pass/:token"
                    element={<VisitorPass />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;