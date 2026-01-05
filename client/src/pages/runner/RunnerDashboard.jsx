import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';
import { MapPin, CheckCircle, Truck, Package } from 'lucide-react';

const RunnerDashboard = () => {
    const [availableOrders, setAvailableOrders] = useState([]);
    const [activeOrders, setActiveOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        fetchData();
    }, [refreshTrigger]);

    const fetchData = async () => {
        try {
            const [availableRes, activeRes] = await Promise.all([
                api.get('/orders/available'),
                api.get('/orders/runner/active')
            ]);
            setAvailableOrders(availableRes.data);
            setActiveOrders(activeRes.data);
        } catch (error) {
            // console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptOrder = async (orderId) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: 'Accepted' }); // Logic handles runner assignment
            toast.success("Order Accepted!");
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            toast.error("Failed to accept order");
        }
    };

    const handleUpdateStatus = async (orderId, status) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status });
            toast.success(`Order marked as ${status}`);
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            {/* Active Deliveries */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-900">
                    <Truck className="w-6 h-6 mr-2" /> Active Deliveries
                </h2>
                {activeOrders.length === 0 ? (
                    <p className="text-gray-500">No active deliveries. Pick one below!</p>
                ) : (
                    <div className="space-y-4">
                        {activeOrders.map(order => (
                            <div key={order._id} className="bg-white p-4 rounded shadow border border-blue-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-bold text-lg">Order #{order._id.slice(-6)}</p>
                                        <p className="text-sm text-gray-500">Status: <span className="font-bold text-blue-600">{order.status}</span></p>
                                    </div>
                                    <span className="font-bold text-green-600">${order.totalAmount}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <h4 className="font-bold flex items-center text-sm text-gray-700">
                                            <StoreIcon className="w-4 h-4 mr-1" /> Pickup: {order.shop.name}
                                        </h4>
                                        <p className="ml-5 text-gray-600 text-sm">{order.shop.address}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold flex items-center text-sm text-gray-700">
                                            <MapPin className="w-4 h-4 mr-1" /> Dropoff: {order.deliveryAddress}
                                        </h4>
                                        <p className="ml-5 text-gray-600 text-sm">{order.customer.name}</p>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    {order.status === 'Accepted' && (
                                        <button onClick={() => handleUpdateStatus(order._id, 'Picked_Up')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1">
                                            Picked Up
                                        </button>
                                    )}
                                    {order.status === 'Picked_Up' && (
                                        <button onClick={() => handleUpdateStatus(order._id, 'On_The_Way')} className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 flex-1">
                                            On The Way
                                        </button>
                                    )}
                                    {(order.status === 'Picked_Up' || order.status === 'On_The_Way') && (
                                        <button onClick={() => handleUpdateStatus(order._id, 'Delivered')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1">
                                            Confirm Delivery
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Available Orders */}
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Package className="w-6 h-6 mr-2" /> Available Jobs
                </h2>
                {availableOrders.length === 0 ? (
                    <p className="text-gray-500">No new orders available currently.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {availableOrders.map(order => (
                            <div key={order._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-bold">New Request</span>
                                    <span className="font-bold text-lg">${order.totalAmount}</span>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <p className="flex items-center text-sm"><StoreIcon className="w-4 h-4 mr-2 text-gray-500" /> {order.shop.name} ({order.shop.address})</p>
                                    <p className="flex items-center text-sm"><MapPin className="w-4 h-4 mr-2 text-gray-500" /> {order.deliveryAddress}</p>
                                </div>
                                <button onClick={() => handleAcceptOrder(order._id)} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold">
                                    Accept Delivery
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StoreIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" /></svg>;


export default RunnerDashboard;
