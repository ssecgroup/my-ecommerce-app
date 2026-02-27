import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import TrustSignals from '@/components/TrustSignals.jsx';
import { Store, Zap, Shield, Headphones, Smartphone, ArrowRight, Star } from 'lucide-react';

const HomePage = () => {
  const { t, language } = useLanguage();

  const benefits = [
    { icon: Zap, title: t('benefits.1.title'), desc: t('benefits.1.desc') },
    { icon: Shield, title: t('benefits.2.title'), desc: t('benefits.2.desc') },
    { icon: Headphones, title: t('benefits.3.title'), desc: t('benefits.3.desc') },
    { icon: Smartphone, title: t('benefits.4.title'), desc: t('benefits.4.desc') },
  ];

  const testimonials = [
    { name: 'Karthik R.', store: 'Chennai Silks', text: 'VendorHub transformed my local shop into a statewide business. The Tamil interface makes it so easy for my staff to use.', rating: 5 },
    { name: 'Priya M.', store: 'Priya Organics', text: 'Setup took literally 10 minutes. The Razorpay integration works flawlessly. Highly recommended for TN businesses.', rating: 5 },
    { name: 'Suresh K.', store: 'Madurai Electronics', text: 'The WhatsApp support is incredible. Whenever I have an issue, they resolve it immediately.', rating: 4 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1656042744506-1d3c6e2b013e?q=80&w=2000"
            alt="Store Owner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm mb-8">
            <Store className="w-4 h-4 mr-2" />
            <span className="text-sm font-semibold tracking-wide uppercase">#1 Platform in Tamil Nadu</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-serif leading-tight max-w-4xl mx-auto">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center text-lg"
            >
              {t('hero.cta')} <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm flex items-center justify-center text-lg"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </section>

      <TrustSignals />

      {/* Benefits Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif mb-4">{t('benefits.title')}</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-serif mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-serif mb-4">Trusted by Local Owners</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-card p-8 rounded-2xl border border-border shadow-sm relative">
                <div className="flex text-primary mb-4">
                  {[...Array(test.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-foreground italic mb-6 leading-relaxed">"{test.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-full flex items-center justify-center font-bold text-xl mr-4">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{test.name}</h4>
                    <p className="text-sm text-muted-foreground">{test.store}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
