'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

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
    try {
      const res = await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to sign up');
        return;
      }

      alert('Thanks for signing up! 🎉');
      setEmail('');
      setJoinModalOpen(false);
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1a0f0f] via-[#2d1818] to-[#1a0f0f] text-white overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        h1, h2, h3 {
          font-family: 'Playfair Display', serif;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 69, 0, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 69, 0, 0.6); }
        }

        .fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }

        .glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
          border: 1px solid rgba(255, 69, 0, 0.15);
          backdrop-filter: blur(12px);
        }

        .glass-card-hover {
          transition: all 0.3s ease;
        }

        .glass-card-hover:hover {
          background: linear-gradient(135deg, rgba(255, 69, 0, 0.12), rgba(255, 69, 0, 0.05));
          border-color: rgba(255, 69, 0, 0.4);
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(255, 69, 0, 0.2);
        }

        .btn-primary {
          background: linear-gradient(135deg, #FF4500, #FF6B35);
          color: white;
          font-weight: 700;
          transition: all 0.3s ease;
          border: none;
        }

        .btn-primary:hover {
          box-shadow: 0 12px 40px rgba(255, 69, 0, 0.4);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          border-color: #FF4500;
          background: rgba(255, 69, 0, 0.1);
        }

        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #FF4500 0%, #FF6B35 100%);
          z-index: 100;
          box-shadow: 0 0 20px rgba(255, 69, 0, 0.6);
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .nav-link:hover {
          color: #FF4500;
        }

        .hero-accent {
          background: linear-gradient(135deg, rgba(255, 69, 0, 0.2), transparent);
          border-radius: 50%;
          position: absolute;
          filter: blur(60px);
        }

        .geometric-shape {
          position: absolute;
          opacity: 0.15;
        }
      `}</style>

      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Background geometric shapes */}
      <div className="geometric-shape w-[800px] h-[800px] top-0 right-0 bg-gradient-to-br from-[#FF4500] to-transparent rounded-full blur-3xl opacity-20" />
      <div className="geometric-shape w-[600px] h-[600px] bottom-0 left-0 bg-gradient-to-tr from-[#FF6B35] to-transparent rounded-full blur-3xl opacity-15" />

      {/* Join Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="glass-card p-8 max-w-md w-full rounded-2xl">
            <h3 className="text-3xl font-bold mb-2">Get early access</h3>
            <p className="text-gray-300 text-sm mb-6">Join SFE Foundry and start building the future.</p>
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a0f0f] text-white rounded-lg border border-[#FF4500]/20 focus:border-[#FF4500] transition placeholder-gray-500"
                required
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 btn-primary px-4 py-3 rounded-lg">
                  Join
                </button>
                <button
                  type="button"
                  onClick={() => setJoinModalOpen(false)}
                  className="flex-1 btn-secondary px-4 py-3 rounded-lg"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md border-b border-[#FF4500]/10">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-[#FF4500]">●</span> SFE
          </div>
          <div className="hidden md:flex gap-12">
            <a href="#about" className="nav-link">About</a>
            <a href="#events" className="nav-link">Events</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#join" className="nav-link">Join</a>
          </div>
          <button onClick={() => setJoinModalOpen(true)} className="btn-primary px-6 py-2 rounded-full text-sm">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <div className="fade-in-up mb-6">
              <span className="inline-block px-4 py-2 bg-[#FF4500]/20 border border-[#FF4500]/40 rounded-full text-sm font-semibold text-[#FF8555]">
                STUDENT INNOVATION
              </span>
            </div>

            <h1 className="fade-in-up stagger-1 text-6xl md:text-7xl font-bold leading-tight mb-6">
              Build every
              <span className="block text-[#FF4500]">idea.</span>
              Ship instantly.
            </h1>

            <p className="fade-in-up stagger-2 text-lg text-gray-300 mb-8 leading-relaxed max-w-md">
              Join a community of student builders shipping real products. Get funding, mentorship, and the tools to launch your startup.
            </p>

            <div className="fade-in-up stagger-3 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setJoinModalOpen(true)}
                className="btn-primary px-8 py-4 rounded-lg font-bold text-lg"
              >
                Get Started
              </button>
              <Link
                href="/events"
                className="btn-secondary px-8 py-4 rounded-lg font-bold text-lg text-center"
              >
                See Events
              </Link>
            </div>

            {/* Stats */}
            <div className="fade-in-up stagger-4 grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-gray-600/30">
              {[
                { value: '500+', label: 'Builders' },
                { value: '100+', label: 'Projects' },
                { value: '$1M+', label: 'Raised' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-[#FF4500]">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="fade-in-up stagger-2 relative">
            <div className="glass-card p-6 rounded-3xl">
              <div className="bg-gradient-to-br from-[#1a0f0f] to-[#2d1818] rounded-2xl p-8 aspect-square flex flex-col justify-center items-center text-center">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-2">Ready to ship?</h3>
                <p className="text-gray-400">Join SFE Foundry and launch your next big idea</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="about" className="relative py-32 px-8 border-t border-[#FF4500]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">What we offer</h2>
          <p className="text-gray-400 text-lg mb-16 max-w-2xl">Everything you need to build and ship your startup idea.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '⚡', title: 'Hackathons', desc: '48-hour sprints to build and ship real products.' },
              { icon: '🎯', title: 'Pitch Competitions', desc: 'Win $5K+ in seed funding and investor connections.' },
              { icon: '📚', title: 'Workshops', desc: 'Learn from founders and industry leaders.' },
              { icon: '🤝', title: 'Community', desc: 'Find co-founders and collaborate with builders.' },
            ].map((item, idx) => (
              <div key={idx} className="glass-card glass-card-hover p-8 rounded-2xl">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="relative py-32 px-8 border-t border-[#FF4500]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16">Upcoming events</h2>

          <div className="space-y-6">
            {[
              { date: 'July 15-17', title: 'Summer Hackathon 2026', desc: '48-hour sprint to build and ship.' },
              { date: 'August 5', title: 'Pitch Competition', desc: '$5K in seed funding + investor intros.' },
              { date: 'Biweekly', title: 'Founder Workshops', desc: 'Learn from founders in the network.' },
              { date: 'Sept 20', title: 'Demo Day', desc: 'Showcase to investors and community.' },
            ].map((event, idx) => (
              <Link key={idx} href="/events" className="glass-card glass-card-hover p-8 rounded-2xl block group">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#FF4500] mb-2 uppercase tracking-wide">{event.date}</p>
                    <h3 className="text-2xl font-bold group-hover:text-[#FF4500] transition mb-2">{event.title}</h3>
                    <p className="text-gray-300">{event.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative py-32 px-8 border-t border-[#FF4500]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16">Wall of fame</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '🚀', name: 'TechStart MVP', by: 'Sarah & Alex' },
              { emoji: '🌍', name: 'EcoTracker', by: 'Jordan' },
              { emoji: '📚', name: 'StudySync', by: 'Team of 4' },
              { emoji: '💰', name: 'FinanceFlow', by: 'Maya' },
              { emoji: '🎵', name: 'MusicMatch', by: 'Chris & Sam' },
              { emoji: '❤️', name: 'HealthHub', by: 'Lisa' },
            ].map((proj, idx) => (
              <Link key={idx} href="/projects" className="glass-card glass-card-hover p-6 rounded-2xl block">
                <div className="text-5xl mb-4">{proj.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{proj.name}</h3>
                <p className="text-sm text-gray-400">by {proj.by}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="relative py-32 px-8 border-t border-[#FF4500]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16">Resources</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '🚀', title: 'Startup 101' },
              { emoji: '⚙️', title: 'Tech Stack' },
              { emoji: '📊', title: 'Pitch Deck' },
              { emoji: '🎨', title: 'Design System' },
              { emoji: '📢', title: 'Marketing' },
              { emoji: '👥', title: 'Mentorship' },
            ].map((res, idx) => (
              <Link key={idx} href="/resources" className="glass-card glass-card-hover p-8 rounded-2xl block text-center">
                <div className="text-4xl mb-4">{res.emoji}</div>
                <h3 className="font-bold">{res.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="relative py-32 px-8 border-t border-[#FF4500]/10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 md:p-16 rounded-3xl text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to ship?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Join 500+ student builders launching real startups with SFE Foundry.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setJoinModalOpen(true)}
                className="btn-primary px-8 py-4 rounded-lg font-bold text-lg"
              >
                Get Started
              </button>
              <Link href="/events" className="btn-secondary px-8 py-4 rounded-lg font-bold text-lg">
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#FF4500]/10 py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-2">
                <span className="text-[#FF4500]">●</span> SFE
              </h3>
              <p className="text-sm text-gray-400">Building the next generation of founders.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#events" className="hover:text-[#FF4500] transition">Events</a></li>
                <li><a href="#projects" className="hover:text-[#FF4500] transition">Projects</a></li>
                <li><a href="#about" className="hover:text-[#FF4500] transition">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/resources" className="hover:text-[#FF4500] transition">Guides</a></li>
                <li><a href="/resources" className="hover:text-[#FF4500] transition">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm text-gray-400">foundry@school.edu</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            <p>© 2026 Mission SFE Foundry. Built by students, for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
