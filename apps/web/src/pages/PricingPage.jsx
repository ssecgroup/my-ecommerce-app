import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';

const PricingPage = () => {
  const [plans, setPlans] = useState([]);
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const records = await pb.collection('plans').getList(1, 10, { sort: 'price', $autoCancel: false });
        setPlans(records.items);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const displayPlans = plans.filter(p => p.billingCycle === (isYearly ? 'yearly' : 'monthly'));

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6">
            VendorHub Pricing Plans <br/>
            <span className="text-2xl text-primary mt-2 block">VendorHub விலை திட்டங்கள்</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Simple, transparent pricing for businesses of all sizes. No hidden fees.
          </p>
          
          <div className="inline-flex items-center p-1 bg-card border border-border rounded-xl shadow-sm">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${!isYearly ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center ${isYearly ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Yearly <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">Save 20%</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading plans...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {displayPlans.map((plan) => (
              <div key={plan.id} className={`bg-card rounded-2xl border ${plan.isPopular ? 'border-primary shadow-xl relative transform md:-translate-y-4' : 'border-border shadow-sm'} p-8 flex flex-col`}>
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 h-10">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-foreground">₹{plan.price}</span>
                  <span className="text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features && plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/contact" 
                  className={`w-full py-3.5 rounded-xl font-bold text-center transition-all ${plan.isPopular ? 'bg-primary text-white hover:bg-primary/90 shadow-md' : 'bg-muted text-foreground hover:bg-border'}`}
                >
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingPage;
