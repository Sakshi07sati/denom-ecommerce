import { useState } from 'react';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'; 

const Navbar = ({ searchQuery, setSearchQuery, onShowCart, onShowLogin }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.items);

  const suggestions = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSuggestion = (title) => {
    setSearchQuery(title);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.target.value);
      setShowSuggestions(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-[#FAF8F1] text-white">
      <div className="flex items-center gap-2">       
    <span className="text-2xl font-semibold text-[#be9b7b] tracking-wide"><span className='text-4xl font-bold text-[#4A2C1D]  border-t-2 border-[#4A2C1D] rounded-full '>S</span>aenom</span> 
      </div>
      <div className="hidden md:flex gap-8 font-medium">
        <a href="#home" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">Home</a>
        <a href="#about" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">About</a>
        <a href="#shop" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">Shop</a>
        <a href="#contact" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">Contact Us</a>
      </div>

    
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search what you want..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={handleKeyDown}
            className="bg-[#EAE3D2] bg-opacity-80 rounded-full px-4 py-1.5 pl-10 text-sm text-[#4A2C1D] placeholder-[#4A2C1D] focus:outline w-48"
          />
          <Search className="absolute left-3 top-2 w-4 h-4 text-[#4A2C1D]" />
          {showSuggestions && searchQuery && suggestions.length > 0 && (
            <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectSuggestion(product.title)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#4A2C1D] text-sm"
                >
                  {product.title}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-full hover:bg-[#EAE3D2] transition"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-[#4A2C1D]" />
          ) : (
            <Menu className="w-5 h-5 text-[#4A2C1D]" />
          )}
        </button>

        <div className="bg-[#4A2C1D] p-2 rounded-full cursor-pointer" onClick={onShowLogin}>
          <User className="w-5 h-5 text-[#FAF8F1]" />
        </div>

        <div className="relative cursor-pointer" onClick={onShowCart}>
          <ShoppingBag className="w-6 h-6 text-[#4A2C1D]" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] bg-[#A78BFA] text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu}>
          <div className="bg-[#FAF8F1] w-full h-full pt-8">
            <div className="flex flex-col items-center space-y-8">
              <a
                to="#home" 
                className="text-[#4A2C1D] hover:text-[#be9b7b] transition text-xl font-medium"
                onClick={closeMobileMenu}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="text-[#4A2C1D] hover:text-[#be9b7b] transition text-xl font-medium"
                onClick={closeMobileMenu}
              >
                About
              </a>
              <a 
                href="#shop" 
                className="text-[#4A2C1D] hover:text-[#be9b7b] transition text-xl font-medium"
                onClick={closeMobileMenu}
              >
                Shop
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;