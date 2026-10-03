import React, { useState } from 'react';

const columns = [
  {
    title: 'Company',
    links: ['About us', 'Careers', 'Store Locations', 'Our Blog', 'Reviews'],
  },
  {
    title: 'Shop',
    links: ['Game & Video', 'Phone & Tablets', 'Computers & Laptop', 'Sport Watches', 'Events'],
  },
  {
    title: 'Support',
    links: ['FAQ', 'Reviews', 'Contact Us', 'Shipping', 'Live chat'],
  },
];

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: yahan apni API call lagayein
    setEmail('');
  };

  return (
    <footer className="w-full">
      {/* ============ SUBSCRIBE STRIP ============ */}
      <div className="bg-[#3329c9]">
        <div className="flex flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-10">
          <h2 className="text-center text-3xl font-semibold leading-snug text-white md:text-left md:text-4xl">
            <span className="text-[#4ade80]">Subscribe</span> us for get news
            <br className="hidden md:block" /> events and offers
          </h2>

          <form onSubmit={handleSubmit} className="flex w-full max-w-lg items-center gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="w-full rounded-md bg-white px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-4 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="rounded-md bg-[#4ade80] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-green-500 active:scale-95"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* ============ LINKS ============ */}
      <div className="bg-black">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-8 md:grid-cols-3 md:px-10">
          {columns.map((col, i) => (
            <div
              key={col.title}
              className={`${i === 1 ? 'md:justify-self-center' : ''} ${i === 2 ? 'md:justify-self-end' : ''}`}
            >
              <h3 className="mb-3 text-base font-semibold text-white">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;