import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { Search, Filter, Star } from 'lucide-react';

const ShopPage = () => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const categories = ["Men's T-shirts", "Women's T-shirts", "Kids' Wear", "Bottomwear"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let filterStr = '';
        const filters = [];
        
        if (category) filters.push(`category = "${category}"`);
        if (searchTerm) {
          filters.push(`(name ~ "${searchTerm}" || name_ta ~ "${searchTerm}")`);
        }
        
        if (filters.length > 0) {
          filterStr = filters.join(' && ');
        }

        const records = await pb.collection('products').getList(1, 50, {
          filter: filterStr,
          sort: '-created',
          $autoCancel: false
        });
        setProducts(records.items);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchTerm]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground font-serif mb-2">{t('shop.title')}</h1>
            <p className="text-muted-foreground">Discover our premium collection</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder={t('shop.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-card text-foreground focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-48 px-4 py-2.5 rounded-xl border border-input bg-card text-foreground focus:ring-2 focus:ring-primary outline-none appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="bg-card rounded-2xl h-96 animate-pulse border border-border"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => {
              const imageUrl = product.images && product.images.length > 0
                ? pb.files.getUrl(product, product.images[0])
                : 'https://images.unsplash.com/photo-1509649034328-e136ff02527c?w=500&q=80';
              
              const displayName = language === 'ta' && product.name_ta ? product.name_ta : product.name;

              return (
                <Link key={product.id} to={`/product/${product.id}`} className="group bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border flex flex-col h-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={imageUrl}
                      alt={displayName}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    {product.stock <= 0 && (
                      <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{product.category}</div>
                      {product.rating > 0 && (
                        <div className="flex items-center text-primary text-sm font-medium">
                          <Star className="w-3.5 h-3.5 fill-current mr-1" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-foreground group-hover:text-primary transition-colors">{displayName}</h3>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-bold text-foreground">₹{product.price}</span>
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32 bg-card rounded-3xl border border-dashed border-border">
            <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
