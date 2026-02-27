import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { CreditCard, Smartphone, Wallet, Building, Truck, ShieldCheck } from 'lucide-react';

const PaymentIntegration = ({ amount, onSuccess, onCancel }) => {
  const { t } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [loading, setLoading] = useState(false);

  const methods = [
    { id: 'upi', name: 'UPI / QR', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, desc: 'All major Indian banks' },
    { id: 'wallet', name: 'Wallets', icon: Wallet, desc: 'Amazon Pay, Mobikwik' },
    { id: 'cod', name: 'Cash on Delivery', icon: Truck, desc: 'Pay when you receive' },
  ];

  const handlePayment = () => {
    setLoading(true);
    // Simulate Razorpay payment flow
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        paymentId: `pay_${Math.random().toString(36).substring(2, 15)}`,
        method: selectedMethod,
        status: 'completed'
      });
    }, 2000);
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/30 flex justify-between items-center">
        <h3 className="text-xl font-bold font-serif text-foreground">{t('checkout.payment')}</h3>
        <div className="flex items-center text-green-600 text-sm font-medium">
          <ShieldCheck className="w-4 h-4 mr-1" /> Secure
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-3 mb-8">
          {methods.map((method) => {
            const Icon = method.icon;
            return (
              <label 
                key={method.id} 
                className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedMethod === method.id 
                    ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                    : 'border-border hover:border-primary/50 hover:bg-muted/30'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment_method" 
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div className="ml-4 flex items-center flex-grow">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border mr-4 shadow-sm">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{method.name}</div>
                    <div className="text-xs text-muted-foreground">{method.desc}</div>
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="text-2xl font-bold text-foreground">₹{amount.toFixed(2)}</span>
          </div>
          
          <div className="flex gap-4">
            {onCancel && (
              <button 
                onClick={onCancel}
                disabled={loading}
                className="px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            )}
            <button 
              onClick={handlePayment}
              disabled={loading}
              className="flex-grow py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
              ) : (
                `${t('checkout.pay_now')} ₹${amount.toFixed(2)}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentIntegration;
