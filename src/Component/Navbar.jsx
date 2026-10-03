import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi';
import CategoryDropdown from './CategoryDropdown';
import { useShop } from '../context/ShopContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Best Selling', path: '/Best Selling' },
  { name: 'Products', path: '/products' },
  { name: 'Events', path: '/events' },
  { name: 'FAQ', path: '/faq' },
];

const Navbar = () => {
  const navigate = useNavigate(); // 1. useNavigate hook declare kiya
  const { wishlistCount, cartCount, openDrawer, user } = useShop(); // 2. user variable destructure kiya

  const handleProfileClick = () => {
    if (user) {
      // Agar seller logged in hai -> Seller Dashboard par bhejega
      navigate('/seller-dashboard');
    } else {
      // Agar logged in nahi hai -> Create Seller Account page par bhejega
      navigate('/create-shop');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#3010d0] text-white shadow-md transition-all">
      <div className="flex h-14 w-full items-center justify-between px-4 md:px-12">

        {/* 1. All Categories */}
     <CategoryDropdown 
  onSelect={(name) => navigate(`/products?category=${encodeURIComponent(name)}`)} />

        {/* 2. Navigation Links */}
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive ? 'font-bold text-[#00ff41]' : 'font-medium text-white hover:text-gray-200'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* 3. Right Side Icons */}
        <div className="flex items-center space-x-6">
          <button
            type="button"
            onClick={() => openDrawer('wishlist')}
            aria-label="Wishlist"
            className="relative transition-opacity hover:opacity-80 cursor-pointer"
          >
            <FiHeart className="text-2xl" />
            <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981] text-[10px] font-bold text-white">
              {wishlistCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => openDrawer('cart')}
            aria-label="Cart"
            className="relative transition-opacity hover:opacity-80 cursor-pointer"
          >
            <FiShoppingCart className="text-2xl" />
            <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981] text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </button>

          {/* Profile Icon Button */}
          <button
            type="button"
            onClick={handleProfileClick}
            aria-label="Profile"
            className="transition-opacity hover:opacity-80 flex items-center justify-center border-none bg-transparent cursor-pointer"
          >
            <FiUser className="text-2xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;