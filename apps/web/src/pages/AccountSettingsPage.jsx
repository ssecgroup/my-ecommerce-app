import React, { useState } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Shield } from 'lucide-react';

const AccountSettingsPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwords.password !== passwords.passwordConfirm) {
      return setMessage({ type: 'error', text: 'New passwords do not match.' });
    }
    if (passwords.password.length < 8) {
      return setMessage({ type: 'error', text: 'Password must be at least 8 characters.' });
    }

    setLoading(true);
    try {
      await pb.collection('users').update(currentUser.id, passwords, { $autoCancel: false });
      setMessage({ type: 'success', text: 'Password updated successfully.' });
      setPasswords({ oldPassword: '', password: '', passwordConfirm: '' });
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage({ type: 'error', text: error.response?.message || 'Failed to update password. Check your old password.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
        <Shield className="w-6 h-6 mr-2" /> Security Settings
      </h2>

      <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        
        {message.text && (
          <div className={`p-3 rounded-md mb-4 text-sm ${message.type === 'error' ? 'bg-destructive/10 text-destructive border border-destructive/20' : 'bg-green-100 text-green-800 border border-green-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              name="oldPassword"
              required
              value={passwords.oldPassword}
              onChange={handleChange}
              className="w-full p-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              name="password"
              required
              value={passwords.password}
              onChange={handleChange}
              className="w-full p-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              name="passwordConfirm"
              required
              value={passwords.passwordConfirm}
              onChange={handleChange}
              className="w-full p-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
