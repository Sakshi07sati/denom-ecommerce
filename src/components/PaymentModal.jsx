import React, { useState } from 'react';
import { X, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentModal = ({ isOpen, onClose, orderDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    // Format expiry date
    if (name === 'expiryDate') {
      formatted = value.replace(/\D/g, '');
      if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2, 4);
      }
    }
    // Format CVV (numbers only)
    if (name === 'cvv') {
      formatted = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData({ ...formData, [name]: formatted });
  };

  const validateForm = () => {
    if (!formData.cardHolder.trim()) {
      toast.error('Please enter cardholder name');
      return false;
    }
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      toast.error('Please enter a valid 16-digit card number');
      return false;
    }
    if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      toast.error('Please enter expiry date in MM/YY format');
      return false;
    }
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      toast.error('Please enter a valid CVV');
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      toast.success('Payment successful! Order confirmed.');
      
      setTimeout(() => {
        setPaymentSuccess(false);
        setFormData({
          cardHolder: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          email: '',
          phone: ''
        });
        onClose();
      }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B6F47] to-[#6B5436] p-6 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-serif text-white">Complete Payment</h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-white hover:bg-white/20 p-2 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Success State */}
          {paymentSuccess ? (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle size={64} className="text-green-500 mb-4" />
              <h3 className="text-2xl font-serif text-[#4A2C1D] mb-2">Payment Successful!</h3>
              <p className="text-gray-600 text-center">Your order has been confirmed. Check your email for order details.</p>
            </div>
          ) : (
            <>
              {/* Order Summary */}
              <div className="bg-[#F5E6D3] p-4 rounded-lg mb-6">
                <h3 className="font-medium text-[#4A2C1D] mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B5436]">Subtotal</span>
                    <span className="font-medium">₹{(orderDetails?.subtotal || 0).toFixed(2)}</span>
                  </div>
                  {orderDetails?.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{orderDetails.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#6B5436]">Shipping</span>
                    <span className="font-medium">₹{(orderDetails?.shipping || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B5436]">Tax</span>
                    <span className="font-medium">₹{(orderDetails?.tax || 0).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#D4A574] pt-2 mt-2 flex justify-between font-bold text-[#4A2C1D] text-base">
                    <span>Total</span>
                    <span className="text-[#8B6F47]">₹{(orderDetails?.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h3 className="font-medium text-[#4A2C1D] mb-3">Payment Method</h3>
                <div className="space-y-2">
                  {['card', 'upi', 'netbanking'].map(method => (
                    <label key={method} className="flex items-center p-3 border border-[#D4A574] rounded-lg cursor-pointer hover:bg-[#F5E6D3] transition">
                      <input
                        type="radio"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 accent-[#8B6F47]"
                      />
                      <span className="ml-3 font-medium text-[#6B5436] capitalize">{method === 'card' ? 'Debit/Credit Card' : method === 'upi' ? 'UPI' : 'Net Banking'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[#6B5436] mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardHolder"
                      placeholder="John Doe"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      disabled={isProcessing}
                      className="w-full px-4 py-2 border border-[#D4A574] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] disabled:bg-[#FAF4E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#6B5436] mb-2">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength="19"
                        disabled={isProcessing}
                        className="w-full px-4 py-2 border border-[#D4A574] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] disabled:bg-[#FAF4E8]"
                      />
                      <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B8B75]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#6B5436] mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        disabled={isProcessing}
                        className="w-full px-4 py-2 border border-[#D4A574] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] disabled:bg-[#FAF4E8]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B5436] mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        disabled={isProcessing}
                        className="w-full px-4 py-2 border border-[#D4A574] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] disabled:bg-[#FAF4E8]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#6B5436] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isProcessing}
                    className="w-full px-4 py-2 border border-[#D4A574] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] disabled:bg-[#FAF4E8]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B5436] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isProcessing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A78BFA] disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-2 p-3 bg-[#F5E6D3] border border-[#D4A574] rounded-lg mb-6">
                <AlertCircle size={16} className="text-[#8B6F47] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#6B5436]">Your payment information is secure and encrypted.</p>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg font-serif italic text-lg transition flex items-center justify-center gap-2 ${
                  isProcessing
                    ? 'bg-[#D4A574] text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#8B6F47] to-[#6B5436] text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Pay ₹{(orderDetails?.total || 0).toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-xs text-[#A0927C] text-center mt-4">
                This is a demo payment. No actual charges will be made.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
