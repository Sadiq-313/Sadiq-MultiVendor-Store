import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';

const CreateShop = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    phoneNumber: '',
    email: '',
    address: '',
    zipCode: '',
    password: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [imageError, setImageError] = useState('');

  const { notify } = useShop();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Base64 conversion image ko localStorage mein save karne ke liye
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      setImageError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!avatar) {
      setImageError('Please upload a shop avatar/image to continue.');
      if (notify) notify('Please upload a shop image!', 'error');
      return;
    }

    // Existing shops fetch karein localStorage se
    const existingShops = JSON.parse(localStorage.getItem('registered_shops') || '[]');

    // Check karein agar email pehle se exists karta hai
    const isAlreadyRegistered = existingShops.some(
      (shop) => shop.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (isAlreadyRegistered) {
      if (notify) notify('This email is already registered as a seller!', 'error');
      return;
    }

    // Nayi shop ka object create karein
    const newShop = {
      ...formData,
      avatar,
      id: Date.now(),
    };

    // Save back to LocalStorage
    localStorage.setItem('registered_shops', JSON.stringify([...existingShops, newShop]));

    if (notify) notify('Shop registered successfully! Please login.', 'cart');
    navigate('/shop-login');
  };

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center bg-[#f8fafc] px-4 py-12">
      <h2 className="mb-6 text-2xl font-extrabold text-slate-900">Register as a seller</h2>

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm border border-slate-200/80">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shop Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Zip Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 border border-slate-200 overflow-hidden shrink-0">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <FiUser className="text-lg" />
                )}
              </div>
              <label className="cursor-pointer rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Upload a file <span className="text-red-500">*</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {imageError && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">{imageError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#3b00e3] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 mt-2"
          >
            Submit
          </button>
        </form>

        <p className="mt-5 text-xs text-slate-600">
          Already have an account?{' '}
          <Link to="/shop-login" className="font-medium text-slate-900 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateShop;