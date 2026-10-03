import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TopHeader from './Component/TopHeader';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import ScrollToTop from './Component/ScrollToTop';

import Home from './Pages/Home';
import BestSelling from './Pages/BestSelling';
import Products from './Pages/Product'; // aap ki file ka naam Product.jsx hai
import Events from './Pages/Events';
import FAQ from './Pages/Faq';
import ProductDetails from './Pages/ProductDetails';
import Drawers from './Component/Drawers';
import Toaster from './Component/Toaster';


import CreateShop from './Pages/CreateShop';
import ShopLogin from './Pages/ShopLogin';
import SellerDashboard from './Pages/SellerDashboard';

function App() {
  return (
    <>
      <ScrollToTop />
      <TopHeader />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/products" element={<Products />} />
        <Route path="/events" element={<Events />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/create-shop" element={<CreateShop />} />
        <Route path="/shop-login" element={<ShopLogin />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        
        
      </Routes>

      <Footer />
      <Drawers />
      <Toaster />
    </>
  );
}

export default App;