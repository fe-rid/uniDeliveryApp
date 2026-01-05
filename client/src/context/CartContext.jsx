import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from local storage on init
    useEffect(() => {
        const savedCart = localStorage.getItem('uniDeliverCart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart
    useEffect(() => {
        localStorage.setItem('uniDeliverCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, shopId) => {
        setCart(prev => {
            // Check if adding from different shop?
            const existingItem = prev.find(item => item._id === product._id);
            if (existingItem) {
                return prev.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Check if cart has items from another shop
            if (prev.length > 0 && prev[0].shop !== shopId) {
                if (!window.confirm("Start a new basket? You can only order from one shop at a time.")) {
                    return prev;
                }
                return [{ ...product, quantity: 1, shop: shopId }];
            }
            return [...prev, { ...product, quantity: 1, shop: shopId }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, qty) => {
        if (qty < 1) return removeFromCart(productId);
        setCart(prev => prev.map(item => item._id === productId ? { ...item, quantity: qty } : item));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartShopId = cart.length > 0 ? cart[0].shop : null;

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartShopId }}>
            {children}
        </CartContext.Provider>
    );
};
