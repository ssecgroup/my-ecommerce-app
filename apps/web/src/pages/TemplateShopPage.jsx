import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, Filter, Star } from 'lucide-react';

// Mock Data for Template
const MOCK_PRODUCTS = [
  { id: '1', name: 'Kanchipuram Silk Saree', price: 12500, category: 'Textiles', rating: 4.8, image: 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=500&q=80' },
  { id: '2', name: 'Premium Filter Coffee Powder', price: 450, category: 'Groceries', rating: 4.5, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' },
  { id: '3', name: 'Traditional Brass Lamp (Kuthu Vilakku)', price: 2800, category: 'Home Goods', rating: 4.9, image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=500&q=80' },
  { id: '4', name: 'Cotton Veshti & Shirt Set', price: 1200, category: 'Textiles', rating: 4.6, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=500&q=80' },
  { id: '5', name: 'Organic Cold Pressed Gingelly Oil', price: 380, category: 'Groceries', rating: 4.7, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80' },
  { id: '6', name: 'Handcrafted Wooden Toys', price: 850, category: 'Home Goods', rating: 4.4, image: 'https://images.unsplash.com/photo-1596461404969-9ce205b14f1e?w=500&q=80' },
  { id: '7', name: 'Smart LED TV 43"', price: 24999, category: 'Electronics', rating: 4.3, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80' },
  { id: '8', name: 'Designer Gold Plated Necklace', price: 3500, category: 'Jewelry', rating: 4.8, image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00ea?w=500&q=80' },
];

const TemplateHeader = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 md:hidden text-gray-700" />
        <Link to="/template-shop" className="text-2xl font-bold text-indigo-900 font-serif">
          YourShop<span className="text-orange-500">Name</span>
        </Link>
      </div>
      
      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
        <input type="text" placeholder="Search products..." className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500" />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="flex items-center gap-5 text-gray-700">
        <Link to="/template-account" className="hover:text-indigo-600 hidden sm:block"><User className="w-6 h-6" /></Link>
        <button className="hover:text-indigo-600"><Heart className="w-6 h-6" /></button>
        <button className="hover:text-indigo-600 relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </button>
      </div>
    </div>
    <nav className="hidden md:flex justify-center space-x-8 py-3 bg-gray-50 text-sm font-medium text-gray-700">
      <a href="#" className="hover:text-indigo-600">Home</a>
      <a href="#" className="text-indigo-600">All Products</a>
      <a href="#" className="hover:text-indigo-600">Textiles</a>
      <a href="#" className="hover:text-indigo-600">Groceries</a>
      <a href="#" className="hover:text-indigo-600">Electronics</a>
      <a href="#" className="hover:text-indigo-600">Offers</a>
    </nav>
  </header>
);

const TemplateShopPage = () => {
  const [category, setCategory] = useState('All');

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TemplateHeader />
      
      {/* Hero Banner */}
      <div className="bg-indigo-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Welcome to Your Store</h1>
        <p className="text-lg text-indigo-200 max-w-2xl mx-auto">This is how your customers will see your beautiful online shop. Fully customizable to match your brand.</p>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 font-bold text-lg mb-6 pb-4 border-b border-gray-100">
              <Filter className="w-5 h-5" /> Filters
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {['All', 'Textiles', 'Groceries', 'Home Goods', 'Electronics', 'Jewelry'].map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="category" checked={category === cat} onChange={() => setCategory(cat)} className="text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <input type="range" min="0" max="50000" className="w-full accent-indigo-600" />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>₹0</span>
                <span>₹50,000+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:border-indigo-500">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.filter(p => category === 'All' || p.category === category).map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full text-gray-500 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-xs text-indigo-600 font-semibold mb-1 uppercase tracking-wider">{product.category}</div>
                  <Link to={`/template-product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-1 truncate hover:text-indigo-600">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">1</button>
              <button className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center">2</button>
              <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateShopPage;
export { TemplateHeader, MOCK_PRODUCTS };
