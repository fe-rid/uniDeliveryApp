import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUserLoggedIn = async () => {
        try {
            const { data } = await api.get('/auth/profile');
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            setUser(data);
            toast.success('Login successful!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await api.post('/auth/register', userData);
            setUser(data);
            toast.success('Registration successful!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
            toast.success('Logged out');
            // Navigate login handled by component usually
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="text-xl font-semibold text-blue-600">Loading UniDeliver...</div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
