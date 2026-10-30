import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { server } from '../config';

const Stars = ({ rating = 0 }) => (
  <div className="flex items-center gap-1 text-amber-400">
    {[1, 2, 3, 4, 5].map((n) => {
      if (rating >= n) return <FaStar key={n} className="text-[13px]" />;
      if (rating >= n - 0.5) return <FaStarHalfAlt key={n} className="text-[13px]" />;
      return <FaRegStar key={n} className="text-[13px]" />;
    })}
  </div>
);

const ProductCard = ({ product }) => {
  const pId = product._id || product.slug;
  const pImg = product.images?.[0] || product.image;
  const pTitle = product.name || product.title;
  const pPrice = product.discountPrice || product.originalPrice || product.price;
  const pVendor = product.shop?.name || product.vendor || "Official";
  const pRating = product.ratings || product.rating || 0;
  const pSold = product.sold_out || product.sold || 0;

  return (
    <div className="group relative flex h-full flex-col rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg">
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-3 text-gray-800">
        <button type="button" aria-label="Wishlist" className="transition-colors hover:text-red-500 cursor-pointer">
          <FiHeart className="text-lg" />
        </button>
        <Link to={`/product/${pId}`} aria-label="View product" className="transition-colors hover:text-slate-900">
          <FiEye className="text-lg" />
        </Link>
        <button type="button" aria-label="Add to cart" className="transition-colors hover:text-green-600 cursor-pointer">
          <FiShoppingCart className="text-lg" />
        </button>
      </div>

      <Link
        to={`/product/${pId}`}
        className="flex h-28 w-full items-center justify-center overflow-hidden"
      >
        <img
          src={pImg}
          alt={pTitle}
          className="max-h-full max-w-[75%] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="mt-6 flex flex-1 flex-col gap-1.5">
        <p className="text-[11px] font-medium text-blue-500">{pVendor}</p>
        <Link to={`/product/${pId}`}>
          <h3 className="line-clamp-1 text-[13px] font-semibold text-gray-900 hover:text-blue-600">{pTitle}</h3>
        </Link>
        <Stars rating={pRating} />

        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-[13px] font-bold text-gray-900">\${pPrice}</span>
          <span className="text-[11px] font-medium text-emerald-500">{pSold} sold</span>
        </div>
      </div>
    </div>
  );
};

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${server}/product/get-all-products`);
        if (data.success && data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sab se zyada sold wale pehle
  const sorted = [...products].sort((a, b) => (b.sold_out || b.sold || 0) - (a.sold_out || a.sold || 0));

  return (
    <main className="min-h-screen bg-[#f5f5f4] px-4 py-6 md:px-12">
      {loading ? (
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-semibold text-gray-600">Loading best selling products...</p>
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-sm font-semibold text-gray-600">No products found!</p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {sorted.map((p) => (
            <ProductCard key={p._id || p.slug} product={p} />
          ))}
        </div>
      )}
    </main>
  );
};

export default BestSelling;