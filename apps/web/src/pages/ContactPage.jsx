import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import TrustSignals from '@/components/TrustSignals.jsx';

const ContactPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pb.collection('contact_forms').create({
        ...formData,
        subject: 'General Inquiry'
      }, { $autoCancel: false });
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-foreground text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">{t('contact.title')}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-10">
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-lg h-full">
              <h3 className="text-2xl font-bold text-foreground font-serif mb-8">Contact Details</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Mobile & WhatsApp</h4>
                    <p className="text-muted-foreground text-lg">+91 84891 58365</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email Address</h4>
                    <p className="text-muted-foreground text-lg">shiyanthans@gmail.com</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <a 
                    href="https://wa.me/918489158365" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-all flex items-center justify-center shadow-md"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('contact.whatsapp')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-card p-8 md:p-10 rounded-2xl border border-border shadow-lg">
              {success && (
                <div className="mb-8 p-4 bg-green-50 text-green-800 border border-green-200 rounded-xl flex items-center">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">✓</div>
                  <p className="font-medium">Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t('contact.form.name')} *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t('contact.form.email')} *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none transition-all" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('contact.form.phone')}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none transition-all" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('contact.form.message')} *</label>
                  <textarea required name="message" rows="5" value={formData.message} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none resize-none transition-all"></textarea>
                </div>
                
                <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center text-lg">
                  {loading ? 'Sending...' : <><Send className="w-5 h-5 mr-2" /> {t('contact.form.submit')}</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <TrustSignals />
    </div>
  );
};

export default ContactPage;
