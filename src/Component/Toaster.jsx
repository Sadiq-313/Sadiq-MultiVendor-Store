import React, { useEffect, useState } from 'react';
import { FiShoppingCart, FiHeart, FiTrash2, FiX, FiAlertCircle } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';

const styles = {
  cart: { icon: FiShoppingCart, bar: 'bg-emerald-500', iconBg: 'bg-emerald-100 text-indigo-600' },
  wishlist: { icon: FiHeart, bar: 'bg-red-500', iconBg: 'bg-red-100 text-red-500' },
  remove: { icon: FiTrash2, bar: 'bg-gray-500', iconBg: 'bg-gray-100 text-gray-600' },
  error: { icon: FiAlertCircle, bar: 'bg-red-600', iconBg: 'bg-red-100 text-red-600' }, // <--- Red Warning Style Added Here
};

const ToastItem = ({ toast, onClose, onViewCart }) => {
  const [show, setShow] = useState(false);
  const { icon: Icon, bar, iconBg } = styles[toast.type] || styles.cart;

  // Mount hote hi right se slide hokar aaye
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      role="status"
      className={`relative flex w-80 max-w-[90vw] items-center gap-3 overflow-hidden rounded-lg bg-white py-3 pl-5 pr-3 shadow-xl ring-1 ring-black/5 transition-all duration-300 ${
        show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <span className={`absolute left-0 top-0 h-full w-1.5 ${bar}`} />

      <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${iconBg}`}>
        <Icon className="text-base" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-gray-900">{toast.message}</p>
        {toast.type === 'cart' && (
          <button
            type="button"
            onClick={onViewCart}
            className="mt-0.5 text-xs font-semibold text-slate-900 hover:underline"
          >
            View cart
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="text-gray-400 transition-colors hover:text-gray-700"
      >
        <FiX />
      </button>
    </div>
  );
};

const Toaster = () => {
  const { toasts, dismissToast, openDrawer } = useShop();

  return (
    <div aria-live="polite" className="pointer-events-none fixed right-4 top-20 z-[90] flex flex-col gap-3">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem
            toast={t}
            onClose={() => dismissToast(t.id)}
            onViewCart={() => {
              openDrawer('cart');
              dismissToast(t.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Toaster;