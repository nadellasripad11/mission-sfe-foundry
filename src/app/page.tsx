'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden relative">
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

        body {
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 25%, #0d1b2e 50%, #0a0e27 75%, #050810 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Premium Background Elements */
        .background-container {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        /* Blueprint Grid */
        .blueprint-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(0deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.6;
        }

        /* Floating Geometric Shapes */
        .geometric-shape {
          position: absolute;
          border: 2px solid rgba(34, 211, 238, 0.15);
          animation: float 20s ease-in-out infinite;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 5%;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation-delay: 0s;
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.1);
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          top: 50%;
          right: 10%;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          animation-delay: 2s;
          box-shadow: 0 0 30px rgba(34, 211, 238, 0.08);
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 50%;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          animation-delay: 4s;
          box-shadow: 0 0 25px rgba(255, 107, 53, 0.1);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          25% { transform: translateY(-30px) rotateZ(5deg); }
          50% { transform: translateY(-60px) rotateZ(10deg); }
          75% { transform: translateY(-30px) rotateZ(5deg); }
        }

        /* Network Connections */
        .network-line {
          position: absolute;
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent);
          transform-origin: left center;
          opacity: 0.6;
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        /* Glowing Particles */
        .particles {
          position: absolute;
          width: 2px;
          height: 2px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.8), transparent);
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        /* Spark Effects */
        @keyframes spark {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) translateX(var(--tx, 0px)) scale(0);
          }
        }

        .spark {
          position: absolute;
          pointer-events: none;
          animation: spark 1.5s ease-out forwards;
        }

        /* Glassmorphism Panels */
        .glass-panel {
          position: absolute;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(34, 211, 238, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: inset 0 0 20px rgba(59, 130, 246, 0.1);
        }

        .panel-1 {
          width: 400px;
          height: 300px;
          top: 15%;
          right: 5%;
          opacity: 0.3;
        }

        .panel-2 {
          width: 300px;
          height: 250px;
          bottom: 30%;
          left: 8%;
          opacity: 0.25;
        }

        /* Blueprint Sketches (SVG paths as subtle elements) */
        .blueprint-element {
          position: absolute;
          opacity: 0.08;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
        }

        .blueprint-rocket {
          width: 150px;
          height: 150px;
          top: 5%;
          right: 20%;
        }

        .blueprint-lightbulb {
          width: 120px;
          height: 120px;
          bottom: 15%;
          right: 5%;
        }

        .blueprint-laptop {
          width: 180px;
          height: 120px;
          top: 60%;
          left: 3%;
        }

        .blueprint-trophy {
          width: 100px;
          height: 140px;
          top: 40%;
          right: 50%;
        }

        /* Animated Stars */
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .star {
          position: absolute;
          color: rgba(59, 130, 246, 0.4);
          font-size: 1.5rem;
          animation: starTwinkle 3s ease-in-out infinite;
        }

        /* Dotted Paths */
        .dotted-path {
          position: absolute;
          background-image: radial-gradient(circle, rgba(34, 211, 238, 0.4) 2px, transparent 2px);
          background-size: 20px 20px;
          opacity: 0.4;
          animation: pathFlow 10s linear infinite;
        }

        @keyframes pathFlow {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }

        .path-1 {
          width: 400px;
          height: 2px;
          top: 30%;
          left: 10%;
        }

        .path-2 {
          width: 2px;
          height: 300px;
          top: 50%;
          right: 20%;
        }

        /* Content Layer */
        .content-wrapper {
          position: relative;
          z-index: 10;
        }

        /* Glow Effects on Text */
        .glow-text {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }

        .glow-orange {
          text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
        }

        .glow-cyan {
          text-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
        }

        /* Section Backgrounds with Glassmorphism */
        section {
          background: rgba(5, 8, 16, 0.4);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(34, 211, 238, 0.1);
          position: relative;
        }

        /* Animated Cards with Glow */
        .card {
          background: linear-gradient(135deg, rgba(11, 16, 32, 0.6), rgba(11, 16, 32, 0.3));
          border: 2px solid rgba(34, 211, 238, 0.3);
          backdrop-filter: blur(15px);
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.1);
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.2), transparent);
          transition: left 0.8s ease;
        }

        .card:hover::before {
          left: 100%;
        }

        .card:hover {
          transform: translateY(-8px) rotate(-1deg);
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.3);
          border-color: rgba(34, 211, 238, 0.6);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.05));
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Animations */
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

        .slide-in {
          animation: slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }

        /* Button Styles */
        .btn {
          font-family: 'Fredoka', sans-serif;
          font-weight: 700;
          border: 2px solid currentColor;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          font-size: 1.1rem;
          padding: 12px 32px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .btn-primary {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(34, 211, 238, 0.6));
          color: white;
          border-color: rgba(34, 211, 238, 0.8);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          border-color: rgba(34, 211, 238, 1);
          background: linear-gradient(135deg, rgba(59, 130, 246, 1), rgba(34, 211, 238, 0.8));
        }

        .btn-secondary {
          background: rgba(255, 107, 53, 0.1);
          color: #FF6B35;
          border-color: rgba(255, 107, 53, 0.5);
          box-shadow: 0 0 15px rgba(255, 107, 53, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(255, 107, 53, 0.2);
          border-color: #FF6B35;
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(255, 107, 53, 0.4);
        }

        /* Navigation */
        nav {
          background: rgba(5, 8, 16, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(34, 211, 238, 0.2);
        }

        .nav-link {
          color: rgba(248, 250, 252, 0.7);
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3B82F6, #22D3EE);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #3B82F6;
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Floating Elements */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-20px) rotateZ(-5deg); }
        }

        .float {
          animation: float 6s ease-in-out infinite;
        }

        /* Polaroid Cards */
        .polaroid {
          background: white;
          padding: 12px;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
          transform: rotate(-2deg);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .polaroid:hover {
          transform: rotate(0deg) translateY(-8px) scale(1.02);
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.4);
        }

        /* Achievement Badge */
        .achievement {
          width: 80px;
          height: 80px;
          background: rgba(59, 130, 246, 0.1);
          border: 2px solid rgba(34, 211, 238, 0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }

        .achievement:hover {
          transform: scale(1.1) rotate(-10deg);
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
          border-color: rgba(34, 211, 238, 0.8);
        }

        /* Feature Card Enhancement */
        .feature-card {
          background: linear-gradient(135deg, rgba(11, 16, 32, 0.7), rgba(11, 16, 32, 0.4));
          border: 2px solid rgba(34, 211, 238, 0.25);
          backdrop-filter: blur(15px);
        }
      `}</style>

      {/* Premium Background Container */}
      <div className="background-container">
        {/* Blueprint Grid */}
        <div className="blueprint-grid" />

        {/* Floating Geometric Shapes */}
        <div className="geometric-shape shape-1" />
        <div className="geometric-shape shape-2" />
        <div className="geometric-shape shape-3" />

        {/* Glassmorphism Panels */}
        <div className="glass-panel panel-1" />
        <div className="glass-panel panel-2" />

        {/* Network Lines */}
        <div className="network-line" style={{ width: '400px', height: '3px', top: '20%', left: '10%' }} />
        <div className="network-line" style={{ width: '300px', height: '3px', top: '60%', right: '15%' }} />
        <div className="network-line" style={{ width: '2px', height: '300px', top: '30%', left: '80%' }} />

        {/* Dotted Paths */}
        <div className="dotted-path path-1" />
        <div className="dotted-path path-2" />

        {/* Glowing Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particles"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Blueprint Sketches (Simple SVG-style shapes) */}
        <div className="blueprint-element blueprint-rocket">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M 50 10 L 60 30 L 50 50 L 40 30 Z" />
            <circle cx="50" cy="60" r="8" />
            <path d="M 40 70 L 45 90 M 60 70 L 55 90" />
          </svg>
        </div>

        <div className="blueprint-element blueprint-lightbulb">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="50" cy="40" r="25" />
            <rect x="40" y="65" width="20" height="10" />
            <line x1="45" y1="75" x2="45" y2="85" />
            <line x1="55" y1="75" x2="55" y2="85" />
          </svg>
        </div>

        <div className="blueprint-element blueprint-laptop">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="10" y="10" width="80" height="50" rx="5" />
            <line x1="15" y1="60" x2="85" y2="60" />
            <line x1="40" y1="60" x2="60" y2="70" />
          </svg>
        </div>

        <div className="blueprint-element blueprint-trophy">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M 30 20 L 30 40 Q 30 50 50 50 Q 70 50 70 40 L 70 20" />
            <line x1="40" y1="20" x2="60" y2="20" />
            <path d="M 50 50 L 50 80 L 40 90 L 60 90 L 50 80" />
          </svg>
        </div>

        {/* Animated Stars */}
        <div className="star" style={{ top: '10%', left: '15%', animationDelay: '0s' }}>⭐</div>
        <div className="star" style={{ top: '25%', right: '10%', animationDelay: '1s' }}>✨</div>
        <div className="star" style={{ bottom: '20%', left: '20%', animationDelay: '0.5s' }}>⭐</div>
        <div className="star" style={{ top: '45%', right: '5%', animationDelay: '1.5s' }}>✨</div>
      </div>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Navigation */}
        <nav className="sticky top-0 z-40 px-8 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-3xl font-bold handwritten glow-orange">SFE Foundry</div>
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
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-8xl md:text-9xl font-bold handwritten mb-6 glow-text slide-in" style={{ lineHeight: '1.2' }}>
              Build cool
              <br />
              <span className="glow-orange">things.</span>
            </h1>

            <p className="slide-in stagger-1 text-2xl md:text-3xl font-semibold text-slate-200 mb-12 leading-relaxed max-w-2xl mx-auto">
              Join students building startups, winning hackathons, launching projects, and turning ideas into reality.
            </p>

            <div className="slide-in stagger-2 flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn btn-primary">Join SFE Foundry</button>
              <button className="btn btn-secondary">Upcoming Events</button>
            </div>

            {/* Floating Elements */}
            <div className="slide-in stagger-3 mt-16 flex justify-center gap-12">
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-2 float">🚀</div>
                <div className="font-bold text-lg glow-cyan">50+ Members</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-2 float" style={{ animationDelay: '0.5s' }}>⚡</div>
                <div className="font-bold text-lg glow-cyan">Building Daily</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-2 float" style={{ animationDelay: '1s' }}>🎨</div>
                <div className="font-bold text-lg glow-cyan">Super Fun</div>
              </div>
            </div>
          </div>
        </section>

        {/* Startup Competitions Section */}
        <section id="competitions" className="py-32 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold handwritten text-center mb-4 glow-text">
              Startup <span className="glow-orange">Competitions</span>
            </h2>
            <p className="text-center text-lg text-slate-300 mb-16 max-w-2xl mx-auto">
              Pitch your ideas, get feedback from mentors, compete for prizes, and launch your next big thing.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {['Pitch Competition', 'Demo Day', 'Founders Summit'].map((title, idx) => (
                <div key={idx} className="feature-card card p-8 slide-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                  <div className="text-5xl mb-4">🎤</div>
                  <h3 className="text-3xl font-bold handwritten mb-4 glow-orange">{title}</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
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
            <h2 className="text-6xl font-bold handwritten text-center mb-4 glow-text">
              <span className="glow-cyan">Hackathons</span> & Build Challenges
            </h2>
            <p className="text-center text-lg text-slate-300 mb-16 max-w-2xl mx-auto">
              Build projects, compete with friends, and show off your creations.
            </p>

            <div className="space-y-8">
              {[
                { title: '24-Hour Hackathons', emoji: '⏱️', color: 'from-orange-500/10 to-orange-600/5' },
                { title: 'Weekly Challenges', emoji: '📅', color: 'from-blue-500/10 to-blue-600/5' },
                { title: 'AI/ML Hackathons', emoji: '🤖', color: 'from-cyan-500/10 to-cyan-600/5' },
              ].map((hack, idx) => (
                <div key={idx} className={`bg-gradient-to-r ${hack.color} border-2 border-cyan-500/30 rounded-3xl p-10 slide-in backdrop-blur-md`} style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className="flex items-center gap-6">
                    <div className="text-6xl">{hack.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white mb-2">{hack.title}</h3>
                      <p className="text-slate-300">Build something amazing and compete with the community.</p>
                    </div>
                    <button className="btn btn-primary">Register</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Projects Section */}
        <section id="projects" className="py-32 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold handwritten text-center mb-4 glow-text">
              Projects Built by <span className="glow-cyan">Our Community</span>
            </h2>
            <p className="text-center text-lg text-slate-300 mb-16 max-w-2xl mx-auto">
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
                <div key={idx} className="card p-6 slide-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="text-6xl mb-4">{proj.emoji}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{proj.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{proj.members}</p>
                  <button className="btn btn-secondary w-full text-sm">View Project</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hall of Fame Section */}
        <section className="py-32 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold handwritten text-center mb-4 glow-text">
              🏆 Hall of <span className="glow-orange">Fame</span>
            </h2>
            <p className="text-center text-lg text-slate-300 mb-16 max-w-2xl mx-auto">
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
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto mb-4 flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{person.name}</h3>
                  <p className="text-orange-400 font-bold mb-2">{person.achievement}</p>
                  <div className="text-3xl">{person.emoji}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="py-32 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold handwritten text-center mb-4 glow-text">
              Supported By <span className="glow-cyan">Amazing Partners</span>
            </h2>
            <p className="text-center text-lg text-slate-300 mb-16">
              Thanks to our sponsors who believe in student builders.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="h-32 rounded-3xl flex items-center justify-center cursor-pointer transition-all slide-in" style={{ animationDelay: `${i * 0.1}s`, background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.05))', border: '2px solid rgba(34, 211, 238, 0.3)', backdropFilter: 'blur(10px)' }}>
                  <div className="text-center">
                    <div className="text-3xl mb-2 float">⭐</div>
                    <div className="text-sm font-bold text-slate-300">Partner {i}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Builders Section */}
        <section id="team" className="py-32 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold handwritten text-center mb-4 glow-text">
              Meet the <span className="glow-cyan">Builders</span>
            </h2>
            <p className="text-center text-lg text-slate-300 mb-16 max-w-2xl mx-auto">
              The amazing students leading and building SFE Foundry.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { role: 'Founder & President', name: 'Jamie Lee', emoji: '👨‍💼' },
                { role: 'VP of Events', name: 'Alex Kim', emoji: '👩‍💼' },
                { role: 'Community Lead', name: 'Jordan Smith', emoji: '👨‍🎓' },
              ].map((member, idx) => (
                <div key={idx} className="card p-8 text-center slide-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto mb-6 flex items-center justify-center text-6xl">
                    {member.emoji}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-orange-400 font-bold">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-32 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold handwritten text-center mb-12 glow-text">
              Your <span className="glow-orange">Achievements</span>
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
        <section className="py-32 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl md:text-7xl font-bold handwritten glow-text mb-6 slide-in">
              Ready to build something cool?
            </h2>
            <p className="text-xl text-slate-300 mb-12 slide-in stagger-1 leading-relaxed">
              Join SFE Foundry and become part of a movement of ambitious students turning ideas into reality.
            </p>
            <div className="slide-in stagger-2 flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn btn-primary">Join the Community</button>
              <button className="btn btn-secondary">See Events →</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-cyan-500/20 py-12 px-8 backdrop-blur-md">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-bold handwritten glow-orange mb-4">SFE Foundry</h3>
                <p className="text-slate-400">Building cool things together.</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Navigation</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#competitions" className="hover:text-cyan-400 transition">Competitions</a></li>
                  <li><a href="#events" className="hover:text-cyan-400 transition">Events</a></li>
                  <li><a href="#projects" className="hover:text-cyan-400 transition">Projects</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Community</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-cyan-400 transition">Discord</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition">Instagram</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition">Twitter</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Contact</h4>
                <p className="text-slate-400">hello@sfefoundry.com</p>
                <p className="text-orange-400 font-bold mt-2">Building cool things 🚀</p>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-8 text-center text-slate-500">
              <p>© 2024 SFE Foundry • Build. Compete. Launch.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
