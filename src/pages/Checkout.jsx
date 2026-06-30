import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../data/products';
import DiscountCodeField from '../components/DiscountCodeField';
import { api, ensureApiReady } from '../lib/api';

const nigerianStates = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT (Abuja)','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
  'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto',
  'Taraba','Yobe','Zamfara',
];

const emptyForm = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', postalCode: '',
};

function validate(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = 'Required';
  if (!form.lastName.trim()) errors.lastName = 'Required';
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Valid email required';
  if (!form.phone.trim() || !/^[\d\s\+\-]{7,15}$/.test(form.phone)) errors.phone = 'Valid phone required';
  if (!form.address.trim()) errors.address = 'Required';
  if (!form.city.trim()) errors.city = 'Required';
  if (!form.state) errors.state = 'Select a state';
  return errors;
}

export default function Checkout() {
  const { items, totals, discount, clearCart } = useCart();
  const { user, authHeaders } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      email: f.email || user.email || '',
      firstName: f.firstName || user.firstName || '',
      lastName: f.lastName || user.lastName || '',
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const first = document.querySelector('[data-error]');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      await ensureApiReady();
      const orderLines = items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        size: i.size,
        quantity: i.quantity,
        unitPrice: i.product.price,
      }));

      const { data } = await api.post('/api/payment/initialize', {
        customer: {
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
        },
        shipping: {
          address: form.address,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
        },
        items: orderLines,
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        total: totals.total,
        discountCode: discount?.code || '',
      }, { headers: await authHeaders() });

      if (data.authorizationUrl) {
        clearCart();
        window.location.href = data.authorizationUrl;
      } else {
        setServerError('Unable to initialize payment. Please try again.');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please try again.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-24 px-4">
        <h1 className="font-display text-2xl text-ink/40">Your cart is empty</h1>
        <Link to="/shop" className="btn-primary text-sm">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs font-body text-ink/50 mb-10">
          <Link to="/cart" className="hover:text-indigo transition-colors">Cart</Link>
          <ChevronRight size={12} />
          <span className="text-indigo font-semibold">Checkout</span>
        </nav>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-10">
              <section>
                <h2 className="font-display text-xl font-semibold text-ink mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name" name="firstName" form={form} errors={errors} onChange={handleChange} />
                  <Field label="Last Name" name="lastName" form={form} errors={errors} onChange={handleChange} />
                  <Field label="Email Address" name="email" type="email" form={form} errors={errors} onChange={handleChange} />
                  <Field label="Phone Number" name="phone" type="tel" form={form} errors={errors} onChange={handleChange} placeholder="+234..." />
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-ink mb-6">Delivery Address</h2>
                <div className="grid grid-cols-1 gap-4">
                  <Field label="Street Address" name="address" form={form} errors={errors} onChange={handleChange} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="City" name="city" form={form} errors={errors} onChange={handleChange} />
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">
                        State
                      </label>
                      <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className={`input-field ${errors.state ? 'border-terracotta' : ''}`}
                        data-error={errors.state || undefined}
                      >
                        <option value="">Select state</option>
                        {nigerianStates.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-xs text-terracotta mt-1 font-body">{errors.state}</p>}
                    </div>
                  </div>
                  <Field label="Postal Code (optional)" name="postalCode" form={form} errors={errors} onChange={handleChange} required={false} />
                </div>
              </section>

              <section className="p-5 bg-cream-100 border border-cream-200">
                <div className="flex items-start gap-3">
                  <Lock size={16} className="text-indigo mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1">Secure Payment via Paystack</p>
                    <p className="text-xs font-body text-ink/60 leading-relaxed">
                      You will be redirected to Paystack to complete your payment securely. We accept debit cards, bank transfers, and USSD. Your card details are never stored on our servers.
                    </p>
                  </div>
                </div>
              </section>

              {serverError && (
                <p className="text-sm font-body text-terracotta bg-terracotta/10 border border-terracotta/30 px-4 py-3 animate-fade-in">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Initializing Payment…
                  </span>
                ) : (
                  <>
                    <Lock size={14} />
                    Pay {formatPrice(totals.total)} — Proceed to Paystack
                  </>
                )}
              </button>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <h2 className="font-display text-xl font-semibold text-ink mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map(({ key, product, size, quantity }) => (
                    <div key={key} className="flex gap-4">
                      <div className="relative w-16 h-20 flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover bg-cream"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-indigo text-cream-50 text-[10px] font-semibold flex items-center justify-center">
                          {quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-medium text-ink leading-snug mb-0.5">{product.name}</p>
                        <p className="text-xs font-body text-ink/50">Size: {size}</p>
                      </div>
                      <span className="font-body text-sm font-semibold text-ink flex-shrink-0">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <DiscountCodeField compact />
                </div>

                <div className="border-t border-cream-200 pt-4 space-y-3 text-sm font-body">
                  <div className="flex justify-between">
                    <span className="text-ink/60">Subtotal</span>
                    <span className="font-medium">{formatPrice(totals.subtotal)}</span>
                  </div>
                  {totals.discountAmount > 0 && (
                    <div className="flex justify-between text-indigo">
                      <span>Discount ({discount?.code})</span>
                      <span>−{formatPrice(totals.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-ink/60">Delivery</span>
                    <span className={`font-medium ${totals.shipping === 0 ? 'text-indigo' : ''}`}>
                      {totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}
                    </span>
                  </div>
                  <div className="border-t border-cream-200 pt-3 flex justify-between items-center">
                    <span className="font-semibold">Total (NGN)</span>
                    <span className="font-display text-xl font-semibold">{formatPrice(totals.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = 'text', form, errors, onChange, placeholder, required = true }) {
  return (
    <div data-error={errors[name] || undefined}>
      <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">
        {label}{required && <span className="text-terracotta ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${errors[name] ? 'border-terracotta' : ''}`}
        required={required}
      />
      {errors[name] && <p className="text-xs text-terracotta mt-1 font-body">{errors[name]}</p>}
    </div>
  );
}
