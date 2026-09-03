import { useEffect, useState } from "react";
import { authApi } from "../services/api";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const isAuthenticated = Boolean(user);

    useEffect(() => {
        const loadUser = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await authApi.me();
            setUser(result.user);
        } catch (err) {
            setError(err.message || "Failed to load user.");
            setUser(null);
        } finally {
            setLoading(false);
        }
        };

        loadUser();
    }, []);

    const login = async (payload) => {
        try {
            setLoading(true);
            setError("");

            const result = await authApi.login(payload);

            setUser(result.user);

            return result;
        } catch (err) {
            setError(err.message || "Login failed.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (payload) => {
        try {
            setLoading(true);
            setError("");

            const result = await authApi.register(payload);

            setUser(result.user);

            return result;
        } catch (err) {
            setError(err.message || "Registration failed.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setError("");
            await authApi.logout();
        } catch (err) {
            setError(err.message || "Logout failed.");
            throw err;
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                isAuthenticated,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}