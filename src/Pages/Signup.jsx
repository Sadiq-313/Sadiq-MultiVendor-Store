import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { server } from '../config';
import { useShop } from '../context/ShopContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { notify } = useShop();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      notify('Please fill in all fields', 'error');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/api/v2/seller/createSeller`, {
        name,
        email,
        password,
      });

      if (data.success) {
        notify(data.message || 'Account created successfully! Please check your email.', 'cart');
      
        navigate('/login');
      } else {
        notify(data.message || 'Signup failed', 'error');
      }
    } catch (error) {
      notify(error.response?.data?.message || 'Registration failed!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="auth-card w-full max-w-md rounded-xl bg-white p-8 shadow-lg border border-gray-100">
        <h2 className="auth-title text-center text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="mt-1 text-center text-xs text-gray-500">Join UrbanCart to start shopping!</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700">Full Name</label>
            <div className="relative mt-1">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Muhammad Sadiq"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700">Email Address</label>
            <div className="relative mt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#1e40af] py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:opacity-95 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;