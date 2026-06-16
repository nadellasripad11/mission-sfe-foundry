'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleCounters, setVisibleCounters] = useState(false);
  const [counters, setCounters] = useState({
    members: 0,
    hackathons: 0,
    meetings: 0,
    prizePool: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);

      // Trigger counters when stats section is visible
      const statsSection = document.getElementById('stats');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && !visibleCounters) {
          setVisibleCounters(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCounters]);

  // Animate counters
  useEffect(() => {
    if (!visibleCounters) return;

    const duration = 2000;
    const start = Date.now();

    const timer = setInterval(() => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setCounters({
        members: Math.floor(progress * 50),
        hackathons: Math.floor(progress * 12),
        meetings: Math.floor(progress * 24),
        prizePool: Math.floor(progress * 1000),
      });

      if (progress === 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [visibleCounters]);

  return (
    <div className="bg-[#050816] text-[#F8FAFC] overflow-x-hidden">
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

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
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

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .slide-in-down {
          animation: slideInDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }

        .float {
          animation: float 6s ease-in-out infinite;
        }

        .float-delay-1 { animation-delay: 0s; }
        .float-delay-2 { animation-delay: 1s; }
        .float-delay-3 { animation-delay: 2s; }

        /* Scroll Progress */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #3B82F6 0%, #22D3EE 100%);
          z-index: 100;
          transition: width 0.1s ease-out;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
        }

        /* Navigation */
        nav {
          background: rgba(5, 8, 22, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(34, 211, 238, 0.1);
        }

        .nav-link {
          color: rgba(248, 250, 252, 0.7);
          transition: all 0.3s ease-out;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3B82F6, #22D3EE);
          transition: width 0.3s ease-out;
        }

        .nav-link:hover {
          color: #3B82F6;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Button Styles */
        .btn-primary {
          background: linear-gradient(135deg, #3B82F6, #22D3EE);
          color: white;
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.4s ease-out;
          z-index: 1;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(59, 130, 246, 0.6);
        }

        .btn-primary:active {
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid rgba(59, 130, 246, 0.5);
          color: #3B82F6;
          font-weight: 600;
          transition: all 0.3s ease-out;
          cursor: pointer;
        }

        .btn-secondary:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: #3B82F6;
          transform: translateY(-4px);
        }

        /* Cards */
        .feature-card {
          background: linear-gradient(135deg, rgba(11, 16, 32, 0.8), rgba(11, 16, 32, 0.4));
          border: 1px solid rgba(34, 211, 238, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease-out;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(34, 211, 238, 0.6);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.05));
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.25);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        /* Event Card */
        .event-card {
          background: linear-gradient(135deg, rgba(11, 16, 32, 0.7), rgba(11, 16, 32, 0.3));
          border: 1px solid rgba(34, 211, 238, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .event-card:hover {
          transform: translateY(-12px);
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 24px 60px rgba(59, 130, 246, 0.3);
        }

        /* Sponsor Grid */
        .sponsor-logo {
          background: rgba(11, 16, 32, 0.5);
          border: 1px solid rgba(34, 211, 238, 0.2);
          transition: all 0.3s ease-out;
          cursor: pointer;
        }

        .sponsor-logo:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.6);
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
        }

        /* Polaroid */
        .polaroid {
          background: white;
          padding: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transform: rotate(-2deg);
          transition: all 0.3s ease-out;
        }

        .polaroid:hover {
          transform: rotate(0deg) translateY(-8px);
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.4);
        }

        .polaroid:nth-child(2n) {
          transform: rotate(2deg);
        }

        .polaroid:nth-child(2n):hover {
          transform: rotate(0deg) translateY(-8px);
        }

        /* Leadership Card */
        .leader-card {
          background: linear-gradient(135deg, rgba(11, 16, 32, 0.8), rgba(11, 16, 32, 0.4));
          border: 1px solid rgba(34, 211, 238, 0.2);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-align: center;
        }

        .leader-card:hover {
          transform: translateY(-12px);
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.25);
        }

        /* Section Divider */
        .section-divider {
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
          height: 1px;
        }

        /* Gradient Text */
        .gradient-text {
          background: linear-gradient(135deg, #3B82F6, #22D3EE);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Icon Container */
        .icon-wrapper {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease-out;
        }

        .feature-card:hover .icon-wrapper {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(34, 211, 238, 0.2));
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
        }

        svg {
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.2));
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">SFE</div>
          <div className="hidden md:flex gap-12">
            <a href="#features" className="nav-link text-sm uppercase tracking-wider">Features</a>
            <a href="#events" className="nav-link text-sm uppercase tracking-wider">Events</a>
            <a href="#community" className="nav-link text-sm uppercase tracking-wider">Community</a>
            <a href="#team" className="nav-link text-sm uppercase tracking-wider">Team</a>
          </div>
          <button className="btn-primary px-6 py-2.5 rounded-full text-sm font-bold">
            Join Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl float float-delay-1" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl float float-delay-2" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl float float-delay-3" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="fade-in-up text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Where Student Builders
            <span className="block gradient-text">Become Founders</span>
          </h1>

          <p className="fade-in-up stagger-1 text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join a community of ambitious students building startups, competing in hackathons, launching projects, and learning real-world skills beyond the classroom.
          </p>

          <div className="fade-in-up stagger-2 flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-primary px-8 py-4 rounded-xl font-bold text-lg">
              Join SFE Foundry
            </button>
            <button className="btn-secondary px-8 py-4 rounded-xl font-bold text-lg">
              Explore Events
            </button>
          </div>

          {/* Stats Preview */}
          <div className="fade-in-up stagger-3 grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-slate-800/50">
            <div>
              <div className="text-4xl font-bold gradient-text">50+</div>
              <div className="text-sm text-slate-400 mt-2">Community Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">12</div>
              <div className="text-sm text-slate-400 mt-2">Hackathons Yearly</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">$1K+</div>
              <div className="text-sm text-slate-400 mt-2">Prize Pool</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="slide-in-down text-5xl md:text-6xl font-bold mb-4 text-center">
            What We Offer
          </h2>
          <p className="fade-in-up text-center text-slate-400 text-lg mb-20 max-w-2xl mx-auto">
            Everything you need to turn your ideas into reality
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Monthly Hackathons',
                desc: 'Build projects, solve problems, and compete with other students in 24-48 hour sprints.',
                icon: '⚡',
              },
              {
                title: 'Startup Competitions',
                desc: 'Pitch your ideas and get feedback from judges, mentors, and experienced founders.',
                icon: '🚀',
              },
              {
                title: 'Workshops',
                desc: 'Learn coding, AI, design, entrepreneurship, marketing, and leadership from industry experts.',
                icon: '📚',
              },
              {
                title: 'Community',
                desc: 'Connect with ambitious students, form teams, collaborate on projects, and build together.',
                icon: '🤝',
              },
            ].map((feature, idx) => (
              <div key={idx} className="feature-card p-8 rounded-3xl fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="icon-wrapper mb-6">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-300 text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider my-20" />

      {/* Statistics Section */}
      <section id="stats" className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center">
            Our Impact
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="fade-in-up text-center">
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">{counters.members}+</div>
              <p className="text-slate-400 text-lg">Community Members</p>
            </div>
            <div className="fade-in-up stagger-1 text-center">
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">{counters.hackathons}</div>
              <p className="text-slate-400 text-lg">Hackathons Per Year</p>
            </div>
            <div className="fade-in-up stagger-2 text-center">
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">{counters.meetings}</div>
              <p className="text-slate-400 text-lg">Community Meetings</p>
            </div>
            <div className="fade-in-up stagger-3 text-center">
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">${counters.prizePool}+</div>
              <p className="text-slate-400 text-lg">Prize Pool</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider my-20" />

      {/* Events Section */}
      <section id="events" className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="slide-in-down text-5xl md:text-6xl font-bold mb-4 text-center">
            Upcoming Events
          </h2>
          <p className="fade-in-up text-center text-slate-400 text-lg mb-20 max-w-2xl mx-auto">
            Join us for exciting hackathons, competitions, and workshops
          </p>

          <div className="space-y-8">
            {['Hackathons', 'Startup Challenges', 'Workshops'].map((category, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-bold mb-6 text-blue-300 fade-in-up" style={{ animationDelay: `${idx * 0.2}s` }}>
                  Upcoming {category}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="event-card p-8 rounded-2xl fade-in-up" style={{ animationDelay: `${(idx * 3 + i) * 0.1}s` }}>
                      <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full mb-4">
                        <span className="text-sm font-bold text-blue-200">Coming Soon</span>
                      </div>
                      <h4 className="text-xl font-bold mb-3">{category} Event {i}</h4>
                      <p className="text-slate-400 mb-6">Stay tuned for details about our upcoming {category.toLowerCase()} event.</p>
                      <button className="text-blue-400 font-bold text-sm hover:text-blue-300 transition">
                        Learn More →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider my-20" />

      {/* Sponsors Section */}
      <section className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            Supported By
          </h2>
          <p className="fade-in-up text-center text-slate-400 text-lg mb-20 max-w-2xl mx-auto">
            Supporting the next generation of builders
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="sponsor-logo h-32 rounded-2xl flex items-center justify-center fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-slate-500 font-bold text-center">
                  <div className="text-3xl mb-2">★</div>
                  <div className="text-xs">Partner {i}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider my-20" />

      {/* Community Gallery */}
      <section id="community" className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="slide-in-down text-5xl md:text-6xl font-bold mb-4 text-center">
            Our Community
          </h2>
          <p className="fade-in-up text-center text-slate-400 text-lg mb-20 max-w-2xl mx-auto">
            Moments from hackathons, pitches, and community events
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="polaroid rounded-lg overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center">
                    <div className="text-5xl">📸</div>
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-sm text-slate-700 font-handwriting">Memory {i}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider my-20" />

      {/* Leadership Section */}
      <section id="team" className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="slide-in-down text-5xl md:text-6xl font-bold mb-4 text-center">
            Leadership Team
          </h2>
          <p className="fade-in-up text-center text-slate-400 text-lg mb-20 max-w-2xl mx-auto">
            Meet the passionate students leading SFE Foundry
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Co-Founder & President', role: 'Vision & Strategy' },
              { name: 'Co-Founder & VP', role: 'Events & Operations' },
              { name: 'Head of Workshops', role: 'Education & Growth' },
              { name: 'Community Manager', role: 'Engagement & Support' },
            ].map((leader, idx) => (
              <div key={idx} className="leader-card p-8 rounded-3xl fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                <p className="text-slate-400 text-sm">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider my-20" />

      {/* Final CTA */}
      <section className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="fade-in-up text-5xl md:text-6xl font-bold mb-8">
            Ready to Build Something Amazing?
          </h2>
          <p className="fade-in-up stagger-1 text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join SFE Foundry and become part of a community of builders, founders, creators, and innovators. Your next big idea starts here.
          </p>
          <div className="fade-in-up stagger-2 flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-primary px-10 py-4 rounded-xl font-bold text-lg">
              Apply Now
            </button>
            <button className="btn-secondary px-10 py-4 rounded-xl font-bold text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">SFE Foundry</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering the next generation of student builders and founders.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-slate-200">Navigation</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
                <li><a href="#events" className="hover:text-blue-400 transition">Events</a></li>
                <li><a href="#community" className="hover:text-blue-400 transition">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-slate-200">Community</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition">Discord</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">GitHub</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Twitter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-slate-200">Contact</h4>
              <p className="text-sm text-slate-400">
                Have questions? Reach out to us anytime.
              </p>
              <p className="text-sm text-blue-400 font-bold mt-4">hello@sfefoundry.com</p>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-8 text-center text-sm text-slate-500">
            <p>© 2024 SFE Foundry. Build. Compete. Launch. — All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
