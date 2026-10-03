import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiTrash2, FiLogOut, FiPackage, FiUploadCloud, FiEdit, FiX } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';

const SellerDashboard = () => {
  const { 
    user, 
    logout, 
    sellerProducts, 
    addSellerProduct, 
    editSellerProduct, 
    updateSellerProduct, 
    deleteSellerProduct, 
    notify 
  } = useShop();
  const navigate = useNavigate();

  // Context function compatibility check
  const handleUpdateProduct = editSellerProduct || updateSellerProduct;

  const [productData, setProductData] = useState({
    title: '',
    price: '',
    category: 'Computers and Laptops',
    description: '',
  });

  const [imagePreview, setImagePreview] = useState('');

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState('');

  // Protect route: agar user/seller logged-in nahi hai
  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-500 mb-4">Please sign in to your seller account first.</p>
        <button
          onClick={() => navigate('/shop-login')}
          className="bg-[#3b00e3] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700"
        >
          Go to Seller Login
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imagePreview) {
      notify('Please upload a product image!', 'error');
      return;
    }

    const timestamp = Date.now();
    const newProduct = {
      id: timestamp,
      slug: `${productData.title.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`,
      title: productData.title,
      price: parseFloat(productData.price),
      category: productData.category,
      description: productData.description,
      image: imagePreview,
      sellerEmail: user.email,
      sellerName: user.shopName || 'Seller',
    };

    addSellerProduct(newProduct);

    // Form reset
    setProductData({
      title: '',
      price: '',
      category: 'Computers and Laptops',
      description: '',
    });
    setImagePreview('');
  };

  // Open Edit Modal
  const handleStartEdit = (product) => {
    setEditingProduct({ ...product });
    setEditImagePreview(product.image);
  };

  // Edit Form Image Change
  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
        setEditingProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Edit Changes
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct.title || !editingProduct.price) {
      notify('Title and Price are required!', 'error');
      return;
    }

    const updatedItem = {
      ...editingProduct,
      price: parseFloat(editingProduct.price),
      image: editImagePreview || editingProduct.image,
    };

    if (handleUpdateProduct) {
      handleUpdateProduct(updatedItem);
    } else {
      notify('Product update function not found in ShopContext', 'error');
    }

    setEditingProduct(null);
    setEditImagePreview('');
  };

  const handleLogout = () => {
    logout();
    notify('Logged out successfully', 'info');
    navigate('/shop-login');
  };

  // Sirf current seller ke products filter karke dikhayenge
  const myProducts = sellerProducts.filter((p) => p.sellerEmail === user.email);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      {/* Top Header / Profile Bar */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || 'https://via.placeholder.com/150'}
            alt="Shop Avatar"
            className="w-14 h-14 rounded-full object-cover border border-slate-200"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-900">{user.shopName}</h1>
            <p className="text-xs text-slate-500">{user.email} • {user.phoneNumber}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors border border-red-200"
        >
          <FiLogOut /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Upload Product Form */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FiPlus className="text-slate-900" /> Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Product Title *</label>
              <input
                type="text"
                name="title"
                value={productData.title}
                onChange={handleChange}
                placeholder="e.g. Wireless Headphones"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  placeholder="99.99"
                  step="0.01"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Computers and Laptops">Computers and Laptops</option>
                  <option value="Cosmetics and Body Care">Cosmetics and Body Care</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Cloths">Cloths</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Gifts">Gifts</option>
                  <option value="Pet Care">Pet Care</option>
                  <option value="Mobile and Tablets">Mobile and Tablets</option>
                  <option value="Music and Gaming">Music and Gaming</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Write product description..."
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600 resize-none"
              ></textarea>
            </div>

            {/* Image Upload Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Product Image *</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 transition-colors relative cursor-pointer">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="h-32 mx-auto object-contain rounded" />
                    <button
                      type="button"
                      onClick={() => setImagePreview('')}
                      className="mt-2 text-xs text-red-600 font-semibold underline"
                    >
                      Remove & Upload Other
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <FiUploadCloud className="mx-auto text-3xl text-slate-400 mb-1" />
                    <span className="text-xs text-slate-600 font-medium">Click to upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3b00e3] hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg text-xs transition-colors"
            >
              Upload Product to Store
            </button>
          </form>
        </div>

        {/* Right Side: List of Current Seller's Products */}
        <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiPackage className="text-slate-900" /> My Live Products
            </span>
            <span className="text-xs font-semibold bg-blue-50 text-slate-900 px-2.5 py-1 rounded-full">
              {myProducts.length} Items
            </span>
          </h2>

          {myProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              You haven't uploaded any products yet.
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {myProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 object-contain rounded border border-slate-100 bg-white"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">{product.title}</h4>
                      <p className="text-xs text-slate-500">
                        {product.category} • <span className="font-semibold text-slate-900">${product.price}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleStartEdit(product)}
                      className="p-2 text-slate-500 hover:text-slate-900 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit Product"
                    >
                      <FiEdit className="text-base" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteSellerProduct(product.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete Product"
                    >
                      <FiTrash2 className="text-base" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= EDIT PRODUCT MODAL ================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FiX className="text-xl" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4">Edit Live Product</h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
                  >
                    <option value="Computers and Laptops">Computers and Laptops</option>
                    <option value="Cosmetics and Body Care">Cosmetics and Body Care</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Cloths">Cloths</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Gifts">Gifts</option>
                    <option value="Pet Care">Pet Care</option>
                    <option value="Mobile and Tablets">Mobile and Tablets</option>
                    <option value="Music and Gaming">Music and Gaming</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows="3"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Image</label>
                <div className="flex items-center gap-4">
                  <img
                    src={editImagePreview}
                    alt="Current"
                    className="h-16 w-16 object-contain border rounded p-1"
                  />
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#3b00e3] px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;