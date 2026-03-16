import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { toggleWishlist } from '../../store/wishlistSlice';
import { useDispatch } from 'react-redux';

const CategorySection = () => {
    const [activeCategory, setActiveCategory] = useState('fragrances');
    const products = useSelector((state) => state.products.products);
      const wishlist = useSelector((state) => state.wishlist.items);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const categories = ["fragrances", "furniture", "groceries", "beauty", "skincare", "home-decoration"];
   const handleToggleWishlist = (id) => {
        dispatch(toggleWishlist(id));
    };
    // Filter products based on selected tab, showing only 3 for the preview
    const displayedProducts = products
        .filter(p => p.category === activeCategory)
        .slice(0, 3);

    return (
        <section className="bg-[#FAF8F1] py-20 px-6 border-t border-[#4A2C1D]/5">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-serif text-[#4A2C1D] text-center mb-10 uppercase tracking-widest">
                    Shop By Category
                </h2>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 uppercase tracking-tighter border ${activeCategory === cat
                                    ? 'bg-[#4A2C1D] text-[#FAF8F1] border-[#4A2C1D]'
                                    : 'bg-white text-[#4A2C1D] border-[#EAD9C3] hover:border-[#4A2C1D]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Preview Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {displayedProducts.map((product) => (
                        <div key={product.id} className="group relative bg-white p-4 rounded-sm shadow-sm hover:shadow-xl transition-all">
                            <div className="relative cursor-pointer aspect-[3/4] overflow-hidden bg-[#F3EFE0]"
                                onClick={() => navigate(`/product/${product.id}`)}>
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 bg-[#be9b7b] text-white text-[10px] px-2 py-0.5 font-bold rounded-sm">
                                    NEW ARRIVAL
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleWishlist(product);
                                    }}
                                    className="absolute top-4 right-4 z-10 p-3 bg-white/90 rounded-full shadow-md hover:bg-white transition-all transform hover:scale-110"
                                >
                                    {(() => {
                                        const isInWishlist = wishlist.some((item) => item.id === product.id);
                                        return (
                                            <Heart
                                                size={20}
                                                fill={isInWishlist ? "#DC2626" : "none"}
                                                className={isInWishlist ? "text-[#DC2626]" : "text-[#4A2C1D]"}
                                            />
                                        );
                                    })()}
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <h3 className="text-[#4A2C1D] font-serif text-lg truncate">{product.title}</h3>
                                <p className="text-[#8B6F47] font-bold mt-1">₹{product.price}</p>
                                <button
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="mt-4 w-full border border-[#4A2C1D] py-2 text-[#4A2C1D] text-xs font-bold uppercase hover:bg-[#4A2C1D] hover:text-white transition-colors"
                                >
                                    Quick View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        to="/shop"
                        className="text-[#4A2C1D] font-serif italic text-lg border-b border-[#4A2C1D] pb-1 hover:text-[#be9b7b] hover:border-[#be9b7b] transition-all"
                    >
                        View the full {activeCategory} collection →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;