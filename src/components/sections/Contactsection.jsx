import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useScrollToTop } from '../../hooks/useScrollToTop';

const ContactUs = () => {
  useScrollToTop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="bg-[#FDFCF0] py-20 px-8 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
      
        <div className="lg:w-1/2 relative">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-sm shadow-xl">
            <img 
              src="https://i.pinimg.com/736x/f0/cd/f5/f0cdf507c6466a8777e67677e29a17f5.jpg" 
              alt="Contact Us" 
              className="w-full h-full object-cover"
            />
          </div>
         
          <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#A78BFA]/20 -z-10"></div>
        </div>
    {/* contactform */}
        <div className="lg:w-1/2 space-y-8">
          <h2 className="text-5xl md:text-6xl font-serif text-[#4A2C1D]">
            Get In Touch
          </h2>
          
          <p className="text-gray-800 leading-relaxed text-md max-w-xl">
            Have questions about our vintage collection or need assistance? 
            We'd love to hear from you. Send us a message and we'll get back to you soon.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:border-transparent"
              placeholder="Your Name"
            />

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

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:border-transparent resize-none"
              placeholder="Your message..."
            />

            <button
              type="submit"
              className="bg-[#4A2C1D] text-white px-10 py-3.5 rounded-full font-medium tracking-wide hover:bg-[#EAE3D2] hover:text-[#4A2C1D] transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;