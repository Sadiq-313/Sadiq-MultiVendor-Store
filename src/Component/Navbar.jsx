import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import CategoryDropdown from './CategoryDropdown';
import { useShop } from '../context/ShopContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Best Selling', path: '/best-selling' },
  { name: 'Products', path: '/products' },
  { name: 'Events', path: '/events' },
  { name: 'FAQ', path: '/faq' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { wishlistCount, cartCount, openDrawer, user, logoutUser } = useShop();

  const handleProfileClick = () => {
    if (user) {
      navigate('/seller-dashboard');
    } else {
      navigate('/shop-login');
    }
  };

  return (
    <nav className="site-nav sticky top-0 z-50 w-full text-white transition-all">
      <div className="site-nav-inner flex h-14 w-full items-center justify-between px-4 md:px-12">
        <div className="site-category-menu">
        <CategoryDropdown
          onSelect={(name) => navigate(`/products?category=${encodeURIComponent(name)}`)} 
        />
        </div>

        <div className="site-nav-links flex items-center space-x-8">
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

        <div className="site-nav-actions flex items-center space-x-6">
          <button
            type="button"
            onClick={() => openDrawer('wishlist')}
            aria-label="Wishlist"
            className="relative transition-opacity hover:opacity-80 cursor-pointer bg-transparent border-none"
          >
            <FiHeart className="text-2xl" />
            <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981] text-[10px] font-bold text-white">
              {wishlistCount || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => openDrawer('cart')}
            aria-label="Cart"
            className="relative transition-opacity hover:opacity-80 cursor-pointer bg-transparent border-none"
          >
            <FiShoppingCart className="text-2xl" />
            <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981] text-[10px] font-bold text-white">
              {cartCount || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={handleProfileClick}
            aria-label="Profile"
            title={user ? "Go to Dashboard" : "Login / Register"}
            className="transition-opacity hover:opacity-80 flex items-center justify-center border-none bg-transparent cursor-pointer text-white"
          >
            <FiUser className={`text-2xl ${user ? 'text-[#00ff41]' : 'text-white'}`} />
          </button>

          {user && logoutUser && (
            <button
              type="button"
              onClick={logoutUser}
              aria-label="Logout"
              title="Logout"
              className="transition-opacity hover:opacity-80 flex items-center justify-center border-none bg-transparent cursor-pointer text-red-400 hover:text-red-300"
            >
              <FiLogOut className="text-xl" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;