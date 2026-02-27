import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Package, ChevronRight } from 'lucide-react';

const OrderHistoryPage = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const records = await pb.collection('orders').getList(1, 50, {
          filter: `userId="${currentUser.id}"`,
          sort: '-created',
          $autoCancel: false
        });
        setOrders(records.items);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser.id]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) return <div className="py-8">Loading orders...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
        <Package className="w-6 h-6 mr-2" /> Order History
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">No orders yet</h3>
          <p className="text-muted-foreground mb-6">When you place an order, it will appear here.</p>
          <Link to="/shop" className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-foreground">Order #{order.id.slice(0, 8).toUpperCase()}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium capitalize ${getStatusColor(order.status)}`}>
                    {order.status || 'Pending'}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Placed on {new Date(order.created).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="text-sm font-medium text-foreground mt-1">
                  Total: ₹{order.totalPrice?.toFixed(2)} • {order.products?.length || 0} items
                </div>
              </div>
              
              <Link 
                to={`/orders/${order.id}`}
                className="flex items-center justify-center px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors text-sm font-medium whitespace-nowrap"
              >
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
