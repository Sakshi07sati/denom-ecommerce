import React, { useState } from 'react';
import toast from 'react-hot-toast';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (formData.email && formData.password) {
        toast.success('Logged in successfully!');
        onClose();
      } else {
        toast.error('Please fill all fields');
      }
    } else {
      if (formData.name && formData.email && formData.password && formData.confirmPassword) {
        if (formData.password === formData.confirmPassword) {
          toast.success('Account created successfully!');
          onClose();
        } else {
          toast.error('Passwords do not match');
        }
      } else {
        toast.error('Please fill all fields');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#4A2C1D] hover:text-[#be9b7b] text-2xl font-bold z-10"
        >
          ×
        </button>

        <div className="p-8 pt-12">
          {/* 1. BRAND LOGO */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-2xl font-semibold text-[#be9b7b] tracking-wide">
              <span className='text-4xl font-bold text-[#4A2C1D] border-t-2 border-[#4A2C1D] rounded-full'>S</span>aenom
            </span>
          </div>

          {/* 2. LOGIN CARD */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif text-[#4A2C1D] mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600 text-sm">
              {isLogin ? 'Sign in to your account' : 'Join our vintage fashion community'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#4A2C1D] mb-2 text-left">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#4A2C1D] mb-2 text-left">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#4A2C1D] mb-2 text-left">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:border-transparent"
                placeholder="Your password"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#4A2C1D] mb-2 text-left">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:border-transparent"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#4A2C1D] text-white py-3 rounded-lg font-medium hover:bg-[#be9b7b] transition"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#A78BFA] hover:text-[#8B5CF6] transition text-sm"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
       