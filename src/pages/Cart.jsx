import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useScrollToTop } from '../hooks/useScrollToTop';

const Cart = ({ onClose }) => {
  useScrollToTop();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
      <div className="p-8 text-center">
        <ShoppingBag size={64} className="text-[#be9b7b] mx-auto mb-6" />
        <h2 className="text-3xl font-serif text-[#4A2C1D] mb-4">Your cart is empty</h2>
        <p className="text-[#4A2C1D]/70 mb-8">Add some vintage finds to get started!</p>
        <button 
          onClick={onClose}
          className="bg-[#be9b7b] text-white px-8 py-3 rounded-full font-serif italic hover:bg-[#4A2C1D] hover:text-white transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-800 font-medium flex items-center gap-2"
          >
            <Trash2 size={20} />
            Clear Cart
          </button>
        </div>

        <div className="space-y-6 mb-8">
          {cart.items.map((item) => (
            <div key={item.product.id} className="bg-[#EAE3D2] rounded-lg p-4 flex items-center gap-4">
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-lg font-serif text-[#4A2C1D] mb-1">{item.product.title}</h3>
                <p className="text-sm text-[#4A2C1D]/70 mb-2">{item.product.brand}</p>
                <p className="text-[#4A2C1D] font-bold">₹{item.product.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-[#4A2C1D]/20 flex items-center justify-center hover:bg-[#be9b7b] transition"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-[#4A2C1D]/20 flex items-center justify-center hover:bg-[#be9b7b] transition"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-[#4A2C1D]">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => handleRemoveItem(item.product.id)}
                  className="text-red-600 hover:text-red-800 mt-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#EAE3D2] rounded-lg p-6">
          <div className="flex justify-between items-center text-xl font-bold text-[#4A2C1D] mb-6">
            <span>Total:</span>
            <span>₹{cart.total.toFixed(2)}</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-[#be9b7b] text-[#4A2C1D] px-6 py-3 rounded-full font-serif italic hover:bg-[#4A2C1D] hover:text-white transition"
            >
              Continue Shopping
            </button>
            <button className="flex-1 bg-[#4A2C1D] text-white px-6 py-3 rounded-full font-serif italic hover:bg-[#be9b7b] transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;