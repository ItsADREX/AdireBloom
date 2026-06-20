import { useState } from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import { contactInfo, siteMission, socialLinks } from '../data/site';
import SocialLinks from '../components/SocialLinks';

const infoCards = [
  {
    icon: Phone,
    title: 'Phone Number',
    value: contactInfo.phone,
    href: contactInfo.phoneHref,
  },
  {
    icon: MapPin,
    title: 'Address Location',
    value: contactInfo.address,
    href: contactInfo.mapLink,
  },
  {
    icon: Mail,
    title: 'Mail Address',
    value: contactInfo.email,
    href: contactInfo.emailHref,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="pt-32 pb-10 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-indigo mb-4">
            Say Hello To Us
          </h1>
          <p className="font-body text-sm sm:text-base text-terracotta max-w-2xl mx-auto leading-relaxed">
            {siteMission}
          </p>
        </div>
      </section>

      <section className="py-12 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            <div className="space-y-4">
              {infoCards.map(({ icon: Icon, title, value, href }) => (
                <div
                  key={title}
                  className="flex items-center gap-5 p-5 sm:p-6 bg-cream-50 rounded-2xl border border-cream-200/80 shadow-sm"
                >
                  <div className="w-14 h-14 flex-shrink-0 rounded-full border-2 border-terracotta/80 flex items-center justify-center text-terracotta bg-white">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-sm font-semibold text-indigo mb-0.5">{title}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noreferrer' : undefined}
                        className="font-body text-sm text-ink/75 hover:text-indigo transition-colors break-words"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-ink/75">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-5 sm:p-6 bg-indigo text-cream-50 rounded-2xl">
                <p className="text-[10px] font-body font-semibold uppercase tracking-widest text-gold mb-2">
                  Bespoke Commissions
                </p>
                <p className="font-body text-sm text-cream-200/85 leading-relaxed">
                  For custom Adire pieces, WhatsApp us with your measurements and vision. Bespoke orders typically take 2–4 weeks.
                </p>
                <a
                  href={contactInfo.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-xs font-body font-semibold uppercase tracking-widest text-gold hover:text-cream-50 transition-colors"
                >
                  Chat on WhatsApp →
                </a>
              </div>
            </div>

            <div>
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[360px] text-center gap-4 p-8 bg-cream-50 rounded-2xl border border-cream-200">
                  <div className="w-16 h-16 rounded-full bg-indigo/10 flex items-center justify-center text-indigo text-2xl">✓</div>
                  <h3 className="font-display text-2xl font-semibold text-ink">Message Sent!</h3>
                  <p className="font-body text-sm text-ink/60 max-w-sm">
                    Thank you for reaching out. We&apos;ll respond within 24 hours.
                  </p>
                  <button type="button" onClick={() => setSent(false)} className="btn-ghost text-xs">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8 bg-cream-50 rounded-2xl border border-cream-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">
                        Full Name<span className="text-terracotta ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="input-field bg-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">
                        Email<span className="text-terracotta ml-0.5">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="input-field bg-white"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="input-field bg-white"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-widest text-ink mb-1.5">
                      Message<span className="text-terracotta ml-0.5">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="input-field resize-none bg-white"
                      placeholder="Tell us about your inquiry…"
                    />
                  </div>
                  <button type="submit" className="btn-primary text-sm w-full sm:w-auto">
                    Send Message
                  </button>

                  <div className="pt-4 border-t border-cream-200">
                    <p className="text-xs font-body text-ink/50 mb-3 uppercase tracking-widest">Follow us</p>
                    <SocialLinks links={socialLinks} size="lg" />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-cream-200 shadow-md">
            <iframe
              title="AdireBloom location — Lagos State University, Ojo Campus"
              src={contactInfo.mapEmbedUrl}
              className="w-full h-[320px] sm:h-[420px] border-0 grayscale-[20%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="text-center mt-4 text-xs font-body text-ink/50">
            {contactInfo.addressLine} ·{' '}
            <a href={contactInfo.mapLink} target="_blank" rel="noreferrer" className="text-indigo hover:underline">
              Open in Google Maps
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
