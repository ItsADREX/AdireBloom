import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Copy, Check, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api, ensureApiReady } from '../lib/api';
import { contactInfo } from '../data/site';
import { formatPrice } from '../data/products';
import { copyText, getOrderWhatsAppUrl, getReferenceWhatsAppUrl } from '../lib/orderContact';

function CopyOrderId({ reference }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await copyText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [reference]);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white border border-cream-200 p-4 mb-6 text-left">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-body uppercase tracking-widest text-ink/50 mb-1">Order ID</p>
        <p className="font-body text-sm font-semibold text-ink tracking-wide break-all">{reference}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-indigo text-indigo font-body text-xs font-semibold uppercase tracking-wide hover:bg-indigo hover:text-cream-50 transition-colors shrink-0"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Copied' : 'Copy ID'}
      </button>
    </div>
  );
}

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const { authHeaders } = useAuth();
  const reference = searchParams.get('reference') || searchParams.get('trxref');
  const [status, setStatus] = useState('verifying');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!reference) {
      setStatus('failed');
      return;
    }
    ensureApiReady()
      .then(() => authHeaders())
      .then((headers) => api.get(`/api/payment/verify/${reference}`, { headers }))
      .then(({ data }) => {
        if (data.status === 'success') {
          setOrder(data);
          setStatus('success');
        } else {
          setStatus('failed');
        }
      })
      .catch(() => setStatus('failed'));
  }, [reference, authHeaders]);

  if (status === 'verifying') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-6">
        <div className="w-12 h-12 border-4 border-indigo border-t-transparent rounded-full animate-spin" />
        <p className="font-body text-sm text-ink/60">Verifying your payment…</p>
      </div>
    );
  }

  if (status === 'failed') {
    const whatsappUrl = reference ? getReferenceWhatsAppUrl(reference) : contactInfo.whatsappHref;
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
          We couldn&apos;t verify your payment. If you were charged, contact us with your order reference.
        </p>
        {reference && (
          <div className="max-w-md w-full">
            <CopyOrderId reference={reference} />
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm inline-flex items-center justify-center gap-2">
            <MessageCircle size={16} /> WhatsApp Support
          </a>
          <Link to="/cart" className="btn-outline text-sm">Return to Cart</Link>
        </div>
      </div>
    );
  }

  const whatsappUrl = getOrderWhatsAppUrl(order);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo/10 text-indigo mb-8 mx-auto">
          <CheckCircle size={40} />
        </div>

        <p className="section-label mb-3">Payment Confirmed</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-4">
          Thank you for your order!
        </h1>
        <p className="font-body text-sm text-ink/60 mb-6 leading-relaxed">
          Your payment was successful. Save your order ID below and message us on WhatsApp so we can confirm your items and delivery details.
        </p>

        {reference && <CopyOrderId reference={reference} />}

        {order && (
          <div className="bg-cream-100 border border-cream-200 p-6 mb-6 text-left space-y-3">
            <p className="font-body text-sm font-semibold text-ink border-b border-cream-200 pb-2">Order summary</p>
            <div className="grid gap-2 text-xs font-body text-ink/70">
              <p><span className="text-ink/50 uppercase tracking-wide">Amount paid:</span> {formatPrice(order.amount)}</p>
              {order.order?.customerName && (
                <p><span className="text-ink/50 uppercase tracking-wide">Customer:</span> {order.order.customerName}</p>
              )}
              {order.customerEmail && (
                <p><span className="text-ink/50 uppercase tracking-wide">Email:</span> {order.customerEmail}</p>
              )}
              {order.order?.phone && (
                <p><span className="text-ink/50 uppercase tracking-wide">Phone:</span> {order.order.phone}</p>
              )}
              {order.order?.shippingAddress && (
                <p><span className="text-ink/50 uppercase tracking-wide">Shipping:</span> {order.order.shippingAddress}</p>
              )}
              {order.order?.items && (
                <p><span className="text-ink/50 uppercase tracking-wide">Items:</span> {order.order.items}</p>
              )}
            </div>
          </div>
        )}

        <div className="bg-cream-100 border border-cream-200 p-6 mb-8 text-left">
          <div className="flex items-start gap-4">
            <Package size={20} className="text-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-body text-sm font-semibold text-ink mb-1">What happens next?</p>
              <ul className="text-xs font-body text-ink/60 space-y-1 leading-relaxed list-disc list-inside">
                <li>Message us on WhatsApp with your order ID (button below)</li>
                <li>Your order will be carefully packaged by our team</li>
                <li>Delivery tracking details will be sent via SMS and email</li>
                <li>Typical delivery: 3–7 business days within Nigeria</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm inline-flex items-center justify-center gap-2 w-full"
          >
            <MessageCircle size={18} />
            Send order details on WhatsApp
          </a>
          <p className="text-xs font-body text-ink/45">
            Opens WhatsApp to {contactInfo.phone} with your order info pre-filled
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link to="/shop" className="btn-outline text-sm flex-1 inline-flex items-center justify-center gap-2">
              Continue Shopping <ArrowRight size={16} />
            </Link>
            <Link to="/track-order" className="btn-ghost text-sm flex-1 justify-center">
              Track Your Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
