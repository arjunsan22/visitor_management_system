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
import { NewVisitor } from "../pages/visitor/NewVisitor";
// Protection routes
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicOnlyRoute } from "./PublicOnlyRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route element={<PublicLayout />}>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/visitor/new"
                        element={<NewVisitor />}
                    />

                    <Route element={<PublicOnlyRoute />}>
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                    </Route>

                    <Route
                        path="/pass/:token"
                        element={<VisitorPass />}
                    />

                </Route>

                {/* Admin */}
                <Route
                    element={<ProtectedRoute allowedRole="admin" />}
                >
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
                </Route>

                {/* Security */}
                <Route
                    element={<ProtectedRoute allowedRole="security" />}
                >
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
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;