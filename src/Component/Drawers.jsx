import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiShoppingBag, FiHeart, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';

// Right side se aane wala dabba (overlay + panel)
const Shell = ({ open, onClose, icon: Icon, title, children, footer }) => (
  <>
    {/* Dhundhla background */}
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    />

    {/* Panel */}
    <aside
      aria-hidden={!open}
      className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-[transform,visibility] duration-300 ${
        open ? 'visible translate-x-0' : 'invisible translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <div className="flex items-center gap-3 text-base font-semibold text-gray-900">
          <Icon className="text-xl" />
          {title}
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="text-gray-700 transition-colors hover:text-red-500">
          <FiX className="text-2xl" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5">{children}</div>

      {footer && <div className="border-t border-gray-200 px-5 py-4">{footer}</div>}
    </aside>
  </>
);

const Empty = ({ text }) => (
  <div className="flex h-full min-h-[50vh] items-center justify-center">
    <p className="text-sm font-bold text-gray-900">{text}</p>
  </div>
);

const Drawers = () => {
  const {
    drawer,
    closeDrawer,
    openDrawer,
    cartItems,
    cartCount,
    cartTotal,
    wishlistItems,
    wishlistCount,
    removeFromCart,
    changeQty,
    toggleWishlist,
    addToCart,
  } = useShop();

  // Esc dabane par band + drawer khula ho to page scroll band
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeDrawer();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [drawer, closeDrawer]);

  return (
    <>
      {/* ================= CART ================= */}
      <Shell
        open={drawer === 'cart'}
        onClose={closeDrawer}
        icon={FiShoppingBag}
        title={`${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
        footer={
          cartItems.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold text-gray-900">
                <span>Subtotal</span>
                <span className="text-base">{cartTotal}$</span>
              </div>
              <button
                type="button"
                className="w-full rounded-md bg-black py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-95"
              >
                Checkout
              </button>
              <button
                type="button"
                onClick={closeDrawer}
                className="w-full rounded-md border-2 border-blue-600 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-[#3b00e3] hover:text-white"
              >
                Continue shopping
              </button>
            </div>
          )
        }
      >
        {cartItems.length === 0 ? (
          <Empty text="No item in the cart!" />
        ) : (
          <ul>
            {cartItems.map(({ product, qty }) => (
              <li key={product.slug} className="flex gap-3 border-b border-gray-100 py-4">
                <Link
                  to={`/product/${product.slug}`}
                  onClick={closeDrawer}
                  className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gray-50"
                >
                  <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={closeDrawer}
                    className="line-clamp-1 text-sm font-semibold text-gray-900 hover:text-slate-900"
                  >
                    {product.title}
                  </Link>
                  <p className="text-xs text-blue-500">{product.vendor}</p>
                  <p className="text-sm font-bold text-gray-900">{product.price}$</p>

                  <div className="mt-1 flex w-fit items-center overflow-hidden rounded border border-gray-200">
                    <button
                      type="button"
                      onClick={() => changeQty(product.slug, -1)}
                      aria-label="Kam karein"
                      className="px-2 py-1 text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <FiMinus className="text-xs" />
                    </button>
                    <span className="min-w-[28px] text-center text-xs font-semibold">{qty}</span>
                    <button
                      type="button"
                      onClick={() => changeQty(product.slug, 1)}
                      aria-label="Zyada karein"
                      className="px-2 py-1 text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <FiPlus className="text-xs" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(product.slug)}
                  aria-label="Hata dein"
                  className="self-start text-gray-400 transition-colors hover:text-red-500"
                >
                  <FiTrash2 className="text-lg" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Shell>

      {/* ================= WISHLIST ================= */}
      <Shell
        open={drawer === 'wishlist'}
        onClose={closeDrawer}
        icon={FiHeart}
        title={`${wishlistCount} ${wishlistCount === 1 ? 'item' : 'items'}`}
      >
        {wishlistItems.length === 0 ? (
          <Empty text="Wishlist is empty!" />
        ) : (
          <ul>
            {wishlistItems.map((product) => (
              <li key={product.slug} className="flex gap-3 border-b border-gray-100 py-4">
                <Link
                  to={`/product/${product.slug}`}
                  onClick={closeDrawer}
                  className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gray-50"
                >
                  <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={closeDrawer}
                    className="line-clamp-1 text-sm font-semibold text-gray-900 hover:text-slate-900"
                  >
                    {product.title}
                  </Link>
                  <p className="text-xs text-blue-500">{product.vendor}</p>
                  <p className="text-sm font-bold text-gray-900">{product.price}$</p>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product, 1);
                      openDrawer('cart');
                    }}
                    className="mt-1 w-fit rounded bg-black px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-gray-800 active:scale-95"
                  >
                    Add to cart
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.slug)}
                  aria-label="Wishlist se hata dein"
                  className="self-start text-gray-400 transition-colors hover:text-red-500"
                >
                  <FiTrash2 className="text-lg" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Shell>
    </>
  );
};

export default Drawers;