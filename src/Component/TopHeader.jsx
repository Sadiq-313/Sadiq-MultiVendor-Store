import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronRight, FiX } from 'react-icons/fi';
import axios from 'axios';
import { server } from '../config';

const TopHeader = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === '') {
        setFilteredProducts([]);
        setIsOpen(false);
        return;
      }
      try {
        const { data } = await axios.get(`${server}/product/get-all-products`);
        if (data.success) {
          const results = data.products.filter((p) =>
            p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredProducts(results.slice(0, 5));
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const timer = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="site-header w-full py-3 px-6 md:px-12">
      <div className="site-header-inner flex items-center justify-between gap-4">
      <div className="flex items-center">
        <Link to="/">
          <span className="site-logo text-xl font-bold">UrbanCart<span>.</span></span>
        </Link>
      </div>

      <div ref={dropdownRef} className="site-search flex-1 max-w-xl mx-4 relative">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Product..."
            className="site-search-input w-full py-2 pl-4 pr-10 border rounded-md outline-none text-sm placeholder-gray-400 bg-white"
          />

          {searchTerm ? (
            <FiX
              onClick={() => setSearchTerm('')}
              className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer text-base"
            />
          ) : null}

          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 text-lg cursor-pointer"
          >
            <FiSearch />
          </button>
        </form>

        {isOpen && (
          <div className="site-search-results absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product._id || product.slug}
                  to={`/product/${product._id || product.slug}`}
                  onClick={() => {
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className="flex items-center gap-3 p-2.5 border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
                >
                  <img
                    src={product.images?.[0] || product.image}
                    alt={product.name || product.title}
                    className="h-10 w-10 object-contain rounded"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 line-clamp-1">
                      {product.name || product.title}
                    </span>
                    <span className="text-xs font-semibold text-slate-900">
                      \${product.discountPrice || product.originalPrice || product.price}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-3 text-center text-xs text-gray-500">
                No products found for "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <Link to="/create-shop" className="seller-cta">
          <button 
            type="button" 
            className="seller-cta-button text-sm font-medium py-2.5 px-5 rounded-lg flex items-center gap-1 transition-all"
          >
            Become Seller
            <FiChevronRight className="text-base" />
          </button>
        </Link>
      </div>
      </div>
    </header>
  );
};

export default TopHeader;