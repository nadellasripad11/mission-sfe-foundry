export type Product = {
  name: string;
  tag?: string;
  price: number;
  description: string;
  image: string;
};
export type ProductCategory = { slug: string; name: string; items: Product[] };

export const CATEGORIES: ProductCategory[] = [
  {
    slug: 'apparel',
    name: 'Apparel',
    items: [
      { name: 'Heavyweight Hoodie', price: 40, description: 'Warm, comfy, founder uniform.', image: '/products/hoodie.webp' },
      { name: 'Premium T-Shirt', price: 20, description: 'Soft tee for builders on the go.', image: '/products/tshirt.webp' },
      { name: 'Dad Hat', price: 25, description: 'Classic hat, messy hair approved.', image: '/products/hat.webp' },
      { name: 'Crewneck', price: 25, description: 'Clean, simple, goes with everything.', image: '/products/crewneck.webp' },
    ],
  },
  {
    slug: 'stickers-pins',
    name: 'Stickers & Pins',
    items: [
      { name: 'Sticker Pack', price: 8, description: '10x stickers to slap on anything.', image: '/products/sticker-pack.webp' },
      { name: 'Original Member Sticker', price: 3, tag: 'Limited', description: 'Were here from the beginning.', image: '/products/member-sticker.webp' },
      { name: 'Enamel Pin', price: 7, description: 'Tiny pin, big flex.', image: '/products/enamel-pin.webp' },
      { name: 'Original Member Pin', price: 10, tag: 'Limited', description: 'Only for the real OGs.', image: '/products/member-pin.webp' },
    ],
  },
  {
    slug: 'collectibles',
    name: 'Collectibles',
    items: [
      { name: 'Founder Passport', price: 15, description: 'Collect stamps, prove you were there.', image: '/products/passport.webp' },
      { name: 'Brass Challenge Coin', price: 15, description: 'Heavy coin, heavy accomplishments.', image: '/products/coin.webp' },
      { name: 'Founding Member Certificate', price: 10, description: 'Proof you built the foundation.', image: '/products/certificate.webp' },
      { name: 'Signed Team Poster', price: 25, tag: 'Limited 100', description: 'Signed by the whole founding team.', image: '/products/team-poster.webp' },
      { name: 'Signed President Card', price: 10, tag: 'Limited 100', description: 'Signed by sripad. Numbered. Legendary.', image: '/products/president-card.webp' },
    ],
  },
  {
    slug: 'desk',
    name: 'Desk',
    items: [
      { name: "Builder's Journal", price: 12, description: 'Track your ideas and progress daily.', image: '/products/journal.webp' },
      { name: 'Desk Mat', price: 18, description: 'Protect your desk, show your colors.', image: '/products/desk-mat.webp' },
      { name: 'Coffee Mug', price: 14, description: 'Coffee tastes better in SFE gear.', image: '/products/mug.webp' },
    ],
  },
  {
    slug: 'flags',
    name: 'Flags',
    items: [
      { name: 'SFE Pennant Flag', price: 15, description: 'Wave it proud at your desk or dorm.', image: '/products/pennant-flag.webp' },
      { name: 'Mini Desk Flag', price: 10, description: 'Small but mighty flag for your workspace.', image: '/products/desk-flag.webp' },
    ],
  },
  {
    slug: 'limited',
    name: 'Funny / Limited Edition',
    items: [
      { name: '"Rejected Startup Ideas" Notebook', price: 8, description: 'Write down the ideas that could have been.', image: '/products/rejected-notebook.webp' },
      { name: '"Touch Grass" Badge', price: 5, description: 'A gentle reminder to take breaks.', image: '/products/touch-grass.webp' },
      { name: '"It Worked on My Machine" Sticker', price: 3, description: 'The most honest sticker you\'ll own.', image: '/products/worked-sticker.webp' },
      { name: 'Lucky Rubber Duck', price: 12, tag: 'Limited', description: 'Debugging buddy with an SFE hard hat.', image: '/products/rubber-duck.webp' },
      { name: 'Mystery Envelope', price: 5, tag: 'Mystery', description: 'Open if you dare. Surprise inside!', image: '/products/mystery-envelope.webp' },
    ],
  },
];
