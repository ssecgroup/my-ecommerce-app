import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import PaymentIntegration from '@/components/PaymentIntegration.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment
  const [orderId, setOrderId] = useState(null);
  
  const [formData, setFormData] = useState({
    customerName: '', email: '', phone: '', address: '', city: '', state: '', zipCode: ''
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    if (items.length === 0 && !orderId) {
      navigate('/shop');
    }
    setCart(items);
  }, [navigate, orderId]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + (subtotal * 0.05);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const orderData = {
        ...formData,
        products: cart,
        totalPrice: total,
        status: 'processing',
        paymentMethod: paymentData.method,
        paymentStatus: paymentData.status
      };

      const record = await pb.collection('orders').create(orderData, { $autoCancel: false });
      
      setOrderId(record.id);
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
      setStep(1);
    }
  };

  if (orderId) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background px-4 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-4xl font-bold text-foreground font-serif mb-4">Order Confirmed!</h1>
        <p className="text-lg text-muted-foreground mb-2">Thank you for your purchase.</p>
        <p className="text-foreground font-medium mb-8 bg-card px-6 py-3 rounded-xl border border-border shadow-sm">Order ID: {orderId}</p>
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 shadow-md">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground font-serif mb-8 text-center">{t('checkout.title')}</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {step === 1 ? (
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                <h2 className="text-2xl font-bold font-serif mb-6">Shipping Details</h2>
                <form onSubmit={handleDetailsSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <input required type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="w-full p-3.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                      <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-3.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City</label>
                      <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-3.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">State</label>
                      <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-3.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
                      <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full p-3.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 font-bold text-lg transition-all shadow-md mt-8">
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              <PaymentIntegration 
                amount={total} 
                onSuccess={handlePaymentSuccess} 
                onCancel={() => setStep(1)} 
              />
            )}
          </div>

          <div className="lg:w-1/3">
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border sticky top-24">
              <h3 className="text-xl font-bold font-serif mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{item.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (5%)</span>
                  <span>₹{(subtotal * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
