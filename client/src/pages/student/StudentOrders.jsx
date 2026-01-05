import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Package, ArrowLeft, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders/myorders');
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <Link to="/student/dashboard" className="mr-4 text-gray-500 hover:text-blue-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">My Orders</h1>
                </div>
                <button onClick={fetchOrders} className="flex items-center bg-gray-100 px-3 py-2 rounded hover:bg-gray-200">
                    <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
                </button>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg shadow">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-700">No orders found</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't ordered anything yet.</p>
                    <Link to="/student/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <h3 className="font-bold text-lg mr-3">Order #{order._id.slice(-6)}</h3>
                                        <StatusBadge status={order.status} />
                                    </div>
                                    <p className="text-gray-500 text-sm mb-1">
                                        {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                    </p>
                                    <p className="font-medium text-gray-700">Total: ${order.totalAmount}</p>
                                </div>

                            </div>

                            {/* Simple progress bar */}
                            <div className="mt-6">
                                <ProgressBar status={order.status} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Helper for status badge colors
const StatusBadge = ({ status }) => {
    const colors = {
        'Pending': 'bg-gray-100 text-gray-800',
        'Accepted': 'bg-blue-100 text-blue-800',
        'Preparing': 'bg-yellow-100 text-yellow-800',
        'Ready': 'bg-purple-100 text-purple-800',
        'Picked_Up': 'bg-indigo-100 text-indigo-800',
        'On_The_Way': 'bg-orange-100 text-orange-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800'
    };
    return (
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${colors[status] || 'bg-gray-100'}`}>
            {status.replace(/_/g, ' ')}
        </span>
    );
};

// Visual Progress Bar
const ProgressBar = ({ status }) => {
    const steps = ['Pending', 'Accepted', 'Preparing', 'Ready', 'Picked_Up', 'On_The_Way', 'Delivered'];
    const currentStepIndex = steps.indexOf(status);

    if (status === 'Cancelled') return <div className="w-full bg-red-200 h-2 rounded"><div className="bg-red-600 h-2 rounded w-full"></div></div>;
    if (currentStepIndex === -1) return null;

    const percentage = Math.max(5, ((currentStepIndex + 1) / steps.length) * 100);

    return (
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
                className="bg-blue-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
}

export default StudentOrders;
