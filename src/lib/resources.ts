export type Resource = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

export type ResourceGroup = { slug: string; name: string; items: Resource[] };

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    slug: 'ai',
    name: 'Building with AI',
    items: [
      { title: 'Getting started with Claude', description: 'The official Anthropic guide — models, prompting, and best practices.', href: 'https://docs.anthropic.com/', external: true },
      { title: 'Cursor for beginners', description: 'AI-native editor. The single fastest way to ship code as a beginner.', href: 'https://cursor.com/', external: true },
      { title: 'Prompt engineering guide', description: 'A concrete crash course on writing prompts that actually work.', href: 'https://www.promptingguide.ai/', external: true },
      { title: 'Vercel v0', description: 'Generate production-ready UI from a text prompt. Great for fast prototypes.', href: 'https://v0.app/', external: true },
    ],
  },
  {
    slug: 'repos',
    name: 'Making a Good Repo',
    items: [
      { title: 'How to write a README', description: 'A checklist for a README that people actually read.', href: 'https://www.makeareadme.com/', external: true },
      { title: 'Choose an open source license', description: 'Pick one in 30 seconds. Add a LICENSE file to every repo.', href: 'https://choosealicense.com/', external: true },
      { title: 'GitHub Docs — the basics', description: 'Clone, branch, PR. If you\'re new to Git, start here.', href: 'https://docs.github.com/en/get-started', external: true },
      { title: 'Conventional Commits', description: 'A simple commit message convention that makes your history readable.', href: 'https://www.conventionalcommits.org/', external: true },
    ],
  },
  {
    slug: 'design',
    name: 'Designing with AI',
    items: [
      { title: 'Figma AI features', description: 'Auto-layout, generative fills, and AI-driven prototyping in Figma.', href: 'https://www.figma.com/ai/', external: true },
      { title: 'Midjourney', description: 'For hero images, moodboards, and brand exploration.', href: 'https://www.midjourney.com/', external: true },
      { title: 'Refactoring UI', description: 'The design tactics that make apps look professional. Not AI, but essential.', href: 'https://www.refactoringui.com/', external: true },
      { title: 'Color palette tools', description: 'Coolors + Realtime Colors for picking a palette that works.', href: 'https://coolors.co/', external: true },
    ],
  },
];
