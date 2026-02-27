import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import { LayoutDashboard, ShoppingBag, Users, Settings, TrendingUp, DollarSign, Package, Menu, Bell, Plus, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, customers: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be aggregated queries or specific endpoints
        const orders = await pb.collection('orders').getList(1, 5, { sort: '-created', $autoCancel: false });
        const products = await pb.collection('products').getList(1, 1, { $autoCancel: false });
        const users = await pb.collection('users').getList(1, 1, { filter: 'role="customer"', $autoCancel: false });
        
        let totalRev = 0;
        const allOrders = await pb.collection('orders').getFullList({ $autoCancel: false });
        allOrders.forEach(o => totalRev += o.totalPrice);

        setStats({
          revenue: totalRev,
          orders: allOrders.length,
          products: products.totalItems,
          customers: users.totalItems
        });
        setRecentOrders(orders.items);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statCards = [
    { title: 'Total Revenue', value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { title: 'Total Orders', value: stats.orders, icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Products', value: stats.products, icon: Package, color: 'bg-purple-100 text-purple-600' },
    { title: 'Total Customers', value: stats.customers, icon: Users, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-muted/30 font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-foreground text-white hidden md:flex flex-col shadow-xl z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="text-2xl font-bold font-serif tracking-tight text-primary">Vendor<span className="text-white">Hub</span></span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id ? 'bg-primary text-primary-foreground shadow-md' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/10">
          <Link to="/" className="text-sm text-white/50 hover:text-white flex items-center transition-colors">
            ← Back to Storefront
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-card shadow-sm flex items-center justify-between px-8 z-10 border-b border-border">
          <div className="flex items-center">
            <Menu className="w-6 h-6 text-muted-foreground md:hidden mr-4" />
            <h2 className="text-2xl font-bold text-foreground font-serif capitalize">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-muted-foreground hover:text-primary relative transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card"></span>
            </button>
            <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold border border-primary/30">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="flex items-center justify-center h-full">Loading dashboard...</div>
          ) : activeTab === 'dashboard' ? (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                  <div key={idx} className="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center hover:shadow-md transition-shadow">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-5 ${stat.color}`}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders Table */}
              <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-muted/20">
                  <h3 className="font-bold text-lg text-foreground font-serif">Recent Orders</h3>
                  <button className="text-sm text-primary font-medium hover:underline">View All Orders</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/30 text-muted-foreground text-sm uppercase tracking-wider">
                        <th className="px-8 py-4 font-semibold">Order ID</th>
                        <th className="px-8 py-4 font-semibold">Customer</th>
                        <th className="px-8 py-4 font-semibold">Date</th>
                        <th className="px-8 py-4 font-semibold">Amount</th>
                        <th className="px-8 py-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                      {recentOrders.length > 0 ? recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-8 py-5 font-medium text-primary">#{order.id.slice(0,8).toUpperCase()}</td>
                          <td className="px-8 py-5 text-foreground font-medium">{order.customerName}</td>
                          <td className="px-8 py-5 text-muted-foreground">{new Date(order.created).toLocaleDateString()}</td>
                          <td className="px-8 py-5 font-bold text-foreground">₹{order.totalPrice.toLocaleString('en-IN')}</td>
                          <td className="px-8 py-5">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan="5" className="px-8 py-8 text-center text-muted-foreground">No recent orders found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl shadow-sm border border-border p-16 text-center text-muted-foreground max-w-3xl mx-auto mt-10">
              <LayoutDashboard className="w-20 h-20 mx-auto mb-6 opacity-20 text-primary" />
              <h3 className="text-2xl font-bold text-foreground font-serif mb-3 capitalize">{activeTab} Management</h3>
              <p className="text-lg">This section is fully functional in the live VendorHub platform. Upgrade to premium to unlock all admin features.</p>
              <button className="mt-8 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md">
                Upgrade Plan
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
