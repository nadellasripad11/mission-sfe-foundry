'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
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
    <div className="bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); } 50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.5); } }

        .fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .slide-down { animation: slideDown 0.6s ease-out forwards; }
        .float { animation: float 3s ease-in-out infinite; }
        .glow { animation: glow 3s ease-in-out infinite; }

        .gradient-text { background: linear-gradient(135deg, #6366f1, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .gradient-button { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
        .gradient-card { background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05)); }

        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15); }
      `}</style>

      {/* Join Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white p-8 max-w-md w-full rounded-2xl shadow-2xl">
            <h3 className="text-3xl font-bold mb-2 gradient-text">Get Early Access</h3>
            <p className="text-gray-600 mb-6">Join SFE Foundry and be part of something amazing.</p>
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 gradient-button text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition"
                >
                  Join Now
                </button>
                <button
                  type="button"
                  onClick={() => setJoinModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sticky Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-gray-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">SFE</div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about" className="text-gray-600 hover:text-indigo-600 transition">About</a>
            <a href="#events" className="text-gray-600 hover:text-indigo-600 transition">Events</a>
            <a href="#projects" className="text-gray-600 hover:text-indigo-600 transition">Projects</a>
            <a href="#join" className="text-gray-600 hover:text-indigo-600 transition">Join</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 blur-3xl float" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-20 blur-3xl float" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="fade-in-up">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">Welcome to the future of innovation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight" style={{ animationDelay: '0.1s' }}>
            <span className="gradient-text">Build. Ship. Scale.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            A community of student builders creating products that matter. Join hundreds of makers launching their ideas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => setJoinModalOpen(true)}
              className="px-8 py-4 gradient-button text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition"
            >
              Get Started
            </button>
            <Link
              href="/events"
              className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition"
            >
              Explore Events
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              { icon: '⚡', label: 'Fast', desc: 'Build in 48 hours' },
              { icon: '🚀', label: 'Ship', desc: 'Get real users' },
              { icon: '📈', label: 'Scale', desc: 'Grow together' }
            ].map((item, i) => (
              <div key={i} className="fade-in-up" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">What We're Building</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl">Everything you need to launch your next big idea.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Hackathons', desc: '48-hour sprints to build and ship real projects.', emoji: '⚡' },
              { title: 'Pitch Competitions', desc: 'Showcase your ideas and win funding.', emoji: '🎯' },
              { title: 'Workshops', desc: 'Learn from founders and industry experts.', emoji: '📚' },
              { title: 'Community', desc: 'Connect with ambitious builders like you.', emoji: '🤝' },
            ].map((item, idx) => (
              <div key={idx} className="card-hover gradient-card p-8 rounded-xl border border-gray-100">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Upcoming Events</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl">Don't miss out on these game-changing opportunities.</p>

          <div className="space-y-6">
            {[
              { date: 'July 15-17', name: 'Summer Hackathon 2026', desc: 'Build anything. Win prizes. Ship fast.', icon: '🚀' },
              { date: 'August 5', name: 'Pitch Competition', desc: 'Pitch for mentorship & $5K seed funding.', icon: '💰' },
              { date: 'Biweekly', name: 'Founder Workshops', desc: 'Learn from real founders building real companies.', icon: '📖' },
              { date: 'Sept 20', name: 'Demo Day', desc: 'Showcase to investors & the community.', icon: '🎪' },
            ].map((event, idx) => (
              <Link key={idx} href="/events" className="card-hover group block p-6 bg-white rounded-xl border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-indigo-600">{event.date}</span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2 group-hover:text-indigo-600 transition">{event.name}</h3>
                    <p className="text-gray-600 mt-2">{event.desc}</p>
                  </div>
                  <div className="text-3xl ml-4">{event.icon}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Wall of Fame</h2>
          <p className="text-xl text-gray-600 mb-16">Real products built by our community.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '🚀', name: 'TechStart MVP', by: 'Sarah & Alex', desc: 'AI scheduling' },
              { emoji: '🌍', name: 'EcoTracker', by: 'Jordan', desc: 'Carbon footprint' },
              { emoji: '📚', name: 'StudySync', by: 'Team of 4', desc: 'Collab learning' },
              { emoji: '💰', name: 'FinanceFlow', by: 'Maya', desc: 'Personal finance' },
              { emoji: '🎵', name: 'MusicMatch', by: 'Chris & Sam', desc: 'AI playlists' },
              { emoji: '❤️', name: 'HealthHub', by: 'Lisa', desc: 'Wellness tracking' },
            ].map((proj, idx) => (
              <Link key={idx} href="/projects" className="card-hover group block p-6 bg-white rounded-xl border border-gray-100">
                <div className="text-4xl mb-4 group-hover:scale-125 transition">{proj.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition">{proj.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{proj.desc}</p>
                <p className="text-gray-500 text-xs mt-3">by {proj.by}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Resources</h2>
          <p className="text-xl text-gray-600 mb-16">Everything you need to succeed.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '🚀', title: 'Startup 101', desc: 'From idea to launch.' },
              { emoji: '⚙️', title: 'Tech Stack', desc: 'Tools for shipping fast.' },
              { emoji: '📊', title: 'Pitch Deck', desc: 'Investor-ready template.' },
              { emoji: '🎨', title: 'Design', desc: 'UI/UX principles.' },
              { emoji: '📢', title: 'Marketing', desc: 'Go-to-market playbook.' },
              { emoji: '👥', title: 'Mentorship', desc: 'Connect with experts.' },
            ].map((res, idx) => (
              <Link key={idx} href="/resources" className="card-hover group block p-6 bg-white rounded-xl border border-gray-100">
                <div className="text-3xl mb-3">{res.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">{res.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{res.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-card rounded-2xl p-12 md:p-16 border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text">Ready to build something great?</h2>
            <p className="text-xl text-gray-600 text-center mb-8 max-w-2xl mx-auto">Join ambitious student builders creating products that matter.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setJoinModalOpen(true)}
                className="px-8 py-4 gradient-button text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition"
              >
                Join the Community
              </button>
              <Link
                href="/events"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition text-center"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold gradient-text mb-2">SFE</h3>
              <p className="text-gray-600 text-sm">Building the next generation of founders.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#events" className="hover:text-indigo-600 transition">Events</a></li>
                <li><a href="#projects" className="hover:text-indigo-600 transition">Projects</a></li>
                <li><a href="#about" className="hover:text-indigo-600 transition">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/resources" className="hover:text-indigo-600 transition">Guides</a></li>
                <li><a href="/resources" className="hover:text-indigo-600 transition">Templates</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Get in Touch</h4>
              <p className="text-sm text-gray-600">foundry@school.edu</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© 2026 Mission SFE Foundry. Built by students, for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
