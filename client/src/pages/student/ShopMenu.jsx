import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, ArrowLeft, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const ShopMenu = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, cart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [shopRes, productsRes] = await Promise.all([
                    api.get(`/shops/${id}`),
                    api.get(`/shops/${id}/products`)
                ]);
                setShop(shopRes.data);
                setProducts(productsRes.data);
            } catch (error) {
                console.error("Error fetching menu");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAddToCart = (product) => {
        addToCart(product, shop._id);
        toast.success(`Added ${product.name} to cart`);
    };

    if (loading) return <div>Loading menu...</div>;
    if (!shop) return <div>Shop not found</div>;

    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <Link to="/student/dashboard" className="text-blue-600 flex items-center mb-4 hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Shops
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">{shop.name}</h1>
                        <p className="text-gray-600 mt-1">{shop.description}</p>
                        <p className="text-gray-500 text-sm mt-2">{shop.address}</p>
                    </div>
                    {cart.length > 0 && (
                        <Link to="/student/cart" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700">
                            <ShoppingBag className="w-5 h-5 mr-2" />
                            View Cart ({cart.length})
                        </Link>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                        <div className="h-40 bg-gray-100 rounded mb-4 overflow-hidden">
                            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg">{product.name}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                            </div>
                            <span className="font-bold text-blue-600">${product.price}</span>
                        </div>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full mt-4 bg-gray-100 text-gray-800 py-2 rounded hover:bg-blue-50 hover:text-blue-600 font-medium transition flex items-center justify-center">
                            <Plus className="w-4 h-4 mr-1" /> Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopMenu;
