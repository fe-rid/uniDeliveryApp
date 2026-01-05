import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, cartShopId } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        setLoading(true);
        try {
            const orderItems = cart.map(item => ({
                product: item._id,
                quantity: item.quantity,
                price: item.price
            }));

            await api.post('/orders', {
                shopId: cartShopId,
                orderItems,
                totalAmount: cartTotal,
                deliveryAddress: user.location || 'Unknown Location'
            });

            toast.success("Order placed successfully!");
            clearCart();
            navigate('/student/dashboard');
        } catch (error) {
            toast.error("Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <button onClick={() => navigate('/student/dashboard')} className="text-blue-600 hover:underline">
                    Browse Shops
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="space-y-4">
                {cart.map(item => (
                    <div key={item._id} className="flex justify-between items-center border-b pb-4">
                        <div className="flex items-center space-x-4">
                            {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />}
                            <div>
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-gray-500">${item.price}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded">
                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-2 hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
                                <span className="px-4 font-bold">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-2 hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
                            </div>
                            <span className="font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                            <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-between items-center border-t pt-6">
                <div>
                    <p className="text-gray-600">Delivering to:</p>
                    <p className="font-bold">{user.location}</p>
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold mb-4">Total: ${cartTotal.toFixed(2)}</p>
                    <button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50">
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
