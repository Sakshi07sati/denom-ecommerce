// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toggleWishlist } from '../../store/wishlistSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import { addToCart } from '../../store/cartSlice';
// import { ArrowLeft, ShoppingCart, Star, Heart, CreditCard, Check, ShieldCheck, RefreshCcw, Truck } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { useScrollToTop } from '../../hooks/useScrollToTop';
// import ReviewSection from './ReviewSection';
// import PaymentModal from '../../components/modal/PaymentModal';
// import ProductSpecification from './ProductSpecification';
// import ProductGallery from './ProductGallery';

// const ProductDetail = () => {
//   useScrollToTop();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(1);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [IsGalleryOpen, setIsGalleryOpen] = useState(false);

//   const products = useSelector((state) => state.products.products);
//   const cartItems = useSelector((state) => state.cart.items);
//   const product = products.find(p => p.id === parseInt(id));
//   const wishlist = useSelector((state) => state.wishlist.items);


//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center">
//           <h2 className="text-2xl font-serif text-[#4A2C1D] mb-4">Product not found</h2>
//           <button onClick={() => navigate('/')} className="text-[#8B6F47] underline">Back to Shop</button>
//         </div>
//       </div>
//     );
//   }

//   const isInCart = cartItems.some(item => item.product.id === product.id);
//   const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
//   const discountAmount = (originalPrice - product.price).toFixed(2);

//   const handleToggleWishlist = (id) => {
//     dispatch(toggleWishlist(id));
//   };

//   const handleAddToCart = () => {
//     dispatch(addToCart({ product }));
//     toast.success(`${product.title} added to cart!`);
//   };

//   const calculateOrderDetails = () => {
//     const subtotal = product.price * quantity;
//     const shipping = subtotal > 500 ? 0 : 50;
//     const tax = subtotal * 0.18;
//     return { subtotal, discount: discountAmount * quantity, shipping, tax, total: subtotal + shipping + tax };
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Breadcrumb / Back Button */}
//       <div className="max-w-7xl mx-auto pt-4 px-4 md:px-8">
//         <button
//           onClick={() => navigate('/shop')}
//           className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-[#8B6F47] transition mb-8"
//         >
//           <ArrowLeft size={14} /> Back to Collection
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">


//           <div className="lg:col-span-7">
//             <div className="sticky top-24">
//               <ProductGallery product={product} onOpenChange={setIsGalleryOpen} />
//             </div>
//           </div>


//           <div className="lg:col-span-5 space-y-8">
//             <header className="border-b border-gray-100 pb-6">
//               <h2 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-2 font-medium">
//                 {product.brand || "Exclusive Collection"}
//               </h2>
//               <h1 className="lg:text-3xl text-2xl  font-serif text-[#4A2C1D] leading-tight mb-3">
//                 {product.title}
//               </h1>

//               <div className="flex items-center gap-4">
//                 <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
//                   <span className="text-sm font-bold mr-1">{product.rating}</span>
//                   <Star size={14} fill="#8B6F47" className="text-[#8B6F47]" />
//                   <span className="mx-2 text-gray-300">|</span>
//                   <span className="text-xs text-gray-500 uppercase">Verified Reviews</span>
//                 </div>
//               </div>
//             </header>

//             {/* Pricing Section */}
//             <div className="space-y-1">
//               <div className="flex items-center gap-3">
//                 <span className="lg:text-3xl text-2xl font-semibold text-[#2d2019]">₹{product.price.toFixed(2)}</span>
//                 {product.discountPercentage && (
//                   <span className="text-xl text-gray-400 line-through font-light">₹{originalPrice}</span>
//                 )}
//                 <span className="text-[#8B6F47] font-medium ml-2">
//                   ({product.discountPercentage?.toFixed(0)}% OFF)
//                 </span>
//               </div>
//               <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Inclusive of all taxes</p>
//             </div>

//             {/* Quantity and Actions */}
//             <div className="space-y-6 pt-4">
//               <div className="flex items-center gap-6">
//                 <div className="flex items-center border border-gray-300 rounded-sm">
//                   <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-100 text-gray-700 border-r border-gray-300">-</button>
//                   <span className="px-6 py-2 font-medium text-sm">{quantity}</span>
//                   <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-gray-50 text-gray-700 border-l border-gray-300">+</button>
//                 </div>
//                 {!IsGalleryOpen && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleToggleWishlist(product);
//                     }}
//                     className="text-gray-400 hover:text-red-500 transition hover:bg-white transform hover:scale-110 p-2"
//                   >
//                     <Heart
//                       size={20}

//                       fill={wishlist.some((item) => item.id === product.id) ? "#DC2626" : "none"}
//                       className={wishlist.some((item) => item.id === product.id) ? "text-[#DC2626]" : "text-[#4A2C1D]"}
//                     />
//                   </button>
//                 )}
//               </div>

//               <div className="flex flex-col gap-3">
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={isInCart || product.stock === 0}
//                   className={`w-full py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 ${isInCart || product.stock === 0
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     : 'bg-[#8B6F47] text-white hover:bg-[#6B5436] shadow-sm'
//                     }`}
//                 >
//                   <ShoppingCart size={18} />
//                   {isInCart ? 'Item in Bag' : 'Add to Bag'}
//                 </button>

//                 <button
//                   onClick={() => setShowPaymentModal(true)}
//                   disabled={product.stock === 0}
//                   className="w-full py-4 rounded-sm font-bold uppercase tracking-widest text-sm border border-[#8B6F47] text-[#8B6F47] hover:bg-[#FDFCF0] transition-colors"
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             </div>

//             {/* Delivery Info - Professional Badges */}
//             <div className="bg-[#FDFCF0] p-6 space-y-4 border border-[#F5E6D3]">
//               <div className="flex items-center gap-4">
//                 <Truck size={20} className="text-[#8B6F47]" />
//                 <div>
//                   <p className="text-md font-semibold text-[#4A2C1D]">Fast Delivery</p>
//                   <p className="text-sm text-gray-600">Free shipping on orders above ₹500</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <RefreshCcw size={20} className="text-[#8B6F47]" />
//                 <div>
//                   <p className="text-md font-semibold text-[#4A2C1D]">Easy Returns</p>
//                   <p className="text-sm text-gray-600">14-day hassle free return policy</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <ShieldCheck size={20} className="text-[#8B6F47]" />
//                 <div>
//                   <p className="text-md font-semibold text-[#4A2C1D]">Authentic Product</p>
//                   <p className="text-sm text-gray-600">100% genuine quality assured</p>
//                 </div>
//               </div>
//             </div>

//             {/* Dynamic Stock Text */}
//             {product.stock < 10 && product.stock > 0 && (
//               <p className="text-red-500 text-sm font-medium italic">Only {product.stock} items left in stock - order soon!</p>
//             )}
//           </div>
//         </div>

//         {/* Extended Info Sections */}
//         <div className="mt-20 border-t border-gray-100 pt-12">
//           <div className="max-w-4xl">
//             <h3 className="text-lg font-serif  font-bold text-[#4A2C1D] mb-4 uppercase tracking-wider">Product Story</h3>
//             <p className="text-[#6B5436] leading-relaxed text-lg ">
//               {product.description || "A masterfully crafted piece designed for those who appreciate the finer details of vintage aesthetics combined with modern durability."}
//             </p>
//           </div>

//           <div className="mt-16">
//             <ProductSpecification product={product} />
//           </div>

//           <div className="mt-16 pb-20">
//             <ReviewSection reviews={product.reviews || []} productRating={product.rating} />
//           </div>
//         </div>
//       </div>

//       <PaymentModal
//         isOpen={showPaymentModal}
//         onClose={() => setShowPaymentModal(false)}
//         orderDetails={calculateOrderDetails()}
//       />
//     </div>
//   );
// };

// export default ProductDetail;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toggleWishlist } from '../../store/wishlistSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { ArrowLeft, ShoppingCart, Star, Heart, CreditCard, Check, ShieldCheck, RefreshCcw, Truck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import ReviewSection from './ReviewSection';
import PaymentModal from '../../components/modal/PaymentModal';
import ProductSpecification from './ProductSpecification';
import ProductGallery from './ProductGallery';

const ProductDetail = () => {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [quantity, setQuantity] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-[#4A2C1D] mb-4">Product not found</h2>
          <button onClick={() => navigate('/')} className="text-[#8B6F47] underline">Back to Shop</button>
        </div>
      </div>
    );
  }

  // --- DYNAMIC PRICING CALCULATIONS ---
  const isInCart = cartItems.some(item => item.product.id === product.id);
  
  // Base unit prices
  const unitPrice = product.price;
  const unitOriginalPrice = unitPrice / (1 - (product.discountPercentage || 0) / 100);

  // Dynamic Totals (Price * Quantity)
  const currentPriceTotal = (unitPrice * quantity).toFixed(2);
  const originalPriceTotal = (unitOriginalPrice * quantity).toFixed(2);

  const handleToggleWishlist = (prod) => {
    dispatch(toggleWishlist(prod));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product }));
    toast.success(`${product.title} added to cart!`);
  };

  const calculateOrderDetails = () => {
    const subtotal = unitPrice * quantity;
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.18;
    const discount = (unitOriginalPrice - unitPrice) * quantity;
    return { subtotal, discount, shipping, tax, total: subtotal + shipping + tax };
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto pt-4 px-4 md:px-8">
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-[#8B6F47] transition mb-8"
        >
          <ArrowLeft size={14} /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery Column */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <ProductGallery product={product} onOpenChange={setIsGalleryOpen} />
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <header className="border-b border-gray-100 pb-6">
              <h2 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-2 font-medium">
                {product.brand || "Exclusive Collection"}
              </h2>
              <h1 className="lg:text-3xl text-2xl font-serif text-[#4A2C1D] leading-tight mb-3">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                  <span className="text-sm font-bold mr-1">{product.rating}</span>
                  <Star size={14} fill="#8B6F47" className="text-[#8B6F47]" />
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-xs text-gray-500 uppercase">Verified Reviews</span>
                </div>
              </div>
            </header>

            {/* Pricing Section - Updates with Quantity */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="lg:text-3xl text-2xl font-semibold text-[#2d2019]">
                  ₹{currentPriceTotal}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-xl text-gray-400 line-through font-light">
                    ₹{originalPriceTotal}
                  </span>
                )}
                <span className="text-[#8B6F47] font-medium ml-2">
                  ({product.discountPercentage?.toFixed(0)}% OFF)
                </span>
              </div>
              <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Inclusive of all taxes</p>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="px-4 py-2 hover:bg-gray-100 text-gray-700 border-r border-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-medium text-sm w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)} 
                    className="px-4 py-2 hover:bg-gray-100 text-gray-700 border-l border-gray-300 transition"
                  >
                    +
                  </button>
                </div>

                {/* Heart Button: hidden when gallery modal is open */}
                {!isGalleryOpen && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWishlist(product);
                    }}
                    className="text-gray-400 hover:text-red-500 transition transform hover:scale-110 p-2"
                  >
                    <Heart
                      size={24}
                      fill={wishlist.some((item) => item.id === product.id) ? "#DC2626" : "none"}
                      className={wishlist.some((item) => item.id === product.id) ? "text-[#DC2626]" : "text-[#4A2C1D]"}
                    />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart || product.stock === 0}
                  className={`w-full py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 ${
                    isInCart || product.stock === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#8B6F47] text-white hover:bg-[#6B5436] shadow-sm'
                  }`}
                >
                  <ShoppingCart size={18} />
                  {isInCart ? 'Item in Bag' : 'Add to Bag'}
                </button>

                <button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={product.stock === 0}
                  className="w-full py-4 rounded-sm font-bold uppercase tracking-widest text-sm border border-[#8B6F47] text-[#8B6F47] hover:bg-[#FDFCF0] transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-[#FDFCF0] p-6 space-y-4 border border-[#F5E6D3]">
              <div className="flex items-center gap-4">
                <Truck size={20} className="text-[#8B6F47]" />
                <div>
                  <p className="text-md font-semibold text-[#4A2C1D]">Fast Delivery</p>
                  <p className="text-sm text-gray-600">Free shipping on orders above ₹500</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <RefreshCcw size={20} className="text-[#8B6F47]" />
                <div>
                  <p className="text-md font-semibold text-[#4A2C1D]">Easy Returns</p>
                  <p className="text-sm text-gray-600">14-day hassle free return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ShieldCheck size={20} className="text-[#8B6F47]" />
                <div>
                  <p className="text-md font-semibold text-[#4A2C1D]">Authentic Product</p>
                  <p className="text-sm text-gray-600">100% genuine quality assured</p>
                </div>
              </div>
            </div>

            {product.stock < 10 && product.stock > 0 && (
              <p className="text-red-500 text-sm font-medium italic">Only {product.stock} items left in stock!</p>
            )}
          </div>
        </div>

        {/* Story & Reviews */}
        <div className="mt-20 border-t border-gray-100 pt-12">
          <div className="max-w-4xl">
            <h3 className="text-lg font-serif font-bold text-[#4A2C1D] mb-4 uppercase tracking-wider">Product Story</h3>
            <p className="text-[#6B5436] leading-relaxed text-lg">
              {product.description || "A masterfully crafted piece designed for your collection."}
            </p>
          </div>
          <div className="mt-16">
            <ProductSpecification product={product} />
          </div>
          <div className="mt-16 pb-20">
            <ReviewSection reviews={product.reviews || []} productRating={product.rating} />
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        orderDetails={calculateOrderDetails()}
      />
    </div>
  );
};

export default ProductDetail;