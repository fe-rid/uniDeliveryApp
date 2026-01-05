import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';
import { Plus, Package, DollarSign, Store } from 'lucide-react';

const ShopkeeperDashboard = () => {
    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders

    // Form states
    const [createForm, setCreateForm] = useState({ name: '', description: '', address: '', imageUrl: '' });
    const [productForm, setProductForm] = useState({ name: '', price: '', description: '', imageUrl: '' });
    const [showAddProduct, setShowAddProduct] = useState(false);

    useEffect(() => {
        fetchShopData();
    }, []);

    const fetchShopData = async () => {
        try {
            const { data } = await api.get('/shops/myshop');
            setShop(data);
            if (data._id) {
                fetchProducts(data._id);
                fetchOrders(data._id);
            }
        } catch (error) {
            // If 404, shop is null
            console.log("No shop found");
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async (shopId) => {
        try {
            const { data } = await api.get(`/shops/${shopId}/products`);
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products");
        }
    };

    const fetchOrders = async (shopId) => {
        try {
            const { data } = await api.get(`/orders/shop/${shopId}`);
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders");
        }
    };

    const handleOrderStatus = async (orderId, status) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status });
            toast.success(`Order ${status}`);
            fetchOrders(shop._id);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleCreateShop = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/shops', createForm);
            setShop(data);
            toast.success("Shop created successfully!");
        } catch (error) {
            toast.error("Failed to create shop");
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post(`/shops/${shop._id}/products`, productForm);
            setProducts([...products, data]);
            setShowAddProduct(false);
            setProductForm({ name: '', price: '', description: '', imageUrl: '' });
            toast.success("Product added!");
        } catch (error) {
            toast.error("Failed to add product");
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!shop) {
        return (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-6">Create Your Shop</h1>
                <form onSubmit={handleCreateShop} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Shop Name</label>
                        <input className="w-full border p-2 rounded" value={createForm.name} onChange={e => setCreateForm({ ...createForm, name: e.target.value })} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea className="w-full border p-2 rounded" value={createForm.description} onChange={e => setCreateForm({ ...createForm, description: e.target.value })} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Address (Campus Location)</label>
                        <input className="w-full border p-2 rounded" value={createForm.address} onChange={e => setCreateForm({ ...createForm, address: e.target.value })} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Image URL</label>
                        <input className="w-full border p-2 rounded" value={createForm.imageUrl} onChange={e => setCreateForm({ ...createForm, imageUrl: e.target.value })} />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Create Shop</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">{shop.name}</h1>
                    <p className="text-gray-600">{shop.address}</p>
                </div>
                <div className="space-x-2">
                    <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Overview</button>
                    <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Products</button>
                    <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Orders</button>
                </div>
            </div>

            {activeTab === 'products' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Menu Items</h2>
                        <button onClick={() => setShowAddProduct(!showAddProduct)} className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            <Plus className="w-5 h-5 mr-1" /> Add Product
                        </button>
                    </div>

                    {showAddProduct && (
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <h3 className="text-lg font-bold mb-4">New Product</h3>
                            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input placeholder="Product Name" className="border p-2 rounded" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} required />
                                <input placeholder="Price" type="number" className="border p-2 rounded" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} required />
                                <input placeholder="Image URL" className="border p-2 rounded" value={productForm.imageUrl} onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })} />
                                <input placeholder="Description" className="border p-2 rounded" value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} />
                                <div className="md:col-span-2">
                                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded w-full">Save Product</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product._id} className="bg-white p-4 rounded-lg shadow flex items-start space-x-4">
                                {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded" />}
                                <div>
                                    <h3 className="font-bold text-lg">{product.name}</h3>
                                    <p className="text-gray-500 text-sm">{product.description}</p>
                                    <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'overview' && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Shop Details</h2>
                    <p><strong>Description:</strong> {shop.description}</p>
                    <p><strong>Status:</strong> {shop.isOpen ? <span className="text-green-600">Open</span> : <span className="text-red-600">Closed</span>}</p>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-4">Incoming Orders</h2>
                    {orders.length === 0 ? <p className="text-gray-500">No orders yet.</p> : orders.map(order => (
                        <div key={order._id} className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">Order #{order._id.slice(-6)}</h3>
                                    <p className="text-sm text-gray-500">Customer: {order.customer?.name} ({order.createdAt.substring(0, 10)})</p>
                                    <p className="text-sm font-bold mt-1 text-blue-600">Status: {order.status}</p>
                                </div>
                                <span className="font-bold text-xl">${order.totalAmount}</span>
                            </div>

                            <div className="bg-gray-50 p-4 rounded mb-4">
                                <h4 className="font-semibold text-sm mb-2">Items:</h4>
                                <ul className="list-disc list-inside text-sm text-gray-700">
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>
                                            {item.quantity}x {item.product?.name || 'Item'}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex space-x-2">
                                {order.status === 'Pending' && (
                                    <>
                                        <button onClick={() => handleOrderStatus(order._id, 'Accepted')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium">Accept</button>
                                        <button onClick={() => handleOrderStatus(order._id, 'Cancelled')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-medium">Reject</button>
                                    </>
                                )}
                                {order.status === 'Accepted' && (
                                    <button onClick={() => handleOrderStatus(order._id, 'Preparing')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 font-medium">Mark Preparing</button>
                                )}
                                {order.status === 'Preparing' && (
                                    <button onClick={() => handleOrderStatus(order._id, 'Ready')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium">Mark Ready for Pickup</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopkeeperDashboard;
