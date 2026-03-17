import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Calendar, ChevronRight, Edit3 } from 'lucide-react';

const ReviewSection = ({ reviews = [], productRating = 0 }) => {
  const [showForm, setShowForm] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    reviewerName: '',
    reviewerEmail: ''
  });

  useEffect(() => {
    setAllReviews(reviews);
  }, [reviews]);

  const averageRating = allReviews.length > 0
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : productRating;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: allReviews.filter(r => r.rating === rating).length,
    percentage: allReviews.length ? (allReviews.filter(r => r.rating === rating).length / allReviews.length) * 100 : 0
  }));

  const handleSubmitReview = () => {
    if (newReview.comment.trim() && newReview.reviewerName.trim()) {
      const submittedReview = {
        ...newReview,
        date: new Date().toISOString()
      };
      setAllReviews([submittedReview, ...allReviews]);
      setNewReview({ rating: 5, comment: '', reviewerName: '', reviewerEmail: '' });
      setShowForm(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="mt-24 border-t border-gray-100 pt-16 max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* LEFT SIDE: Rating Summary (Myntra Style) */}
        <div className="lg:w-1/3 space-y-8">
          <div>
            <h2 className="text-xl font-serif text-[#4A2C1D] uppercase tracking-wider mb-6 flex items-center gap-2">
              Ratings & Reviews
            </h2>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-5xl font-light text-[#4A2C1D]">{averageRating}</span>
              <div className="flex flex-col">
                <div className="flex text-[#8B6F47]">
                  <Star size={20} fill="#8B6F47" />
                  <span className="ml-2 text-lg font-medium text-gray-700">Verified Buyers</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{allReviews.length} total ratings</p>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3 max-w-xs">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-4 text-xs font-bold text-gray-500">
                <span className="w-4">{rating}</span>
                <Star size={12} fill="currentColor" />
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8B6F47]"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="w-8 text-right font-normal text-gray-400">{count}</span>
              </div>
            ))}
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 text-sm font-bold text-[#8B6F47] hover:underline uppercase tracking-widest pt-4"
            >
              <Edit3 size={16} /> Write a Review
            </button>
          )}
        </div>

        {/* RIGHT SIDE: Review Feed / Form */}
        <div className="lg:w-2/3">
          {showForm ? (
            <div className="bg-[#FDFCF0] p-8 rounded-sm border border-[#F5E6D3] animate-in fade-in duration-500">
              <h3 className="text-lg font-serif text-[#4A2C1D] mb-6">Write your experience</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-3">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        size={28}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className={`cursor-pointer transition-colors ${star <= newReview.rating ? 'text-[#8B6F47]' : 'text-gray-200'}`}
                        fill={star <= newReview.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    placeholder="Full Name"
                    value={newReview.reviewerName}
                    onChange={(e) => setNewReview({ ...newReview, reviewerName: e.target.value })}
                    className="bg-transparent border-b border-gray-300 py-2 focus:border-[#8B6F47] outline-none text-sm"
                  />
                  <input
                    placeholder="Email Address"
                    value={newReview.reviewerEmail}
                    onChange={(e) => setNewReview({ ...newReview, reviewerEmail: e.target.value })}
                    className="bg-transparent border-b border-gray-300 py-2 focus:border-[#8B6F47] outline-none text-sm"
                  />
                </div>

                <textarea
                  placeholder="Tell us what you liked or disliked..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows="3"
                  className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-[#8B6F47] outline-none text-sm resize-none"
                />

                <div className="flex gap-4 pt-4">
                  <button onClick={handleSubmitReview} className="bg-[#4A2C1D] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black transition">Post Review</button>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-red-500">Cancel</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {allReviews.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-gray-200 rounded-sm">
                  <MessageCircle size={32} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-400 text-sm italic">No reviews yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                allReviews.map((review, index) => (
                  <div key={index} className="group pb-10 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex bg-[#8B6F47] px-1.5 py-0.5 rounded text-[10px] text-white font-bold items-center gap-1">
                        {review.rating} <Star size={8} fill="white" />
                      </div>
                      <span className="text-sm font-bold text-[#4A2C1D]">{review.reviewerName}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-400">{formatDate(review.date)}</span>
                    </div>
                    <p className="text-gray-600 text-md leading-relaxed mb-4">
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-green-600 font-bold uppercase tracking-tighter">
                       <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                        <Star size={8} fill="currentColor" />
                       </div>
                       Verified Purchase
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;