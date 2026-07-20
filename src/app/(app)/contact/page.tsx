'use client';

import { useState } from 'react';
import Footer from '../../../components/Footer';
import { IconArrow, IconDiscord, IconInstagram, IconMail } from '../../../components/icons';

// Web3Forms access key — get one free at https://web3forms.com (tied to sfefoundery@gmail.com).
const ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';

const SOCIALS = [
  { label: 'Email', sub: 'sfefoundery@gmail.com', href: 'mailto:sfefoundery@gmail.com', Icon: IconMail, color: 'var(--orange)' },
  { label: 'Discord', sub: 'discord.gg/3gjCGadM9a', href: 'https://discord.gg/3gjCGadM9a', Icon: IconDiscord, color: '#5865F2' },
  { label: 'Instagram', sub: '@sfefoundry', href: 'https://www.instagram.com/sfefoundry', Icon: IconInstagram, color: '#E1306C' },
];

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'New message from the SFE Foundry site',
          from_name: 'SFE Foundry Website',
          ...data,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
        setError(json.message || 'Something went wrong. Please email us directly.');
      }
    } catch {
      setStatus('error');
      setError('Network error. Please email us directly.');
    }
  }

  return (
    <div className="page">
      <section className="page-hero">
        <h1 className="ph-title">Contact <span className="o">Us</span></h1>
        <p className="ph-lede">
          Questions, ideas, or want to get involved? Send us a message and we&apos;ll get back to you.
        </p>
      </section>

      <section className="band" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={onSubmit}>
            <input type="hidden" name="from_page" value="contact" />
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

            <label className="label" htmlFor="c-name">Name</label>
            <input id="c-name" className="input" name="name" type="text" required placeholder="Your name" />

            <label className="label" htmlFor="c-email">Email</label>
            <input id="c-email" className="input" name="email" type="email" required placeholder="you@example.com" />

            <label className="label" htmlFor="c-msg">Message</label>
            <textarea id="c-msg" className="input" name="message" required rows={5} placeholder="How can we help?" style={{ resize: 'vertical', minHeight: 120 }} />

            {status === 'ok' && <div className="msg-ok">Thanks! Your message has been sent — we&apos;ll be in touch.</div>}
            {status === 'error' && <div className="msg-err">{error}</div>}

            <button className="btn-primary" type="submit" disabled={status === 'sending'} style={{ marginTop: 4 }}>
              {status === 'sending' ? 'Sending…' : <>Send Message <IconArrow size={18} /></>}
            </button>
          </form>

          <aside className="contact-aside">
            <div className="eyebrow">// Reach us</div>
            <p className="band-text" style={{ marginTop: 8, marginBottom: 20 }}>
              Prefer a direct line? Find us here.
            </p>
            {SOCIALS.map(({ label, sub, href, Icon, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-social">
                <span className="contact-social-ic" style={{ color }}><Icon size={20} /></span>
                <span className="drawer-social-meta">
                  <span className="drawer-social-name">{label}</span>
                  <span className="drawer-social-sub">{sub}</span>
                </span>
              </a>
            ))}
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
