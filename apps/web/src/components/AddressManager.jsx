import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import AddressForm from './AddressForm.jsx';
import { MapPin, Edit2, Trash2, Plus } from 'lucide-react';

const AddressManager = () => {
  const { currentUser } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('addresses').getList(1, 50, {
        filter: `userId="${currentUser.id}"`,
        sort: '-isDefault,-created',
        $autoCancel: false
      });
      setAddresses(records.items);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [currentUser.id]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await pb.collection('addresses').delete(id, { $autoCancel: false });
        fetchAddresses();
      } catch (error) {
        console.error('Error deleting address:', error);
        alert('Failed to delete address.');
      }
    }
  };

  if (loading && addresses.length === 0) return <div>Loading addresses...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Saved Addresses</h2>
        {!showForm && (
          <button 
            onClick={() => { setEditingAddress(null); setShowForm(true); }}
            className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New
          </button>
        )}
      </div>

      {showForm ? (
        <AddressForm 
          address={editingAddress} 
          onSuccess={() => { setShowForm(false); fetchAddresses(); }} 
          onCancel={() => setShowForm(false)} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground bg-muted/50 rounded-lg border border-dashed border-border">
              No addresses saved yet.
            </div>
          ) : (
            addresses.map(addr => (
              <div key={addr.id} className="bg-card p-5 rounded-xl border border-border shadow-sm relative">
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
                    Default
                  </span>
                )}
                <div className="flex items-start mb-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{addr.street}</p>
                    <p className="text-muted-foreground text-sm">{addr.city}, {addr.state} {addr.zipCode}</p>
                    <p className="text-muted-foreground text-sm">{addr.country}</p>
                    <p className="text-muted-foreground text-sm mt-1">Phone: {addr.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-3 mt-4 pt-4 border-t border-border">
                  <button 
                    onClick={() => { setEditingAddress(addr); setShowForm(true); }}
                    className="flex items-center text-sm text-secondary hover:text-primary transition-colors"
                  >
                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(addr.id)}
                    className="flex items-center text-sm text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AddressManager;
