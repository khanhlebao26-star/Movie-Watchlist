import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { authApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const result = await authApi.me();

                setUser(result.data.user);

            } catch {

                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        checkAuth();

    }, []);

    const login = async (payload) => {

        const result = await authApi.login(payload);

        setUser(result.data.user);

        return result;

    };

    const register = async (payload) => {

        const result = await authApi.register(payload);

        setUser(result.data.user);

        return result;

    };

    const logout = async () => {

        try {

            await authApi.logout();

        } finally {

            setUser(null);

        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    return useContext(AuthContext);

}