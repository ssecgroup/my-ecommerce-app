import React, { useState } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';

const AddressForm = ({ address, onSuccess, onCancel }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: address?.street || '',
    city: address?.city || '',
    state: address?.state || '',
    zipCode: address?.zipCode || '',
    country: address?.country || 'India',
    phone: address?.phone || '',
    isDefault: address?.isDefault || false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...formData, userId: currentUser.id };
      
      if (address?.id) {
        await pb.collection('addresses').update(address.id, data, { $autoCancel: false });
      } else {
        await pb.collection('addresses').create(data, { $autoCancel: false });
      }
      
      // If set as default, we might need to unset others, but keeping it simple for now
      onSuccess();
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg border border-border">
      <h3 className="text-lg font-semibold mb-4">{address ? 'Edit Address' : 'Add New Address'}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Street Address</label>
          <input required type="text" name="street" value={formData.street} onChange={handleChange} className="w-full p-2 rounded border border-input bg-background" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-2 rounded border border-input bg-background" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-2 rounded border border-input bg-background" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">ZIP Code</label>
          <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full p-2 rounded border border-input bg-background" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input required type="text" name="country" value={formData.country} onChange={handleChange} className="w-full p-2 rounded border border-input bg-background" />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 rounded border border-input bg-background" />
        </div>
      </div>

      <div className="flex items-center mt-4">
        <input type="checkbox" id="isDefault" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="mr-2" />
        <label htmlFor="isDefault" className="text-sm">Set as default address</label>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded border border-input hover:bg-muted">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Address'}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
