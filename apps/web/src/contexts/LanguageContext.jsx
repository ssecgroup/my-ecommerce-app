import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'hero.title': 'Your Online Store in Minutes',
    'hero.subtitle': 'Empowering local businesses to thrive in the digital world. Bring your shop online effortlessly.',
    'hero.cta': 'Start Selling Now',
    'benefits.title': 'Why Choose VendorHub?',
    'benefits.1.title': 'Quick Setup',
    'benefits.1.desc': 'Launch your store in under 10 minutes with zero technical knowledge.',
    'benefits.2.title': 'Secure Payments',
    'benefits.2.desc': 'Integrated with Razorpay for seamless UPI, Card, and Wallet payments.',
    'benefits.3.title': 'Local Support',
    'benefits.3.desc': 'Dedicated support team based in Tamil Nadu to help you grow.',
    'benefits.4.title': 'Mobile Optimized',
    'benefits.4.desc': 'Manage your store and receive orders directly from your smartphone.',
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have questions? Our team is ready to help you.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.whatsapp': 'Chat on WhatsApp',
    'shop.title': 'Our Products',
    'shop.filter': 'Filters',
    'shop.search': 'Search products...',
    'product.add_to_cart': 'Add to Cart',
    'product.buy_now': 'Buy Now',
    'product.description': 'Description',
    'product.related': 'Related Products',
    'checkout.title': 'Checkout',
    'checkout.payment': 'Payment Method',
    'checkout.pay_now': 'Pay Now',
    'wa.greeting': 'Hi! 👋 Need help setting up your online store? Chat with us on WhatsApp!'
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.shop': 'கடை',
    'nav.pricing': 'விலை',
    'nav.contact': 'தொடர்பு',
    'nav.admin': 'நிர்வாகி',
    'hero.title': 'நிமிடங்களில் உங்கள் ஆன்லைன் கடை',
    'hero.subtitle': 'உள்ளூர் வணிகங்களை டிஜிட்டல் உலகில் வளரச் செய்தல். உங்கள் கடையை எளிதாக ஆன்லைனில் கொண்டு வாருங்கள்.',
    'hero.cta': 'இப்போதே விற்கத் தொடங்குங்கள்',
    'benefits.title': 'ஏன் எங்களை தேர்வு செய்ய வேண்டும்?',
    'benefits.1.title': 'விரைவான அமைப்பு',
    'benefits.1.desc': 'தொழில்நுட்ப அறிவு இல்லாமல் 10 நிமிடங்களுக்குள் உங்கள் கடையை தொடங்குங்கள்.',
    'benefits.2.title': 'பாதுகாப்பான கொடுப்பனவுகள்',
    'benefits.2.desc': 'UPI, கார்டு மற்றும் வாலட் கொடுப்பனவுகளுக்கு ரேஸர்பே உடன் ஒருங்கிணைக்கப்பட்டுள்ளது.',
    'benefits.3.title': 'உள்ளூர் ஆதரவு',
    'benefits.3.desc': 'நீங்கள் வளர உதவ தமிழ்நாட்டில் உள்ள அர்ப்பணிப்புள்ள ஆதரவு குழு.',
    'benefits.4.title': 'மொபைல் உகந்ததாக்கப்பட்டது',
    'benefits.4.desc': 'உங்கள் கடையை நிர்வகிக்கவும் மற்றும் உங்கள் ஸ்மார்ட்போனிலிருந்து நேரடியாக ஆர்டர்களைப் பெறவும்.',
    'contact.title': 'தொடர்பு கொள்ளவும்',
    'contact.subtitle': 'கேள்விகள் உள்ளதா? உங்களுக்கு உதவ எங்கள் குழு தயாராக உள்ளது.',
    'contact.form.name': 'முழு பெயர்',
    'contact.form.email': 'மின்னஞ்சல் முகவரி',
    'contact.form.phone': 'தொலைபேசி எண்',
    'contact.form.message': 'செய்தி',
    'contact.form.submit': 'செய்தியை அனுப்பு',
    'contact.whatsapp': 'வாட்ஸ்அப்பில் அரட்டையடிக்கவும்',
    'shop.title': 'எங்கள் தயாரிப்புகள்',
    'shop.filter': 'வடிகட்டிகள்',
    'shop.search': 'தயாரிப்புகளைத் தேடுங்கள்...',
    'product.add_to_cart': 'கூடையில் சேர்',
    'product.buy_now': 'இப்பொழுதே வாங்குங்கள்',
    'product.description': 'விளக்கம்',
    'product.related': 'தொடர்புடைய தயாரிப்புகள்',
    'checkout.title': 'வெளியேறு',
    'checkout.payment': 'கட்டணம் செலுத்தும் முறை',
    'checkout.pay_now': 'இப்போது செலுத்துங்கள்',
    'wa.greeting': 'வணக்கம்! 👋 உங்கள் ஆன்லைன் கடையை அமைக்க உதவி தேவையா? வாட்ஸ்அப்பில் எங்களுடன் அரட்டையடிக்கவும்!'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
