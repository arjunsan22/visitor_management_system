import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/auth/Login";

import { Dashboard } from "../pages/admin/Dashboard";
import { Visitors } from "../pages/admin/Visitors";
import { SecurityManagement } from "../pages/admin/SecurityManagement";

import { SecurityDashboard } from "../pages/security/SecurityDashboard";
import { Scanner } from "../pages/security/Scanner";
import { VisitorDetails } from "../pages/security/VisitorDetails";
import { Home } from "../pages/visitor/Home";// '/' main home route
import { VisitorPass } from "../pages/visitor/VisitorPass";

import { AdminLayout } from "../layouts/AdminLayout";
import { SecurityLayout } from "../layouts/SecurityLayout";
import { PublicLayout } from "../layouts/PublicLayout";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/pass/:token"
                        element={<VisitorPass />}
                    />

                </Route>

                {/* Admin */}
                <Route
                    path="/admin"
                    element={<AdminLayout />}
                >

                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="visitors"
                        element={<Visitors />}
                    />

                    <Route
                        path="security"
                        element={<SecurityManagement />}
                    />

                </Route>

                {/* Security */}
                <Route
                    path="/security"
                    element={<SecurityLayout />}
                >

                    <Route
                        path="dashboard"
                        element={<SecurityDashboard />}
                    />

                    <Route
                        path="scanner"
                        element={<Scanner />}
                    />

                    <Route
                        path="visitor/:token"
                        element={<VisitorDetails />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;