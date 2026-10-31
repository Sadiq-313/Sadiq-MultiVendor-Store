import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiHeart, FiEye, FiShoppingCart, FiPackage, FiArrowRight } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { server } from '../config';
import { useShop } from '../context/ShopContext';

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
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const pId = product._id || product.slug;
  const pImg = product.images?.[0] || product.image;
  const pTitle = product.name || product.title;
  const pPrice = product.discountPrice || product.originalPrice || product.price;
  const pVendor = product.shop?.name || product.vendor || 'Verified Seller';
  const pRating = product.ratings || product.rating || 0;
  const pSold = product.sold_out || product.sold || 0;

  return (
    <div className="product-card group relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-xl">
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-3 text-slate-700">
        <button
          type="button"
          onClick={() => toggleWishlist(pId)}
          aria-label="Wishlist"
          className={`transition-colors cursor-pointer ${isInWishlist(pId) ? 'text-red-500' : 'hover:text-red-500'}`}
        >
          <FiHeart className="text-lg" />
        </button>
        <Link to={`/product/${pId}`} aria-label="View product" className="transition-colors hover:text-indigo-600">
          <FiEye className="text-lg" />
        </Link>
        <button
          type="button"
          onClick={() => addToCart(product)}
          aria-label="Add to cart"
          className="transition-colors hover:text-emerald-600 cursor-pointer"
        >
          <FiShoppingCart className="text-lg" />
        </button>
      </div>

      <Link to={`/product/${pId}`} className="flex h-32 w-full items-center justify-center overflow-hidden">
        <img
          src={pImg}
          alt={pTitle}
          className="max-h-full max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col gap-1.5">
        <p className="text-[11px] font-semibold text-indigo-600">{pVendor}</p>
        <Link to={`/product/${pId}`}>
          <h3 className="line-clamp-1 text-[13px] font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{pTitle}</h3>
        </Link>
        <Stars rating={pRating} />

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-[14px] font-bold text-slate-900">\${pPrice}</span>
          <span className="text-[11px] font-medium text-emerald-600">{pSold} sold</span>
        </div>
      </div>
    </div>
  );
};

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

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  
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
        console.error("Error fetching products from API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const visible = category
    ? products.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
    : [...products].sort((a, b) => (b.sold_out || b.sold || 0) - (a.sold_out || a.sold || 0));

  return (
    <main className="products-page min-h-screen px-4 py-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {loading ? (
          <div className="flex h-[55vh] items-center justify-center">
            <p className="text-sm font-semibold text-slate-600">Loading products from server...</p>
          </div>
        ) : visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {visible.map((p) => (
              <ProductCard key={p._id || p.slug} product={p} />
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