import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { Store, User, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const StudentDashboard = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cart } = useCart();

    useEffect(() => {
        fetchShops();
    }, []);

    const fetchShops = async () => {
        try {
            const { data } = await api.get('/shops');
            setShops(data);
        } catch (error) {
            console.error("Failed to fetch shops");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading shops...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Campus Shops</h1>
                {cart.length > 0 && (
                    <Link to="/student/cart" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 mr-2">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        View Cart ({cart.length})
                    </Link>
                )}
                <Link to="/student/orders" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 flex items-center">
                    My Orders
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shops.map(shop => (
                    <Link to={`/student/shop/${shop._id}`} key={shop._id} className="block group">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                            <div className="h-48 bg-gray-200 w-full object-cover">
                                {shop.imageUrl ? (
                                    <img src={shop.imageUrl} alt={shop.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Store className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold group-hover:text-blue-600">{shop.name}</h3>
                                <p className="text-gray-500 text-sm mt-1">{shop.description}</p>
                                <div className="mt-3 flex items-center text-sm text-gray-500">
                                    <span className={shop.isOpen ? "text-green-600 font-bold" : "text-red-500"}>
                                        {shop.isOpen ? "Open Now" : "Closed"}
                                    </span>
                                    <span className="mx-2">•</span>
                                    <span>{shop.address}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;
