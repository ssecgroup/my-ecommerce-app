import React from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import WishlistButton from '@/components/WishlistButton.jsx';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const imageUrl = product.images && product.images.length > 0
    ? pb.files.getUrl(product, product.images[0])
    : 'https://images.unsplash.com/photo-1509649034328-e136ff02527c?w=500&q=80';

  return (
    <div className="group bg-card rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border flex flex-col h-full relative">
      <div className="absolute top-3 right-3 z-10">
        <WishlistButton productId={product.id} />
      </div>
      
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-muted block">
        <img
          src={imageUrl}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock <= 0 && (
          <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</div>
          {product.rating > 0 && (
            <div className="flex items-center text-accent text-sm">
              <Star className="w-3 h-3 fill-current mr-1" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-primary">₹{product.price}</span>
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-medium text-secondary hover:text-primary transition-colors"
          >
            View Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
