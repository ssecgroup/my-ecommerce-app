import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {showTooltip && (
        <div className="mb-4 bg-card text-card-foreground p-4 rounded-2xl shadow-xl border border-border max-w-[250px] relative animate-in slide-in-from-bottom-5 fade-in duration-300">
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-sm font-medium pr-4 leading-relaxed">
            {t('wa.greeting')}
          </p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-b border-r border-border transform rotate-45"></div>
        </div>
      )}
      
      <a
        href="https://wa.me/918489158365"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
