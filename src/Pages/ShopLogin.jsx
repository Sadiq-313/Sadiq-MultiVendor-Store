import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { server } from '../config';
import { useShop } from '../context/ShopContext';

const ShopLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { notify, login } = useShop();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/api/v2/seller/loginSeller`,
        { email, password }
      );

      if (data.success && data.seller) {
        const { _id, shopName, email: sellerEmail, phoneNumber, address, zipCode, avatar, role } = data.seller;
        const shopData = { _id, shopName, email: sellerEmail, phoneNumber, address, zipCode, avatar, role };
        login(shopData);

        if (notify) notify(`Welcome back, ${shopData.shopName || shopData.name || 'Seller'}!`, 'cart');
        navigate('/seller-dashboard');
      } else {
        const message = data.message || 'Invalid email or password.';
        setErrorMsg(message);
        if (notify) notify(message, 'error');
      }
    } catch (error) {
      const errorMsgText = error.response?.data?.message || 'Login failed! Please check your credentials.';
      setErrorMsg(errorMsgText);
      if (notify) notify(errorMsgText, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page flex min-h-[80vh] flex-col items-center justify-center px-4 py-12">
      <h2 className="auth-title mb-6 text-2xl font-extrabold text-slate-900">Sign in to your shop</h2>

      <div className="auth-card w-full max-w-md rounded-xl bg-white p-8 shadow-sm border border-slate-200/80">
        {errorMsg && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-xs text-red-600 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-slate-900"
              />
              Remember me
            </label>
            <button type="button" className="text-slate-900 hover:underline cursor-pointer">
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#3b00e3] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-5 text-xs text-slate-600">
          Don't have any account?{' '}
          <Link to="/create-shop" className="font-medium text-slate-900 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ShopLogin;