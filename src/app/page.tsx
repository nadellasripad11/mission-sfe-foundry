'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollY(scrollTop);
      setScrollProgress(scrollPercent);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      alert('Thanks for signing up! 🎉');
      setEmail('');
      setJoinModalOpen(false);
      setIsSubmitting(false);
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Signup error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0F0F23] text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap');

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

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }

        .glass-card {
          background: linear-gradient(135deg, rgba(30, 27, 75, 0.4), rgba(30, 27, 75, 0.2));
          border: 1px solid rgba(249, 115, 22, 0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .glass-card-hover {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }

        .glass-card-hover:hover {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(249, 115, 22, 0.08));
          border-color: rgba(249, 115, 22, 0.5);
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(249, 115, 22, 0.25);
        }

        .btn-primary {
          background: linear-gradient(135deg, #F97316, #FB923C);
          color: white;
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover {
          box-shadow: 0 20px 50px rgba(249, 115, 22, 0.4);
          transform: translateY(-3px);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }

        .btn-secondary:hover {
          border-color: #F97316;
          background: rgba(249, 115, 22, 0.1);
        }

        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #F97316 0%, #FB923C 100%);
          z-index: 100;
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.6);
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          cursor: pointer;
        }

        .nav-link:hover {
          color: #F97316;
        }

        .gradient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.1;
        }

        .section-divider {
          border-color: rgba(249, 115, 22, 0.15);
        }
      `}</style>

      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Background gradient blobs */}
      <div className="gradient-blob w-[800px] h-[800px] top-20 right-0 bg-gradient-to-br from-[#F97316] to-transparent" />
      <div className="gradient-blob w-[600px] h-[600px] bottom-32 left-0 bg-gradient-to-tr from-[#F97316] to-transparent" />

      {/* Join Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="glass-card p-8 max-w-md w-full rounded-3xl">
            <h3 className="text-3xl font-bold mb-2">Get early access</h3>
            <p className="text-gray-300 text-sm mb-6">Join SFE Foundry and start building the future.</p>
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1E1B4B] text-white rounded-xl border border-[#F97316]/20 focus:border-[#F97316] focus:outline-none transition placeholder-gray-500"
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
      <nav className="fixed top-0 w-full z-40 backdrop-blur-lg bg-[#0F0F23]/80 border-b section-divider border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
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

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="fade-in-up mb-6">
                <span className="inline-block px-4 py-2 bg-[#F97316]/15 border border-[#F97316]/40 rounded-full text-xs font-semibold text-[#FB923C] tracking-wide uppercase">
                  Student Innovation
                </span>
              </div>

              <h1 className="fade-in-up stagger-1 text-5xl md:text-7xl font-bold leading-tight mb-8">
                Build every
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
                  idea.
                </span>
                Ship instantly.
              </h1>

              <p className="fade-in-up stagger-2 text-lg text-gray-300 mb-10 leading-relaxed max-w-lg">
                Join a community of student builders shipping real products. Get funding, mentorship, and the tools to launch your startup.
              </p>

              <div className="fade-in-up stagger-3 flex flex-col sm:flex-row gap-4 mb-16">
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
              <div className="fade-in-up stagger-4 grid grid-cols-3 gap-8 pt-8 border-t section-divider">
                {[
                  { value: '500+', label: 'Builders' },
                  { value: '100+', label: 'Projects' },
                  { value: '$1M+', label: 'Raised' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div className="fade-in-up stagger-2 relative h-[500px] hidden md:block">
              <div className="glass-card p-1 rounded-3xl h-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#2D1B3D] to-[#1a0f23] relative flex items-center justify-center">
                  <svg className="w-40 h-40 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F97316]/10 to-transparent rounded-3xl"></div>
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
            <h2 className="text-5xl md:text-6xl font-bold mb-4">What we offer</h2>
            <p className="text-gray-400 text-lg max-w-2xl">Everything you need to build and ship your startup idea.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                  </svg>
                ),
                title: 'Hackathons',
                desc: '48-hour sprints to build and ship real products.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                ),
                title: 'Pitch Competitions',
                desc: 'Win $5K+ in seed funding and investor connections.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                ),
                title: 'Workshops',
                desc: 'Learn from founders and industry leaders.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                ),
                title: 'Community',
                desc: 'Find co-founders and collaborate with builders.'
              },
            ].map((item, idx) => (
              <div key={idx} className="glass-card glass-card-hover p-8 rounded-2xl group">
                <div className="text-[#F97316] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
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
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Upcoming events</h2>
            <p className="text-gray-400 text-lg">Connect with builders and take your ideas further.</p>
          </div>

          <div className="space-y-4">
            {[
              { date: 'July 15-17', title: 'Summer Hackathon 2026', desc: '48-hour sprint to build and ship.', color: 'from-[#F97316]' },
              { date: 'August 5', title: 'Pitch Competition', desc: '$5K in seed funding + investor intros.', color: 'from-[#FB923C]' },
              { date: 'Biweekly', title: 'Founder Workshops', desc: 'Learn from founders in the network.', color: 'from-[#F97316]' },
              { date: 'Sept 20', title: 'Demo Day', desc: 'Showcase to investors and community.', color: 'from-[#FB923C]' },
            ].map((event, idx) => (
              <Link
                key={idx}
                href="/events"
                className="glass-card glass-card-hover p-8 rounded-2xl block group relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#F97316] to-transparent"></div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#F97316] mb-2 uppercase tracking-widest">{event.date}</p>
                    <h3 className="text-2xl font-bold group-hover:text-[#F97316] transition mb-2">{event.title}</h3>
                    <p className="text-gray-300">{event.desc}</p>
                  </div>
                  <div className="text-gray-500 group-hover:text-[#F97316] transition ml-4">
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
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Wall of fame</h2>
            <p className="text-gray-400 text-lg">Student-built projects funded and launched in 2026.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🚀', name: 'TechStart MVP', by: 'Sarah & Alex' },
              { icon: '🌍', name: 'EcoTracker', by: 'Jordan' },
              { icon: '📚', name: 'StudySync', by: 'Team of 4' },
              { icon: '💰', name: 'FinanceFlow', by: 'Maya' },
              { icon: '🎵', name: 'MusicMatch', by: 'Chris & Sam' },
              { icon: '❤️', name: 'HealthHub', by: 'Lisa' },
            ].map((proj, idx) => (
              <Link key={idx} href="/projects" className="glass-card glass-card-hover p-8 rounded-2xl block">
                <div className="text-5xl mb-4">{proj.icon}</div>
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
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Resources</h2>
            <p className="text-gray-400 text-lg">Everything you need to launch your startup.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🚀', title: 'Startup 101' },
              { icon: '⚙️', title: 'Tech Stack' },
              { icon: '📊', title: 'Pitch Deck' },
              { icon: '🎨', title: 'Design System' },
              { icon: '📢', title: 'Marketing' },
              { icon: '👥', title: 'Mentorship' },
            ].map((res, idx) => (
              <Link key={idx} href="/resources" className="glass-card glass-card-hover p-8 rounded-2xl block text-center group">
                <div className="text-5xl mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                  {res.icon}
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
          <div className="glass-card p-12 md:p-20 rounded-3xl text-center">
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
                <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                <span>SFE</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">Building the next generation of founders.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#events" className="text-gray-400 hover:text-[#F97316] transition">Events</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-[#F97316] transition">Projects</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-[#F97316] transition">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/resources" className="text-gray-400 hover:text-[#F97316] transition">Guides</a></li>
                <li><a href="/resources" className="text-gray-400 hover:text-[#F97316] transition">Templates</a></li>
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
