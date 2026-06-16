'use client';

import { useState } from 'react';

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#EEF2F7] text-[#1D3557] py-20 px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-blue-600">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[#1D3557]/70">
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
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-blue-50 transition"
              >
                <h3 className="text-lg font-semibold text-[#1D3557] text-left">
                  {faq.question}
                </h3>
                <span
                  className={`text-2xl text-blue-500 transition-transform flex-shrink-0 ml-4 ${
                    openIndex === idx ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              {openIndex === idx && (
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
        <div className="mt-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6">
            Get in touch with us directly or use the chat assistant on the website!
          </p>
          <a
            href="mailto:sfefoundery@gmail.com?subject=Question%20about%20SFE%20Foundry&body=Hi%20SFE%20Foundry%20team%2C%0A%0AI%20have%20a%20question%3A%0A%0A"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
