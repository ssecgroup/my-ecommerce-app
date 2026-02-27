import React, { useState } from 'react';
import pb from '@/lib/pocketbaseClient';
import { Factory, CheckCircle } from 'lucide-react';

const QuotationPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    productType: '',
    quantity: '',
    specifications: '',
    timeline: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pb.collection('b2b_quotations').create({
        ...formData,
        quantity: parseInt(formData.quantity, 10),
        status: 'pending'
      }, { $autoCancel: false });
      setSuccess(true);
      setFormData({
        companyName: '', contactPerson: '', email: '', phone: '',
        productType: '', quantity: '', specifications: '', timeline: ''
      });
    } catch (error) {
      console.error('Error submitting quotation:', error);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Factory className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">B2B Manufacturing Inquiry</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Partner with Essa Garments for your bulk apparel manufacturing needs. 
            Please fill out the form below with your requirements, and our team will get back to you with a detailed quotation.
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Inquiry Submitted Successfully!</h2>
            <p className="text-green-700 mb-6">Thank you for your interest. Our B2B team will review your requirements and contact you shortly.</p>
            <button onClick={() => setSuccess(false)} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <div className="bg-card p-6 md:p-8 rounded-xl shadow-lg border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Company Name *</label>
                  <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Contact Person *</label>
                  <input required type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full p-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Product Type *</label>
                  <input required type="text" name="productType" placeholder="e.g., Men's Polo Shirts" value={formData.productType} onChange={handleChange} className="w-full p-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Estimated Quantity *</label>
                  <input required type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Expected Timeline</label>
                  <input type="text" name="timeline" placeholder="e.g., Within 2 months" value={formData.timeline} onChange={handleChange} className="w-full p-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Detailed Specifications</label>
                  <textarea name="specifications" rows="4" placeholder="Fabric requirements, sizing breakdown, special instructions..." value={formData.specifications} onChange={handleChange} className="w-full p-3 rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-bold text-lg transition-colors disabled:opacity-70"
              >
                {loading ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationPage;
