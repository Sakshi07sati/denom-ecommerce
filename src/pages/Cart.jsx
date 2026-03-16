import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { Trash2, Plus, Minus, ShoppingBag, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useNavigate } from 'react-router-dom';

const Cart = ({ onClose }) => {
  useScrollToTop();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Item removed from cart');
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  if (cart.items.length === 0) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <ShoppingBag size={64} className="text-[#be9b7b] mb-6" />
        <h2 className="text-2xl md:text-3xl font-serif text-[#4A2C1D] mb-4">Your cart is empty</h2>
        <p className="text-[#4A2C1D]/70 mb-8">Add some vintage finds to get started!</p>
        <button 
          className="bg-[#be9b7b] text-white px-8 py-3 rounded-full font-serif italic hover:bg-[#4A2C1D] transition w-full max-w-xs"
     onClick={() =>{onClose(); navigate('/shop')}}> Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-h-screen overflow-hidden">
      {/* Header */}
      <div className="p-6 flex justify-between items-center border-b border-[#4A2C1D]/10">
        <h2 className="text-xl font-serif font-bold text-[#4A2C1D]">Your Cart</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1 pr-8 pb-2"
          >
            <Trash2 size={16} className=''/>
            <span className="hidden sm:inline ">  clear cart  </span>
          </button>
          <button onClick={onClose} className="sm:hidden text-[#4A2C1D]">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Scrollable Items List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {cart.items.map((item) => (
          <div key={item.product.id} className="bg-[#EAE3D2] rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
            {/* Product Image */}
            <img
              src={item.product.thumbnail}
              alt={item.product.title}
              className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-lg"
            />

            {/* Product Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-serif text-[#4A2C1D] leading-tight">{item.product.title}</h3>
              <p className="text-sm text-[#4A2C1D]/60">{item.product.brand}</p>
              <p className="text-[#4A2C1D] font-bold mt-1">₹{item.product.price}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 bg-white/50 px-3 py-1 rounded-full border border-[#4A2C1D]/10">
              <button
                onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#be9b7b] transition text-[#4A2C1D]"
              >
                <Minus size={16} />
              </button>
              <span className="w-4 text-center font-bold text-[#4A2C1D]">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#be9b7b] transition text-[#4A2C1D]"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Item Total & Remove */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:gap-1">
              <p className="text-lg font-bold text-[#4A2C1D]">
                ₹{(item.product.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemoveItem(item.product.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Summary Area */}
      <div className="p-6 bg-[#EAE3D2] border-t border-[#4A2C1D]/10 rounded-t-3xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center text-xl font-bold text-[#4A2C1D] mb-6">
          <span>Total:</span>
          <span>₹{cart.total.toFixed(2)}</span>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            className="w-full bg-[#4A2C1D] text-white py-4 rounded-full font-serif italic text-lg hover:bg-[#3a2217] transition-all active:scale-95"
            onClick={() => {
              onClose(); 
              setTimeout(() => { navigate('/checkout') }, 300);
            }}
          >
            Checkout Now
          </button>
          <button
            onClick={onClose}
            className="w-full bg-transparent border border-[#4A2C1D] text-[#4A2C1D] py-3 rounded-full font-serif italic hover:bg-[#4A2C1D] hover:text-white transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;