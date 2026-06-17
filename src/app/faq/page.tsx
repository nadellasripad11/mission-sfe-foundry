'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
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
    answer: 'Nope! We welcome beginners and experienced builders alike. If you\'re interested in learning and building cool stuff, you\'re in!'
  },
  {
    question: 'What should I bring to a hackathon?',
    answer: 'Bring your laptop, charger, snacks, and your creativity! We provide food, drinks, and a great space to build. The rest is up to you!'
  },
  {
    question: 'Is there a membership fee?',
    answer: 'No membership fees! Most of our events are free to attend. We\'re here to help students build and innovate.'
  },
  {
    question: 'Can I form a team or do I need to go solo?',
    answer: 'You can team up with others or work solo - totally up to you! Many of our best projects come from awesome team collaborations.'
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
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] py-12 px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-lg border border-[#BFDBFE] text-[#2563EB] font-semibold text-sm hover:bg-[#EFF6FF] hover:border-[#93C5FD] transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#0F2A5C]">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[#64748B]">
            Can't find what you're looking for? Email us at sfefoundery@gmail.com
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md transition"
            >
              <button
                onClick={() => {
                  const newSet = new Set(openIndexes);
                  if (newSet.has(idx)) {
                    newSet.delete(idx);
                  } else {
                    newSet.add(idx);
                  }
                  setOpenIndexes(newSet);
                }}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-blue-50 transition"
              >
                <h3 className="text-lg font-semibold text-[#1D3557] text-left">
                  {faq.question}
                </h3>
                <span
                  className={`text-2xl text-blue-500 transition-transform flex-shrink-0 ml-4 ${
                    openIndexes.has(idx) ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              {openIndexes.has(idx) && (
                <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
                  <p className="text-[#1D3557]/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl p-8 text-white text-center" style={{ background: '#0F2A5C' }}>
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6 text-[#A9BEDC]">
            Get in touch with us directly or use the chat assistant on the website!
          </p>
          <a
            href="mailto:sfefoundery@gmail.com?subject=Question%20about%20SFE%20Foundry&body=Hi%20SFE%20Foundry%20team%2C%0A%0AI%20have%20a%20question%3A%0A%0A"
            className="inline-block px-8 py-3 bg-white text-[#0F2A5C] rounded-lg font-bold hover:bg-[#EFF6FF] transition"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
