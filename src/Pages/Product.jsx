import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiHeart, FiEye, FiShoppingCart, FiPackage, FiArrowRight } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

// Relative path fix (../assets)
import logoImg from '../assets/logocard.png';
import ballImg from '../assets/ball.png';
import houseDetailImg from '../assets/housedetail.png';
import batImg from '../assets/bat.png';
import macImg from '../assets/mac.png';
import victusImg from '../assets/uv9woxgz4fm9lf091squ.jpg';
import hpLaptopImg from '../assets/hplaptop.jpg';

// Home ki categories ke naam
const categoryNames = [
  'Computers and Laptops',
  'Cosmetics and Body Care',
  'Accessories',
  'Cloths',
  'Shoes',
  'Gifts',
  'Pet Care',
  'Mobile and Tablets',
  'Music and Gaming',
  'Others',
];

// Static Default Products
const defaultProducts = [
  { id: 1, slug: 'hp-victus-16', category: 'Computers and Laptops', vendor: 'Omair Electronics Jhelum', title: 'Hp Victus 16', rating: 0, price: 90, sold: 0, image: victusImg },
  { id: 2, slug: 'hp-laptop-15', category: 'Computers and Laptops', vendor: 'Omair Electronics Jhelum', title: 'Hp Laptop 15', rating: 0, price: 800, sold: 0, image: hpLaptopImg },
  { id: 3, slug: 'macbook-14-pro', category: 'Computers and Laptops', vendor: 'Omair Electronics', title: 'Macbook 14 pro', rating: 4.5, price: 8000, sold: 1, image: macImg },
  { id: 4, slug: 'leather-ball', category: 'Others', vendor: 'SK Sports', title: 'Leather Ball', rating: 0, price: 10, sold: 8, image: ballImg },
  { id: 5, slug: 'bat', category: 'Others', vendor: 'SK Sports', title: 'Bat', rating: 0, price: 900, sold: 3, image: batImg },
  { id: 6, slug: 'orange', category: 'Others', vendor: 'WOW SHOP', title: 'orange', rating: 0, price: 20, sold: 10, image: logoImg },
  { id: 7, slug: 'green-view', category: 'Others', vendor: 'WOW SHOP', title: 'Green View', rating: 0, price: 12, sold: 5, image: houseDetailImg },
];

// Stars Component
const Stars = ({ rating = 0 }) => (
  <div className="flex items-center gap-1 text-amber-400">
    {[1, 2, 3, 4, 5].map((n) => {
      if (rating >= n) return <FaStar key={n} className="text-[13px]" />;
      if (rating >= n - 0.5) return <FaStarHalfAlt key={n} className="text-[13px]" />;
      return <FaRegStar key={n} className="text-[13px]" />;
    })}
  </div>
);

// Single Product Card Component
const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  return (
    <div className="group relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-xl">
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-3 text-slate-700">
        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-label="Wishlist"
          className={`transition-colors ${isInWishlist(product.slug) ? 'text-red-500' : 'hover:text-red-500'}`}
        >
          <FiHeart className="text-lg" />
        </button>
        <Link to={`/product/${product.slug}`} aria-label="View product" className="transition-colors hover:text-indigo-600">
          <FiEye className="text-lg" />
        </Link>
        <button
          type="button"
          onClick={() => addToCart(product)}
          aria-label="Add to cart"
          className="transition-colors hover:text-emerald-600"
        >
          <FiShoppingCart className="text-lg" />
        </button>
      </div>

      <Link to={`/product/${product.slug}`} className="flex h-32 w-full items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col gap-1.5">
        <p className="text-[11px] font-semibold text-indigo-600">{product.vendor || product.sellerName || 'Verified Seller'}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="line-clamp-1 text-[13px] font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{product.title}</h3>
        </Link>
        <Stars rating={product.rating || 0} />

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-[14px] font-bold text-slate-900">${product.price}</span>
          <span className="text-[11px] font-medium text-emerald-600">{product.sold || 0} sold</span>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ category }) => (
  <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-4 py-10 text-center">
    <div className="relative mb-6">
      <div className="absolute inset-0 rounded-full bg-indigo-200/50 blur-2xl" />
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-violet-100 ring-8 ring-indigo-50">
        <FiPackage className="text-5xl text-indigo-600" />
      </div>
    </div>

    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">No products found</h2>
    <p className="mt-3 text-sm leading-relaxed text-slate-500 md:text-base">
      There are no products in{' '}
      <span className="font-semibold text-slate-800">"{category}"</span> yet. Our vendors are adding
      new items every day, so please check back soon.
    </p>

    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
      >
        Browse all products
        <FiArrowRight />
      </Link>
      <Link
        to="/"
        className="inline-flex items-center rounded-lg border-2 border-indigo-600 px-6 py-2.5 text-sm font-semibold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white active:scale-95"
      >
        Back to Home
      </Link>
    </div>

    <div className="mt-10 w-full">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Try another category
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {categoryNames
          .filter((name) => name !== category)
          .map((name) => (
            <Link
              key={name}
              to={`/products?category=${encodeURIComponent(name)}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
            >
              {name}
            </Link>
          ))}
      </div>
    </div>
  </div>
);

// Main Products Page
const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  
  // ShopContext se seller products/catalog load karein
  const { catalog = [] } = useShop();

  // Combine default static products with dynamic seller products from Context
  const allProducts = [...defaultProducts, ...catalog.filter(
    (item) => !defaultProducts.some((dp) => dp.id === item.id || dp.slug === item.slug)
  )];

  // Category filter / sorting
  const visible = category
    ? allProducts.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
    : [...allProducts].sort((a, b) => (a.sold || 0) - (b.sold || 0));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {visible.map((p, idx) => (
              <ProductCard key={p.id || p.slug || idx} product={p} />
            ))}
          </div>
        ) : (
          <EmptyState category={category} />
        )}
      </div>
    </main>
  );
};

export default Products;