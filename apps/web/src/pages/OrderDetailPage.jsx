import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import { ArrowLeft, Package, Truck, CreditCard, RefreshCw } from 'lucide-react';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const record = await pb.collection('orders').getOne(id, { $autoCancel: false });
        setOrder(record);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleReorder = () => {
    if (!order || !order.products) return;
    
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCart = [...currentCart, ...order.products];
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    navigate('/cart');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading order details...</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center">Order not found.</div>;

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/profile" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Profile
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary font-serif">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
            <p className="text-muted-foreground mt-1">
              Placed on {new Date(order.created).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <button 
            onClick={handleReorder}
            className="flex items-center justify-center px-5 py-2.5 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-secondary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Reorder Items
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card p-5 rounded-xl border border-border shadow-sm">
            <div className="flex items-center text-primary font-semibold mb-3">
              <Package className="w-5 h-5 mr-2" /> Order Status
            </div>
            <p className="text-lg capitalize font-medium">{order.status || 'Pending'}</p>
            {order.trackingNumber && (
              <p className="text-sm text-muted-foreground mt-2">Tracking: {order.trackingNumber}</p>
            )}
          </div>
          
          <div className="bg-card p-5 rounded-xl border border-border shadow-sm">
            <div className="flex items-center text-primary font-semibold mb-3">
              <Truck className="w-5 h-5 mr-2" /> Shipping Address
            </div>
            <p className="text-sm font-medium">{order.customerName}</p>
            <p className="text-sm text-muted-foreground mt-1">{order.address}</p>
            <p className="text-sm text-muted-foreground">{order.city}, {order.state} {order.zipCode}</p>
            <p className="text-sm text-muted-foreground mt-1">Phone: {order.phone}</p>
          </div>

          <div className="bg-card p-5 rounded-xl border border-border shadow-sm">
            <div className="flex items-center text-primary font-semibold mb-3">
              <CreditCard className="w-5 h-5 mr-2" /> Payment Info
            </div>
            <p className="text-sm font-medium capitalize">{order.paymentMethod || 'Cash on Delivery'}</p>
            <p className="text-sm text-muted-foreground mt-1 capitalize">Status: {order.paymentStatus || 'Pending'}</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border bg-muted/30">
            <h3 className="font-semibold text-lg">Order Items</h3>
          </div>
          <div className="divide-y border-border">
            {order.products && order.products.map((item, idx) => (
              <div key={idx} className="p-5 flex items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Img</div>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.size && `Size: ${item.size}`} {item.color && `| Color: ${item.color}`}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</p>
                </div>
                <div className="font-semibold text-primary">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 bg-muted/30 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{(order.totalPrice / 1.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Tax (5%)</span>
              <span>₹{(order.totalPrice - (order.totalPrice / 1.05)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>{order.shippingCost ? `₹${order.shippingCost}` : 'Free'}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-primary pt-3 border-t border-border mt-3">
              <span>Total</span>
              <span>₹{order.totalPrice?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
