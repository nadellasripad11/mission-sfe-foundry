export interface SavedResponse {
  keywords: string[];
  response: string;
}

export const savedResponses: SavedResponse[] = [
  {
    keywords: ['join', 'membership', 'how to join', 'become member', 'participate'],
    response: 'You can join by emailing sfefoundryteam@gmail.com or clicking "Join" on our website. We welcome all students interested in innovation!'
  },
  {
    keywords: ['what is', 'sfe foundry', 'who are you', 'about sfe', 'about us'],
    response: 'We\'re SFE Foundry, a student innovation club for builders, founders, and hackers. We run hackathons, pitch competitions, workshops, and mentorship to help students build awesome projects!'
  },
  {
    keywords: ['hackathon', 'when', 'when are', 'next event', 'upcoming'],
    response: 'We host hackathons throughout the year! Check our website or email sfefoundryteam@gmail.com for dates and registration info.'
  },
  {
    keywords: ['event', 'events', 'what do you host', 'what do we do', 'activities'],
    response: 'We host hackathons, startup pitch competitions, workshops on entrepreneurship and product development, and mentorship sessions with founders!'
  },
  {
    keywords: ['experience', 'beginner', 'no experience', 'first time', 'new'],
    response: 'No experience needed! We welcome beginners and pros alike. If you\'re interested in building and learning, you\'re in! 🎉'
  },
  {
    keywords: ['fee', 'cost', 'money', 'price', 'free'],
    response: 'No membership fees! Most of our events are free. We\'re here to help students build and innovate without breaking the bank.'
  },
  {
    keywords: ['team', 'solo', 'group', 'partner', 'alone'],
    response: 'You can team up or go solo - totally your choice! Many awesome projects come from great team collabs, but solo builders are welcome too.'
  },
  {
    keywords: ['contact', 'email', 'reach out', 'get in touch', 'how to contact'],
    response: 'Email us at sfefoundryteam@gmail.com anytime! You can also use this chat or check our website.'
  },
  {
    keywords: ['mentor', 'mentorship', 'advice', 'help', 'guidance'],
    response: 'We connect members with experienced founders and mentors! Email sfefoundryteam@gmail.com to learn more about our mentorship program.'
  },
  {
    keywords: ['bring', 'what to bring', 'hackathon supplies', 'materials'],
    response: 'Bring your laptop, charger, snacks, and creativity! We provide food, drinks, and a great space. The rest is up to you!'
  }
];

export function findMatchingResponse(userMessage: string): SavedResponse | null {
  const message = userMessage.toLowerCase().trim();

  for (const savedResponse of savedResponses) {
    for (const keyword of savedResponse.keywords) {
      if (message.includes(keyword.toLowerCase())) {
        return savedResponse;
      }
    }
  }

  return null;
}
