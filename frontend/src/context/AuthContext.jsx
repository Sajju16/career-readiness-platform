import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

// Client-side helper to check if a JWT is expired without external dependencies
const isTokenExpired = (jwtToken) => {
    if (!jwtToken) return true;
    try {
        const parts = jwtToken.split('.');
        if (parts.length !== 3) return true;
        const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(payloadBase64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        return !decoded.exp || decoded.exp * 1000 <= Date.now();
    } catch {
        return true;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');

        if (storedToken) {
            if (isTokenExpired(storedToken)) {
                // Token is already expired in storage, clean it up proactively
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                setToken(null);
                setUser(null);
            } else {
                setToken(storedToken);
                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch (error) {
                        console.error("Failed to parse stored user", error);
                        localStorage.removeItem('user');
                    }
                }
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
    };

    const value = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token && !isTokenExpired(token)
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
