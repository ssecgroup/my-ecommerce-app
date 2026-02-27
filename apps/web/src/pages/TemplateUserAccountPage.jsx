import React, { useState } from 'react';
import { TemplateHeader } from './TemplateShopPage.jsx';
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';

const TemplateUserAccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <TemplateHeader />
      
      <div className="bg-indigo-900 text-white py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold font-serif">My Account</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
              </div>
              <nav className="p-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-indigo-50 text-indigo-700' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-3" />
                        {tab.label}
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </button>
                  );
                })}
                <button className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 mt-4 transition-colors">
                  <LogOut className="w-5 h-5 mr-3" /> Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 min-h-[500px]">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input type="text" defaultValue="John" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input type="email" defaultValue="john@example.com" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>
                  <button className="mt-8 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Save Changes</button>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-gray-900">Order #ORD-2023-{i}84</span>
                            <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-bold rounded-full">Delivered</span>
                          </div>
                          <p className="text-sm text-gray-500">Placed on Oct 12, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-lg">₹4,500</p>
                          <button className="text-indigo-600 text-sm font-medium hover:underline">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other tabs would go here, keeping it brief for template */}
              {['addresses', 'wishlist', 'settings'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <p>This section is fully functional in the live store.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateUserAccountPage;
