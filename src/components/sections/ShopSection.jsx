import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleWishlist } from "../../store/wishlistSlice";
import {
  setCategoryFilter,
  setPriceRange,
  setSortBy,
} from "../../store/searchSlice";
import {
  Filter,
  Star,
  Heart,
  ShoppingCart,
  Check,
  AlertCircle,
} from "lucide-react";

const ProductCard = ({ searchQuery }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const wishlist = useSelector((state) => state.wishlist.items);
  const filters = useSelector((state) => state.search.filters);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredProducts = products
    .filter((product) => {
      const query = searchQuery ? searchQuery.toLowerCase() : "";

      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        (product.brand && product.brand.toLowerCase().includes(query));

      const matchesCategory =
        filters.category === "All" || product.category === filters.category;

      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        default:
          return 0;
      }
    });



  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);



  const handleToggleWishlist = (product) => {
    dispatch(toggleWishlist(product));
  };

  const handleCategoryChange = (category) => {
  dispatch(setCategoryFilter(category));
  setCurrentPage(1);
};

 const handlePriceRangeChange = (range) => {
  dispatch(setPriceRange(range));
  setCurrentPage(1);
};


  if (loading) {
    return (
      <div className="bg-[#FDFCF0] min-h-screen flex items-center justify-center">
        <div className="text-[#4A2C1D] text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFCF0] min-h-screen border-t border-[#4A2C1D]/10 px-6 py-20">
      
   

      <div className="max-w-7xl mx-auto px-8 py-10 flex justify-between items-center border-b border-[#4A2C1D]/10">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 text-[#4A2C1D] font-medium"
        >
          <Filter size={20} />
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 uppercase">Sort By:</span>

          <select
            value={filters.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="bg-transparent text-[#4A2C1D]"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
       

        {isFilterOpen && (
          <aside className="w-full lg:w-64">

            <h3 className="font-serif text-xl text-[#4A2C1D] mb-4">
              Categories
            </h3>

            <ul className="space-y-3 mb-10">
              {[
                "All",
                "smartphones",
                "laptops",
                "fragrances",
                "skincare",
                "groceries",
                "home-decoration",
              ].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-sm ${
                      filters.category === cat
                        ? "text-[#A78BFA] font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="font-serif text-xl mb-4 text-[#4A2C1D]">
              Price Range
            </h3>

            <input
              type="range"
              min="0"
              max="10000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handlePriceRangeChange([0, parseInt(e.target.value)])
              }
              className="w-full"
            />

            <div className="flex justify-between text-xs mt-2 text-[#9B8B75]">
              <span>₹0</span>
              <span>₹{filters.priceRange[1]}+</span>
            </div>
          </aside>
        )}

        {/* PRODUCT GRID */}

        <div className="flex-1">

          <p className="text-sm text-gray-500 mb-6">
            Showing {currentProducts.length} of {filteredProducts.length} products
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {currentProducts.map((product) => {
              
              const originalPrice = (
                product.price /
                (1 - product.discountPercentage / 100)
              ).toFixed(2);

              const reviewCount = product.reviews
                ? product.reviews.length
                : 0;

              const isInWishlist = wishlist.some(
                (item) => item.id === product.id
              );

              return (
                <div
                  key={product.id}
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition"
                >

                  {/* IMAGE */}

                  <div
                    className="relative aspect-[4/5]"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />

                    {/* WISHLIST */}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(product);
                      }}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full"
                    >
                      <Heart
                        size={18}
                        fill={isInWishlist ? "#DC2626" : "none"}
                        className={
                          isInWishlist
                            ? "text-[#DC2626]"
                            : "text-[#4A2C1D]"
                        }
                      />
                    </button>
                  </div>

                  {/* INFO */}

                  <div className="p-5">

                    <p className="text-xs text-[#9B8B75] uppercase">
                      {product.brand || "Vintage"}
                    </p>

                    <h4 className="text-sm font-serif text-[#4A2C1D] mb-3">
                      {product.title}
                    </h4>

                    {/* RATING */}

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={
                            i < Math.round(product.rating)
                              ? "#FCD34D"
                              : "none"
                          }
                        />
                      ))}

                      <span className="text-xs text-gray-500 ml-2">
                        ({reviewCount})
                      </span>
                    </div>

                    {/* PRICE */}

                    <div className="mb-3">
                      <span className="text-lg font-bold text-[#8B6F47]">
                        ₹{product.price.toFixed(2)}
                      </span>

                      {product.discountPercentage > 0 && (
                        <span className="text-xs line-through ml-2 text-gray-400">
                          ₹{originalPrice}
                        </span>
                      )}
                    </div>

                    {/* STOCK */}

                    {product.stock > 0 ? (
                      <div className="flex items-center gap-1 text-green-600 text-xs mb-3">
                        <Check size={14} /> In Stock
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-600 text-xs mb-3">
                        <AlertCircle size={14} /> Out of Stock
                      </div>
                    )}

                    {/* BUTTON */}

                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      disabled={product.stock === 0}
                      className="w-full py-2 bg-[#8B6F47] text-white rounded-lg flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Quick View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PAGINATION */}

          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-12">

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                className="px-4 py-2 border rounded"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-[#8B6F47] text-white"
                      : "border"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                className="px-4 py-2 border rounded"
              >
                Next
              </button>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <AlertCircle
                size={48}
                className="mx-auto text-[#C9B8A0] mb-4"
              />
              <h3 className="text-2xl text-[#6B5436] mb-2">
                No Products Found
              </h3>
              <p className="text-[#9B8B75]">
                Try adjusting filters or search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;