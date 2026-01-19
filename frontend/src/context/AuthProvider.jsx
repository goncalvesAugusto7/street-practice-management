import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api"

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await api.get(
                    "/auth/me",
                    { withCredentials: true}
                );
                setUser(response.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false)
            }
        };
        loadUser();
    },[]);

    const logout = async () => {
        try {
            await api.post(
                "/auth/logout",
                {},
                { withCredentials: true }
            );
        }finally {
            setUser(null);
        }
    };

    const refreshUser = async () => {
        try {
            const response = await api.get(
                "/auth/me",
                { withCredentials: true },
            );
            setUser(response.data)
        } catch {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{user, loading, logout, refreshUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {return useContext(AuthContext);}