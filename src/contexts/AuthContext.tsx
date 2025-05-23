'use client';

import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
};

const defaultUser = {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
};

const MOCK_CREDENTIALS = {
    email: 'admin@example.com',
    password: 'password123',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('auth-token');
        if (token) {
            setUser(defaultUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
                Cookies.set('auth-token', 'mock-jwt-token', {expires: 1, path: '/'}); // 1 day
                setUser(defaultUser);
                setIsLoading(false);
                return true;
            }
            setIsLoading(false);
            return false;
        } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            setIsLoading(false);
            return false;
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            Cookies.set('auth-token', 'mock-jwt-token', {expires: 1, path: '/'}); // 1 day

            const newUser = {
                id: '2', // In a real app, this would be generated by the backend
                name,
                email,
                role: 'user',
            };

            setUser(newUser);
            setIsLoading(false);
            return true;
        } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            setIsLoading(false);
            return false;
        }
    };

    const logout = () => {
        Cookies.remove('auth-token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isAuthenticated: !!user,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
