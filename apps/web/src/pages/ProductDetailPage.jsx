import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { ShoppingCart, Check, Star, ShieldCheck, Truck } from 'lucide-react';
import TrustSignals from '@/components/TrustSignals.jsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const record = await pb.collection('products').getOne(id, { $autoCancel: false });
        setProduct(record);
        if (record.sizes && record.sizes.length > 0) setSelectedSize(record.sizes[0]);
        if (record.colors && record.colors.length > 0) setSelectedColor(record.colors[0]);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images && product.images.length > 0 ? pb.files.getUrl(product, product.images[0]) : '',
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    };

    const existingIndex = cart.findIndex(item => 
      item.productId === newItem.productId && 
      item.size === newItem.size && 
      item.color === newItem.color
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  const imageUrl = product.images && product.images.length > 0
    ? pb.files.getUrl(product, product.images[0])
    : 'https://images.unsplash.com/photo-1509649034328-e136ff02527c?w=800&q=80';

  const displayName = language === 'ta' && product.name_ta ? product.name_ta : product.name;
  const displayDesc = language === 'ta' && product.description_ta ? product.description_ta : product.description;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-card rounded-3xl shadow-lg overflow-hidden border border-border mb-16">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="bg-muted relative aspect-square md:aspect-auto">
              <img src={imageUrl} alt={displayName} className="w-full h-full object-cover absolute inset-0" />
            </div>

            {/* Details */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                  {product.category}
                </div>
                {product.rating > 0 && (
                  <div className="flex items-center text-primary font-medium">
                    <Star className="w-5 h-5 fill-current mr-1" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4 leading-tight">{displayName}</h1>
              <div className="text-4xl font-bold text-foreground mb-6">₹{product.price}</div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                {displayDesc || "Premium quality product crafted with care."}
              </p>

              {/* Selectors */}
              <div className="space-y-6 mb-10">
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Size</label>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 rounded-xl border-2 font-bold transition-all ${selectedSize === size ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-background text-foreground border-input hover:border-primary/50'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Color</label>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-5 py-2.5 rounded-xl border-2 font-bold transition-all ${selectedColor === color ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-background text-foreground border-input hover:border-primary/50'}`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Quantity</label>
                  <div className="flex items-center border-2 border-input rounded-xl w-36 overflow-hidden bg-background">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-foreground hover:bg-muted transition-colors font-bold">-</button>
                    <input type="number" value={quantity} readOnly className="w-full text-center bg-transparent text-foreground focus:outline-none font-bold text-lg" />
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-foreground hover:bg-muted transition-colors font-bold">+</button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all shadow-md hover:shadow-lg ${
                    product.stock <= 0 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed shadow-none'
                      : added 
                        ? 'bg-green-600 text-white' 
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {product.stock <= 0 ? (
                    'Out of Stock'
                  ) : added ? (
                    <><Check className="mr-2 w-6 h-6" /> Added to Cart</>
                  ) : (
                    <><ShoppingCart className="mr-2 w-6 h-6" /> {t('product.add_to_cart')}</>
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
                  <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-primary" /> Secure Checkout</span>
                  <span className="flex items-center"><Truck className="w-4 h-4 mr-1 text-primary" /> Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <TrustSignals />
    </div>
  );
};

export default ProductDetailPage;
