import React from 'react';
import { ShieldCheck, Lock, CheckCircle, Award } from 'lucide-react';

const TrustSignals = () => {
  return (
    <div className="py-8 border-y border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center justify-center p-4">
            <ShieldCheck className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-semibold text-foreground font-serif">100% Secure</h4>
            <p className="text-xs text-muted-foreground mt-1">SSL Encrypted Checkout</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <Lock className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-semibold text-foreground font-serif">Safe Payments</h4>
            <p className="text-xs text-muted-foreground mt-1">Powered by Razorpay</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <CheckCircle className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-semibold text-foreground font-serif">GST Compliant</h4>
            <p className="text-xs text-muted-foreground mt-1">Automated Invoicing</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <Award className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-semibold text-foreground font-serif">Premium Quality</h4>
            <p className="text-xs text-muted-foreground mt-1">Verified Sellers Only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
