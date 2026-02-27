import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import AddressManager from '@/components/AddressManager.jsx';
import AccountSettingsPage from './AccountSettingsPage.jsx';
import OrderHistoryPage from './OrderHistoryPage.jsx';
import { User, MapPin, Settings, Package, Edit3 } from 'lucide-react';

const UserProfilePage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || ''
  });
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pb.collection('users').update(currentUser.id, profileData, { $autoCancel: false });
      setIsEditingProfile(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-primary font-serif mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border bg-primary/5">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                  {currentUser?.name?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold text-lg truncate">{currentUser?.name || 'User'}</h3>
                <p className="text-sm text-muted-foreground truncate">{currentUser?.email}</p>
              </div>
              <nav className="flex flex-col p-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            {activeTab === 'profile' && (
              <div className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary flex items-center">
                    <User className="w-6 h-6 mr-2" /> Profile Information
                  </h2>
                  {!isEditingProfile && (
                    <button 
                      onClick={() => setIsEditingProfile(true)}
                      className="flex items-center text-sm text-secondary hover:text-primary transition-colors font-medium"
                    >
                      <Edit3 className="w-4 h-4 mr-1" /> Edit Profile
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full p-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={currentUser?.email} 
                        disabled
                        className="w-full p-2.5 rounded-md border border-input bg-muted text-muted-foreground cursor-not-allowed"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={profileData.phone} 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full p-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <button 
                        type="button" 
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2 rounded-md border border-input hover:bg-muted transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6 max-w-md">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                      <p className="font-medium text-lg">{currentUser?.name || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                      <p className="font-medium text-lg">{currentUser?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                      <p className="font-medium text-lg">{currentUser?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && <OrderHistoryPage />}
            {activeTab === 'addresses' && <AddressManager />}
            {activeTab === 'settings' && <AccountSettingsPage />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
