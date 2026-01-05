import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        // Navigation is handled by useEffect in Login? Or better explicitly here.
        // Waiting for context user update might be tricky.
        if (success) {
            // Check role and redirect? 
            // We can let Layout or ProtectedRoute handle it, 
            // but explicit redirect is better UX.
            // For now, reload or reading user might fail since state update is async.
            // Let's rely on user object change in useEffect or simple redirect to dashboard home.
            navigate('/');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
