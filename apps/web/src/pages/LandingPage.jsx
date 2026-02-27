import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, CreditCard, Truck, Users, Star, Smartphone, LayoutDashboard, Languages, ArrowRight, CheckCircle2 } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';

const LandingPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [plans, setPlans] = useState([]);
  const [billingCycle, setBillingCycle] = useState('monthly');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testiRes, plansRes] = await Promise.all([
          pb.collection('testimonials').getList(1, 4, { sort: '-created', $autoCancel: false }),
          pb.collection('plans').getList(1, 3, { sort: 'price', $autoCancel: false })
        ]);
        setTestimonials(testiRes.items);
        setPlans(plansRes.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const features = [
    { icon: ShoppingBag, title: 'Easy Product Management', tamil: 'எளிதான தயாரிப்பு மேலாண்மை', desc: 'Add, edit, and organize your products with zero technical knowledge.' },
    { icon: CreditCard, title: 'Built-in Payments', tamil: 'ஒருங்கிணைந்த கொடுப்பனவுகள்', desc: 'Accept UPI, Razorpay, and cards directly into your bank account.' },
    { icon: Truck, title: 'Shipping Integration', tamil: 'ஷிப்பிங் ஒருங்கிணைப்பு', desc: 'Connect with local delivery partners across Tamil Nadu.' },
    { icon: Users, title: 'Customer Accounts', tamil: 'வாடிக்கையாளர் கணக்குகள்', desc: 'Let customers save addresses and track their orders easily.' },
    { icon: Star, title: 'Reviews & Ratings', tamil: 'மதிப்புரைகள் & மதிப்பீடுகள்', desc: 'Build trust with verified customer reviews on your products.' },
    { icon: Smartphone, title: 'Mobile Friendly', tamil: 'மொபைல் நட்பு', desc: 'Your store looks perfect on every smartphone and tablet.' },
    { icon: LayoutDashboard, title: 'Admin Dashboard', tamil: 'நிர்வாக டாஷ்போர்டு', desc: 'Track sales, manage orders, and view analytics in one place.' },
    { icon: Languages, title: 'Tamil+English Support', tamil: 'தமிழ்+ஆங்கில ஆதரவு', desc: 'Serve your customers in their preferred language.' },
  ];

  const steps = [
    { num: '01', title: 'Sign Up', tamil: 'பதிவு செய்யவும்', desc: 'Create your account in 2 minutes.' },
    { num: '02', title: 'Add Products', tamil: 'பொருட்களை சேர்க்கவும்', desc: 'Upload photos and set prices.' },
    { num: '03', title: 'Start Selling', tamil: 'விற்பனையைத் தொடங்கவும்', desc: 'Share your store link with customers.' },
    { num: '04', title: 'Grow Business', tamil: 'வியாபாரத்தை வளர்க்கவும்', desc: 'Track orders and increase revenue.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1671054522961-6bf10e6d1f9b?q=80&w=2000"
            alt="Tamil Nadu Shop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground to-transparent opacity-90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white mt-16">
          <div className="inline-block py-1.5 px-4 rounded-full bg-primary/20 border border-primary/50 text-primary font-medium text-sm mb-6 backdrop-blur-sm">
            Made for Tamil Nadu Businesses 🌾
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-poppins leading-tight">
            உங்கள் கடையை ஆன்லைனுக்கு <br className="hidden md:block" />
            <span className="text-primary">கொண்டு வாருங்கள்</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 font-poppins text-white/90">
            Bring Your Shop Online
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/80 font-light">
            The easiest way for retail shops, boutiques, and grocers in Tamil Nadu to start selling online. No coding required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/template-shop"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-1 text-lg"
            >
              உங்கள் கடையை இப்போது தொடங்குங்கள்
              <span className="block text-sm font-normal opacity-90">Start Your Store Now</span>
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-lg"
            >
              திட்டங்களை பார்க்க
              <span className="block text-sm font-normal opacity-90">View Pricing</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground">
              எல்லா வசதிகளும் ஒரே இடத்தில் (All features in one place)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-poppins mb-1">{feature.title}</h3>
                  <h4 className="text-sm font-medium text-secondary mb-4">{feature.tamil}</h4>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins mb-4">
              How It Works | எப்படி செயல்படுகிறது
            </h2>
            <p className="text-lg text-muted-foreground">
              Start selling online in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold font-poppins mb-6 shadow-lg border-4 border-white">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-foreground font-poppins mb-1">{step.title}</h3>
                <h4 className="text-sm font-medium text-primary mb-3">{step.tamil}</h4>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins mb-4">
              Success Stories | வெற்றி கதைகள்
            </h2>
            <p className="text-lg text-muted-foreground">
              Join hundreds of shop owners growing their business with VendorHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? testimonials.map((t) => (
              <div key={t.id} className="bg-card p-8 rounded-2xl shadow-sm border border-border relative">
                <div className="flex text-primary mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-foreground text-lg italic mb-6">"{t.message}"</p>
                <div className="flex items-center justify-between border-t border-border pt-6">
                  <div>
                    <h4 className="font-bold text-foreground font-poppins">{t.name}</h4>
                    <p className="text-sm text-muted-foreground">{t.shopName}</p>
                  </div>
                  {t.salesFigure && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Monthly Sales</p>
                      <p className="font-bold text-secondary">{t.salesFigure}</p>
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center text-muted-foreground">Loading testimonials...</div>
            )}
          </div>
        </div>
      </section>

      {/* Template Preview CTA */}
      <section className="py-20 bg-foreground text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
            See What Your Store Could Look Like
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Explore our fully functional demo store. Experience the customer journey from browsing to checkout.
          </p>
          <Link
            to="/template-shop"
            className="inline-flex items-center px-8 py-4 bg-white text-foreground font-bold rounded-xl hover:bg-gray-100 transition-all text-lg shadow-xl"
          >
            Template-ஐ பார்க்கவும் | View Template <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
