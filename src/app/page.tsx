'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollY(scrollTop);
      setScrollProgress(scrollPercent);

      // Trigger animations on scroll
      const elements = document.querySelectorAll('[data-scroll-trigger]');
      const newVisible = new Set(visibleElements);

      elements.forEach((el) => {
        const id = el.getAttribute('data-scroll-trigger');
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          newVisible.add(id!);
        }
      });

      setVisibleElements(newVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleElements]);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to sign up');
        setIsSubmitting(false);
        return;
      }

      alert('Thanks for signing up!');
      setEmail('');
      setJoinModalOpen(false);
      setIsSubmitting(false);
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Signup error:', error);
      setIsSubmitting(false);
    }
  };

  const isVisible = (id: string) => visibleElements.has(id);

  return (
    <div className="bg-[#0d0402] text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Work+Sans:wght@300;400;500;600;700&display=swap');

        html {
          scroll-behavior: smooth;
        }

        * {
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Page Load & Scroll Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .slide-in-left {
          animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .slide-in-right {
          animation: slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }

        .scroll-visible.fade-in-up { animation-play-state: running; }
        .scroll-visible.slide-in-left { animation-play-state: running; }
        .scroll-visible.slide-in-right { animation-play-state: running; }
        .scroll-visible.scale-in { animation-play-state: running; }

        /* Glass Morphism */
        .glass-card {
          background: linear-gradient(135deg, rgba(80, 20, 10, 0.4), rgba(60, 15, 8, 0.2));
          border: 1px solid rgba(255, 77, 46, 0.3);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .glass-card-hover {
          cursor: pointer;
        }

        .glass-card-hover:hover {
          background: linear-gradient(135deg, rgba(255, 77, 46, 0.2), rgba(255, 77, 46, 0.1));
          border-color: rgba(255, 77, 46, 0.6);
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(255, 77, 46, 0.3);
        }

        /* Buttons */
        .btn-primary {
          background: linear-gradient(135deg, #FF4D2E, #FF6644);
          color: white;
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(255, 77, 46, 0.35);
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          transition: left 0.3s ease-out;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          box-shadow: 0 16px 44px rgba(255, 77, 46, 0.55);
          transform: translateY(-3px);
          background: linear-gradient(135deg, #FF5B3A, #FF7255);
        }

        .btn-primary:active {
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.4);
          color: white;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }

        .btn-secondary:hover {
          border-color: #FF4D2E;
          background: rgba(255, 77, 46, 0.12);
          transform: translateY(-2px);
        }

        .btn-secondary:active {
          transform: translateY(0);
        }

        /* Scroll Progress */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #FF4D2E 0%, #FF7F50 100%);
          z-index: 100;
          box-shadow: 0 0 20px rgba(255, 77, 46, 0.8);
          transition: width 0.1s ease-out;
        }

        /* Navigation */
        .nav-link {
          color: rgba(255, 255, 255, 0.75);
          transition: all 0.3s ease-out;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          cursor: pointer;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #FF4D2E;
          transition: width 0.3s ease-out;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:hover {
          color: #FF4D2E;
        }

        /* Gradient Blobs */
        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
        }

        /* Borders */
        .section-divider {
          border-color: rgba(255, 77, 46, 0.2);
        }

        /* Card Hover Effects */
        .card-hover-lift {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .card-hover-lift:hover {
          transform: translateY(-12px);
        }

        /* Icon Animations */
        .icon-container {
          transition: all 0.3s ease-out;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .group:hover .icon-container {
          transform: scale(1.1) rotate(5deg);
        }

        /* Input Focus */
        input:focus {
          box-shadow: 0 0 0 3px rgba(255, 77, 46, 0.2);
        }

        /* Section Transitions */
        section {
          transition: opacity 0.6s ease-out;
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Background Gradient Blobs */}
      <div className="gradient-blob w-[800px] h-[800px] top-20 right-0 bg-gradient-to-br from-[#CC2811] to-transparent" />
      <div className="gradient-blob w-[600px] h-[600px] bottom-32 left-0 bg-gradient-to-tr from-[#AA3D28] to-transparent" />

      {/* Join Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card p-8 max-w-md w-full rounded-3xl scale-in">
            <h3 className="text-3xl font-bold mb-2">Get early access</h3>
            <p className="text-gray-300 text-sm mb-6">Join SFE Foundry and start building the future.</p>
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a0805] text-white rounded-xl border border-[#FF4D2E]/30 focus:border-[#FF4D2E] focus:outline-none transition placeholder-gray-500"
                required
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-primary px-4 py-3 rounded-lg font-semibold"
                >
                  {isSubmitting ? 'Joining...' : 'Join'}
                </button>
                <button
                  type="button"
                  onClick={() => setJoinModalOpen(false)}
                  className="flex-1 btn-secondary px-4 py-3 rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-lg bg-[#0d0402]/95 border-b section-divider border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D2E]"></span>
            <span>SFE</span>
          </div>
          <div className="hidden md:flex gap-12">
            <a href="#about" className="nav-link">About</a>
            <a href="#events" className="nav-link">Events</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#join" className="nav-link">Join</a>
          </div>
          <button onClick={() => setJoinModalOpen(true)} className="btn-primary px-6 py-2.5 rounded-full text-sm font-semibold">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="fade-in-up mb-6" data-scroll-trigger="hero-badge">
                <span className="inline-block px-4 py-2 bg-[#FF4D2E]/20 border border-[#FF4D2E]/50 rounded-full text-xs font-semibold text-[#FF7F50] tracking-wide uppercase">
                  Student Innovation
                </span>
              </div>

              <h1 className="fade-in-up stagger-1 text-5xl md:text-7xl font-bold leading-tight mb-8" data-scroll-trigger="hero-title">
                Build every
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D2E] to-[#FF7F50]">
                  idea.
                </span>
                Ship instantly.
              </h1>

              <p className="fade-in-up stagger-2 text-lg text-gray-300 mb-10 leading-relaxed max-w-lg" data-scroll-trigger="hero-desc">
                Join a community of student builders shipping real products. Get funding, mentorship, and the tools to launch your startup.
              </p>

              <div className="fade-in-up stagger-3 flex flex-col sm:flex-row gap-4 mb-16" data-scroll-trigger="hero-cta">
                <button
                  onClick={() => setJoinModalOpen(true)}
                  className="btn-primary px-8 py-4 rounded-xl font-bold text-base"
                >
                  Get Started
                </button>
                <Link
                  href="/events"
                  className="btn-secondary px-8 py-4 rounded-xl font-bold text-base text-center"
                >
                  See Events
                </Link>
              </div>

              {/* Stats */}
              <div className="fade-in-up stagger-4 grid grid-cols-3 gap-8 pt-8 border-t section-divider" data-scroll-trigger="hero-stats">
                {[
                  { value: '500+', label: 'Builders' },
                  { value: '100+', label: 'Projects' },
                  { value: '$1M+', label: 'Raised' }
                ].map((stat, i) => (
                  <div key={i} className="fade-in-up" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#FF4D2E] to-[#FF7F50] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div className="fade-in-up stagger-2 relative h-[500px] hidden md:block" data-scroll-trigger="hero-visual">
              <div className="glass-card p-1 rounded-3xl h-full flex items-center justify-center overflow-hidden card-hover-lift">
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#2d1810] via-[#3d1f15] to-[#1a0805] relative flex items-center justify-center">
                  <svg className="w-40 h-40 opacity-20 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FF4D2E]/15 to-transparent rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section id="about" className="relative py-32 px-8 border-t section-divider">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="slide-in-left text-5xl md:text-6xl font-bold mb-4" data-scroll-trigger="offer-title">What we offer</h2>
            <p className="fade-in-up text-gray-400 text-lg max-w-2xl" data-scroll-trigger="offer-desc">Everything you need to build and ship your startup idea.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />,
                title: 'Hackathons',
                desc: '48-hour sprints to build and ship real products.'
              },
              {
                icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />,
                title: 'Pitch Competitions',
                desc: 'Win $5K+ in seed funding and investor connections.'
              },
              {
                icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />,
                title: 'Workshops',
                desc: 'Learn from founders and industry leaders.'
              },
              {
                icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />,
                title: 'Community',
                desc: 'Find co-founders and collaborate with builders.'
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover p-8 rounded-2xl group fade-in-up card-hover-lift"
                data-scroll-trigger={`offer-card-${idx}`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="text-[#FF4D2E] mb-4 icon-container">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="relative py-32 px-8 border-t section-divider">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="slide-in-right text-5xl md:text-6xl font-bold mb-4" data-scroll-trigger="events-title">Upcoming events</h2>
            <p className="fade-in-up text-gray-400 text-lg" data-scroll-trigger="events-desc">Connect with builders and take your ideas further.</p>
          </div>

          <div className="space-y-4">
            {[
              { date: 'July 15-17', title: 'Summer Hackathon 2026', desc: '48-hour sprint to build and ship.' },
              { date: 'August 5', title: 'Pitch Competition', desc: '$5K in seed funding + investor intros.' },
              { date: 'Biweekly', title: 'Founder Workshops', desc: 'Learn from founders in the network.' },
              { date: 'Sept 20', title: 'Demo Day', desc: 'Showcase to investors and community.' },
            ].map((event, idx) => (
              <Link
                key={idx}
                href="/events"
                className="glass-card glass-card-hover p-8 rounded-2xl block group relative overflow-hidden fade-in-up card-hover-lift"
                data-scroll-trigger={`event-${idx}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#FF4D2E] to-transparent"></div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#FF4D2E] mb-2 uppercase tracking-widest">{event.date}</p>
                    <h3 className="text-2xl font-bold group-hover:text-[#FF4D2E] transition mb-2">{event.title}</h3>
                    <p className="text-gray-300">{event.desc}</p>
                  </div>
                  <div className="text-gray-500 group-hover:text-[#FF4D2E] transition ml-4 icon-container">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative py-32 px-8 border-t section-divider">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="slide-in-left text-5xl md:text-6xl font-bold mb-4" data-scroll-trigger="projects-title">Wall of fame</h2>
            <p className="fade-in-up text-gray-400 text-lg" data-scroll-trigger="projects-desc">Student-built projects funded and launched in 2026.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'TechStart MVP', by: 'Sarah & Alex' },
              { name: 'EcoTracker', by: 'Jordan' },
              { name: 'StudySync', by: 'Team of 4' },
              { name: 'FinanceFlow', by: 'Maya' },
              { name: 'MusicMatch', by: 'Chris & Sam' },
              { name: 'HealthHub', by: 'Lisa' },
            ].map((proj, idx) => (
              <Link
                key={idx}
                href="/projects"
                className="glass-card glass-card-hover p-8 rounded-2xl block fade-in-up card-hover-lift"
                data-scroll-trigger={`project-${idx}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF4D2E] to-[#FF7F50] flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{proj.name}</h3>
                <p className="text-sm text-gray-400">by {proj.by}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="relative py-32 px-8 border-t section-divider">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="slide-in-right text-5xl md:text-6xl font-bold mb-4" data-scroll-trigger="resources-title">Resources</h2>
            <p className="fade-in-up text-gray-400 text-lg" data-scroll-trigger="resources-desc">Everything you need to launch your startup.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Startup 101' },
              { title: 'Tech Stack' },
              { title: 'Pitch Deck' },
              { title: 'Design System' },
              { title: 'Marketing' },
              { title: 'Mentorship' },
            ].map((res, idx) => (
              <Link
                key={idx}
                href="/resources"
                className="glass-card glass-card-hover p-8 rounded-2xl block text-center group fade-in-up card-hover-lift"
                data-scroll-trigger={`resource-${idx}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF4D2E] to-[#FF7F50] flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold">→</span>
                </div>
                <h3 className="font-bold text-lg">{res.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="relative py-32 px-8 border-t section-divider">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 md:p-20 rounded-3xl text-center fade-in-up" data-scroll-trigger="cta-section">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to ship?</h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 500+ student builders launching real startups. Get funding, mentorship, and everything you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setJoinModalOpen(true)}
                className="btn-primary px-10 py-4 rounded-xl font-bold text-base"
              >
                Get Started
              </button>
              <Link
                href="/events"
                className="btn-secondary px-10 py-4 rounded-xl font-bold text-base"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t section-divider py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-lg font-bold flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#FF4D2E]"></span>
                <span>SFE</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">Building the next generation of founders.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#events" className="text-gray-400 hover:text-[#FF4D2E] transition">Events</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-[#FF4D2E] transition">Projects</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-[#FF4D2E] transition">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/resources" className="text-gray-400 hover:text-[#FF4D2E] transition">Guides</a></li>
                <li><a href="/resources" className="text-gray-400 hover:text-[#FF4D2E] transition">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Get in Touch</h4>
              <p className="text-sm text-gray-400">foundry@school.edu</p>
            </div>
          </div>
          <div className="border-t section-divider pt-8 text-center text-sm text-gray-500">
            <p>© 2026 Mission SFE Foundry. Built by students, for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
