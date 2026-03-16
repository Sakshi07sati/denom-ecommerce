import React from 'react';
import { Facebook, Youtube, Instagram } from 'lucide-react';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#4A2C1D] text-white py-16 px-8 font-sans justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 ">
          
          {/* Column 1: Brand & Address */}
          <div className="space-y-8">
           <div className="flex items-center gap-2">
        <span className="text-4xl font-semibold text-[#be9b7b] tracking-wide"><span className='text-6xl font-bold text-[#be9b7b]  border-t-2 border-[#be9b7b] rounded-full '>S</span>aenom</span>
      </div>
            <div className="flex gap-4">
              <Facebook className="w-6 h-6 cursor-pointer hover:text-[#be9b7b] transition" />
              <Youtube className="w-6 h-6 cursor-pointer hover:text-[#be9b7b] transition" />
              <Instagram className="w-6 h-6 cursor-pointer hover:text-[#be9b7b] transition" />
            </div>
            <div className="text-gray-200 text-xs leading-loose uppercase tracking-widest">
              <p>Saenom Private Ltd</p>
              <p>Building No.: D-257, Sector 63,</p>
              <p>Marathalli Bridge, walkside street,</p>
              <p>Bengaluru, 201301</p>
            </div>
          </div>

          {/* Column 2: Shop Links */}
         
          <div>
            <h3 className="text-[#be9b7b] font-bold text-xl mb-8">Shop</h3>
            <div className="grid grid-cols-2 gap-2 text-md font-sm">
              <Link to="/FeaturedCollection" className="hover:underline">New Arrivals</Link>
              <Link to="/fashion" className="hover:underline">Fashion</Link>
              <Link to="/groceries" className="hover:underline">Groceries</Link>
              <Link to="/beauty" className="hover:underline">Beauty</Link>
              <Link to="/perfume" className="hover:underline">Perfume</Link>
              <Link to="/furniture" className="hover:underline">Furniture</Link>
            </div>
          </div>

          {/* Column 3 & 4: Support & Info */}
          <div className="md:col-span-2">
            <h3 className="text-[#be9b7b] font-bold text-xl mb-8">Support</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm font-medium">
              <a href="#" className="hover:underline">Return & Exchange Policy</a>
              <a href="#" className="hover:underline">Shipping</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">FAQ</a>
              <Link to="/about" className="hover:underline">About Us</Link>
              <a href="#" className="hover:underline">Support</a>
            </div>
         
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-2 items-center">
            {/* Payment Icons Placeholder - Using styled spans to mimic logos */}
            <div className="bg-white px-2 py-1 rounded-sm text-blue-800 font-bold italic text-xs">VISA</div>
            <div className="bg-white px-2 py-1 rounded-sm text-red-600 font-bold italic text-xs">Mastercard</div>
            <div className="bg-white px-2 py-1 rounded-sm text-blue-500 font-bold italic text-xs">Paytm</div>
            <div className="bg-white px-2 py-1 rounded-sm text-orange-500 font-bold italic text-xs">RuPay</div>
          </div>
          <p className="text-[#be9b7b] text-[12px] uppercase tracking-widest text-center md:text-right">
            © 2026 Saenom Private Limited. All rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;