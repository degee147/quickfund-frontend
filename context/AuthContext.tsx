'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '@/lib/axios';

type User = {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
};

interface AuthContextProps {
    user: User | null;
    login: (data: { email: string; password: string }) => Promise<void>;
    register: (data: { name: string; email: string; password: string }) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

// ✅ Expected shape of the Laravel /login and /register response
interface AuthResponse {
    token: string;
    user: User;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (data: { email: string; password: string }) => {
        const res = await API.post<AuthResponse>('/login', data);
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        router.push(user.role === 'admin' ? '/admin' : '/dashboard');
    };

    const register = async (data: { name: string; email: string; password: string }) => {
        const url = '/register';
        // console.log('[Register URL]', `${API.defaults.baseURL}${url}`);

        const res = await API.post<AuthResponse>(url, {
            ...data,
            password_confirmation: data.password, // 👈 Add this line
        });
        console.log('res', res)
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        router.push('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
