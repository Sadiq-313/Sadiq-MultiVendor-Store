import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

const Stars = ({ rating = 0 }) => (
  <div className="flex items-center gap-1 text-amber-400">
    {[1, 2, 3, 4, 5].map((n) => {
      if (rating >= n) return <FaStar key={n} className="text-[13px]" />;
      if (rating >= n - 0.5) return <FaStarHalfAlt key={n} className="text-[13px]" />;
      return <FaRegStar key={n} className="text-[13px]" />;
    })}
  </div>
);

// Icons par click se detail page na khule
const stop = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openDrawer } = useShop();
  const liked = isInWishlist(product.slug);

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group relative flex h-full flex-col rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
    >
      {/* Right side icons */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-3 text-gray-800">
        <button
          type="button"
          aria-label="Wishlist"
          onClick={(e) => {
            stop(e);
            toggleWishlist(product.slug);
          }}
          className="transition-transform hover:scale-110"
        >
          <FiHeart className={`text-lg ${liked ? 'fill-red-500 text-red-500' : 'hover:text-red-500'}`} />
        </button>

        <span aria-hidden="true" className="transition-colors group-hover:text-blue-600">
          <FiEye className="text-lg" />
        </span>

        <button
          type="button"
          aria-label="Add to cart"
          onClick={(e) => {
            stop(e);
            addToCart(product, 1);
            openDrawer('cart');
          }}
          className="transition-colors hover:text-green-600"
        >
          <FiShoppingCart className="text-lg" />
        </button>
      </div>

      {/* Image */}
      <div className="flex h-28 w-full items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-[75%] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="mt-6 flex flex-1 flex-col gap-1.5">
        <p className="text-[11px] font-medium text-blue-500">{product.vendor}</p>
        <h3 className="line-clamp-1 text-[13px] font-semibold text-gray-900">{product.title}</h3>
        <Stars rating={product.rating} />
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-[13px] font-bold text-gray-900">{product.price}$</span>
          <span className="text-[11px] font-medium text-emerald-500">{product.sold} sold</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;