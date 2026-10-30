import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { server } from '../config';

import ZoomImage from '../Component/ZoomImage';
import ProductCard from '../Component/ProductCard';
import { useShop } from '../context/ShopContext';
import EventStatus from '../Component/EventStatus';

const tabs = [
  { key: 'details', label: 'Product Details' },
  { key: 'reviews', label: 'Product Reviews' },
  { key: 'seller', label: 'Seller Information' },
];

const ProductDetails = () => {
  const { slug } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [item, setItem] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('details');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, eventRes] = await Promise.all([
          axios.get(`${server}/product/get-all-products`),
          axios.get(`${server}/event/get-all-events`)
        ]);

        const productsList = prodRes.data.success ? prodRes.data.products || [] : [];
        const eventsList = eventRes.data.success ? eventRes.data.events || [] : [];
        const combined = [...productsList, ...eventsList];

        setAllItems(combined);

        const found = combined.find(
          (p) => String(p._id) === String(slug) || String(p.slug) === String(slug) || String(p.id) === String(slug)
        );
        setItem(found || null);
      } catch (error) {
        console.error("Error fetching product/event details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    setQty(1);
    setTab('details');
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f5f5f4] px-4 text-center">
        <p className="text-base font-semibold text-gray-600">Loading details...</p>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#f5f5f4] px-4 text-center">
        <h1 className="text-3xl font-bold text-[#1e40af]">Product or Event not found</h1>
        <Link
          to="/products"
          className="rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#1e40af] px-6 py-2.5 text-sm font-semibold text-white shadow-md"
        >
          Browse all products
        </Link>
      </main>
    );
  }

  const itemId = item._id || item.slug || item.id;
  const itemImg = item.images?.[0] || item.image;
  const itemTitle = item.name || item.title;
  const itemPrice = item.discountPrice || item.originalPrice || item.price;
  const itemOldPrice = item.originalPrice || item.oldPrice;
  const isEvent = Boolean(item.endDate);
  const liked = isInWishlist(itemId);

  // Related products logic
  const sameCategory = allItems.filter(
    (p) => p.category === item.category && String(p._id || p.slug || p.id) !== String(itemId)
  );
  const related = (
    sameCategory.length > 0
      ? sameCategory
      : allItems.filter((p) => String(p._id || p.slug || p.id) !== String(itemId))
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(item, qty);
  };

  return (
    <main className="bg-[#f5f5f4]">
      {/* ================= TOP: image + info ================= */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-8 md:grid-cols-2 md:px-12">
          {/* Left side: Image Zoom */}
          <div>
            <ZoomImage
              src={itemImg}
              alt={itemTitle}
              className="aspect-square w-full max-w-[340px]"
            />

            <div className="mt-4">
              <div className="inline-block overflow-hidden rounded border-2 border-blue-500 p-1">
                <img src={itemImg} alt={itemTitle} className="h-16 w-16 object-contain" />
              </div>
            </div>
          </div>

          {/* Right side: Item Info */}
          <div className="flex flex-col">
            {isEvent && (
              <span className="mb-2 w-fit rounded bg-red-100 px-2.5 py-0.5 text-xs font-bold uppercase text-red-600">
                Limited Event Deal
              </span>
            )}

            <h1 className="text-2xl font-bold text-gray-900">{itemTitle}</h1>
            <p className="mt-1 text-sm text-gray-800">{item.description || 'No description provided.'}</p>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-xl font-bold text-gray-900">\${itemPrice}</span>
              {itemOldPrice && (
                <span className="text-sm font-medium text-gray-400 line-through">
                  \${itemOldPrice}
                </span>
              )}
            </div>

            {isEvent && (
              <div className="mt-4 rounded-lg bg-gray-50 p-3 border border-gray-200">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Event Ends In:
                </p>
                <EventStatus endDate={item.endDate} />
              </div>
            )}

            {/* Quantity + Wishlist */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-stretch overflow-hidden rounded shadow-sm">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 bg-gradient-to-r from-[#3b82f6] to-[#1e40af] text-lg font-bold text-white transition-opacity hover:opacity-90 active:scale-95 cursor-pointer"
                >
                  -
                </button>
                <span className="flex w-10 items-center justify-center bg-gray-100 text-sm font-semibold">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-8 bg-gradient-to-r from-[#3b82f6] to-[#1e40af] text-lg font-bold text-white transition-opacity hover:opacity-90 active:scale-95 cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(itemId)}
                aria-label="Wishlist"
                className="mr-4 transition-transform hover:scale-110 cursor-pointer"
              >
                <FiHeart className={`text-2xl ${liked ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-md bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-95 cursor-pointer"
            >
              Add to cart <FiShoppingCart />
            </button>
          </div>
        </div>
      </section>

      {/* ================= TABS ================= */}
      <section className="bg-blue-50/60">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-12">
          <div className="flex items-center justify-between border-b border-gray-200">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`-mb-px border-b-2 pb-2 text-sm font-semibold transition-colors md:text-base cursor-pointer ${
                  tab === t.key
                    ? 'border-red-600 text-gray-900'
                    : 'border-transparent text-gray-900 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="py-6 text-sm text-gray-800">
            {tab === 'details' && <p>{item.description || 'No detailed description available.'}</p>}
            {tab === 'reviews' && <p className="text-gray-500">No reviews yet for this product.</p>}

            {/* ===== SELLER INFORMATION TAB ===== */}
            {tab === 'seller' && (
              <div className="flex items-center gap-3">
                {item.shop?.avatar || item.vendorImage || itemImg ? (
                  <img
                    src={item.shop?.avatar || item.vendorImage || itemImg}
                    alt={item.shop?.name || item.vendor || 'Seller'}
                    className="h-12 w-12 rounded-md object-contain border border-gray-200 bg-white p-1"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-lg font-bold text-[#1e40af]">
                    {(item.shop?.name || item.vendor || 'S').charAt(0)}
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-blue-500 hover:underline cursor-pointer">
                    {item.shop?.name || item.vendor || 'Verified Seller'}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-700 mt-0.5">
                    <span>Rating: {item.ratings ? Number(item.ratings).toFixed(1) : '4.3'}</span>
                    <FaStar className="text-amber-400 text-xs" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= RELATED PRODUCTS ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-4 md:px-12">
        <h2 className="mb-4 border-b border-gray-200 pb-4 text-xl font-bold text-gray-900">
          Related Products
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p._id || p.slug || p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;