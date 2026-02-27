import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/template')) return null;
  return <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Store className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold font-poppins tracking-tight">
                Vendor<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Empowering Tamil Nadu's small businesses to thrive in the digital world. Bring your shop online in minutes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold font-poppins mb-6 text-primary">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link to="/" className="hover:text-primary transition-colors">Home / முகப்பு</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing / விலை</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ / கேள்விகள்</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact / தொடர்பு</Link></li>
              <li><Link to="/template-shop" className="hover:text-primary transition-colors">View Demo / டெமோ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold font-poppins mb-6 text-primary">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-secondary flex-shrink-0 mt-0.5" />
                <span>123, Anna Salai, T. Nagar<br />Chennai, Tamil Nadu 600017</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                <span>+91 8489158365</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                <span>shiyanthans@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold font-poppins mb-6 text-primary">Newsletter</h4>
            <p className="text-sm text-white/80 mb-4">Subscribe for tips on growing your online business.</p>
            <form className="flex flex-col gap-2" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-primary" />
              <button className="px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} VendorHub. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
