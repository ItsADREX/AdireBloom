import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference') || searchParams.get('trxref');
  const [status, setStatus] = useState('verifying'); // verifying | success | failed

  useEffect(() => {
    if (!reference) {
      setStatus('failed');
      return;
    }
    axios
      .get(`${API_BASE}/api/payment/verify/${reference}`)
      .then(({ data }) => setStatus(data.status === 'success' ? 'success' : 'failed'))
      .catch(() => setStatus('failed'));
  }, [reference]);

  if (status === 'verifying') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-6">
        <div className="w-12 h-12 border-4 border-indigo border-t-transparent rounded-full animate-spin" />
        <p className="font-body text-sm text-ink/60">Verifying your payment…</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center gap-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink">Payment Not Confirmed</h1>
        <p className="font-body text-sm text-ink/60 max-w-md leading-relaxed">
          We couldn't verify your payment. If you were charged, please contact us at{' '}
          <a href="mailto:hello@adirebloom.com" className="text-indigo underline">hello@adirebloom.com</a> with reference: <strong>{reference}</strong>.
        </p>
        <div className="flex gap-3">
          <Link to="/cart" className="btn-outline text-sm">Return to Cart</Link>
          <Link to="/contact" className="btn-primary text-sm">Contact Us</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center">
      <div className="max-w-lg w-full">
        {/* Success icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo/10 text-indigo mb-8 mx-auto">
          <CheckCircle size={40} />
        </div>

        <p className="section-label mb-3">Order Confirmed</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-4">
          Thank you for your order!
        </h1>
        <p className="font-body text-sm text-ink/60 mb-2 leading-relaxed">
          Your payment was successful and your order is being prepared by our artisans.
        </p>
        {reference && (
          <p className="text-xs font-body text-ink/40 mb-8">
            Reference: <span className="font-semibold text-ink/70 tracking-wide">{reference}</span>
          </p>
        )}

        <div className="bg-cream-100 border border-cream-200 p-6 mb-8 text-left">
          <div className="flex items-start gap-4">
            <Package size={20} className="text-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-body text-sm font-semibold text-ink mb-1">What happens next?</p>
              <ul className="text-xs font-body text-ink/60 space-y-1 leading-relaxed list-disc list-inside">
                <li>You will receive a confirmation email shortly</li>
                <li>Your order will be carefully packaged by our team</li>
                <li>Delivery tracking details will be sent via SMS and email</li>
                <li>Typical delivery: 3–7 business days within Nigeria</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/shop" className="btn-primary text-sm">
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <Link to="/track-order" className="btn-outline text-sm">
            Track Your Order
          </Link>
        </div>
      </div>
    </div>
  );
}
