import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ArrowLeft, ShoppingCart, Star, Heart, CreditCard, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useScrollToTop } from '../hooks/useScrollToTop';
import ReviewSection from '../components/ReviewSection';
import PaymentModal from '../components/PaymentModal';
import ProductSpecification from '../components/ProductSpecification';

const ProductDetail = () => {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.items);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-[#4A2C1D] mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-[#A78BFA] text-white px-6 py-3 rounded-full font-serif italic hover:bg-[#8B5CF6] transition"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const isInCart = cartItems.some(item => item.product.id === product.id);

  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const discountAmount = (originalPrice - product.price).toFixed(2);

  const handleAddToCart = () => {
    dispatch(addToCart({ product }));
    toast.success(`${product.title} added to cart!`);
  };

  const handleBuyNow = () => {
    setShowPaymentModal(true);
  };

  const calculateOrderDetails = () => {
    const subtotal = product.price * quantity;
    const discount = discountAmount * quantity;
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    return {
      subtotal: subtotal,
      discount: discount,
      shipping: shipping,
      tax: tax,
      total: total
    };
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0]">
      {/* Back Button */}
      <div className="pt-20 pb-8 px-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#4A2C1D] hover:text-[#A78BFA] transition"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="overflow-hidden rounded-lg bg-gradient-to-br from-[] to-[#FAF8F1] max-w-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-auto object-contain p-6"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6 bg-white rounded-lg p-8 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
                {product.brand || "Vintage"}
              </p>
              <h1 className="text-2xl font-serif text-[#4A2C1D] mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={16} fill="#FCD34D" className="text-[#FCD34D]" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">In Stock</span>
              </div>

              {/* Price and Discount */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-[#4a3c1e]">₹{product.price.toFixed(2)}</span>
                  {product.discountPercentage && (
                    <>
                      <span className="text-lg text-gray-400 line-through">₹{originalPrice}</span>
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{product.discountPercentage.toFixed(0)}%
                      </span>
                    </>
                  )}
                </div>
                {product.discountPercentage && (
                  <p className="text-green-600 text-md font-medium text-left">Save ₹{discountAmount}</p>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  <Check size={18} />
                  <span className="font-medium">{product.stock > 0 ? `${product.stock} in Stock` : 'Out of Stock'}</span>
                </div>
              </div>

              {/* Description */}
              {/* <div className="mb-8 p-6 bg-gradient-to-br from-[#F5E6D3] via-[#FAF8F1] to-[#EAD9C3] border-l-4 border-[#8B6F47] rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-serif text-[#4A2C1D] mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#8B6F47] rounded-full"></span>
                  Product Description
                </h3>
                <p className="text-[#6B5436] leading-relaxed italic">
                  {product.description || "Premium quality vintage product with excellent features."}
                </p>
              </div> */}

              {/* Quantity Selection */}
              <div className="mb-6 p-2 bg-gradient-to-br from-[#F5E6D3] to-[#EAD9C3] border border-[#D4A574] rounded-md">
                <label className="block text-sm font-medium text-[#4A2C1D] mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-white border border-[#D4A574] rounded-lg  font-bold text-[#8B6F47]"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border border-[#D4A574] rounded-lg py-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-white border border-[#D4A574] rounded-lg  font-bold text-[#8B6F47]"
                  >
                    +
                  </button>
                  <span className="ml-4 text-[#6B5436]">Total: <span className="font-bold text-[#8B6F47]">₹{(product.price * quantity).toFixed(2)}</span></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart || product.stock === 0}
                  className={`py-3 px-4 rounded-lg font-serif italic text-lg transition flex items-center justify-center gap-3 ${
                    isInCart || product.stock === 0
                      ? 'bg-[#D4A574] text-white cursor-not-allowed'
                      : 'bg-[#8B6F47] text-white hover:bg-[#6B5436] hover:shadow-lg'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {isInCart ? 'Already in Cart' : 'Add to Cart'}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`py-3 px-4 rounded-lg font-serif italic text-lg transition flex items-center justify-center gap-3 ${
                    product.stock === 0
                      ? 'bg-[#D4A574] text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#8B6F47] to-[#6B5436] text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <CreditCard size={20} />
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#D4A574]">
                <div className="text-center">
                  <div className="text-xl text-green-800 font-bold mb-1">FREE</div>
                  <p className="text-xs text-[#6B5436]">Shipping on orders above ₹500</p>
                </div>
                <div className="text-center">
                  <div className="text-xl text-green-800 font-bold mb-1">₹0</div>
                  <p className="text-xs text-[#6B5436]">Additional Charges</p>
                </div>
                <div className="text-center">
                  <div className="text-xl text-green-800 font-bold mb-1">EASY</div>
                  <p className="text-xs text-[#6B5436]">Returns</p>
                </div>
                <div className="text-center">
                  <div className="text-xl text-green-800 font-bold mb-1">100%</div>
                  <p className="text-xs text-[#6B5436]">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specifications Section */}
      <ProductSpecification product={product} />

      {/* Reviews Section */}
      <ReviewSection reviews={product.reviews || []} productRating={product.rating} />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        orderDetails={calculateOrderDetails()}
      />
    </div>
  );
};

export default ProductDetail;