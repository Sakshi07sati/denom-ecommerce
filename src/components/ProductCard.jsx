import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleWishlist } from '../store/wishlistSlice';
import { setCategoryFilter, setPriceRange, setSortBy } from '../store/searchSlice';
import { Filter, Star, Heart, ShoppingCart, Check, AlertCircle } from 'lucide-react';

const ProductCard = ({ searchQuery }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const wishlist = useSelector((state) => state.wishlist.items);
    const filters = useSelector((state) => state.search.filters);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = filters.category === 'All' || product.category === filters.category;
        const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
        switch (filters.sortBy) {
            case 'Price: Low to High':
                return a.price - b.price;
            case 'Price: High to Low':
                return b.price - a.price;
            default:
                return 0;
        }
    });

    const handleToggleWishlist = (id) => {
        dispatch(toggleWishlist(id));
    };

    const handleCategoryChange = (category) => {
        dispatch(setCategoryFilter(category));
    };

    const handlePriceRangeChange = (range) => {
        dispatch(setPriceRange(range));
    };

    if (loading) {
        return (
            <div className="bg-[#FDFCF0] min-h-screen border-t border-[#4A2C1D]/10 px-6 py-20 flex items-center justify-center">
                <div className="text-[#4A2C1D] text-xl">Loading products...</div>
            </div>
        );
    }

    return (
        <div className="bg-[#FDFCF0] min-h-screen border-t border-[#4A2C1D]/10 px-6 py-20">
            {/* 1. TOP BAR */}
            <div className="max-w-7xl mx-auto px-8 py-10 flex justify-between items-center border-b border-[#4A2C1D]/10">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 text-[#4A2C1D] font-medium hover:text-[#A78BFA] transition"
                >
                    <Filter size={20} />
                    {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                </button>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 uppercase tracking-widest">Sort By:</span>
                    <select 
                        value={filters.sortBy}
                        onChange={(e) => dispatch(setSortBy(e.target.value))}
                        className="bg-transparent font-medium text-[#4A2C1D] focus:outline-none cursor-pointer"
                    >
                        <option>Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
                {/* 2. SIDEBAR FILTERS */}
                {isFilterOpen && (
                    <aside className="w-full lg:w-64 animate-in fade-in slide-in-from-left-4 duration-300">
                        <div className="mb-10">
                            <h3 className="font-serif text-xl text-[#4A2C1D] mb-4">Categories</h3>
                            <ul className="space-y-3">
                                {["All", "smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration"].map(cat => (
                                    <li key={cat}>
                                        <button 
                                            onClick={() => handleCategoryChange(cat)}
                                            className={`text-sm transition ${filters.category === cat ? 'text-[#A78BFA] font-medium' : 'text-gray-600 hover:text-[#A78BFA]'}`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-10 text-[#4A2C1D]">
                            <h3 className="font-serif text-xl mb-4">Price Range</h3>
                            <input 
                                type="range" 
                                min="0" 
                                max="10000" 
                                value={filters.priceRange[1]}
                                onChange={(e) => handlePriceRangeChange([0, parseInt(e.target.value)])}
                                className="w-full accent-[#8B6F47]" 
                            />
                            <div className="flex justify-between text-xs mt-2 text-[#9B8B75] font-medium">
                                <span>₹0</span>
                                <span>₹{filters.priceRange[1]}+</span>
                            </div>
                        </div>
                    </aside>
                )}

                {/* 3. PRODUCT GRID */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {filteredProducts.map((product) => {
                            const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
                            const reviewCount = product.reviews ? product.reviews.length : 0;

                            return (
                                <div 
                                    key={product.id} 
                                    className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 transform hover:scale-105"
                                >
                                    {/* Product Image */}
                                    <div className="relative aspect-[4/5] overflow-hidden bg-[#EAD9C3]">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 space-y-2">
                                            {product.discountPercentage > 0 && (
                                                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                    -{product.discountPercentage.toFixed(0)}%
                                                </div>
                                            )}
                                            {product.stock > 0 && product.stock <= 10 && (
                                                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                    Only {product.stock} left
                                                </div>
                                            )}
                                        </div>

                                        {/* Wishlist Button */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleToggleWishlist(product.id); }}
                                            className="absolute top-4 right-4 z-10 p-3 bg-white/90 rounded-full shadow-md hover:bg-white transition-all transform hover:scale-110"
                                        >
                                            <Heart
                                                size={20}
                                                fill={wishlist.includes(product.id) ? "#DC2626" : "none"}
                                                className={wishlist.includes(product.id) ? "text-[#DC2626]" : "text-[#4A2C1D]"}
                                            />
                                        </button>

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                                            <button 
                                                onClick={() => navigate(`/product/${product.id}`)}
                                                className="bg-[#FDFCF0] text-[#4A2C1D] px-6 py-2 rounded-full font-serif  font-bold shadow-xl hover:bg-[#8B6F47] hover:text-white transition transform"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5">
                                        {/* Brand */}
                                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#9B8B75] mb-2 font-semibold">
                                            {product.brand || "Vintage"}
                                        </p>

                                        {/* Title */}
                                        <h4 className="text-sm font-serif text-[#4A2C1D] line-clamp-2 mb-3 h-10">
                                            {product.title}
                                        </h4>

                                        {/* Rating and Reviews */}
                                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#EAD9C3]">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        size={14} 
                                                        fill={i < Math.round(product.rating) ? '#FCD34D' : '#D4A574'}
                                                        className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-[#D4A574]'}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-[#9B8B75] font-medium">
                                                {product.rating.toFixed(1)} ({reviewCount} reviews)
                                            </span>
                                        </div>

                                        {/* Price Section */}
                                        <div className="mb-3">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-xl font-bold text-[#8B6F47]">₹{product.price.toFixed(2)}</span>
                                                {product.discountPercentage > 0 && (
                                                    <span className="text-xs text-[#9B8B75] line-through">₹{originalPrice}</span>
                                                )}
                                            </div>
                                            {product.discountPercentage > 0 && (
                                                <p className="text-md text-green-600 font-medium">
                                                    Save ₹{(originalPrice - product.price).toFixed(2)}
                                                </p>
                                            )}
                                        </div>

                                        {/* Stock Status */}
                                        <div className="mb-4">
                                            {product.stock > 0 ? (
                                                <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                                                    <Check size={16} />
                                                    In Stock
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-xs text-red-600 font-medium">
                                                    <AlertCircle size={16} />
                                                    Out of Stock
                                                </div>
                                            )}
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={() => {
                                                if (product.stock > 0) navigate(`/product/${product.id}`);
                                            }}
                                            disabled={product.stock === 0}
                                            className={`w-full py-2 rounded-lg font-medium text-sm transition flex items-center justify-center gap-2 ${
                                                product.stock === 0
                                                    ? 'bg-[#D4A574] text-white cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-[#8B6F47] to-[#6B5436] text-white hover:shadow-lg'
                                            }`}
                                        >
                                            <ShoppingCart size={16} />
                                            {product.stock === 0 ? 'Out of Stock' : 'Quick View'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="col-span-full text-center py-16">
                            <AlertCircle size={48} className="mx-auto text-[#C9B8A0] mb-4" />
                            <h3 className="text-2xl font-serif text-[#6B5436] mb-2">No Products Found</h3>
                            <p className="text-[#9B8B75]">Try adjusting your filters or search terms</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;