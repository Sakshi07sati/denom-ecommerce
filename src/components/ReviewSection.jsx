import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, User, Calendar } from 'lucide-react';

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
    <div className="mt-16 pt-12 border-t border-[#D4A574]">
      <h2 className="text-3xl font-serif text-[#4A2C1D] mb-8">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#F5E6D3] to-[#EAD9C3] p-8 rounded-lg border border-[#D4A574]">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-[#8B6F47] mb-2">{averageRating}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < Math.round(averageRating) ? '#8B6F47' : '#E5E7EB'}
                    className={i < Math.round(averageRating) ? 'text-[#8B6F47]' : 'text-[#D4A574]'}
                  />
                ))}
              </div>
              <p className="text-[#6B5436] text-sm">Based on {reviews.length} reviews</p>
            </div>

            <div className="space-y-3">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#6B5436] w-8">{rating}★</span>
                  <div className="flex-1 h-2 bg-[#EAD9C3] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#8B6F47] to-[#6B5436]"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-[#9B8B75] w-8 text-right">({count})</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full mt-6 bg-[#8B6F47] text-white py-3 rounded-lg font-medium hover:bg-[#6B5436] transition"
          >
            Write a Review
          </button>
        </div>

        {/* Add Review Form */}
        {showForm && (
          <div className="lg:col-span-2">
            <div className="bg-[#F5E6D3] p-8 rounded-lg border border-[#D4A574]">
              <h3 className="text-xl font-serif text-[#4A2C1D] mb-6">Share Your Experience</h3>

              {/* Rating Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#6B5436] mb-3">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="transition transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        fill={star <= newReview.rating ? '#8B6F47' : '#EAD9C3'}
                        className={star <= newReview.rating ? 'text-[#8B6F47]' : 'text-[#D4A574]'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#6B5436] mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={newReview.reviewerName}
                    onChange={(e) => setNewReview({ ...newReview, reviewerName: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D4A574] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B5436] mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={newReview.reviewerEmail}
                    onChange={(e) => setNewReview({ ...newReview, reviewerEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D4A574] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] bg-white"
                  />
                </div>
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#6B5436] mb-2">Your Review</label>
                <textarea
                  placeholder="Share your thoughts about this product..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border border-[#D4A574] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B6F47] resize-none bg-white"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmitReview}
                  className="flex-1 bg-[#8B6F47] text-white py-2 rounded-lg font-medium hover:bg-[#6B5436] transition"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif text-[#4A2C1D] mb-6">All Reviews</h3>

        {allReviews.length === 0 ? (
          <div className="text-center py-12 bg-[#F5E6D3] rounded-lg border border-[#D4A574]">
            <MessageCircle size={40} className="mx-auto text-[#9B8B75] mb-3" />
            <p className="text-[#6B5436]">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          allReviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-[#D4A574] hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#8B6F47] to-[#6B5436] rounded-full flex items-center justify-center text-white font-bold">
                      {review.reviewerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-[#4A2C1D]">{review.reviewerName}</p>
                      <div className="flex items-center gap-2 text-xs text-[#9B8B75]">
                        <Calendar size={12} />
                        {formatDate(review.date)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? '#FCD34D' : '#E5E7EB'}
                      className={i < review.rating ? 'text-yellow-400' : 'text-[#D4A574]'}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[#6B5436] leading-relaxed text-left">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
