import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import ReviewForm from './ReviewForm.jsx';
import { Star, MessageSquare } from 'lucide-react';

const ProductReviewSection = ({ productId }) => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({ average: 0, count: 0, distribution: { 5:0, 4:0, 3:0, 2:0, 1:0 } });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('reviews').getList(1, 50, {
        filter: `productId="${productId}"`,
        sort: '-created',
        $autoCancel: false
      });
      
      setReviews(records.items);
      
      if (records.items.length > 0) {
        const dist = { 5:0, 4:0, 3:0, 2:0, 1:0 };
        let sum = 0;
        records.items.forEach(r => {
          dist[r.rating] = (dist[r.rating] || 0) + 1;
          sum += r.rating;
        });
        setStats({
          average: sum / records.items.length,
          count: records.items.length,
          distribution: dist
        });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const renderStars = (rating) => {
    return (
      <div className="flex text-accent">
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} className={`w-4 h-4 ${star <= rating ? 'fill-current' : 'text-muted-foreground opacity-30'}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold text-primary font-serif mb-8">Customer Reviews</h2>
      
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        {/* Stats Summary */}
        <div className="md:col-span-1 bg-muted/30 p-6 rounded-xl border border-border">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-foreground mb-2">{stats.average.toFixed(1)}</div>
            <div className="flex justify-center mb-2">{renderStars(Math.round(stats.average))}</div>
            <div className="text-sm text-muted-foreground">Based on {stats.count} reviews</div>
          </div>
          
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="flex items-center text-sm">
                <span className="w-8 text-muted-foreground">{star} <Star className="w-3 h-3 inline fill-current" /></span>
                <div className="flex-grow mx-3 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full" 
                    style={{ width: `${stats.count > 0 ? (stats.distribution[star] / stats.count) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="w-8 text-right text-muted-foreground">{stats.distribution[star]}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            {currentUser ? (
              <button 
                onClick={() => setShowForm(!showForm)}
                className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Write a Review
              </button>
            ) : (
              <p className="text-sm text-muted-foreground">Please <a href="/login" className="text-secondary hover:underline">log in</a> to write a review.</p>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2">
          {showForm && (
            <div className="mb-8">
              <ReviewForm 
                productId={productId} 
                onSuccess={() => { setShowForm(false); fetchReviews(); }} 
                onCancel={() => setShowForm(false)} 
              />
            </div>
          )}

          {loading ? (
            <div className="animate-pulse space-y-6">
              {[1, 2].map(n => (
                <div key={n} className="h-32 bg-muted rounded-xl"></div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 bg-muted/10 rounded-xl border border-dashed border-border">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-medium text-foreground">No reviews yet</h3>
              <p className="text-muted-foreground">Be the first to review this product!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="border-b border-border pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-foreground">Verified Customer</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {new Date(review.created).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-foreground mt-3 leading-relaxed">{review.reviewText}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewSection;
