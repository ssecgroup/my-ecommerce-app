import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.passwordConfirm) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 8) {
      return setError('Password must be at least 8 characters long');
    }

    setLoading(true);
    try {
      await signup({
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        name: formData.name,
        phone: formData.phone,
        role: 'customer'
      });
      
      // Auto login after signup
      await login(formData.email, formData.password);
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError(err.response?.message || 'Failed to create an account. Email might already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-card p-8 rounded-2xl shadow-lg border border-border">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary font-serif">Create Account</h2>
          <p className="text-muted-foreground mt-2">Join Essa Garments today</p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              required
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70 mt-4"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-semibold hover:text-primary transition-colors">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
