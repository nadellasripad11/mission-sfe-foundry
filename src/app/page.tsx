'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect
  const fullTitle = 'Mission SFE Foundry';
  useEffect(() => {
    if (titleIndex < fullTitle.length) {
      const timer = setTimeout(() => setTitleIndex(titleIndex + 1), 80);
      return () => clearTimeout(timer);
    }
  }, [titleIndex]);

  return (
    <div className="bg-[#47453f] text-[#e6f4fe] font-mono overflow-x-hidden">
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
        @keyframes sway { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-8deg); } 75% { transform: rotate(8deg); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }

        .float-slow { animation: float 8s ease-in-out infinite; }
        .float-slower { animation: float 10s ease-in-out infinite 2s; }
        .sway-anim { animation: sway 4s ease-in-out infinite; }

        .slide-in-1 { animation: slideIn 0.6s ease-out forwards; }
        .slide-in-2 { animation: slideIn 0.6s ease-out 0.1s forwards; opacity: 0; }
        .slide-in-3 { animation: slideIn 0.6s ease-out 0.2s forwards; opacity: 0; }
        .slide-in-4 { animation: slideIn 0.6s ease-out 0.3s forwards; opacity: 0; }

        .event-slide-1 { animation: slideInLeft 0.6s ease-out forwards; }
        .event-slide-2 { animation: slideInLeft 0.6s ease-out 0.1s forwards; opacity: 0; }
        .event-slide-3 { animation: slideInLeft 0.6s ease-out 0.2s forwards; opacity: 0; }
        .event-slide-4 { animation: slideInLeft 0.6s ease-out 0.3s forwards; opacity: 0; }

        .project-scale:nth-child(1) { animation: slideIn 0.5s ease-out forwards; }
        .project-scale:nth-child(2) { animation: slideIn 0.5s ease-out 0.05s forwards; opacity: 0; }
        .project-scale:nth-child(3) { animation: slideIn 0.5s ease-out 0.1s forwards; opacity: 0; }
        .project-scale:nth-child(4) { animation: slideIn 0.5s ease-out 0.15s forwards; opacity: 0; }
        .project-scale:nth-child(5) { animation: slideIn 0.5s ease-out 0.2s forwards; opacity: 0; }
        .project-scale:nth-child(6) { animation: slideIn 0.5s ease-out 0.25s forwards; opacity: 0; }
      `}</style>

      {/* Sticky Nav */}
      <nav className="fixed top-0 w-full bg-[#47453f]/95 backdrop-blur z-50 border-b border-[#6c6659] py-3 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-lg font-bold tracking-wider text-[#c48382]">&gt; SFE</div>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#about" className="hover:text-[#93b4cd] transition">about</a>
            <a href="#events" className="hover:text-[#c48382] transition">events</a>
            <a href="#projects" className="hover:text-[#809fb7] transition">projects</a>
            <a href="#join" className="hover:text-[#cbc1ae] transition">join</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#4b4840] to-[#47453f] pt-20 overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute w-96 h-96 bg-gradient-to-r from-[#c48382] to-[#93b4cd] rounded-full opacity-5 blur-3xl float-slow" style={{ top: '10%', left: '10%' }} />
        <div className="absolute w-96 h-96 bg-gradient-to-r from-[#809fb7] to-[#c48382] rounded-full opacity-5 blur-3xl float-slower" style={{ bottom: '10%', right: '10%' }} />

        {/* Parallax symbols */}
        <div className="absolute top-20 left-10 text-7xl opacity-10 pointer-events-none font-bold" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>&lt;/&gt;</div>
        <div className="absolute bottom-32 right-10 text-7xl opacity-10 pointer-events-none font-bold" style={{ transform: `translateY(${scrollY * -0.3}px)` }}>{ }</div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="text-[#c48382]">&gt; </span>
            {fullTitle.slice(0, titleIndex)}
            <span className="animate-pulse text-[#93b4cd]">|</span>
          </h1>
          <p className="text-xl md:text-3xl text-[#809fb7] mb-8 font-light leading-relaxed max-w-2xl mx-auto">
            Code a project. Fly to shipping. Build mechanical dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#join" className="px-8 py-4 bg-[#c48382] text-[#47453f] font-bold text-lg hover:bg-[#d49492] transition border-2 border-[#c48382] transform hover:scale-105 duration-300">
              → Join Now
            </a>
            <a href="#events" className="px-8 py-4 border-2 border-[#809fb7] text-[#809fb7] hover:bg-[#809fb7] hover:text-[#47453f] transition font-bold text-lg transform hover:scale-105 duration-300">
              ↓ See Events
            </a>
          </div>

          {/* SVG Diagram */}
          <div className="mt-16 opacity-80 hover:opacity-100 transition duration-500">
            <svg viewBox="0 0 400 300" className="w-full h-auto max-w-md mx-auto">
              <rect x="0" y="250" width="400" height="50" fill="#cbc1ae" opacity="0.3" />
              {[0, 80, 160, 240, 320].map((x) => (
                <g key={x}>
                  <line x1={x + 40} y1="150" x2={x + 40} y2="240" stroke="#c48382" strokeWidth="4" opacity="0.6" className="sway-anim" style={{ transformOrigin: `${x + 40}px 150px` }} />
                  <circle cx={x + 40} cy="245" r="8" fill="#c48382" opacity="0.5" />
                </g>
              ))}
              <rect x="50" y="100" width="300" height="60" rx="8" fill="#93b4cd" opacity="0.8" />
              <path d="M 200 80 L 180 40 L 200 50 Z" fill="#809fb7" opacity="0.7" style={{ animation: 'flutter 3s ease-in-out infinite' }} />
              <path d="M 220 80 L 240 40 L 220 50 Z" fill="#c48382" opacity="0.7" style={{ animation: 'flutter 3s ease-in-out infinite 0.5s' }} />
            </svg>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="about" className="py-20 bg-[#47453f] border-t-4 border-[#6c6659]">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-16 text-[#c48382]">&gt; What We Build</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Monthly Hackathons', desc: '48-hour sprints where you ship real projects.', icon: '⚡' },
              { title: 'Pitch Competitions', desc: 'Showcase ideas to judges and investors.', icon: '🎯' },
              { title: 'Workshops', desc: 'Learn from founders and engineers.', icon: '📚' },
              { title: 'Team Building', desc: 'Find co-founders and collaborate.', icon: '🤝' },
            ].map((item, idx) => (
              <div key={idx} className={`p-8 border-2 border-[#6c6659] hover:border-[#c48382] transition bg-[#4b4840] hover:bg-[#504e47] group transform hover:scale-105 cursor-pointer relative overflow-hidden slide-in-${idx + 1}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#c48382] to-transparent opacity-0 group-hover:opacity-10 transition" />
                <div className="relative z-10">
                  <div className="text-6xl mb-4 group-hover:scale-125 transition duration-300">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-[#cbc1ae] mb-3 group-hover:text-[#c48382] transition">{item.title}</h3>
                  <p className="text-[#809fb7] group-hover:text-[#93b4cd] transition">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-20 bg-[#4b4840] border-t-4 border-[#6c6659]">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-16 text-[#809fb7]">&gt; Upcoming Events</h2>
          <div className="space-y-6">
            {[
              { date: 'July 15-17', name: 'Summer Hackathon 2026', desc: 'Build anything. Win prizes. Ship fast.' },
              { date: 'August 5', name: 'Pitch Competition', desc: 'Pitch for mentorship & funding.' },
              { date: 'Biweekly Thu', name: 'Founder Workshops', desc: 'Learn from real founders.' },
              { date: 'Sept 20', name: 'Demo Day', desc: 'Showcase to investors & community.' },
            ].map((event, idx) => (
              <div key={idx} className={`group p-8 border-l-4 border-[#c48382] bg-[#47453f] hover:bg-[#504e47] transition relative overflow-hidden transform hover:translate-x-2 event-slide-${idx + 1}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#c48382] to-transparent opacity-0 group-hover:opacity-5 transition" />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="text-[#93b4cd] text-sm font-bold uppercase block mb-2">{event.date}</span>
                    <h3 className="text-3xl font-bold text-[#cbc1ae] mb-3 group-hover:text-[#c48382] transition">{event.name}</h3>
                    <p className="text-[#809fb7]">{event.desc}</p>
                  </div>
                  <button className="px-6 py-3 bg-[#c48382] text-[#47453f] font-bold hover:bg-[#d49492] transition text-sm transform group-hover:scale-110 whitespace-nowrap">Learn →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 bg-[#47453f] border-t-4 border-[#6c6659]">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-4 text-[#cbc1ae]">&gt; Wall of Fame</h2>
          <p className="text-[#809fb7] mb-16 text-lg">Real products built by our community.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'TechStart MVP', by: 'Sarah & Alex', desc: 'AI scheduling', emoji: '🚀' },
              { name: 'EcoTracker', by: 'Jordan', desc: 'Carbon footprint monitor', emoji: '🌍' },
              { name: 'StudySync', by: 'Team of 4', desc: 'Collab study platform', emoji: '📚' },
              { name: 'FinanceFlow', by: 'Maya', desc: 'Personal finance app', emoji: '💰' },
              { name: 'MusicMatch', by: 'Chris & Sam', desc: 'AI playlist generator', emoji: '🎵' },
              { name: 'HealthHub', by: 'Lisa', desc: 'Wellness tracking', emoji: '❤️' },
            ].map((proj, idx) => (
              <div key={idx} className="project-scale p-6 border-2 border-[#6c6659] bg-[#4b4840] hover:border-[#93b4cd] transition group relative overflow-hidden transform hover:scale-105 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[#93b4cd] to-transparent opacity-0 group-hover:opacity-10 transition" />
                <div className="relative z-10">
                  <div className="text-5xl mb-3 group-hover:scale-125 transition duration-300">{proj.emoji}</div>
                  <h3 className="text-lg font-bold text-[#93b4cd]">{proj.name}</h3>
                  <p className="text-[#809fb7] text-sm mb-2">{proj.desc}</p>
                  <p className="text-[#7f796d] text-xs">by {proj.by}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="py-20 bg-[#4b4840] border-t-4 border-[#6c6659]">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-12 text-[#809fb7]">&gt; Who Can Join?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Builders', 'Designers', 'Marketers', 'Visionaries', 'Makers', 'Leaders', 'Thinkers', 'Doers'].map((role, idx) => (
              <div key={idx} className="p-6 border-2 border-[#6c6659] bg-[#47453f] hover:bg-[#504e47] text-center transition group transform hover:scale-110 cursor-pointer" style={{ animation: `slideIn 0.5s ease-out ${idx * 50}ms forwards`, opacity: 0 }}>
                <p className="font-bold text-[#cbc1ae] group-hover:text-[#c48382] transition">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="py-20 bg-[#c48382] text-[#47453f] border-t-4 border-[#a06866] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <h2 className="text-6xl font-black mb-6">Ready to Ship?</h2>
          <p className="text-xl mb-12 opacity-90">Join ambitious students building real products that matter.</p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mb-8">
            <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-4 bg-white text-[#47453f] font-mono placeholder-gray-400 border-2 border-[#47453f] focus:outline-none transition" required />
            <button type="submit" className="px-8 py-4 bg-[#47453f] text-[#c48382] font-bold hover:bg-[#3a3632] transition border-2 border-[#47453f] transform hover:scale-105">Join →</button>
          </form>
          <p className="text-sm opacity-75">Updates, opportunities, zero spam.</p>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-[#47453f] border-t-4 border-[#6c6659]">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-12 text-[#cbc1ae]">&gt; Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Startup 101', desc: 'Entrepreneurship guide.' },
              { title: 'Tech Stack', desc: 'Tools for shipping fast.' },
              { title: 'Pitch Deck', desc: 'Investor-ready template.' },
              { title: 'Design System', desc: 'UI/UX principles.' },
              { title: 'Marketing', desc: 'Go-to-market strategy.' },
              { title: 'Mentorship', desc: 'Connect with experts.' },
            ].map((res, idx) => (
              <a key={idx} href="#" className="p-6 border-2 border-[#6c6659] bg-[#4b4840] hover:border-[#809fb7] transition group transform hover:translate-y-[-4px]">
                <h3 className="text-xl font-bold text-[#93b4cd] mb-2 group-hover:text-[#809fb7]">{res.title}</h3>
                <p className="text-[#7f796d] text-sm">{res.desc}</p>
                <div className="mt-4 text-[#c48382] font-bold group-hover:translate-x-1 transition">→ Read</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#4b4840] border-t-4 border-[#6c6659]">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-12 text-[#809fb7]">&gt; FAQ</h2>
          <div className="space-y-8">
            {[
              { q: 'Do I need experience?', a: 'Nope. All levels welcome.' },
              { q: 'Is there a cost?', a: 'No. Completely free.' },
              { q: 'Can I join without a team?', a: 'Yes. We help you find teammates.' },
              { q: 'What if I build something cool?', a: 'We help you ship and launch it.' },
            ].map((faq, idx) => (
              <div key={idx} className="border-l-4 border-[#c48382] pl-6 group hover:pl-8 transition">
                <h3 className="text-xl font-bold text-[#cbc1ae] mb-2 group-hover:text-[#c48382] transition">{faq.q}</h3>
                <p className="text-[#809fb7]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3a3a38] border-t-4 border-[#c48382] py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div><h3 className="text-2xl font-bold text-[#c48382] mb-3">&gt; SFE</h3><p className="text-[#7f796d] text-sm">Empowering student builders since 2026.</p></div>
            <div><h4 className="font-bold text-[#cbc1ae] mb-4">Links</h4><ul className="space-y-2 text-sm"><li><a href="#events" className="text-[#809fb7] hover:text-[#c48382]">Events</a></li><li><a href="#projects" className="text-[#809fb7] hover:text-[#c48382]">Projects</a></li><li><a href="#join" className="text-[#809fb7] hover:text-[#c48382]">Join</a></li></ul></div>
            <div><h4 className="font-bold text-[#cbc1ae] mb-4">Resources</h4><ul className="space-y-2 text-sm"><li><a href="#" className="text-[#809fb7] hover:text-[#c48382]">Guides</a></li><li><a href="#" className="text-[#809fb7] hover:text-[#c48382]">Templates</a></li><li><a href="#" className="text-[#809fb7] hover:text-[#c48382]">Community</a></li></ul></div>
            <div><h4 className="font-bold text-[#cbc1ae] mb-4">Contact</h4><p className="text-sm text-[#809fb7]">foundry@school.edu</p><p className="text-xs text-[#7f796d] mt-3">Discord: @sfe-foundry</p></div>
          </div>
          <div className="border-t border-[#6c6659] pt-8 text-center text-sm text-[#7f796d]"><p>© 2026 Mission SFE Foundry. Built by students, for students.</p></div>
        </div>
      </footer>
    </div>
  );
}
