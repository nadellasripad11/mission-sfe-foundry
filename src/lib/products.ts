export type Product = {
  name: string;
  tag?: string;
  price: number;
  description: string;
};
export type ProductCategory = { slug: string; name: string; items: Product[] };

export const CATEGORIES: ProductCategory[] = [
  {
    slug: 'apparel',
    name: 'Apparel',
    items: [
      { name: 'Heavyweight Hoodie', price: 40, description: 'Warm, comfy, founder uniform.' },
      { name: 'Premium T-Shirt', price: 20, description: 'Soft tee for builders on the go.' },
      { name: 'Dad Hat', price: 25, description: 'Classic hat, messy hair approved.' },
      { name: 'Crewneck', price: 25, description: 'Clean, simple, goes with everything.' },
    ],
  },
  {
    slug: 'stickers-pins',
    name: 'Stickers & Pins',
    items: [
      { name: 'Sticker Pack', price: 8, description: '10x stickers to slap on anything.' },
      { name: 'Original Member Sticker', price: 3, tag: 'Limited', description: 'Were here from the beginning.' },
      { name: 'Enamel Pin', price: 7, description: 'Tiny pin, big flex.' },
      { name: 'Original Member Pin', price: 10, tag: 'Limited', description: 'Only for the real OGs.' },
    ],
  },
  {
    slug: 'collectibles',
    name: 'Collectibles',
    items: [
      { name: 'Founder Passport', price: 15, description: 'Collect stamps, prove you were there.' },
      { name: 'Brass Challenge Coin', price: 15, description: 'Heavy coin, heavy accomplishments.' },
      { name: 'Founding Member Certificate', price: 10, description: 'Proof you built the foundation.' },
      { name: 'Signed Team Poster', price: 25, tag: 'Limited 100', description: 'Signed by the whole founding team.' },
      { name: 'Signed President Card', price: 10, tag: 'Limited 100', description: 'Signed by sripad. Numbered. Legendary.' },
    ],
  },
  {
    slug: 'desk',
    name: 'Desk',
    items: [
      { name: "Builder's Journal", price: 12, description: 'Track your ideas and progress daily.' },
      { name: 'Desk Mat', price: 18, description: 'Protect your desk, show your colors.' },
      { name: 'Coffee Mug', price: 14, description: 'Coffee tastes better in SFE gear.' },
    ],
  },
  {
    slug: 'flags',
    name: 'Flags',
    items: [
      { name: 'SFE Pennant Flag', price: 15, description: 'Wave it proud at your desk or dorm.' },
      { name: 'Mini Desk Flag', price: 10, description: 'Small but mighty flag for your workspace.' },
    ],
  },
  {
    slug: 'limited',
    name: 'Funny / Limited Edition',
    items: [
      { name: '"Rejected Startup Ideas" Notebook', price: 8, description: 'Write down the ideas that could have been.' },
      { name: '"Touch Grass" Badge', price: 5, description: 'A gentle reminder to take breaks.' },
      { name: '"It Worked on My Machine" Sticker', price: 3, description: 'The most honest sticker you\'ll own.' },
      { name: 'Lucky Rubber Duck', price: 12, tag: 'Limited', description: 'Debugging buddy with an SFE hard hat.' },
      { name: 'Mystery Envelope', price: 5, tag: 'Mystery', description: 'Open if you dare. Surprise inside!' },
    ],
  },
];
