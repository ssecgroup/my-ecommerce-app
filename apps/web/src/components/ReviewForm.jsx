import React, { useState } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Star, X } from 'lucide-react';

const ReviewForm = ({ productId, onSuccess, onCancel }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setLoading(true);
    try {
      await pb.collection('reviews').create({
        productId,
        userId: currentUser.id,
        rating,
        reviewText
      }, { $autoCancel: false });
      
      onSuccess();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm relative">
      <button onClick={onCancel} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
        <X className="w-5 h-5" />
      </button>
      
      <h3 className="text-xl font-bold mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star 
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoverRating || rating) 
                      ? 'fill-accent text-accent' 
                      : 'text-muted-foreground'
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Your Review</label>
          <textarea
            required
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="What did you like or dislike about this product?"
            className="w-full p-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none resize-none"
          ></textarea>
        </div>
        
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
