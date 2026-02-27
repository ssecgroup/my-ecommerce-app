import React from 'react';
import { Route, Routes, BrowserRouter as Router, Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

// Fallback pages for routes that might be linked but not fully implemented in this prompt
const PlaceholderPage = ({ title }) => (
  <div className="min-h-[60vh] flex items-center justify-center bg-background">
    <h1 className="text-3xl font-bold text-foreground font-serif">{title}</h1>
  </div>
);

const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
    return (
        <LanguageProvider>
            <Router>
                <ScrollToTop />
                <WhatsAppButton />
                <Routes>
                    {/* Main Layout Routes */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/cart" element={<PlaceholderPage title="Cart Page" />} />
                        <Route path="/pricing" element={<PlaceholderPage title="Pricing Page" />} />
                        <Route path="/faq" element={<PlaceholderPage title="FAQ Page" />} />
                    </Route>

                    {/* Admin Route (No main header/footer) */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    
                    {/* Legacy Template Routes mapping to new pages */}
                    <Route path="/template-shop" element={<ShopPage />} />
                    <Route path="/template-admin" element={<AdminDashboard />} />
                </Routes>
            </Router>
        </LanguageProvider>
    );
}

export default App;
