import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Store, ShoppingCart, User } from 'lucide-react';
import LanguageToggle from './LanguageToggle.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.shop'), path: '/shop' },
    { name: t('nav.contact'), path: '/contact' },
    { name: t('nav.admin'), path: '/admin' },
  ];

  return (
    <header className="bg-background/90 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2.5 rounded-xl shadow-sm">
              <Store className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold font-serif text-foreground tracking-tight">
              Vendor<span className="text-primary">Hub</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <LanguageToggle />
            
            <div className="flex items-center space-x-4 border-l border-border pl-6">
              <Link to="/cart" className="text-foreground hover:text-primary transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
              </Link>
              <Link to="/admin" className="text-foreground hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <nav className="flex flex-col space-y-4 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Language</span>
                  <LanguageToggle />
                </div>
                <div className="flex space-x-4 pt-2">
                  <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center text-foreground hover:text-primary">
                    <ShoppingCart className="w-5 h-5 mr-2" /> Cart
                  </Link>
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center text-foreground hover:text-primary">
                    <User className="w-5 h-5 mr-2" /> Account
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
