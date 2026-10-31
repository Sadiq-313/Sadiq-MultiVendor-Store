import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiTrash2, FiLogOut, FiPackage, FiUploadCloud, FiEdit, FiX } from 'react-icons/fi';
import axios from 'axios';
import { server } from '../config';
import { useShop } from '../context/ShopContext';

const SellerDashboard = () => {
  const { user, logout, notify } = useShop();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [productData, setProductData] = useState({
    name: '',
    originalPrice: '',
    discountPrice: '',
    stock: '',
    category: 'Computers and Laptops',
    description: '',
  });

  const [images, setImages] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editImages, setEditImages] = useState([]);

  // Fetch seller products from API
  const fetchSellerProducts = async () => {
    if (!user || !user._id) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/product/get-all-products-shop/${user._id}`);
      if (data.success && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching seller products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchSellerProducts();
    }
  }, [user]);

  // Protect route: agar user/seller logged-in nahi hai
  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-500 mb-4">Please sign in to your seller account first.</p>
        <button
          onClick={() => navigate('/shop-login')}
          className="bg-[#3b00e3] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 cursor-pointer"
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
    const files = Array.from(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      notify('Please upload at least one product image!', 'error');
      return;
    }

    try {
      const { data } = await axios.post(`${server}/product/create-product`, {
        name: productData.name,
        description: productData.description,
        category: productData.category,
        originalPrice: productData.originalPrice,
        discountPrice: productData.discountPrice,
        stock: productData.stock,
        images,
        shopId: user._id,
      });

      if (data.success) {
        notify('Product created successfully!', 'cart');
        setProductData({
          name: '',
          originalPrice: '',
          discountPrice: '',
          stock: '',
          category: 'Computers and Laptops',
          description: '',
        });
        setImages([]);
        fetchSellerProducts();
      } else {
        notify(data.message || 'Failed to create product', 'error');
      }
    } catch (error) {
      notify(error.response?.data?.message || 'Error creating product', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const { data } = await axios.delete(`${server}/product/delete-shop-product/${id}`, {
        withCredentials: true,
      });
      if (data.success) {
        notify('Product deleted successfully', 'remove');
        fetchSellerProducts();
      } else {
        notify(data.message || 'Failed to delete product', 'error');
      }
    } catch (error) {
      notify(error.response?.data?.message || 'Error deleting product', 'error');
    }
  };

  const handleStartEdit = (product) => {
    setEditingProduct({ ...product });
    setEditImages(product.images || []);
  };

  const handleEditImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setEditImages(newImages);
          setEditingProduct((prev) => ({ ...prev, images: newImages }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingProduct.name || !editingProduct.discountPrice) {
      notify('Name and Price are required!', 'error');
      return;
    }

    try {
      const { data } = await axios.put(`${server}/product/update-shop-product/${editingProduct._id}`, {
        ...editingProduct,
        images: editImages.length > 0 ? editImages : editingProduct.images,
      });

      if (data.success) {
        notify('Product updated successfully!', 'cart');
        setEditingProduct(null);
        setEditImages([]);
        fetchSellerProducts();
      } else {
        notify(data.message || 'Failed to update product', 'error');
      }
    } catch (error) {
      notify(error.response?.data?.message || 'Error updating product', 'error');
    }
  };

  const handleLogout = () => {
    logout();
    notify('Logged out successfully', 'info');
    navigate('/shop-login');
  };

  return (
    <div className="seller-dashboard min-h-screen p-4 md:p-10">
      {/* Top Header / Profile Bar */}
      <div className="seller-profile max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar?.url || user.avatar || 'https://via.placeholder.com/150'}
            alt="Shop Avatar"
            className="w-14 h-14 rounded-full object-cover border border-slate-200"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-900">{user.shopName || user.name}</h1>
            <p className="text-xs text-slate-500">{user.email} • {user.phoneNumber || user.phone}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors border border-red-200 cursor-pointer"
        >
          <FiLogOut /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Upload Product Form */}
        <div className="seller-panel lg:col-span-5 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FiPlus className="text-slate-900" /> Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Product Title *</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="e.g. Wireless Headphones"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Original Price (\$)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={productData.originalPrice}
                  onChange={handleChange}
                  placeholder="120.00"
                  step="0.01"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Price / Sale (\$) *</label>
                <input
                  type="number"
                  name="discountPrice"
                  value={productData.discountPrice}
                  onChange={handleChange}
                  placeholder="99.99"
                  step="0.01"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                  placeholder="10"
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">Product Images *</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 transition-colors relative cursor-pointer">
                {images.length > 0 ? (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {images.map((img, idx) => (
                      <img key={idx} src={img} alt="Preview" className="h-20 w-20 object-contain rounded border" />
                    ))}
                    <button
                      type="button"
                      onClick={() => setImages([])}
                      className="block w-full mt-2 text-xs text-red-600 font-semibold underline"
                    >
                      Clear & Upload Other
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <FiUploadCloud className="mx-auto text-3xl text-slate-400 mb-1" />
                    <span className="text-xs text-slate-600 font-medium">Click to upload images</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3b00e3] hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg text-xs transition-colors cursor-pointer"
            >
              Upload Product to Store
            </button>
          </form>
        </div>

        {/* Right Side: List of Current Seller's Products */}
        <div className="seller-panel lg:col-span-7 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiPackage className="text-slate-900" /> My Live Products
            </span>
            <span className="text-xs font-semibold bg-blue-50 text-slate-900 px-2.5 py-1 rounded-full">
              {products.length} Items
            </span>
          </h2>

          {loading ? (
            <div className="text-center py-12 text-slate-400 text-xs">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              You haven't uploaded any products yet.
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images?.[0] || 'https://via.placeholder.com/150'}
                      alt={product.name}
                      className="w-12 h-12 object-contain rounded border border-slate-100 bg-white"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">{product.name}</h4>
                      <p className="text-xs text-slate-500">
                        {product.category} • <span className="font-semibold text-slate-900">\${product.discountPrice}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(product)}
                      className="p-2 text-slate-500 hover:text-slate-900 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                      title="Edit Product"
                    >
                      <FiEdit className="text-base" />
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
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
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4">Edit Live Product</h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Price (\$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.discountPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, discountPrice: e.target.value })}
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Images</label>
                <div className="flex items-center gap-4 flex-wrap">
                  {(editImages.length > 0 ? editImages : editingProduct.images)?.map((img, idx) => (
                    <img key={idx} src={img} alt="Current" className="h-16 w-16 object-contain border rounded p-1 bg-white" />
                  ))}
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold">
                    Change Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
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
                  className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#3b00e3] px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer"
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