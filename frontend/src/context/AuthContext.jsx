import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('accessToken') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If we have a token but no user, we could optionally fetch user details here
        // For now, our login/register returns the user object, so we might just parse the token or rely on localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user", error);
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        const { token: newToken, user: userData } = response;
        
        setToken(newToken);
        setUser(userData);
        
        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return userData;
    };

    const register = async (fullName, email, password) => {
        const response = await authService.register(fullName, email, password);
        const { token: newToken, user: userData } = response;
        
        setToken(newToken);
        setUser(userData);
        
        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return userData;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        // Option to redirect to login here or let the ProtectedRoute handle it
    };

    const value = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
