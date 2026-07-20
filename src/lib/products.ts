export type Product = { name: string; tag?: string };
export type ProductCategory = { slug: string; name: string; items: Product[] };

export const CATEGORIES: ProductCategory[] = [
  {
    slug: 'apparel',
    name: 'Apparel',
    items: [
      { name: 'Heavyweight Hoodie' },
      { name: 'Premium T-Shirt' },
      { name: 'Dad Hat' },
      { name: 'Crewneck' },
    ],
  },
  {
    slug: 'stickers-pins',
    name: 'Stickers & Pins',
    items: [
      { name: 'Sticker Pack' },
      { name: 'Original Member Sticker' },
      { name: 'Enamel Pin' },
      { name: 'Original Member Pin' },
    ],
  },
  {
    slug: 'collectibles',
    name: 'Collectibles',
    items: [
      { name: 'Founder Passport', tag: 'event stamps' },
      { name: 'Brass Challenge Coin' },
      { name: 'Founding Member Certificate' },
      { name: 'Signed Founding Team Poster', tag: 'limited edition' },
      { name: 'Signed President Card', tag: 'numbered, mostly for fun' },
    ],
  },
  {
    slug: 'desk',
    name: 'Desk',
    items: [
      { name: "Builder's Journal" },
      { name: 'Desk Mat' },
      { name: 'Coffee Mug' },
    ],
  },
  {
    slug: 'flags',
    name: 'Flags',
    items: [
      { name: 'SFE Pennant Flag' },
      { name: 'Mini Desk Flag' },
    ],
  },
  {
    slug: 'limited',
    name: 'Funny / Limited Edition',
    items: [
      { name: '"Rejected Startup Ideas" Notebook' },
      { name: '"Touch Grass" Badge' },
      { name: '"It Worked on My Machine" Sticker' },
      { name: 'Lucky Rubber Duck', tag: 'with an SFE hard hat' },
      { name: 'Mystery Envelope' },
    ],
  },
];
