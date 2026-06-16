'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-[#FFF8ED] text-[#1D3557] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Fredoka:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        html {
          scroll-behavior: smooth;
        }

        * {
          font-family: 'Inter', sans-serif;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Fredoka', sans-serif;
          font-weight: 700;
        }

        .handwritten {
          font-family: 'Caveat', cursive;
          font-weight: 700;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
          50% { transform: translateY(-20px) rotate(var(--rotation, 0deg)); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }

        .float {
          animation: float 4s ease-in-out infinite;
        }

        .bounce {
          animation: bounce 3s ease-in-out infinite;
        }

        .spin {
          animation: spin 20s linear infinite;
        }

        .wiggle {
          animation: wiggle 0.5s ease-in-out;
        }

        .wiggle:hover {
          animation: wiggle 0.5s ease-in-out;
        }

        .slide-in {
          animation: slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }

        /* Sticker Style */
        .sticker {
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
          transform-origin: center;
          transition: all 0.3s ease;
        }

        .sticker:hover {
          filter: drop-shadow(4px 8px 12px rgba(0, 0, 0, 0.2));
          transform: scale(1.05) rotate(2deg);
        }

        /* Card Styles */
        .card {
          background: white;
          border: 3px solid #1D3557;
          border-radius: 24px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-8px) rotate(-1deg);
          box-shadow: 8px 12px 24px rgba(29, 53, 87, 0.15);
        }

        /* Button Styles */
        .btn {
          font-family: 'Fredoka', sans-serif;
          font-weight: 700;
          border: 3px solid currentColor;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          font-size: 1.1rem;
          padding: 12px 32px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #FF6B35, #FFD166);
          color: white;
          border-color: #FF6B35;
        }

        .btn-primary:hover {
          transform: scale(1.05) rotate(2deg);
          box-shadow: 6px 8px 16px rgba(255, 107, 53, 0.3);
        }

        .btn-secondary {
          background: white;
          color: #1D3557;
          border-color: #1D3557;
        }

        .btn-secondary:hover {
          background: #1D3557;
          color: white;
          transform: scale(1.05);
        }

        /* Polaroid */
        .polaroid {
          background: white;
          padding: 12px;
          box-shadow: 2px 8px 16px rgba(0, 0, 0, 0.12);
          transform: rotate(-2deg);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .polaroid:hover {
          transform: rotate(0deg) translateY(-8px) scale(1.02);
          box-shadow: 4px 16px 32px rgba(0, 0, 0, 0.2);
        }

        .polaroid:nth-child(2n) {
          transform: rotate(2deg);
        }

        .polaroid:nth-child(2n):hover {
          transform: rotate(0deg) translateY(-8px) scale(1.02);
        }

        .polaroid:nth-child(3n) {
          transform: rotate(-3deg);
        }

        .polaroid:nth-child(3n):hover {
          transform: rotate(0deg) translateY(-8px) scale(1.02);
        }

        /* Doodle Arrow */
        .doodle-arrow {
          font-size: 2rem;
          display: inline-block;
          animation: bounce 2s ease-in-out infinite;
        }

        /* Navigation */
        nav {
          background: white;
          border-bottom: 3px solid #1D3557;
        }

        .nav-link {
          color: #1D3557;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 3px;
          background: #FF6B35;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #FF6B35;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Badge */
        .badge {
          display: inline-block;
          background: white;
          border: 2px solid #1D3557;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          transform: rotate(-2deg);
          transition: all 0.3s ease;
        }

        .badge:hover {
          transform: rotate(2deg) scale(1.05);
        }

        /* Achievement Badge */
        .achievement {
          width: 80px;
          height: 80px;
          background: white;
          border: 3px solid #1D3557;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          transition: all 0.3s ease;
        }

        .achievement:hover {
          transform: scale(1.1) rotate(-10deg);
          box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.15);
        }

        /* Confetti */
        .confetti-piece {
          position: fixed;
          pointer-events: none;
          animation: confetti 3s ease-out forwards;
        }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold handwritten text-[#FF6B35]">SFE Foundry</div>
          <div className="hidden md:flex gap-10">
            <a href="#competitions" className="nav-link">Competitions</a>
            <a href="#events" className="nav-link">Events</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#team" className="nav-link">Team</a>
          </div>
          <button className="btn btn-primary px-6 py-3">
            Join Us
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-8 overflow-hidden">
        {/* Floating Stickers Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 text-6xl float" style={{ '--rotation': '15deg' }}>🚀</div>
          <div className="absolute top-40 right-20 text-5xl float" style={{ '--rotation': '-10deg', animationDelay: '0.5s' }}>💡</div>
          <div className="absolute bottom-40 left-20 text-5xl float" style={{ '--rotation': '20deg', animationDelay: '1s' }}>🏆</div>
          <div className="absolute bottom-20 right-10 text-6xl float" style={{ '--rotation': '-15deg', animationDelay: '1.5s' }}>🎯</div>
          <div className="absolute top-1/2 left-1/3 text-4xl bounce">⚡</div>
          <div className="absolute top-1/3 right-1/4 text-5xl float" style={{ '--rotation': '30deg', animationDelay: '2s' }}>🤖</div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-8xl md:text-9xl font-bold handwritten mb-6 text-[#1D3557] slide-in" style={{ lineHeight: '1.2' }}>
            Build cool
            <br />
            <span className="text-[#FF6B35]">things.</span>
          </h1>

          <p className="slide-in stagger-1 text-2xl md:text-3xl font-semibold text-[#1D3557] mb-12 leading-relaxed max-w-2xl mx-auto">
            Join students building startups, winning hackathons, launching projects, and turning ideas into reality.
          </p>

          <div className="slide-in stagger-2 flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn btn-primary">Join SFE Foundry</button>
            <button className="btn btn-secondary">Upcoming Events</button>
          </div>

          {/* Doodle Elements */}
          <div className="slide-in stagger-3 mt-16 flex justify-center gap-12">
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">👥</div>
              <div className="font-bold text-lg">50+ Members</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">⚙️</div>
              <div className="font-bold text-lg">Building Daily</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">🎨</div>
              <div className="font-bold text-lg">Super Fun</div>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Competitions Section */}
      <section id="competitions" className="py-32 px-8 bg-gradient-to-br from-[#4DA8FF]/10 via-transparent to-[#06D6A0]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-bold handwritten text-center mb-4 text-[#1D3557]">
            Startup <span className="text-[#FF6B35]">Competitions</span>
          </h2>
          <p className="text-center text-lg text-[#1D3557]/70 mb-16 max-w-2xl mx-auto">
            Pitch your ideas, get feedback from mentors, compete for prizes, and launch your next big thing.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {['Pitch Competition', 'Demo Day', 'Founders Summit'].map((title, idx) => (
              <div key={idx} className="card p-8 slide-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="text-5xl mb-4">🎤</div>
                <h3 className="text-3xl font-bold handwritten mb-4 text-[#FF6B35]">{title}</h3>
                <p className="text-[#1D3557]/70 mb-6 leading-relaxed">
                  Monthly competitions where student founders pitch ideas to judges and win prizes.
                </p>
                <button className="btn btn-secondary w-full">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hackathons Section */}
      <section id="events" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-bold handwritten text-center mb-4 text-[#1D3557]">
            <span className="text-[#4DA8FF]">Hackathons</span> & Build Challenges
          </h2>
          <p className="text-center text-lg text-[#1D3557]/70 mb-16 max-w-2xl mx-auto">
            Build projects, compete with friends, and show off your creations.
          </p>

          <div className="space-y-8">
            {[
              { title: '24-Hour Hackathons', emoji: '⏱️', color: 'bg-[#FFD166]/20' },
              { title: 'Weekly Challenges', emoji: '📅', color: 'bg-[#4DA8FF]/20' },
              { title: 'AI/ML Hackathons', emoji: '🤖', color: 'bg-[#06D6A0]/20' },
            ].map((hack, idx) => (
              <div key={idx} className={`${hack.color} border-3 border-[#1D3557] rounded-3xl p-10 slide-in`} style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="flex items-center gap-6">
                  <div className="text-6xl">{hack.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-[#1D3557] mb-2">{hack.title}</h3>
                    <p className="text-[#1D3557]/70">Build something amazing and compete with the community.</p>
                  </div>
                  <button className="btn btn-primary">Register</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Projects Section */}
      <section id="projects" className="py-32 px-8 bg-gradient-to-br from-[#FF6B35]/5 via-transparent to-[#FFD166]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-bold handwritten text-center mb-4 text-[#1D3557]">
            Projects Built by <span className="text-[#06D6A0]">Our Community</span>
          </h2>
          <p className="text-center text-lg text-[#1D3557]/70 mb-16 max-w-2xl mx-auto">
            Check out the amazing things our members are building.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'AI Study Assistant', emoji: '📚', members: '3 members' },
              { title: 'E-Commerce Platform', emoji: '🛍️', members: '5 members' },
              { title: 'Social App', emoji: '💬', members: '2 members' },
              { title: 'Mobile Game', emoji: '🎮', members: '4 members' },
              { title: 'Weather Dashboard', emoji: '🌤️', members: '2 members' },
              { title: 'Finance Tracker', emoji: '💰', members: '3 members' },
            ].map((proj, idx) => (
              <div key={idx} className="card p-6 slide-in hover:shadow-xl" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-6xl mb-4">{proj.emoji}</div>
                <h3 className="text-2xl font-bold text-[#1D3557] mb-2">{proj.title}</h3>
                <p className="text-[#1D3557]/60 text-sm mb-4">{proj.members}</p>
                <button className="btn btn-secondary w-full text-sm">View Project</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hall of Fame Section */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-bold handwritten text-center mb-4 text-[#1D3557]">
            🏆 Hall of <span className="text-[#FF6B35]">Fame</span>
          </h2>
          <p className="text-center text-lg text-[#1D3557]/70 mb-16 max-w-2xl mx-auto">
            Celebrating the amazing builders, founders, and winners in our community.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Chen', achievement: 'Hackathon Winner', emoji: '🥇' },
              { name: 'Marcus Johnson', achievement: 'Top Pitcher', emoji: '🎤' },
              { name: 'Lisa Wong', achievement: 'Best Project', emoji: '⚡' },
              { name: 'Alex Rodriguez', achievement: 'Community MVP', emoji: '⭐' },
            ].map((person, idx) => (
              <div key={idx} className="card p-8 text-center slide-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFD166] mx-auto mb-4 flex items-center justify-center text-4xl">
                  👤
                </div>
                <h3 className="text-2xl font-bold text-[#1D3557] mb-1">{person.name}</h3>
                <p className="text-[#FF6B35] font-bold mb-2">{person.achievement}</p>
                <div className="text-3xl">{person.emoji}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-32 px-8 bg-[#FFD166]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-bold handwritten text-center mb-4 text-[#1D3557]">
            Supported By <span className="text-[#4DA8FF]">Amazing Partners</span>
          </h2>
          <p className="text-center text-lg text-[#1D3557]/70 mb-16">
            Thanks to our sponsors who believe in student builders.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="sticker wiggle h-32 bg-white border-3 border-[#1D3557] rounded-3xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <div className="text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-sm font-bold text-[#1D3557]">Sponsor {i}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Builders Section */}
      <section id="team" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-bold handwritten text-center mb-4 text-[#1D3557]">
            Meet the <span className="text-[#06D6A0]">Builders</span>
          </h2>
          <p className="text-center text-lg text-[#1D3557]/70 mb-16 max-w-2xl mx-auto">
            The amazing students leading and building SFE Foundry.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: 'Founder & President', name: 'Jamie Lee', emoji: '👨‍💼' },
              { role: 'VP of Events', name: 'Alex Kim', emoji: '👩‍💼' },
              { role: 'Community Lead', name: 'Jordan Smith', emoji: '👨‍🎓' },
            ].map((member, idx) => (
              <div key={idx} className="card p-8 text-center slide-in hover:rotate-2" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#4DA8FF] to-[#06D6A0] mx-auto mb-6 flex items-center justify-center text-6xl">
                  {member.emoji}
                </div>
                <h3 className="text-2xl font-bold text-[#1D3557] mb-2">{member.name}</h3>
                <p className="text-[#FF6B35] font-bold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Streaks */}
      <section className="py-32 px-8 bg-gradient-to-r from-[#FF6B35]/20 via-transparent to-[#06D6A0]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold handwritten text-center mb-12 text-[#1D3557]">
            Your <span className="text-[#FF6B35]">Achievements</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            {[
              { name: 'First Project', emoji: '🚀' },
              { name: 'Hackathon Entered', emoji: '⚡' },
              { name: 'Won Prize', emoji: '🏆' },
              { name: 'Pitch Master', emoji: '🎤' },
              { name: 'Team Leader', emoji: '👥' },
              { name: 'Innovator', emoji: '💡' },
              { name: 'Builder Streak', emoji: '🔥' },
              { name: 'Community Star', emoji: '⭐' },
            ].map((achievement, idx) => (
              <div key={idx} className="achievement slide-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="text-3xl">{achievement.emoji}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-8 bg-[#1D3557]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold handwritten text-white mb-6 slide-in">
            Ready to build something cool?
          </h2>
          <p className="text-xl text-white/80 mb-12 slide-in stagger-1 leading-relaxed">
            Join SFE Foundry and become part of a movement of ambitious students turning ideas into reality.
          </p>
          <div className="slide-in stagger-2 flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn btn-primary">Join the Community</button>
            <button className="btn bg-white text-[#1D3557] border-white hover:bg-white">See Events →</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-3 border-[#1D3557] py-12 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold handwritten text-[#FF6B35] mb-4">SFE Foundry</h3>
              <p className="text-[#1D3557]/70">Building cool things together.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#1D3557] mb-4">Navigation</h4>
              <ul className="space-y-2 text-[#1D3557]/70">
                <li><a href="#competitions" className="hover:text-[#FF6B35] transition">Competitions</a></li>
                <li><a href="#events" className="hover:text-[#FF6B35] transition">Events</a></li>
                <li><a href="#projects" className="hover:text-[#FF6B35] transition">Projects</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#1D3557] mb-4">Community</h4>
              <ul className="space-y-2 text-[#1D3557]/70">
                <li><a href="#" className="hover:text-[#FF6B35] transition">Discord</a></li>
                <li><a href="#" className="hover:text-[#FF6B35] transition">Instagram</a></li>
                <li><a href="#" className="hover:text-[#FF6B35] transition">Twitter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#1D3557] mb-4">Contact</h4>
              <p className="text-[#1D3557]/70">hello@sfefoundry.com</p>
              <p className="text-[#FF6B35] font-bold mt-2">Building cool things 🚀</p>
            </div>
          </div>
          <div className="border-t-2 border-[#1D3557]/20 pt-8 text-center text-[#1D3557]/60">
            <p>© 2024 SFE Foundry • Build. Compete. Launch.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
