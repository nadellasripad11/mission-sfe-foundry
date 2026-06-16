# Mission SFE Foundry - Claude Context Map

**Last Updated:** 2026-06-15 | **Status:** Production Ready

---

## 🎯 Project Overview

**Mission:** Build a professional landing page for SFE Foundry, a student-led innovation and entrepreneurship club.

**Current State:** Complete, with professional animations, dark burgundy design, and Supabase integration.

**Live:** `http://localhost:3000` (dev server)

---

## 🏗️ Tech Stack

- **Framework:** Next.js 16.2.9 (App Router) with TypeScript
- **Styling:** Tailwind CSS + custom CSS animations
- **Database:** Supabase (PostgreSQL, RLS policies)
- **Backend:** Next.js API routes (`/api/signups`)
- **Deployment:** Vercel (ready to deploy)
- **Design System:** UI/UX Pro Max (via Anthropic skill)

---

## 📁 Project Structure

```
mission-sfe-foundry/
├── src/app/
│   ├── page.tsx          # Main landing page (CORE FILE)
│   ├── layout.tsx        # Root layout
│   ├── api/
│   │   └── signups/      # Email signup endpoint
│   │       └── route.ts
│   ├── events/           # Events listing page
│   │   └── page.tsx
│   ├── projects/         # Wall of fame page
│   │   └── page.tsx
│   └── resources/        # Resource guides page
│       └── page.tsx
├── public/               # Static assets
├── .env.local            # Supabase credentials
├── package.json
└── CLAUDE.md             # This file
```

---

## 🎨 Design System

### Color Palette
| Role | Hex | Usage |
|------|-----|-------|
| **Background** | `#0d0402` | Main BG (dark burgundy/maroon) |
| **Primary Accent** | `#FF4D2E` | Buttons, icons, hovers |
| **Secondary Accent** | `#FF7F50` | Gradients, text highlights |
| **Text** | `#FFFFFF` | Primary text |
| **Muted Text** | `#999999` | Secondary/tertiary text |
| **Glass Border** | `rgba(255, 77, 46, 0.3)` | Card borders |

### Typography
- **Headings:** Outfit (700-800 weight)
- **Body:** Work Sans (400-600 weight)
- **Google Fonts:** Imported via `@import url()`

### Inspiration
Design inspired by **catchai.live** — dark, sophisticated, professional. No emojis.

---

## ⚡ Animations & Transitions

### Animation Library
All animations use **transform** and **opacity** only (no layout shift).

| Animation | Duration | Easing | Use Case |
|-----------|----------|--------|----------|
| `fadeInUp` | 600ms | cubic-bezier(0.34, 1.56, 0.64, 1) | Page load, scroll trigger |
| `slideInLeft` | 600ms | cubic-bezier(0.34, 1.56, 0.64, 1) | Section titles |
| `slideInRight` | 600ms | cubic-bezier(0.34, 1.56, 0.64, 1) | Section titles (alt) |
| `scaleIn` | 500ms | cubic-bezier(0.34, 1.56, 0.64, 1) | Modal appears |

### Hover Effects
- **Cards:** `translateY(-8px)` on hover
- **Buttons:** `translateY(-3px)` + shadow increase
- **Icons:** `scale(1.1) rotate(5deg)`
- **Nav Links:** Underline animation (width 0 → 100%)
- **All transitions:** 300ms cubic-bezier easing

### Scroll Animations
- Scroll-triggered element visibility with `data-scroll-trigger` attributes
- Staggered delays: 0.1s, 0.2s, 0.3s, 0.4s, 0.5s
- Respect `prefers-reduced-motion` media query

---

## 📝 Key Implementation Details

### Page.tsx Structure
The main landing page contains:

1. **Navigation** (fixed top)
   - Logo + nav links (About, Events, Projects, Join)
   - Get Started button (opens join modal)

2. **Hero Section**
   - Badge: "STUDENT INNOVATION"
   - Headline: "Build every idea. Ship instantly."
   - CTA buttons: Get Started, See Events
   - Stats: 500+ Builders, 100+ Projects, $1M+ Raised

3. **What We Offer** (id="about")
   - 4 glass-morphic cards with SVG icons:
     - Hackathons
     - Pitch Competitions
     - Workshops
     - Community

4. **Upcoming Events** (id="events")
   - 4 event cards with left border accent
   - Date, title, description, arrow icon

5. **Wall of Fame** (id="projects")
   - 6 project cards with numbered badges
   - Project name + creator info

6. **Resources**
   - 6 resource cards with arrow icons
   - Guide titles only

7. **CTA Section** (id="join")
   - Final pitch + Get Started button

8. **Footer**
   - Logo, nav links, resources, contact

### Join Modal
- Opens when "Get Started" clicked
- Glass-morphic design
- Email input with focus ring
- Join + Close buttons
- Submit state: "Joining..." feedback
- Error handling: Duplicate email check

### API Endpoint: `/api/signups`
```
POST /api/signups
Body: { email: "user@example.com" }

Success: { success: true }
Error (duplicate): { error: "Email already signed up" }
Error (invalid): { error: "Valid email required" }
```

---

## 🔐 Supabase Integration

### Database Table: `signups`
```sql
CREATE TABLE signups (
  id BIGINT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### RLS Policy
- Anyone can INSERT signups (public signup)
- Email field enforces uniqueness

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://bimjkrckxgphylgpwvji.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[stored in .env.local]
```

---

## 🚀 What's Been Done

✅ **Design & UX**
- Dark burgundy color scheme (catchai-inspired)
- Professional typography (Outfit + Work Sans)
- Glass-morphic cards with 25px backdrop blur
- Zero emojis — SVG icons + numbered badges
- Responsive at all breakpoints

✅ **Animations**
- Scroll-triggered fade-ins with stagger
- Smooth hover effects (lift cards, button shine)
- Icon scale/rotate animations
- Navigation underline animation
- Modal scale-in animation
- Scroll progress bar

✅ **Functionality**
- Email signup to Supabase
- Modal form with validation
- Error handling (duplicate email)
- Form submit state feedback
- Smooth scroll navigation
- Fixed navbar with scroll progress

✅ **Performance**
- Transform-only animations (no repaints)
- Proper animation timing (300-500ms)
- Respects prefers-reduced-motion
- Lazy-load ready structure

---

## 📋 What's Left (Optional Enhancements)

- [ ] Add real images (hero, team, events)
- [ ] Implement Magic MCP animations (if available)
- [ ] Add email confirmation flow
- [ ] Add analytics tracking
- [ ] Add "Coming Soon" status to pages
- [ ] Mobile menu for small screens
- [ ] Dark mode toggle (already dark by default)
- [ ] Page transitions between routes

---

## 🔧 Common Tasks

### Start Dev Server
```bash
npm run dev
# Runs on localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel deploy
# or git push (auto-deploys)
```

### Test Email Signup
```bash
curl -X POST http://localhost:3000/api/signups \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## 🎓 Design Decisions & Reasoning

### Why Dark Burgundy?
- Matches catchai.live aesthetic
- Professional, not "startup bright"
- Better for contrast with orange accents
- Reduces eye strain on long browsing

### Why No Emojis?
- Unprofessional appearance
- Hard to scale/animate consistently
- SVG icons offer better control
- Numbered badges are cleaner

### Why Staggered Animations?
- Creates visual rhythm
- Guides user attention
- Feels premium/polished
- Improves perceived performance

### Why Transform-Only?
- Avoids layout thrashing
- 60fps smooth animation
- Better mobile performance
- No jank or glitches

---

## 🐛 Known Issues & Fixes

**Issue:** Next.js warning about multiple lockfiles
- **Cause:** Both `/Users/hnadella/package-lock.json` and project lockfile exist
- **Fix:** Set `turbopack.root` in `next.config.js` or remove unnecessary lockfile

**Issue:** Dev server sometimes picks random port
- **Cause:** Port 3000 may be in use
- **Fix:** `lsof -i :3000` to find process, then `kill -9 <pid>`

---

## 💡 Key Files to Know

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main landing page (ALL animations, modals, styling) |
| `src/app/api/signups/route.ts` | Email signup backend |
| `.env.local` | Supabase credentials |
| `next.config.js` | Next.js configuration |
| `tailwind.config.js` | Tailwind CSS config |
| `package.json` | Dependencies + scripts |

---

## 📊 Page Performance Targets

- **Lighthouse:** 90+ (Performance)
- **Core Web Vitals:** All green
- **Time to Interactive:** <3s
- **Cumulative Layout Shift:** 0 (no jank)

---

## 🔗 Important Links

- **GitHub:** https://github.com/nadellasripad11/SFE-foundery
- **Vercel:** (Deploy when ready)
- **Supabase:** https://supabase.com/dashboard/project/bimjkrckxgphylgpwvji
- **Design Inspiration:** https://catchai.live

---

## 📝 Notes for Future Claude Sessions

### When Working on This Project:
1. **Read this file first** — it's only ~400 lines but saves context
2. **Check localhost:3000** — visual verification is faster than reading code
3. **Use UI/UX Pro Max skill** for design improvements
4. **No emojis** — use SVG icons or numbered badges instead
5. **Transform-only animations** — maintain 60fps performance
6. **Respect prefers-reduced-motion** — accessibility matters
7. **All styles in page.tsx** — single component, easy to modify

### If Adding New Sections:
- Follow the animation pattern: `fade-in-up` + `stagger-N`
- Add `data-scroll-trigger="section-name"` for scroll detection
- Use `glass-card` class for consistency
- Add to navigation if it's a new main section
- Test on mobile (375px, 768px, 1024px breakpoints)

### If Styling Changes Needed:
- Dark background: `#0d0402`
- Primary accent: `#FF4D2E` (use for buttons, icons, borders)
- Glass cards: Existing `.glass-card` class (25px blur, burgundy tint)
- Animations: Edit keyframes in `<style>` tag
- Typography: Already optimal (Outfit + Work Sans)

---

## 🎯 User Context (Sripad Nadella)

- **Role:** CS student, startup founder (Socle), full-stack engineer
- **Goals:** Ship production-quality portfolio projects
- **Preferences:** Clean code, no shortcuts, real animations (not AI slop)
- **Values:** User experience > perfection, shipped > theoretical

---

**Last Commit:** `b1d7a59` - Complete redesign: Remove emojis, add professional animations

**Ready to Ship:** Yes ✅

