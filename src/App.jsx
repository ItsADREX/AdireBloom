import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import TrackOrder from './pages/TrackOrder';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LegalPage from './pages/LegalPage';
import SimplePage from './pages/SimplePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route
                path="/cart"
                element={
                  <RequireAuth>
                    <Cart />
                  </RequireAuth>
                }
              />
              <Route
                path="/checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/terms" element={<LegalPage docKey="terms" />} />
              <Route path="/refund-policy" element={<LegalPage docKey="refund" />} />
              <Route path="/privacy-policy" element={<LegalPage docKey="privacy" />} />
              <Route
                path="/faq"
                element={
                  <SimplePage title="Frequently Asked Questions">
                    <h2 className="font-display text-xl font-semibold text-ink mt-6 mb-2">Do I need an account to shop?</h2>
                    <p>Yes. You can browse products, read our blog, and view details without an account. To add items to your bag and checkout, you must create a free account and agree to our policies.</p>
                    <h2 className="font-display text-xl font-semibold text-ink mt-6 mb-2">How long does delivery take?</h2>
                    <p>Standard delivery takes 3–7 business days within Nigeria. Bespoke orders take an additional 2–4 weeks production time.</p>
                    <h2 className="font-display text-xl font-semibold text-ink mt-6 mb-2">Can I return or exchange an item?</h2>
                    <p>Yes. We accept returns within 14 days of delivery for unworn items in original condition. See our Refund Policy for full details.</p>
                    <h2 className="font-display text-xl font-semibold text-ink mt-6 mb-2">What payment methods are accepted?</h2>
                    <p>We accept debit cards, bank transfers, and USSD via Paystack — Nigeria&apos;s trusted payment gateway.</p>
                    <h2 className="font-display text-xl font-semibold text-ink mt-6 mb-2">Are the fabrics truly hand-dyed?</h2>
                    <p>Yes, every piece is hand-dyed by skilled artisans using traditional Adire techniques. No two pieces are exactly alike.</p>
                  </SimplePage>
                }
              />
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-24">
                    <p className="font-display text-5xl font-semibold text-ink/20">404</p>
                    <p className="font-body text-sm text-ink/60">Page not found</p>
                    <a href="/" className="btn-primary text-sm">Go Home</a>
                  </div>
                }
              />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
