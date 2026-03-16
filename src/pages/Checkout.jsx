import React, { useState } from 'react';
import { useSelector } from "react-redux";
import PaymentModal from '../components/modal/PaymentModal';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const [showPayment, setShowPayment] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: ""
  });

  const [savedAddress, setSavedAddress] = useState(() => {
    const stored = localStorage.getItem("shippingAddress");
    return stored ? JSON.parse(stored) : null;
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = () => {
    // Basic validation
    if (!form.name || !form.address || !form.phone) return alert("Please fill in required fields");
    
    localStorage.setItem("shippingAddress", JSON.stringify(form));
    setSavedAddress(form);
  };

  const handleEditAddress = () => {
    setForm(savedAddress); // Fill form with current data
    setSavedAddress(null); // Switch view back to form
  };

  const handleDeleteAddress = () => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      localStorage.removeItem("shippingAddress");
      setSavedAddress(null);
      setForm({ name: "", email: "",phone: "", address: "", city: "", postal: "" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto p-4 md:p-10">
        <h1 className="text-3xl font-serif mb-8 text-gray-800">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Shipping details */}
          <div className="flex-1 space-y-6">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">1</span>
                  Shipping Address
                </h2>
              </div>

              {savedAddress ? (
                <div className=" p-5 rounded-xl bg-orange-50/30 relative group">
                  <div className="space-y-1 text-gray-700">
                    <p className=" text-lg text-gray-900">{savedAddress.name}</p>
                    <p>{savedAddress.email}</p>
                    <p>{savedAddress.phone}</p>
                    <p>{savedAddress.address}</p>
                    <p>{savedAddress.city}, {savedAddress.postal}</p>
                  </div>

                  <div className="mt-6 flex gap-4 border-t pt-4">
                    <button
                      onClick={handleEditAddress}
                      className="text-sm font-semibold text-brown-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      Edit Details
                    </button>
                    <button
                      onClick={handleDeleteAddress}
                      className="text-sm font-semibold text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A2C1D] outline-none transition-all"
                  />
                  <input
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A2C1D] outline-none"
                  />
                    <input
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A2C1D] outline-none"
                  />
                  <input
                    name="address"
                    placeholder="Street Address"
                    value={form.address}
                    onChange={handleChange}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A2C1D] outline-none md:col-span-2"
                  />
                  <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A2C1D] outline-none"
                  />
                  <input
                    name="postal"
                    placeholder="Postal Code"
                    value={form.postal}
                    onChange={handleChange}
                    className="border p-3 rounded-lg focus:ring-2 focus:ring-[#4A2C1D] outline-none"
                  />
                  <button
                    onClick={handleSaveAddress}
                    className="md:col-span-2 bg-[#4A2C1D] text-white font-bold py-3 rounded-lg transition-transform active:scale-[0.98]"
                  >
                    Deliver to this Address
                  </button>
                </div>
              )}
            </section>

            {/* <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 opacity-50">
               <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="bg-gray-300 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">2</span>
                  Payment Method
                </h2>
                <p className="text-sm text-gray-500 mt-2">Complete shipping info to unlock payment.</p>
            </section> */}
          </div>

          {/* RIGHT COLUMN: Order Summary (Sticky) */}
          <div className="lg:w-[500px] ">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-10">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>

              <div className="max-h-[30vh] overflow-y-auto mb-6 space-y-4 pr-2 custom-scrollbar">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-start gap-4">
                    <div className="text-sm">
                      <p className="font-medium text-gray-800 line-clamp-1">{item.product.title}</p>
                      <p className="text-gray-500 font-mono">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-700">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cart.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">₹50.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{(cart.total * 0.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-gray-900 pt-2 border-t border-dashed">
                  <span>Total</span>
                  <span>₹{(cart.total + 50 + cart.total * 0.18).toLocaleString()}</span>
                </div>
              </div>

              <button
                disabled={!savedAddress}
                onClick={() => setShowPayment(true)}
                className={`mt-6 w-full py-2 rounded-xl font-bold text-md shadow-lg transition-all 
                  ${savedAddress 
                    ? 'bg-[#4A2C1D] text-white hover:bg-[#be9b7b] transform hover:-transform-105 active:scale-95' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                {savedAddress ? 'Confirm Order' : 'Complete Address First'}
              </button>
              
            </div>
          </div>

        </div>
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        orderDetails={{
          subtotal: cart.total,
          discount: 0,
          shipping: 50,
          tax: cart.total * 0.18,
          total: cart.total + 50 + cart.total * 0.18
        }}
      />
    </div>
  );
};

export default Checkout;