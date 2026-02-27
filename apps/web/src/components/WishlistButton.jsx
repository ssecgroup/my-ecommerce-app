import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { useNavigate } from 'react-router-dom';

const WishlistButton = ({ productId, className = '' }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistRecordId, setWishlistRecordId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWishlist = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const records = await pb.collection('wishlist').getList(1, 1, {
          filter: `userId="${currentUser.id}" && productId="${productId}"`,
          $autoCancel: false
        });
        if (records.items.length > 0) {
          setIsWishlisted(true);
          setWishlistRecordId(records.items[0].id);
        }
      } catch (error) {
        console.error('Error checking wishlist:', error);
      } finally {
        setLoading(false);
      }
    };
    checkWishlist();
  }, [currentUser, productId]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      if (isWishlisted && wishlistRecordId) {
        await pb.collection('wishlist').delete(wishlistRecordId, { $autoCancel: false });
        setIsWishlisted(false);
        setWishlistRecordId(null);
        window.dispatchEvent(new Event('wishlistUpdated'));
      } else {
        const record = await pb.collection('wishlist').create({
          userId: currentUser.id,
          productId: productId
        }, { $autoCancel: false });
        setIsWishlisted(true);
        setWishlistRecordId(record.id);
        window.dispatchEvent(new Event('wishlistUpdated'));
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className={`p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm transition-all ${className}`}
      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <Heart 
        className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} 
      />
    </button>
  );
};

export default WishlistButton;
