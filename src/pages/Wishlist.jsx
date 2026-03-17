import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, X, ShoppingBag } from "lucide-react"; 
import { toggleWishlist, clearWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice"; 

const Wishlist = () => {
  const wishlistProducts = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleRemove = (e, product) => {
  e.stopPropagation();
  dispatch(toggleWishlist(product));
};

  const handleMoveToCart = (e, product) => {
    e.stopPropagation();
    // 1. Add to Cart
    dispatch(addToCart({ product, quantity: 1 }));
    // 2. Remove from Wishlist
    dispatch(toggleWishlist(product));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      dispatch(clearWishlist());
    }
  };

  return (
    <div className="p-4 bg-[#FDFCF0] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-[#4A2C1D]/10 pb-6">
          <h1 className="  text-xl lg:text-3xl  font-serif text-[#4A2C1D]">My Wishlist</h1>
          
          {wishlistProducts.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="text-xs uppercase tracking-widest font-bold text-red-700 hover:text-red-900 flex items-center gap-2 transition-colors"
            >
              <Trash2 size={16} /> Clear Wishlist
            </button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
       <div className="py-20 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-serif text-[#4A2C1D] mb-6 ">Ohh No! Your Wishlist is Empty</h2>
            <h5 className="text-[#9B8B75] tracking-[0.2em] uppercase text-sm mb-6">Love the product! Just Start Adding Your Favorite Items</h5>
            <p className="max-w-xl text-[#9B8B75] mb-8 leading-relaxed">
              Wishlist allows you to keep track of all of your favorites and shopping activity. 
              You won't have to waste time searching all over again for that item you loved!
            </p>
            <button 
              onClick={() => navigate('/shop')}
              className="px-10 py-3 border border-[#4A2C1D] rounded-full hover:bg-[#4A2C1D] hover:text-white transition-all duration-500 uppercase tracking-widest text-sm font-bold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-[#F9F8F0] border-xl border-gray-100 p-2 rounded-sm cursor-pointer hover:shadow-xl transition-all duration-500"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Remove Icon */}
                <button 
                  onClick={(e) => handleRemove(e, product)}
                  className="absolute top-3 right-2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#4A2C1D] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                >
                  <X size={18} />
                </button>

                <div className="overflow-hidden  aspect-[3/4] mb-4 bg-[#F3EFE0]">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="text-center">
                  <h3 className="font-serif text-[#4A2C1D] text-lg truncate mb-1">{product.title}</h3>
                  <p className="text-[#8B6F47] font-bold mb-4">₹{product.price}</p>
                  
                  {/* Move to Cart Button */}
                  <button 
                    onClick={(e) => handleMoveToCart(e, product)}
                    className="w-full flex items-center justify-center gap-2 py-2 border border-[#4A2C1D] text-[#4A2C1D] text-xs font-bold uppercase hover:bg-[#4A2C1D] hover:text-white transition-colors tracking-widest"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;


