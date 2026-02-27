import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = () => {
      setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    };
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background">
        <h2 className="text-2xl font-bold text-primary mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
                <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} className="w-24 h-24 object-cover rounded-md bg-muted" />
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.size && `Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                  </p>
                  <div className="text-primary font-bold mt-1">₹{item.price}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-input rounded-md">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)} className="px-3 py-1 hover:bg-muted text-foreground">-</button>
                    <span className="px-3 py-1 text-foreground">{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)} className="px-3 py-1 hover:bg-muted text-foreground">+</button>
                  </div>
                  <button onClick={() => removeItem(index)} className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card p-6 rounded-lg border border-border shadow-sm h-fit sticky top-24">
            <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Estimated Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg text-primary">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center font-semibold"
            >
              Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
