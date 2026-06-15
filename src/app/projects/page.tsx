'use client';

export default function ProjectsPage() {
  return (
    <div className="bg-[#47453f] text-[#e6f4fe] font-mono min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-8">
        <h1 className="text-6xl font-black mb-4 text-[#cbc1ae]">&gt; Wall of Fame</h1>
        <p className="text-[#809fb7] mb-12 text-lg">Real products built by our community</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'TechStart MVP',
              by: 'Sarah & Alex',
              desc: 'AI scheduling app',
              status: 'In Beta',
              emoji: '🚀',
              details: 'An AI-powered scheduling assistant that learns your preferences and automatically schedules meetings. Built with Next.js, Claude API, and Supabase.',
              link: '#',
            },
            {
              name: 'EcoTracker',
              by: 'Jordan',
              desc: 'Carbon footprint monitor',
              status: 'Live',
              emoji: '🌍',
              details: 'Track your personal carbon footprint in real-time. Get personalized recommendations to reduce emissions.',
              link: '#',
            },
            {
              name: 'StudySync',
              by: 'Team of 4',
              desc: 'Collab study platform',
              status: 'Launching',
              emoji: '📚',
              details: 'Real-time collaborative studying platform. Share notes, take quizzes together, and track progress as a team.',
              link: '#',
            },
            {
              name: 'FinanceFlow',
              by: 'Maya',
              desc: 'Personal finance app',
              status: 'Live',
              emoji: '💰',
              details: 'Beautiful personal finance dashboard. Budget tracking, savings goals, investment tracking all in one place.',
              link: '#',
            },
            {
              name: 'MusicMatch',
              by: 'Chris & Sam',
              desc: 'AI playlist generator',
              status: 'In Beta',
              emoji: '🎵',
              details: 'AI learns your taste and generates personalized playlists. Discover new music based on your mood.',
              link: '#',
            },
            {
              name: 'HealthHub',
              by: 'Lisa',
              desc: 'Wellness tracking',
              status: 'Launching',
              emoji: '❤️',
              details: 'Complete wellness tracker for fitness, nutrition, sleep, and mental health. Holistic health monitoring.',
              link: '#',
            },
          ].map((proj, idx) => (
            <div key={idx} className="p-6 border-2 border-[#6c6659] bg-[#4b4840] hover:border-[#93b4cd] transition group">
              <div className="text-5xl mb-3 group-hover:scale-125 transition duration-300">{proj.emoji}</div>
              <h3 className="text-xl font-bold text-[#93b4cd] mb-2">{proj.name}</h3>
              <span className="text-xs px-3 py-1 bg-[#6c6659] text-[#cbc1ae] font-mono border border-[#6c6659] group-hover:border-[#93b4cd] transition inline-block mb-3">
                {proj.status}
              </span>
              <p className="text-[#809fb7] text-sm mb-4">{proj.details}</p>
              <p className="text-[#7f796d] text-xs">👤 by {proj.by}</p>
              <a href={proj.link} className="mt-4 text-[#c48382] font-bold text-sm hover:underline block">
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
