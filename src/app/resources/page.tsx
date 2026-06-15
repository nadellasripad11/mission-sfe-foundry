'use client';

export default function ResourcesPage() {
  return (
    <div className="bg-[#47453f] text-[#e6f4fe] font-mono min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-8">
        <h1 className="text-6xl font-black mb-12 text-[#cbc1ae]">&gt; Resources & Guides</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Startup 101',
              emoji: '🚀',
              desc: 'From idea to launch: entrepreneurship basics.',
              content: 'Learn the fundamentals of starting a business. This guide covers ideation, validation, MVP development, finding co-founders, and launching your first product.',
              sections: ['Finding your idea', 'Market research', 'Building MVPs', 'Finding customers', 'Raising capital'],
            },
            {
              title: 'Tech Stack Guide',
              emoji: '⚙️',
              desc: 'Tools and frameworks for shipping fast.',
              content: 'Discover the best modern tools for building products quickly. We recommend tech stacks for web apps, mobile apps, and full-stack projects.',
              sections: ['Frontend frameworks', 'Backend tech', 'Databases', 'Hosting & deployment', 'DevOps essentials'],
            },
            {
              title: 'Pitch Deck Template',
              emoji: '📊',
              desc: 'Investor-ready template with best practices.',
              content: 'Download our pitch deck template used by successful startups in our network. Includes slides for problem, solution, market size, and financials.',
              sections: ['Problem statement', 'Solution', 'Market size', 'Go-to-market', 'Team & funding'],
            },
            {
              title: 'Design System',
              emoji: '🎨',
              desc: 'UI/UX principles that make products shine.',
              content: 'Learn fundamental design principles that make products beautiful and usable. This guide covers color theory, typography, spacing, and component design.',
              sections: ['Color theory', 'Typography', 'Spacing & layout', 'Component design', 'Accessibility'],
            },
            {
              title: 'Marketing Playbook',
              emoji: '📢',
              desc: 'Go-to-market strategies for student products.',
              content: 'Proven strategies for getting your first 1000 users. Learn about content marketing, community building, viral loops, and paid acquisition.',
              sections: ['Content strategy', 'Community building', 'Growth hacking', 'Analytics', 'Paid ads'],
            },
            {
              title: 'Mentorship Network',
              emoji: '👥',
              desc: 'Connect with experienced founders and experts.',
              content: 'Join our network of mentors, investors, and successful founders who are here to help you. Get personalized guidance and introductions.',
              sections: ['Finding mentors', 'Making requests', 'Building relationships', 'Office hours', 'Investor intros'],
            },
          ].map((res, idx) => (
            <div key={idx} className="p-8 border-2 border-[#6c6659] bg-[#4b4840] hover:border-[#809fb7] transition">
              <div className="text-6xl mb-4">{res.emoji}</div>
              <h2 className="text-2xl font-bold text-[#93b4cd] mb-2">{res.title}</h2>
              <p className="text-[#809fb7] text-sm mb-4">{res.desc}</p>
              <p className="text-[#7f796d] mb-4">{res.content}</p>
              <div className="mb-4">
                <p className="text-[#cbc1ae] font-bold mb-2">Sections:</p>
                <ul className="space-y-1">
                  {res.sections.map((section, i) => (
                    <li key={i} className="text-[#809fb7] text-sm">• {section}</li>
                  ))}
                </ul>
              </div>
              <button className="px-6 py-3 bg-[#c48382] text-[#47453f] font-bold hover:bg-[#d49492] transition text-sm">
                Read Guide →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
