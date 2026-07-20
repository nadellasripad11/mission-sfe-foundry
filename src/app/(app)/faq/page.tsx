'use client';

import { useState } from 'react';
import Footer from '../../../components/Footer';

const FAQ = [
  { q: 'What is SFE Foundry?', a: 'A student innovation club for builders, founders, and hackers. We run hackathons, pitch competitions, workshops, and mentorship to help students build projects and launch ideas.' },
  { q: 'Do I need experience?', a: 'No. Anyone willing to learn and build is welcome — beginners and experienced builders alike.' },
  { q: 'Do I need to know how to code?', a: 'No. We need designers, marketers, founders, developers, and more.' },
  { q: 'How much does membership cost?', a: 'Free for the school year. Most of our events are free to attend.' },
  { q: 'When do meetings happen?', a: 'Every other week after school. Check the events page for exact dates.' },
  { q: 'What happens at a hackathon?', a: 'You form a team, pick a problem, and build a project in 24–48 hours. There are prizes, mentors, and plenty of food.' },
  { q: 'Can I join mid-year?', a: 'Yes! We welcome new members at any point during the school year.' },
  { q: 'What kinds of projects do members build?', a: 'Apps, websites, AI tools, hardware prototypes, startup pitches — anything goes. If you can build it, bring it.' },
  { q: 'Do I need a team to participate?', a: 'Nope. Join solo and we’ll help you find teammates, or come in with your own crew.' },
  { q: 'How do I contact SFE Foundry?', a: 'Email sfefoundryteam@gmail.com or reach out on Instagram or Discord. You can also chat with our assistant right here on the site.' },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="eyebrow">// FAQ</div>
        <h1 className="ph-title">Questions?<br /><span className="o">We&apos;ve got answers.</span></h1>
        <p className="ph-lede">Everything you need to know about joining and building with SFE Foundry.</p>
      </section>

      <section className="band">
        <div className="faq-list">
          {FAQ.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div key={f.q} className={`faq-item2${isOpen ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => setOpen(isOpen ? null : idx)}>
                  <span>{f.q}</span>
                  <span className="faq-plus">+</span>
                </button>
                {isOpen && <div className="faq-a"><p>{f.a}</p></div>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="band">
        <div className="cta">
          <h2 className="cta-title">Still have questions?</h2>
          <p className="cta-text">Reach out directly and we&apos;ll get back to you.</p>
          <a href="mailto:sfefoundryteam@gmail.com" className="btn-primary">&gt; Email Us</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
