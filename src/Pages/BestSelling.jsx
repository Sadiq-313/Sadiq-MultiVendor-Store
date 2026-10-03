import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

import logoImg from '../assets/logocard.png';
import ballImg from '../assets/ball.png';
import houseDetailImg from '../assets/housedetail.png';
import batImg from '../assets/bat.png';
import macImg from '../assets/mac.png';
import victusImg from '../assets/uv9woxgz4fm9lf091squ.jpg';
import hpLaptopImg from '../assets/hplaptop.jpg';

const products = [
  { id: 1, slug: 'orange', vendor: 'WOW SHOP', title: 'orange', rating: 0, price: 20, sold: 10, image: logoImg },
  { id: 2, slug: 'leather-ball', vendor: 'SK Sports', title: 'Leather Ball', rating: 0, price: 10, sold: 8, image: ballImg },
  { id: 3, slug: 'green-view', vendor: 'WOW SHOP', title: 'Green View', rating: 0, price: 12, sold: 5, image: houseDetailImg },
  { id: 4, slug: 'bat', vendor: 'SK Sports', title: 'Bat', rating: 0, price: 900, sold: 3, image: batImg },
  { id: 5, slug: 'macbook-14-pro', vendor: 'Omair Electronics', title: 'Macbook 14 pro', rating: 4.5, price: 8000, sold: 1, image: macImg },
  { id: 6, slug: 'hp-victus-16', vendor: 'Omair Electronics Jhelum', title: 'Hp Victus 16', rating: 0, price: 90, sold: 0, image: victusImg },
  { id: 7, slug: 'hp-laptop-15', vendor: 'Omair Electronics Jhelum', title: 'Hp Laptop 15', rating: 0, price: 800, sold: 0, image: hpLaptopImg },
];

// Stars: khali, aadha ya poora
const Stars = ({ rating = 0 }) => (
  <div className="flex items-center gap-1 text-amber-400">
    {[1, 2, 3, 4, 5].map((n) => {
      if (rating >= n) return <FaStar key={n} className="text-[13px]" />;
      if (rating >= n - 0.5) return <FaStarHalfAlt key={n} className="text-[13px]" />;
      return <FaRegStar key={n} className="text-[13px]" />;
    })}
  </div>
);

// Single card
const ProductCard = ({ product }) => (
  <div className="group relative flex h-full flex-col rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg">
    {/* Right side icons */}
    <div className="absolute right-3 top-3 z-10 flex flex-col gap-3 text-gray-800">
      <button type="button" aria-label="Wishlist" className="transition-colors hover:text-red-500">
        <FiHeart className="text-lg" />
      </button>
      <Link to={`/product/${product.slug}`} aria-label="View product" className="transition-colors hover:text-slate-900">
        <FiEye className="text-lg" />
      </Link>
      <button type="button" aria-label="Add to cart" className="transition-colors hover:text-green-600">
        <FiShoppingCart className="text-lg" />
      </button>
    </div>

    {/* Image */}
    <Link
      to={`/product/${product.slug}`}
      className="flex h-28 w-full items-center justify-center overflow-hidden"
    >
      <img
        src={product.image}
        alt={product.title}
        className="max-h-full max-w-[75%] object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </Link>

    {/* Info */}
    <div className="mt-6 flex flex-1 flex-col gap-1.5">
      <p className="text-[11px] font-medium text-blue-500">{product.vendor}</p>
      <Link to={`/product/${product.slug}`}>
        <h3 className="line-clamp-1 text-[13px] font-semibold text-gray-900">{product.title}</h3>
      </Link>
      <Stars rating={product.rating} />

      <div className="mt-auto flex items-center justify-between pt-1">
        <span className="text-[13px] font-bold text-gray-900">{product.price}$</span>
        <span className="text-[11px] font-medium text-emerald-500">{product.sold} sold</span>
      </div>
    </div>
  </div>
);

// Page
const BestSelling = () => {
  // Sab se zyada sold wale pehle
  const sorted = [...products].sort((a, b) => b.sold - a.sold);

  return (
    <main className="min-h-screen bg-[#f5f5f4] px-4 py-6 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
};

export default BestSelling;