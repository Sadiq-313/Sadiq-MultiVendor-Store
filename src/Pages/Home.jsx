import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { FiTruck, FiRefreshCw, FiAward, FiLock } from 'react-icons/fi';

import ProductCard from '../Component/ProductCard';
import { products } from '../data/products';

import EventStatus from '../Component/EventStatus';
import { events } from '../data/events';
import { useShop } from '../context/ShopContext';


// ==================== ASSETS (src/assets) ====================
import clothingImg from '../assets/clothing-apparel.png';
import dogImg from '../assets/dog.png';
import downloadImg from '../assets/download.jpg';
import headphoneImg from '../assets/headphone.png';
import iphoneImg from '../assets/iphonemobile.jpg';
import logoImg from '../assets/logocard.png';
import macImg from '../assets/mac.png';
import hpLaptopImg from '../assets/hplaptop.jpg';
import storeHeroImg from '../assets/store.jpg';
import watchImg from '../assets/watch.png';

// Brand logos
import appleLogo from '../assets/applelogo.svg';
import dellLogo from '../assets/delllogo.svg';
import lgLogo from '../assets/lgmobile.png';
import samsungLogo from '../assets/sumsunglogo.png';
import sonyLogo from '../assets/sonylogo.png';

// ==================== HOME ====================
const Home = () => {
  const categories = [
    { title: 'Computers and Laptops', img: macImg },
    { title: 'Cosmetics and Body Care', img: hpLaptopImg }, // TODO: cosmetics ki sahi image lagayein
    { title: 'Accessories', img: headphoneImg },
    { title: 'Cloths', img: clothingImg },
    { title: 'Shoes', img: clothingImg }, // TODO: shoes ki sahi image lagayein
    { title: 'Gifts', img: downloadImg },
    { title: 'Pet Care', img: dogImg },
    { title: 'Mobile and Tablets', img: iphoneImg },
    { title: 'Music and Gaming', img: watchImg },
    { title: 'Others', img: logoImg },
  ];

  // Sab se zyada sold wale 5 products
  const bestDeals = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);

  // data/products.js mein jin par featured: true hai
  const featuredProducts = products.filter((p) => p.featured).slice(0, 5);

  // PNG logos mein khali jagah hoti hai, is liye unki size bari rakhi hai
  const brands = [
    { name: 'SONY', logo: sonyLogo, size: 'h-40 w-40 md:h-52 md:w-52' },
    { name: 'LG', logo: lgLogo, size: 'h-40 w-40 md:h-52 md:w-52' },
    { name: 'SAMSUNG', logo: samsungLogo, size: 'h-40 w-40 md:h-52 md:w-52' },
    { name: 'APPLE', logo: appleLogo, size: 'h-16 w-auto md:h-20' },
    { name: 'DELL', logo: dellLogo, size: 'h-16 w-auto md:h-20' },
  ];

  const features = [
    { icon: FiTruck, title: 'Free Shipping', desc: 'From all orders over $100' },
    { icon: FiRefreshCw, title: 'Daily Surprise Offers', desc: 'Save up to 25% off' },
    { icon: FiAward, title: 'Affordable Prices', desc: 'Get Factory direct price' },
    { icon: FiLock, title: 'Secure Payments', desc: '100% protected payments' },
  ];

  const headingClass = 'mb-8 text-center text-2xl font-bold text-[#1e40af] md:text-3xl';

  const navigate = useNavigate();
const { addToCart } = useShop();
const popularEvent = events.find((e) => e.popular) || events[0];
const openEvent = () => navigate(`/product/${popularEvent.slug}`);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-12 bg-[#f8f9fa] px-4 py-8 font-sans md:px-12">
      {/* 1. HERO */}
      <section className="relative w-full max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

        <div className="relative grid grid-cols-1 items-center gap-10 px-6 py-12 md:grid-cols-2 md:py-16">
          <div className="flex flex-col items-center space-y-6 text-center md:items-start md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700 md:text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Pakistan's Trusted Marketplace
            </span>

            <h1 className="text-4xl font-extrabold leading-tight text-[#1e40af] md:text-5xl lg:text-6xl">
             Sadiq MultiVendor Store
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-gray-600 md:text-lg">
              Your ultimate shopping destination, powered by the best vendors around.
              Browse, compare, and buy with confidence because great products and
              great sellers belong together.
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                to="/products"
                className="inline-block rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#1e40af] px-8 py-3 text-center text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 active:scale-95 md:text-base"
              >
                Shop Now
              </Link>

              {/* Vendor page banne tak: yeh 404 dikhayega. Path apne hisab se badal lein */}
              <Link
                to="/vendor"
                className="inline-block rounded-lg border-2 border-blue-600 px-8 py-3 text-center text-sm font-semibold text-blue-700 transition-all hover:bg-[#3b00e3] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 active:scale-95 md:text-base"
              >
                Become a Vendor
              </Link>
            </div>

            <div className="flex gap-8 pt-4">
              {[
                { value: '500+', label: 'Vendors' },
                { value: '10K+', label: 'Products' },
                { value: '24/7', label: 'Support' },
              ].map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <p className="text-xl font-bold text-[#1e40af] md:text-2xl">{s.value}</p>
                  <p className="text-xs text-gray-500 md:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={storeHeroImg}
              alt="Pak MultiVendor Store hero banner"
              className="w-full max-w-md object-contain mix-blend-multiply drop-shadow-xl md:max-w-lg"
            />
          </div>
        </div>
      </section>

      {/* 2. FEATURES BAR */}
      <section className="w-full max-w-7xl rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#1e40af] px-6 py-6 text-white shadow-md md:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center space-x-4">
              <Icon className="flex-shrink-0 text-3xl text-orange-400" />
              <div>
                <h4 className="text-sm font-bold">{title}</h4>
                <p className="text-xs text-blue-100">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SHOP BY CATEGORIES */}
      <section className="w-full max-w-7xl rounded-2xl bg-white p-6 shadow-md">
        <h2 className={headingClass}>Shop by Categories</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={`/products?category=${encodeURIComponent(cat.title)}`}
              className="group flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="mb-3 h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20"
              />
              <span className="text-xs font-semibold leading-tight text-gray-800 transition-colors group-hover:text-slate-900 md:text-sm">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. BEST DEALS */}
      <section className="w-full max-w-7xl">
        <h2 className={headingClass}>Best Deals</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {bestDeals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

     {/* 5. POPULAR EVENT */}


   <section
  onClick={openEvent}
  className="w-full max-w-7xl cursor-pointer rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-lg md:p-8"
>
  <h2 className="mb-6 text-center text-2xl font-bold text-[#1e40af] md:text-3xl">Popular Event</h2>
  <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
    <div className="flex justify-center">
      <img src={popularEvent.image} alt={popularEvent.title} className="max-h-64 object-contain" />
    </div>

    <div className="flex flex-col items-start space-y-3">
      <h3 className="text-2xl font-bold text-[#1e40af]">{popularEvent.title}</h3>
      <p className="text-sm text-gray-500">{popularEvent.description}</p>

      <div className="flex w-full items-center gap-3">
        {popularEvent.oldPrice && (
          <span className="text-sm text-red-500 line-through">${popularEvent.oldPrice}</span>
        )}
        <span className="text-2xl font-bold text-gray-900">${popularEvent.price}</span>
        <span className="ml-auto text-xs font-semibold text-indigo-600">{popularEvent.sold} sold</span>
      </div>

      <EventStatus endDate={popularEvent.endDate} />

      <div className="flex gap-3 pt-2">
        <Link
          to={`/product/${popularEvent.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-block rounded-md bg-gradient-to-r from-[#3b82f6] to-[#1e40af] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:shadow-lg active:scale-95"
        >
          See Details
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(popularEvent, 1);
          }}
          className="rounded-md border-2 border-blue-600 px-5 py-2.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-[#3b00e3] hover:text-white active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</section>

      {/* 6. FEATURED PRODUCTS */}
      <section className="w-full max-w-7xl">
        <h2 className={headingClass}>Featured Products</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 7. BRAND LOGOS */}
      <section className="w-full max-w-7xl rounded-2xl border border-gray-100 bg-white px-6 py-10 shadow-sm">
        <h2 className="mb-8 text-center text-xl font-bold text-[#1e40af] md:text-3xl">Our Top Brands</h2>
        <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-4">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="flex h-24 w-44 items-center justify-center overflow-hidden opacity-70 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0 md:h-28 md:w-56"
            >
              <img src={brand.logo} alt={brand.name} className={`object-contain ${brand.size}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;