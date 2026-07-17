'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: 'What is SFE Foundry?',
    answer: 'SFE Foundry is a student innovation club for builders, founders, and hackers. We run hackathons, pitch competitions, workshops, and mentorship programs to help students build cool projects and launch their ideas.'
  },
  {
    question: 'How do I join SFE Foundry?',
    answer: 'You can join by emailing sfefoundery@gmail.com or clicking "Join" on our website. We welcome all students interested in innovation and entrepreneurship!'
  },
  {
    question: 'What events do you host?',
    answer: 'We host hackathons, startup pitch competitions, workshops on entrepreneurship and product development, and mentorship sessions with experienced founders.'
  },
  {
    question: 'When are your hackathons?',
    answer: 'Our hackathons are held multiple times throughout the year. Check our website or email sfefoundery@gmail.com for upcoming dates and registration!'
  },
  {
    question: 'Do I need experience to join?',
    answer: "Nope! We welcome beginners and experienced builders alike. If you're interested in learning and building cool stuff, you're in!"
  },
  {
    question: 'What should I bring to a hackathon?',
    answer: 'Bring your laptop, charger, snacks, and your creativity! We provide food, drinks, and a great space to build. The rest is up to you!'
  },
  {
    question: 'Is there a membership fee?',
    answer: "No membership fees! Most of our events are free to attend. We're here to help students build and innovate."
  },
  {
    question: 'Can I form a team or do I need to go solo?',
    answer: 'You can team up with others or work solo — totally up to you! Many of our best projects come from awesome team collaborations.'
  },
  {
    question: 'How do I contact SFE Foundry?',
    answer: 'Email us at sfefoundery@gmail.com with any questions! You can also chat with our assistant right here on the website.'
  },
  {
    question: 'Do you offer mentorship?',
    answer: 'Yes! We connect members with experienced founders and mentors. Email sfefoundery@gmail.com to learn more about our mentorship program.'
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIdx(openIdx === idx ? null : idx);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '48px 24px 80px', fontFamily: 'var(--mono)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--muted)', textDecoration: 'none', fontSize: '.74rem', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 40 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back
        </Link>

        <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--ink)', marginBottom: 8, lineHeight: 1.1 }}>
          FAQ
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginBottom: 40, letterSpacing: '.04em' }}>
          Questions about SFE Foundry
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--line)',
                  borderRadius: 10,
                  overflow: 'hidden',
                  transition: 'box-shadow .18s',
                  boxShadow: isOpen ? '0 4px 16px rgba(0,0,0,.06)' : '0 1px 4px rgba(0,0,0,.04)',
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', gap: 16,
                  }}
                >
                  <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '.95rem', color: 'var(--ink)', lineHeight: 1.3 }}>
                    {faq.question}
                  </span>
                  <span style={{
                    flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--orange)', fontSize: '1.2rem', fontWeight: 300,
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform .2s ease',
                  }}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 20px 18px', borderTop: '1px solid var(--line)' }}>
                    <p style={{ color: 'var(--ink-soft)', fontSize: '.85rem', lineHeight: 1.7, marginTop: 14 }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 48, padding: '28px 24px', background: 'var(--ink)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ color: 'var(--cream)', fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Still have questions?</p>
          <p style={{ color: 'var(--muted)', fontSize: '.8rem', marginBottom: 20 }}>Reach out directly and we'll get back to you.</p>
          <a
            href="mailto:sfefoundery@gmail.com"
            style={{ display: 'inline-block', padding: '10px 24px', background: 'var(--orange)', color: '#fff', borderRadius: 7, fontFamily: 'var(--mono)', fontSize: '.74rem', letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600 }}
          >
            Email Us
          </a>
        </div>

      </div>
    </div>
  );
}
