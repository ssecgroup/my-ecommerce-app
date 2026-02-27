import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import { Heart } from 'lucide-react';

const WishlistPage = () => {
  const { currentUser } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Fetch wishlist records
        const records = await pb.collection('wishlist').getList(1, 50, {
          filter: `userId="${currentUser.id}"`,
          $autoCancel: false
        });
        
        if (records.items.length === 0) {
          setWishlistItems([]);
          setLoading(false);
          return;
        }

        // Extract product IDs
        const productIds = records.items.map(item => `id="${item.productId}"`).join(' || ');
        
        // Fetch actual products
        const products = await pb.collection('products').getList(1, 50, {
          filter: productIds,
          $autoCancel: false
        });
        
        setWishlistItems(products.items);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
    
    // Listen for wishlist updates to refresh the list
    window.addEventListener('wishlistUpdated', fetchWishlist);
    return () => window.removeEventListener('wishlistUpdated', fetchWishlist);
  }, [currentUser.id]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Heart className="w-8 h-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold text-primary font-serif">My Wishlist</h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-card rounded-xl h-96 animate-pulse border border-border"></div>
            ))}
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save items you love to your wishlist to review them later.</p>
            <Link to="/shop" className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
