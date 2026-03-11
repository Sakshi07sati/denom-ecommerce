import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#be9b7b] text-[#4A2C1D] py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl font-semibold tracking-wide">
            <span className='text-5xl font-bold text-[#4A2C1D] border-t-2 border-[#4A2C1D] rounded-full'>S</span>aenom
          </span>
        </div>

       
        <p className="text-center text-sm text-[#4A2C1D]">
          © 2026 Saenom. Curated Vintage Fashion.
        </p>

      
        <div className="flex space-x-6">
          <a href="#" className="text-[#4A2C1D] hover:text-[#A78BFA] transition">
            Privacy Policy
          </a>
          <a href="#" className="text-[#4A2C1D] hover:text-[#A78BFA] transition">
            Terms of Service
          </a>
          <a href="#" className="text-[#4A2C1D] hover:text-[#A78BFA] transition">
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;