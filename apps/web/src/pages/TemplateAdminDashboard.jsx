import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Settings, TrendingUp, DollarSign, Package, Menu, Bell } from 'lucide-react';

const TemplateAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { title: 'Total Revenue', value: '₹1,24,500', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { title: 'Total Orders', value: '156', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Products', value: '48', icon: Package, color: 'bg-purple-100 text-purple-600' },
    { title: 'Total Customers', value: '892', icon: Users, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <span className="text-xl font-bold">Store Admin</span>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1">
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
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link to="/template-shop" className="text-sm text-gray-400 hover:text-white flex items-center">
            ← Back to Storefront
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
          <div className="flex items-center">
            <Menu className="w-6 h-6 text-gray-500 md:hidden mr-4" />
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Recent Orders</h3>
                  <button className="text-sm text-indigo-600 font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm">
                        <th className="px-6 py-3 font-medium">Order ID</th>
                        <th className="px-6 py-3 font-medium">Customer</th>
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium">Amount</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-indigo-600">#ORD-00{i}</td>
                          <td className="px-6 py-4 text-gray-900">Customer Name {i}</td>
                          <td className="px-6 py-4 text-gray-500">Oct {10 + i}, 2023</td>
                          <td className="px-6 py-4 font-medium text-gray-900">₹{(i * 1250).toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${i % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {i % 2 === 0 ? 'Delivered' : 'Processing'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
              <LayoutDashboard className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">{activeTab} Management</h3>
              <p>This section is fully functional in the live VendorHub platform.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TemplateAdminDashboard;
