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
    <div className="bg-[#050505] text-white overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }

        .glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
        }

        .glass-card-hover {
          transition: all 0.3s ease;
          border-color: rgba(255, 69, 0, 0.2);
        }

        .glass-card-hover:hover {
          background: linear-gradient(135deg, rgba(255, 69, 0, 0.08), rgba(255, 69, 0, 0.02));
          border-color: rgba(255, 69, 0, 0.4);
          transform: translateY(-4px);
        }

        .accent-orange { color: #FF4500; }
        .accent-lime { color: #A3E635; }

        .gradient-text {
          background: linear-gradient(135deg, #FF4500, #FF6B35);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-primary {
          background: #FF4500;
          color: #050505;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 1px solid #FF4500;
        }

        .btn-primary:hover {
          background: #FF6B35;
          border-color: #FF6B35;
          box-shadow: 0 8px 24px rgba(255, 69, 0, 0.3);
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
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
          height: 2px;
          background: linear-gradient(90deg, #FF4500 0%, #FF6B35 100%);
          z-index: 100;
          box-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
        }

        input::placeholder { color: #6a6a6a; }
        input:focus { outline: none; }

        .nav-link {
          color: #a1a1aa;
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 500;
        }

        .nav-link:hover {
          color: #FF4500;
        }

        h1, h2, h3 {
          font-weight: 700;
          letter-spacing: -0.5px;
        }
      `}</style>

      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Join Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="glass-card p-8 max-w-md w-full rounded-2xl">
            <h3 className="text-2xl font-bold mb-2">Get early access</h3>
            <p className="text-[#a1a1aa] text-sm mb-6">Join SFE Foundry and start building with us.</p>
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg border border-[#333333] focus:border-[#FF4500] transition"
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
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold accent-orange">SFE</div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="nav-link">About</a>
            <a href="#events" className="nav-link">Events</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#join" className="nav-link">Join</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0f0f0f]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4500] opacity-10 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="fade-in-up">
            <p className="text-[#a1a1aa] text-sm font-medium mb-6 tracking-wide">The future of student innovation</p>
          </div>

          <h1 className="fade-in-up stagger-1 text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build. <span className="gradient-text">Ship.</span> Scale.
          </h1>

          <p className="fade-in-up stagger-2 text-lg text-[#a1a1aa] mb-8 max-w-2xl mx-auto leading-relaxed">
            A community of student builders launching real products. Join us for hackathons, mentorship, and the opportunity to build something that matters.
          </p>

          <div className="fade-in-up stagger-3 flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <button
              onClick={() => setJoinModalOpen(true)}
              className="btn-primary px-8 py-4 rounded-lg font-semibold"
            >
              Get Started
            </button>
            <Link
              href="/events"
              className="btn-secondary px-8 py-4 rounded-lg font-semibold"
            >
              Explore Events
            </Link>
          </div>

          {/* Stats */}
          <div className="fade-in-up stagger-4 grid md:grid-cols-3 gap-6 mt-16">
            {[
              { label: 'Builders', value: '500+' },
              { label: 'Projects', value: '100+' },
              { label: 'Events', value: '12+' },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-lg">
                <div className="text-3xl font-bold accent-orange mb-2">{stat.value}</div>
                <div className="text-sm text-[#a1a1aa]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-24 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">What we're building</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Hackathons',
                desc: '48-hour sprints to build and ship real products with mentorship.'
              },
              {
                icon: '🎯',
                title: 'Pitch Competitions',
                desc: 'Showcase your ideas to investors and win seed funding.'
              },
              {
                icon: '📚',
                title: 'Workshops',
                desc: 'Learn from founders and industry experts building real companies.'
              },
              {
                icon: '🤝',
                title: 'Community',
                desc: 'Connect with ambitious student builders and find your co-founders.'
              },
            ].map((item, idx) => (
              <div key={idx} className="glass-card glass-card-hover p-8 rounded-xl">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-[#a1a1aa]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="relative py-24 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Upcoming events</h2>

          <div className="space-y-6">
            {[
              { date: 'July 15-17', name: 'Summer Hackathon 2026', desc: '48-hour sprint to build and ship.' },
              { date: 'August 5', name: 'Pitch Competition', desc: 'Pitch for $5K seed funding and mentorship.' },
              { date: 'Biweekly', name: 'Founder Workshops', desc: 'Learn from founders building real companies.' },
              { date: 'Sept 20', name: 'Demo Day', desc: 'Showcase projects to investors and the community.' },
            ].map((event, idx) => (
              <Link key={idx} href="/events" className="glass-card glass-card-hover p-6 rounded-xl block group">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-[#FF4500] font-semibold mb-2">{event.date}</p>
                    <h3 className="text-xl font-bold group-hover:text-[#FF4500] transition mb-2">{event.name}</h3>
                    <p className="text-[#a1a1aa]">{event.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative py-24 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Wall of fame</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '🚀', name: 'TechStart MVP', by: 'Sarah & Alex' },
              { emoji: '🌍', name: 'EcoTracker', by: 'Jordan' },
              { emoji: '📚', name: 'StudySync', by: 'Team of 4' },
              { emoji: '💰', name: 'FinanceFlow', by: 'Maya' },
              { emoji: '🎵', name: 'MusicMatch', by: 'Chris & Sam' },
              { emoji: '❤️', name: 'HealthHub', by: 'Lisa' },
            ].map((proj, idx) => (
              <Link key={idx} href="/projects" className="glass-card glass-card-hover p-6 rounded-xl block">
                <div className="text-4xl mb-4">{proj.emoji}</div>
                <h3 className="text-lg font-bold mb-2">{proj.name}</h3>
                <p className="text-sm text-[#a1a1aa]">by {proj.by}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="relative py-24 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Resources & guides</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '🚀', title: 'Startup 101' },
              { emoji: '⚙️', title: 'Tech Stack' },
              { emoji: '📊', title: 'Pitch Deck' },
              { emoji: '🎨', title: 'Design System' },
              { emoji: '📢', title: 'Marketing' },
              { emoji: '👥', title: 'Mentorship' },
            ].map((res, idx) => (
              <Link key={idx} href="/resources" className="glass-card glass-card-hover p-6 rounded-xl block">
                <div className="text-3xl mb-3">{res.emoji}</div>
                <h3 className="font-bold">{res.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="relative py-24 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 md:p-16 rounded-2xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to build?</h2>
            <p className="text-[#a1a1aa] mb-8 max-w-2xl mx-auto">Join ambitious student builders creating products that matter.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setJoinModalOpen(true)}
                className="btn-primary px-8 py-4 rounded-lg font-semibold"
              >
                Join the community
              </button>
              <Link href="/events" className="btn-secondary px-8 py-4 rounded-lg font-semibold">
                View events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold accent-orange mb-2">SFE</h3>
              <p className="text-sm text-[#a1a1aa]">Building the next generation of founders.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-[#a1a1aa]">
                <li><a href="#events" className="hover:text-[#FF4500] transition">Events</a></li>
                <li><a href="#projects" className="hover:text-[#FF4500] transition">Projects</a></li>
                <li><a href="#about" className="hover:text-[#FF4500] transition">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[#a1a1aa]">
                <li><a href="/resources" className="hover:text-[#FF4500] transition">Guides</a></li>
                <li><a href="/resources" className="hover:text-[#FF4500] transition">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm text-[#a1a1aa]">foundry@school.edu</p>
            </div>
          </div>
          <div className="border-t border-[#1a1a1a] pt-8 text-center text-sm text-[#6a6a6a]">
            <p>© 2026 Mission SFE Foundry. Built by students, for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
