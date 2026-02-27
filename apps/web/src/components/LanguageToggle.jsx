import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium text-sm"
      aria-label="Toggle Language"
    >
      <Globe className="w-4 h-4" />
      <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
    </button>
  );
};

export default LanguageToggle;
