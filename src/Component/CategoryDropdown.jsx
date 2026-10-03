import React, { useState, useRef, useEffect } from 'react';
import { FiAlignLeft, FiChevronDown, FiPackage } from 'react-icons/fi';

import newMacImg from '../assets/newmac.jpg';
import storeImg from '../assets/store.jpg';
import clothingImg from '../assets/clothing-apparel.png';
import downloadImg from '../assets/download.jpg';
import dogImg from '../assets/dog.png';
import iphoneImg from '../assets/iphonemobile.jpg';
import headphoneImg from '../assets/headphone.png';
import mobileImg from '../assets/mobile.png';
import hpLaptopImg from '../assets/hplaptop.jpg';

const categories = [
  { title: 'Computers and Laptops', img: newMacImg },
  { title: 'Cosmetics and Body Care', img: hpLaptopImg }, // TODO: sahi image lagayein
  { title: 'Accessories', img: storeImg },
  { title: 'Cloths', img: clothingImg },
  { title: 'Shoes', img: null }, // image nahi hai to icon dikhega
  { title: 'Gifts', img: downloadImg },
  { title: 'Pet Care', img: dogImg },
  { title: 'Mobile and Tablets', img: iphoneImg },
  { title: 'Music and Gaming', img: headphoneImg },
  { title: 'Others', img: mobileImg },
];

const CategoryDropdown = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // List ke bahar click ya Esc dabane par band ho jaye
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    const handleEsc = (e) => e.key === 'Escape' && setOpen(false);

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleSelect = (name) => {
    setOpen(false);
    if (onSelect) onSelect(name);
  };

  return (
    <div ref={wrapperRef} className="relative w-64">
      {/* Button: band hone par arrow neeche, khulne par upar */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex w-full items-center justify-between rounded-md bg-white px-4 py-3 text-left shadow-sm transition-shadow hover:shadow-md"
      >
        <span className="flex items-center gap-3 text-lg font-semibold text-gray-900">
          <FiAlignLeft className="text-2xl" />
          All Categories
        </span>
        <FiChevronDown
          className={`text-xl text-gray-900 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <ul className="absolute left-0 top-full z-50 mt-1 max-h-[75vh] w-full overflow-y-auto rounded-lg bg-white py-2 shadow-xl ring-1 ring-black/5">
          {categories.map((cat) => (
            <li key={cat.title}>
              <button
                type="button"
                onClick={() => handleSelect(cat.title)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-gray-800 transition-colors hover:bg-blue-50 hover:text-blue-700"
              >
                {cat.img ? (
                  <img src={cat.img} alt="" className="h-7 w-7 flex-shrink-0 object-contain" />
                ) : (
                  <FiPackage className="h-7 w-7 flex-shrink-0 p-1 text-gray-400" />
                )}
                {cat.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;