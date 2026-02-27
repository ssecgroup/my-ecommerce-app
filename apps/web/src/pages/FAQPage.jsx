import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What payment methods are supported? | என்னென்ன கட்டண முறைகள் உள்ளன?",
      a: "We support UPI (GPay, PhonePe, Paytm), Razorpay, Credit/Debit Cards, and Net Banking. Cash on Delivery (COD) can also be enabled. | நாங்கள் UPI, Razorpay, கார்டுகள் மற்றும் நெட் பேங்கிங் ஆகியவற்றை ஆதரிக்கிறோம். COD வசதியும் உள்ளது."
    },
    {
      q: "Do I need technical knowledge to use VendorHub? | எனக்கு தொழில்நுட்ப அறிவு தேவையா?",
      a: "Not at right! VendorHub is designed to be as easy as using WhatsApp. You can manage everything from your mobile phone. | இல்லை! வாட்ஸ்அப் பயன்படுத்துவது போல இது மிகவும் எளிதானது. உங்கள் மொபைலிலிருந்தே அனைத்தையும் நிர்வகிக்கலாம்."
    },
    {
      q: "How does shipping work? | ஷிப்பிங் எப்படி செயல்படுகிறது?",
      a: "You can use your own delivery boys for local delivery, or integrate with our partners like Shiprocket to deliver across Tamil Nadu and India. | உள்ளூர் டெலிவரிக்கு உங்கள் ஆட்களைப் பயன்படுத்தலாம் அல்லது தமிழ்நாடு முழுவதும் டெலிவரி செய்ய எங்கள் பார்ட்னர்களைப் பயன்படுத்தலாம்."
    },
    {
      q: "Can I use my own domain name? | எனது சொந்த டொமைன் பெயரைப் பயன்படுத்தலாமா?",
      a: "Yes, on Professional and Enterprise plans, you can connect your own custom domain (e.g., www.yourshop.com). | ஆம், Professional மற்றும் Enterprise திட்டங்களில் உங்கள் சொந்த டொமைனை இணைக்கலாம்."
    },
    {
      q: "Is my data secure? | எனது தரவுகள் பாதுகாப்பாக உள்ளதா?",
      a: "Absolutely. We use bank-level encryption to protect your store data and customer information. | நிச்சயமாக. உங்கள் தரவுகளைப் பாதுகாக்க வங்கி அளவிலான பாதுகாப்பைப் பயன்படுத்துகிறோம்."
    },
    {
      q: "How long does it take to set up? | கடையை அமைக்க எவ்வளவு நேரம் ஆகும்?",
      a: "You can set up your basic store and add your first 10 products in less than 30 minutes. | 30 நிமிடங்களுக்குள் உங்கள் கடையை அமைத்து முதல் 10 பொருட்களைச் சேர்க்கலாம்."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground font-poppins mb-4">
            Frequently Asked Questions
          </h1>
          <h2 className="text-2xl text-primary font-poppins mb-8">
            அடிக்கடி கேட்கப்படும் கேள்விகள்
          </h2>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search your question... / உங்கள் கேள்வியைத் தேடுங்கள்..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? filteredFaqs.map((faq, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-lg text-foreground pr-8">{faq.q}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-5 text-muted-foreground border-t border-border pt-4 leading-relaxed">
                  {faq.a.split('|').map((part, i) => (
                    <p key={i} className={i > 0 ? "mt-2 text-secondary font-medium" : ""}>{part.trim()}</p>
                  ))}
                </div>
              )}
            </div>
          )) : (
            <div className="text-center py-12 text-muted-foreground">
              No questions found matching your search.
            </div>
          )}
        </div>

        <div className="mt-16 text-center bg-primary/10 rounded-2xl p-8 border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground font-poppins mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">We're here to help you get started.</p>
          <a href="/contact" className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
