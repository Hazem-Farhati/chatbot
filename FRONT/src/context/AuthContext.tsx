import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { loginUser, checkAuthStatus, logoutUser, signupUser } from './../helpers/api-communicator';
import Signup from './../pages/Signup';

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string, role: string) => Promise<void>;
    logout: () => Promise<void>;
    isAdmin: boolean;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ _id: data._id, email: data.email, name: data.name, role: data.role });
                setIsLoggedIn(true);
                setToken(data.token);
                setIsAdmin(data.role === 'admin');
            }
        }
        checkStatus();
    }, []);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser({ _id: data._id, email: data.email, name: data.name, role: data.role });
            setIsLoggedIn(true);
            setToken(data.token);
            setIsAdmin(data.role === 'admin');
        }
    }

    const signup = async (name: string, email: string, password: string, role: string) => {
        const data = await signupUser(name, email, password, role);
        if (data) {
            setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
        }
    }

    const logout = async () => {
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
        window.location.href = "/login";
    }

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
        token,
        isAdmin,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);
    