import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, ShoppingBag, User } from 'lucide-react';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600">UniDeliver</Link>

                    <nav className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-gray-700">Hello, {user.name} ({user.role})</span>
                                <Link to={`/${user.role}/dashboard`} className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                                <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-red-600">
                                    <LogOut className="w-5 h-5 ml-1" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Register</Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-white py-6">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>&copy; 2026 UniDeliver. Campus delivery made easy.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
