import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/auth/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const checkAuth = async () => {

            try {

                const data = await getCurrentUser();

                setUser(data.data);

            } catch (error) {

                setUser(null);

            } finally {

                setLoading(false);

            }

        };

        checkAuth();

    }, []);

    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loginUser,
                logoutUser,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};