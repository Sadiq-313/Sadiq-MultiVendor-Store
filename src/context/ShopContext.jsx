import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';
import { events } from '../data/events';

const ShopContext = createContext(null);

const load = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
};

export const ShopProvider = ({ children }) => {
  // Active User / Seller State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('active_seller');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Seller ke dwara upload kiye gaye products
  const [sellerProducts, setSellerProducts] = useState(() => load('seller_products'));

  // Cart, Wishlist & UI States
  const [cart, setCart] = useState(() => load('cart'));
  const [wishlist, setWishlist] = useState(() => load('wishlist'));
  const [drawer, setDrawer] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => save('cart', cart), [cart]);
  useEffect(() => save('wishlist', wishlist), [wishlist]);
  useEffect(() => save('seller_products', sellerProducts), [sellerProducts]);

  // Combine standard products + seller products
  const catalog = useMemo(() => {
    return [...products, ...events, ...sellerProducts];
  }, [sellerProducts]);

  // Auth Functions
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('active_seller', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('active_seller');
  };

  // Add New Product Function for Seller
  const addSellerProduct = (newProduct) => {
    setSellerProducts((prev) => [newProduct, ...prev]);
    notify(`${newProduct.title} added successfully!`, 'cart');
  };

  // Delete Seller Product Function
  const deleteSellerProduct = (productId) => {
    setSellerProducts((prev) => prev.filter((p) => p.id !== productId));
    notify('Product removed successfully', 'remove');
  };

  // Update Seller Product Functions
  const editSellerProduct = (updatedProduct) => {
    setSellerProducts((prev) =>
      prev.map((item) => (item.id === updatedProduct.id ? updatedProduct : item))
    );
    notify('Product updated successfully!', 'success');
  };

  const updateSellerProduct = (updatedProduct) => {
    setSellerProducts((prev) =>
      prev.map((item) =>
        item.id === updatedProduct.id || item.slug === updatedProduct.slug
          ? { ...item, ...updatedProduct }
          : item
      )
    );
    if (notify) {
      notify('Product updated successfully!', 'success');
    }
  };

  const titleOf = (slug) => catalog.find((p) => p.slug === slug)?.title || 'Item';

  // Notifications
  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const notify = (message, type = 'cart') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }].slice(-3));
    setTimeout(() => dismissToast(id), 3000);
  };

  // Cart Functions
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.slug === product.slug);
      if (found) {
        return prev.map((i) => (i.slug === product.slug ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { slug: product.slug, qty }];
    });
    notify(`${product.title} added to cart`, 'cart');
  };

  const removeFromCart = (slug) => {
    setCart((prev) => prev.filter((i) => i.slug !== slug));
    notify(`${titleOf(slug)} removed from cart`, 'remove');
  };

  const changeQty = (slug, delta) =>
    setCart((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );

  // Wishlist Functions
  const toggleWishlist = (slug) => {
    if (wishlist.includes(slug)) {
      setWishlist((prev) => prev.filter((s) => s !== slug));
      notify(`${titleOf(slug)} removed from wishlist`, 'remove');
    } else {
      setWishlist((prev) => [...prev, slug]);
      notify(`${titleOf(slug)} added to wishlist`, 'wishlist');
    }
  };

  const isInWishlist = (slug) => wishlist.includes(slug);

  // Drawer
  const openDrawer = (name) => setDrawer(name);
  const closeDrawer = () => setDrawer(null);

  const cartItems = useMemo(
    () =>
      cart
        .map((i) => ({ product: catalog.find((p) => p.slug === i.slug), qty: i.qty }))
        .filter((i) => i.product),
    [cart, catalog]
  );

  const wishlistItems = useMemo(
    () => wishlist.map((slug) => catalog.find((p) => p.slug === slug)).filter(Boolean),
    [wishlist, catalog]
  );

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  const value = {
    user,
    login,
    logout,
    catalog,
    sellerProducts,
    addSellerProduct,
    deleteSellerProduct,
    editSellerProduct,
    updateSellerProduct,
    cartItems,
    wishlistItems,
    cartCount,
    cartTotal,
    wishlistCount: wishlistItems.length,
    addToCart,
    removeFromCart,
    changeQty,
    toggleWishlist,
    isInWishlist,
    drawer,
    openDrawer,
    closeDrawer,
    toasts,
    dismissToast,
    notify,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop ko ShopProvider ke andar istemal karein');
  return ctx;
};