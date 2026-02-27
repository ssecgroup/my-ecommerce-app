import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TemplateHeader, MOCK_PRODUCTS } from './TemplateShopPage.jsx';
import { Star, ShoppingCart, Heart, Share2, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';

const TemplateProductDetailPage = () => {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <TemplateHeader />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/template-shop" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Shop
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="p-8 bg-gray-50 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="max-w-full h-auto rounded-xl shadow-md object-cover aspect-square" />
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="text-sm text-indigo-600 font-bold tracking-wider uppercase mb-2">{product.category}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">(128 Reviews)</span>
              </div>

              <div className="text-4xl font-bold text-gray-900 mb-6">₹{product.price.toLocaleString('en-IN')}</div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                This is a sample product description. In your actual store, you can write detailed descriptions about your products, highlighting their features, materials, and benefits to convince customers to buy.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center border border-gray-300 rounded-lg w-32 bg-white">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg">-</button>
                    <input type="number" value={quantity} readOnly className="w-full text-center bg-transparent text-gray-900 font-medium focus:outline-none" />
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg">+</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-lg shadow-indigo-200">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </button>
                <button className="px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="w-5 h-5 mr-2 text-indigo-600" /> Free Delivery
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ShieldCheck className="w-5 h-5 mr-2 text-indigo-600" /> Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateProductDetailPage;
