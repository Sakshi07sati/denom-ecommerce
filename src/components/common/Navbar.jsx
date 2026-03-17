// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = ({ searchQuery, setSearchQuery, onShowLogin }) => {
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const wishlistItems = useSelector((state) => state.wishlist.items);

//   const products = useSelector((state) => state.products.products);
//   const cartItems = useSelector((state) => state.cart.items);
//   const navigate = useNavigate();

//   const suggestions = products
//     .filter((product) => {
//       const query = searchQuery?.toLowerCase() || "";

//       return (
//         product.title.toLowerCase().includes(query) ||
//         (product.brand && product.brand.toLowerCase().includes(query)) ||
//         (product.category && product.category.toLowerCase().includes(query))
//       );
//     })
//     .slice(0, 5);
//   const handleSelectSuggestion = (product) => {
//     setSearchQuery(product.title);
//     setShowSuggestions(false);
//     navigate(`/product/${product.id}`);
//   };
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       const value = e.target.value.toLowerCase();

//       const matchedProduct = products.find((product) =>
//         product.title.toLowerCase().includes(value) ||
//         (product.brand && product.brand.toLowerCase().includes(value)) ||
//         (product.category && product.category.toLowerCase().includes(value))
//       );

//       setShowSuggestions(false);

//       if (matchedProduct) {
//         navigate(`/product/${matchedProduct.id}`);
//       } else {
//         navigate(`/shop?search=${value}`);
//       }
//     }
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };
//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-2 sm:px-4 md:px-8  py-4 bg-[#FAF8F1] text-white pointer-events-auto">
//       <div className="flex items-center gap-2 sm:text-xl ">
//         <span className="text-2xl font-semibold text-[#be9b7b] tracking-wide"><span className='text-4xl font-bold text-[#4A2C1D]  border-t-2 border-[#4A2C1D] rounded-full '>S</span>aenom</span>
//       </div>
//       <div className="hidden md:flex gap-8 font-medium">
//         <Link to="/" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">Home</Link>
//         <Link to="/about" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">About</Link>
//         <Link to="/shop" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">Shop</Link>
//         <Link to="/contact" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">Contact Us</Link>
//       </div>


//       <div className="flex items-center gap-2 md:gap-4 ">
//         <div className="relative ">
//           <input
//             type="text"
//             placeholder="Search what you want..."
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setShowSuggestions(true);
//             }}
//             onFocus={() => setShowSuggestions(true)}
//             onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
//             onKeyDown={handleKeyDown}
//             className="bg-[#EAE3D2] bg-opacity-80 rounded-full px-4 py-1.5 pl-10 text-sm text-[#4A2C1D] placeholder-[#4A2C1D] focus:outline w-32 sm:w-48"
//           />
//           <Search className="absolute left-3 top-2 w-4 h-4 text-[#4A2C1D]" />
//           {showSuggestions && searchQuery && suggestions.length > 0 && (
//             <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
//               {suggestions.map((product) => (
//                 <div
//                   key={product.id}
//                   onMouseDown={() => handleSelectSuggestion(product)}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#4A2C1D] text-sm"
//                 >
//                   {product.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={toggleMobileMenu}
//           className="md:hidden p-2 rounded-full hover:bg-[#EAE3D2] transition"
//         >
//           {isMobileMenuOpen ? (
//             <X className="w-5 h-5 text-[#4A2C1D]" />
//           ) : (
//             <Menu className="w-5 h-5 text-[#4A2C1D]" />
//           )}
//         </button>
//         <div className="flex items-center gap-2">
//           <div className=" bg-[#4A2C1D] p-1.5 sm:p-2 rounded-full cursor-pointer" onClick={onShowLogin}>
//             <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAF8F1]" />
//           </div>

//           <div className=" relative cursor-pointer"  onClick={() => navigate('/cart')}>
//             <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A2C1D]" />
//             {cartItems.length > 0 && (
//               <span className="absolute -top-3 -right-1 text-[8px] sm:text-[10px] bg-[#A78BFA] text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
//                 {cartItems.reduce((total, item) => total + item.quantity, 0)}
//               </span>
//             )}
//           </div>

//           <div className="relative">
//             <Link to="/wishlist">
//               <Heart size={28} className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A2C1D]" />

//               {wishlistItems.length > 0 && (
//                 <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs px-2 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
//                   {wishlistItems.length}
//                 </span>
//               )}

//             </Link>
//           </div>

//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 top-20 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu}>
//           <div className="bg-[#FAF8F1] w-full h-full pt-8">
//             <div className="flex flex-col items-center space-y-8">
//               <Link
//                 to="/"
//                 className="text-[#4A2C1D] hover:text-[#be9b7b] transition text-xl font-medium"
//                 onClick={closeMobileMenu}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/about"
//                 className="text-[#4A2C1D] hover:text-[#be9b7b] transition text-xl font-medium"
//                 onClick={closeMobileMenu}
//               >
//                 About
//               </Link>
//               <Link
//                 to="/shop"
//                 className="text-[#4A2C1D] hover:text-[#be9b7b] transition text-xl font-medium"
//                 onClick={closeMobileMenu}
//               >
//                 Shop
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-[#4A2C1D] hover:text-[#be9b7b] transition text-xl font-medium"
//                 onClick={closeMobileMenu}
//               >
//                 Contact Us
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };
// export default Navbar;
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = ({ searchQuery, setSearchQuery, onShowLogin }) => {
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const wishlistItems = useSelector((state) => state.wishlist.items);

//   const products = useSelector((state) => state.products.products);
//   const cartItems = useSelector((state) => state.cart.items);
//   const navigate = useNavigate();

//   const suggestions = products
//     .filter((product) => {
//       const query = searchQuery?.toLowerCase() || "";
//       return (
//         product.title.toLowerCase().includes(query) ||
//         (product.brand && product.brand.toLowerCase().includes(query)) ||
//         (product.category && product.category.toLowerCase().includes(query))
//       );
//     })
//     .slice(0, 5);

//   const handleSelectSuggestion = (product) => {
//     setSearchQuery(product.title);
//     setShowSuggestions(false);
//     navigate(`/product/${product.id}`);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       const value = e.target.value.toLowerCase();
//       const matchedProduct = products.find((product) =>
//         product.title.toLowerCase().includes(value) ||
//         (product.brand && product.brand.toLowerCase().includes(value)) ||
//         (product.category && product.category.toLowerCase().includes(value))
//       );

//       setShowSuggestions(false);

//       if (matchedProduct) {
//         navigate(`/product/${matchedProduct.id}`);
//       } else {
//         navigate(`/shop?search=${value}`);
//       }
//     }
//   };

//   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
//   const closeMobileMenu = () => setIsMobileMenuOpen(false);

//   return (
//     <nav className="fixed top-0 left-0 w-full z-[100] bg-[#FAF8F1] text-white pointer-events-auto">
      
//       {/* --- TOP ROW (Your exact original layout) --- */}
//       <div className="flex items-center justify-between px-2 sm:px-4 md:px-8 py-4">
        
//         {/* Logo */}
//         <div className="flex items-center gap-2 sm:text-xl ">
//           <span className="text-2xl font-semibold text-[#be9b7b] tracking-wide">
//             <span className='text-4xl font-bold text-[#4A2C1D] border-t-2 border-[#4A2C1D] rounded-full '>S</span>aenom
//           </span>
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex gap-8 font-medium">
//           <Link to="/" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">Home</Link>
//           <Link to="/about" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">About</Link>
//           <Link to="/shop" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">Shop</Link>
//           <Link to="/contact" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">Contact Us</Link>
//         </div>

//         {/* Right Side Icons & Desktop Search */}
//         <div className="flex items-center gap-2 md:gap-4 ">
          
//           {/* DESKTOP SEARCH (Hidden on Mobile) */}
//           <div className="relative hidden md:block">
//             <input
//               type="text"
//               placeholder="Search what you want..."
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setShowSuggestions(true);
//               }}
//               onFocus={() => setShowSuggestions(true)}
//               onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
//               onKeyDown={handleKeyDown}
//               className="bg-[#EAE3D2] bg-opacity-80 rounded-full px-4 py-1.5 pl-10 text-sm text-[#4A2C1D] placeholder-[#4A2C1D] focus:outline w-32 sm:w-48"
//             />
//             <Search className="absolute left-3 top-2 w-4 h-4 text-[#4A2C1D]" />
//             {showSuggestions && searchQuery && suggestions.length > 0 && (
//               <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
//                 {suggestions.map((product) => (
//                   <div
//                     key={product.id}
//                     onMouseDown={() => handleSelectSuggestion(product)}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#4A2C1D] text-sm"
//                   >
//                     {product.title}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={toggleMobileMenu}
//             className="md:hidden p-2 rounded-full hover:bg-[#EAE3D2] transition"
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-5 h-5 text-[#4A2C1D]" />
//             ) : (
//               <Menu className="w-5 h-5 text-[#4A2C1D]" />
//             )}
//           </button>

//           {/* User, Cart, Wishlist Icons (Exactly as you styled them) */}
//           <div className="flex items-center gap-2">
//             <div className=" bg-[#4A2C1D] p-1.5 sm:p-2 rounded-full cursor-pointer" onClick={onShowLogin}>
//               <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAF8F1]" />
//             </div>

//             <div className=" relative cursor-pointer"  onClick={() => navigate('/cart')}>
//               <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A2C1D]" />
//               {cartItems.length > 0 && (
//                 <span className="absolute -top-3 -right-1 text-[8px] sm:text-[10px] bg-[#A78BFA] text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
//                   {cartItems.reduce((total, item) => total + item.quantity, 0)}
//                 </span>
//               )}
//             </div>

//             <div className="relative">
//               <Link to="/wishlist">
//                 <Heart size={28} className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A2C1D]" />
//                 {wishlistItems.length > 0 && (
//                   <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs px-2 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
//                     {wishlistItems.length}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- MOBILE SEARCH ROW (Only shows on mobile, below navbar) --- */}
//       <div className="md:hidden w-full px-4 pb-3">
//         <div className="relative w-full">
//           <input
//             type="text"
//             placeholder="Search what you want..."
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setShowSuggestions(true);
//             }}
//             onFocus={() => setShowSuggestions(true)}
//             onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
//             onKeyDown={handleKeyDown}
//             className="bg-[#EAE3D2] bg-opacity-80 rounded-full px-4 py-2 pl-10 text-sm text-[#4A2C1D] placeholder-[#4A2C1D] focus:outline w-full"
//           />
//           <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#4A2C1D]" />
          
//           {/* Mobile Suggestions */}
//           {showSuggestions && searchQuery && suggestions.length > 0 && (
//             <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
//               {suggestions.map((product) => (
//                 <div
//                   key={product.id}
//                   onMouseDown={() => handleSelectSuggestion(product)}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#4A2C1D] text-sm"
//                 >
//                   {product.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 top-[115px] bg-black bg-opacity-50 z-40" onClick={closeMobileMenu}>
//           <div className="bg-[#FAF8F1] w-full pt-8 pb-8">
//             <div className="flex flex-col items-center space-y-8">
//               <Link to="/" className="text-[#4A2C1D] hover:text-[#be9b7b] transition text-xl font-medium" onClick={closeMobileMenu}>Home</Link>
//               <Link to="/about" className="text-[#4A2C1D] hover:text-[#be9b7b] transition text-xl font-medium" onClick={closeMobileMenu}>About</Link>
//               <Link to="/shop" className="text-[#4A2C1D] hover:text-[#be9b7b] transition text-xl font-medium" onClick={closeMobileMenu}>Shop</Link>
//               <Link to="/contact" className="text-[#4A2C1D] hover:text-[#be9b7b] transition text-xl font-medium" onClick={closeMobileMenu}>Contact Us</Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import { useState } from "react";
import { useSelector } from "react-redux";
import { Search, User, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ searchQuery, setSearchQuery, onShowLogin }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();

  const suggestions = products
    .filter((product) => {
      const query = searchQuery?.toLowerCase() || "";
      return (
        product.title.toLowerCase().includes(query) ||
        (product.brand && product.brand.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
    })
    .slice(0, 5);

  const handleSelectSuggestion = (product) => {
    setSearchQuery(product.title);
    setShowSuggestions(false);
    setShowMobileSearch(false);
    navigate(`/product/${product.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.toLowerCase();
      const matchedProduct = products.find(
        (product) =>
          product.title.toLowerCase().includes(value) ||
          (product.brand && product.brand.toLowerCase().includes(value)) ||
          (product.category && product.category.toLowerCase().includes(value))
      );

      setShowSuggestions(false);
      setShowMobileSearch(false);

      if (matchedProduct) {
        navigate(`/product/${matchedProduct.id}`);
      } else {
        navigate(`/shop?search=${value}`);
      }
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#FAF8F1] text-white">

        {/* TOP ROW */}
        <div className="flex items-center justify-between px-2 sm:px-4 md:px-8 py-4">

          {/* Logo */}
          <div className="flex items-center gap-2 sm:text-xl">
            <span className="text-2xl font-semibold text-[#be9b7b] tracking-wide">
              <span className="text-4xl font-bold text-[#4A2C1D] border-t-2 border-[#4A2C1D] rounded-full">
                S
              </span>
              aenom
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 font-medium">
            <Link to="/" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">
              Home
            </Link>
            <Link to="/about" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">
              About
            </Link>
            <Link to="/shop" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">
              Shop
            </Link>
            <Link to="/contact" className="text-[#4A2C1D] hover:text-[#be9b7b] transition">
              Contact Us
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Desktop Search */}
            <div className="relative hidden md:block">
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
                className="bg-[#EAE3D2] rounded-full px-4 py-1.5 pl-10 text-sm text-[#4A2C1D] w-32 sm:w-48 focus:outline"
              />
              <Search className="absolute left-3 top-2 w-4 h-4 text-[#4A2C1D]" />

              {showSuggestions && searchQuery && suggestions.length > 0 && (
                <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  {suggestions.map((product) => (
                    <div
                      key={product.id}
                      onMouseDown={() => handleSelectSuggestion(product)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#4A2C1D] text-sm"
                    >
                      {product.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setShowMobileSearch(true)}
              className="md:hidden p-2 rounded-full hover:bg-[#EAE3D2]"
            >
              <Search className="w-5 h-5 text-[#4A2C1D]" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-[#EAE3D2]"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#4A2C1D]" />
              ) : (
                <Menu className="w-5 h-5 text-[#4A2C1D]" />
              )}
            </button>

            {/* User */}
            <div
              className="bg-[#4A2C1D] p-1.5 sm:p-2 rounded-full cursor-pointer"
              onClick={onShowLogin}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAF8F1]" />
            </div>

            {/* Cart */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A2C1D]" />

              {cartItems.length > 0 && (
                <span className="absolute -top-3 -right-1 text-[10px] bg-[#A78BFA] text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>

            {/* Wishlist */}
            <div className="relative">
              <Link to="/wishlist">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A2C1D]" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 top-[70px] bg-black bg-opacity-70"
            onClick={closeMobileMenu}
          >
            <div className="bg-[#EAE3D2] w-full pt-8 pb-8">
              <div className="flex flex-col items-center space-y-8">
                <Link to="/" onClick={closeMobileMenu} className="text-[#4A2C1D] text-xl">
                  Home
                </Link>
                <Link to="/about" onClick={closeMobileMenu} className="text-[#4A2C1D] text-xl">
                  About
                </Link>
                <Link to="/shop" onClick={closeMobileMenu} className="text-[#4A2C1D] text-xl">
                  Shop
                </Link>
                <Link to="/contact" onClick={closeMobileMenu} className="text-[#4A2C1D] text-xl">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* MOBILE SEARCH OVERLAY */}
      {showMobileSearch && (
        <div className="md:hidden fixed top-0 left-0 w-full bg-[#FAF8F1] z-[200] p-4 shadow-md ">
          <div className="relative flex items-center">

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
              className="bg-[#EAE3D2] rounded-full px-4 py-2 pl-10 text-sm text-[#4A2C1D] w-full focus:outline"
            />

            <Search className="absolute left-3 w-4 h-4 text-[#4A2C1D]" />

            <button
              onClick={() => setShowMobileSearch(false)}
              className="ml-3"
            >
              <X className="w-5 h-5 text-[#4A2C1D]" />
            </button>
          </div>

          {showSuggestions && searchQuery && suggestions.length > 0 && (
            <div className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  onMouseDown={() => handleSelectSuggestion(product)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#4A2C1D] text-sm"
                >
                  {product.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;