'use client';

export default function EventsPage() {
  return (
    <div className="bg-[#47453f] text-[#e6f4fe] font-mono min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-8">
        <h1 className="text-6xl font-black mb-12 text-[#c48382]">&gt; All Events</h1>

        <div className="space-y-8">
          {[
            {
              date: 'July 15-17, 2026',
              name: 'Summer Hackathon 2026',
              desc: '48-hour innovation sprint. Build anything, win prizes.',
              details: 'Join us for an epic hackathon where you can build any project you want. We\'ll provide mentorship, snacks, and amazing prizes. Previous winners built AI apps, games, and productivity tools.',
              location: 'Tech Lab, Building A',
              signup: true,
            },
            {
              date: 'August 5, 2026',
              name: 'Pitch Competition',
              desc: 'Pitch your startup idea for mentorship and funding.',
              details: 'Showcase your business idea to a panel of investors and industry experts. Winners get $5K seed funding, mentorship, and investor introductions.',
              location: 'Auditorium',
              signup: true,
            },
            {
              date: 'Biweekly Thursdays',
              name: 'Founder Workshops',
              desc: 'Learn from real founders building real companies.',
              details: 'Join our workshop series featuring founders, engineers, and product leaders. Topics include fundraising, product-market fit, marketing, and more.',
              location: 'Room 204',
              signup: true,
            },
            {
              date: 'September 20, 2026',
              name: 'Demo Day',
              desc: 'Showcase projects to investors and the community.',
              details: 'Celebrate what our community has built. Present your projects to investors, alumni, and potential customers. Network with industry leaders.',
              location: 'Main Hall',
              signup: true,
            },
          ].map((event, idx) => (
            <div key={idx} className="p-8 border-2 border-[#6c6659] bg-[#4b4840] hover:border-[#c48382] transition">
              <div className="text-sm text-[#93b4cd] font-bold uppercase mb-2">{event.date}</div>
              <h2 className="text-3xl font-bold text-[#cbc1ae] mb-3">{event.name}</h2>
              <p className="text-[#809fb7] mb-4">{event.desc}</p>
              <p className="text-[#7f796d] mb-4">{event.details}</p>
              <div className="flex justify-between items-center">
                <p className="text-[#809fb7]">📍 {event.location}</p>
                <button className="px-6 py-3 bg-[#c48382] text-[#47453f] font-bold hover:bg-[#d49492] transition">
                  Sign Up →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
