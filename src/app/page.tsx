'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

type OAuthProvider = 'google';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
}

type AuthMode = 'signup' | 'signin';

// ── Explore panel tabs ──────────────────────────────────────────────
const TABS = [
  {
    id: 'competitions',
    label: 'Competitions',
    title: 'Startup Competitions',
    blurb: 'Pitch your ideas, get real feedback from mentors, and compete for prizes.',
    items: [
      { n: '01', h: 'Pitch Competition', p: 'Monthly events where student founders pitch to a panel of judges for prizes and mentorship.' },
      { n: '02', h: 'Demo Day', p: 'Show live prototypes and get real feedback from founders, investors, and engineers.' },
      { n: '03', h: 'Founders Summit', p: 'Annual summit bringing together student builders from across campus and beyond.' },
    ],
  },
  {
    id: 'events',
    label: 'Hackathons',
    title: 'Hackathons & Challenges',
    blurb: 'Build fast, compete, and ship something real in a weekend.',
    items: [
      { n: '01', h: '24-Hour Hackathon', p: 'Build anything in 24 hours. Themes announced night-of. Pizza included.' },
      { n: '02', h: 'Weekly Build Challenge', p: 'One theme, one week. Ship it or it didn\'t happen.' },
      { n: '03', h: 'AI / ML Hackathon', p: 'Hack on LLMs, agents, embeddings, and real datasets.' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Built by Members',
    blurb: 'Real projects shipped by students in our community.',
    items: [
      { n: '01', h: 'AI Study Assistant', p: 'Built by 3 members — an LLM-powered tutor for exam prep.' },
      { n: '02', h: 'E-Commerce Platform', p: 'Built by 5 members — full-stack storefront with payments.' },
      { n: '03', h: 'Finance Tracker', p: 'Built by 3 members — budgeting app with live dashboards.' },
    ],
  },
  {
    id: 'team',
    label: 'Team',
    title: 'Meet the Team',
    blurb: 'The students leading SFE Foundry.',
    items: [
      { n: 'JL', h: 'Jamie Lee', p: 'Founder & President' },
      { n: 'AK', h: 'Alex Kim', p: 'VP of Events' },
      { n: 'JS', h: 'Jordan Smith', p: 'Community Lead' },
    ],
  },
];

// ── Personalized board (Pinterest-style) ────────────────────────────
const INTERESTS = ['Hackathons', 'AI / ML', 'Startups', 'Web Dev', 'Design', 'Pitching', 'Mobile', 'Data'];

const PINS = [
  { cat: 'Hackathons', title: '24-Hour Build Sprint', blurb: 'Next jam drops in 2 weeks — teams of up to 4.', h: 168 },
  { cat: 'AI / ML', title: 'Agents Workshop', blurb: 'Hands-on with tool-calling and RAG pipelines.', h: 132 },
  { cat: 'Startups', title: 'Pitch Night', blurb: '5-minute pitches, live judge feedback.', h: 196 },
  { cat: 'Web Dev', title: 'Next.js Crash Course', blurb: 'Ship a full-stack app in one session.', h: 144 },
  { cat: 'Design', title: 'Figma to Prod', blurb: 'Turn mockups into clean, shippable UI.', h: 176 },
  { cat: 'Pitching', title: 'Deck Clinic', blurb: 'Get your pitch deck torn apart (kindly).', h: 128 },
  { cat: 'Mobile', title: 'React Native Lab', blurb: 'Build for iOS + Android from one codebase.', h: 184 },
  { cat: 'Data', title: 'Data Viz Jam', blurb: 'Make dashboards that actually tell a story.', h: 140 },
  { cat: 'AI / ML', title: 'Model Demo Day', blurb: 'Show off what your model can do.', h: 160 },
  { cat: 'Startups', title: 'Founder Office Hours', blurb: 'Weekly 1:1s with mentors.', h: 124 },
  { cat: 'Hackathons', title: 'Beginner Hack', blurb: 'First hackathon? Start here.', h: 152 },
  { cat: 'Web Dev', title: 'API Design Talk', blurb: 'Build APIs people enjoy using.', h: 136 },
];

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Auth modal
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [msgOk, setMsgOk] = useState(false);

  // Signed-in user (persisted client-side)
  const [user, setUser] = useState<{ email: string; name: string | null } | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  // Explore panel
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  // Personalized board
  const [interests, setInterests] = useState<string[]>([]);
  const [boardReady, setBoardReady] = useState(false);

  // Chatbot state
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hey! What do you wanna know about SFE Foundry?',
      suggestions: ['Tell me about SFE Foundry', 'How do I join?', 'What events do you host?', 'About hackathons']
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Load saved interests once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sfe-interests');
      if (saved) setInterests(JSON.parse(saved));
    } catch {}
    setBoardReady(true);
  }, []);

  // Track the Supabase auth session (email/password + OAuth all flow through here)
  useEffect(() => {
    const toUser = (su: any) =>
      su ? { email: su.email ?? '', name: su.user_metadata?.name ?? su.user_metadata?.full_name ?? null } : null;

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) setUser(toUser(data.session.user));
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? toUser(session.user) : null);
      if (session?.user) setShowModal(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    setShowProfile(false);
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleOAuth = async (provider: OAuthProvider) => {
    setMessage('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined },
    });
    if (error) {
      setMsgOk(false);
      setMessage(
        /provider is not enabled/i.test(error.message)
          ? `${provider[0].toUpperCase() + provider.slice(1)} sign-in isn't enabled yet in Supabase.`
          : error.message
      );
    }
  };

  // Persist interests
  useEffect(() => {
    if (boardReady) {
      try { localStorage.setItem('sfe-interests', JSON.stringify(interests)); } catch {}
    }
  }, [interests, boardReady]);

  // Scroll → drive a CSS variable directly (NO React re-render = no jank)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const p = docH > 0 ? Math.min(y / docH, 1) : 0;
        pageRef.current?.style.setProperty('--sk', String(p));
        const s = y > 24;
        setScrolled((prev) => (prev === s ? prev : s));
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Gentle one-time reveal — content visible by default, animates in once
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    const chatMessagesContainer = document.querySelector('[data-chat-messages]');
    if (chatMessagesContainer) {
      setTimeout(() => {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      }, 100);
    }
  }, [chatMessages]);

  const openModal = (mode: AuthMode) => { setAuthMode(mode); setMessage(''); setShowModal(true); };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (authMode === 'signup' && !name)) return;
    setLoading(true);
    setMessage('');
    const cleanEmail = email.trim().toLowerCase();
    try {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: { name, reason: reason || null },
            emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
          },
        });
        if (error) {
          setMsgOk(false);
          setMessage(/registered|already/i.test(error.message)
            ? 'This email is already registered. Try signing in instead.'
            : error.message);
        } else if (data.user && data.user.identities && data.user.identities.length === 0) {
          setMsgOk(false);
          setMessage('This email is already registered. Try signing in instead.');
        } else {
          // best-effort: add to mailing list table for the admin page
          supabase.from('signups').insert({ email: cleanEmail, name, reason: reason || null }).then(() => {}, () => {});
          setMsgOk(true);
          setMessage(data.session
            ? 'Account created! You are signed in.'
            : 'Account created! Check your email for a verification link to activate your account.');
          setEmail(''); setPassword(''); setName(''); setReason('');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
        if (error) {
          setMsgOk(false);
          setMessage(/not confirmed/i.test(error.message)
            ? 'Please verify your email first — check your inbox for the confirmation link.'
            : 'Incorrect email or password.');
        } else {
          setMsgOk(true);
          setMessage('Signed in!');
          setEmail(''); setPassword('');
          // onAuthStateChange closes the modal
        }
      }
    } catch {
      setMsgOk(false);
      setMessage('Failed to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ─────────── CHATBOT (do not modify) ───────────
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');

    const userMsg: ChatMessage = { role: 'user', content: userMessage };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Avoid repeating an identical answer: if we just said this, ask if they need anything else.
        const lastAssistant = [...chatMessages].reverse().find((m) => m.role === 'assistant');
        const isRepeat = lastAssistant && lastAssistant.content.trim() === String(data.content).trim();
        // Drop suggestions the user has already asked about
        const askedLower = new Set(updatedMessages.filter((m) => m.role === 'user').map((m) => m.content.trim().toLowerCase()));
        const freshSuggestions = (data.suggestions || []).filter((s: string) => !askedLower.has(s.trim().toLowerCase()));

        const assistantMsg: ChatMessage = isRepeat
          ? {
              role: 'assistant',
              content: 'I think I already covered that! Is there anything else I can help you with?',
              suggestions: ['How do I join?', 'Upcoming events', 'About hackathons', 'Talk to a human'],
            }
          : {
              role: 'assistant',
              content: data.content,
              suggestions: freshSuggestions.length ? freshSuggestions : ['Anything else I can help with?'],
            };
        setChatMessages([...updatedMessages, assistantMsg]);
      } else {
        const errorMsg: ChatMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
        setChatMessages([...updatedMessages, errorMsg]);
      }
    } catch (error) {
      const errorMsg: ChatMessage = { role: 'assistant', content: 'Sorry, I\'m having trouble connecting. Please try again.' };
      setChatMessages([...updatedMessages, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  };
  // ─────────── END CHATBOT logic ───────────

  // Instant jump (no smooth lag) so a top-nav click shows the section immediately
  const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
  const goToTab = (id: string) => { setActiveTab(id); requestAnimationFrame(() => jumpTo('explore')); };
  const toggleInterest = (i: string) =>
    setInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const activeTabData = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const visiblePins = interests.length === 0 ? PINS : PINS.filter((p) => interests.includes(p.cat));

  return (
    <div className="page" ref={pageRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        body, h1, h2, h3, h4, h5, h6, p, figure, blockquote { margin: 0; }
        html { scroll-behavior: smooth; }
        .page { --sk: 0; background: #F8FAFC; color: #0F172A; font-family: 'Inter', sans-serif; overflow-x: hidden; position: relative; }
        h1,h2,h3,h4 { font-family: 'Outfit', sans-serif; letter-spacing: -0.025em; }
        ::selection { background: rgba(37,99,235,0.18); }

        /* Progress bar — width driven purely by CSS var */
        .progress { position: fixed; top: 0; left: 0; height: 3px; background: #2563EB; z-index: 300; width: calc(var(--sk) * 100%); }

        /* Floating 3D wireframe shapes — outer = scroll pop, inner = 3D tumble */
        .fw {
          position: fixed; pointer-events: none; z-index: 0; perspective: 700px;
          opacity: calc(0.10 + 0.6 * var(--sk));
          transform: scale(calc(0.78 + 0.5 * var(--sk)));
          will-change: transform, opacity;
        }
        .fw svg { width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0 8px 18px rgba(37,99,235,0.30)); }
        .fw-3d { width: 100%; height: 100%; transform-style: preserve-3d; }
        @keyframes tumbleA { 0%{transform:rotateY(0) rotateX(0) translateY(0);} 50%{transform:rotateY(180deg) rotateX(14deg) translateY(-20px);} 100%{transform:rotateY(360deg) rotateX(0) translateY(0);} }
        @keyframes tumbleB { 0%{transform:rotateX(0) rotateZ(0) translateY(0);} 50%{transform:rotateX(180deg) rotateZ(10deg) translateY(16px);} 100%{transform:rotateX(360deg) rotateZ(0) translateY(0);} }
        @keyframes tumbleC { 0%{transform:rotateY(0) rotateZ(0);} 100%{transform:rotateY(360deg) rotateZ(360deg);} }
        .t-a { animation: tumbleA 15s linear infinite; }
        .t-b { animation: tumbleB 19s linear infinite; }
        .t-c { animation: tumbleC 24s linear infinite; }

        /* Scroll-driven sketch → professional (CSS var, off render path) */
        .sketch { position: fixed; right: 4%; bottom: 9%; width: 300px; height: 300px; z-index: 0; pointer-events: none; }
        @media (max-width: 900px){ .sketch{ width: 190px; height: 190px; } }
        .sketch .rough { opacity: calc(0.20 * (1 - var(--sk))); }
        .sketch .clean { opacity: calc(0.6 * var(--sk)); }

        /* Nav */
        .navbar { position: sticky; top: 0; z-index: 50; padding: 14px 28px; transition: background .3s, box-shadow .3s; }
        .navbar.scrolled { background: rgba(255,255,255,0.9); backdrop-filter: blur(14px); box-shadow: 0 1px 0 rgba(15,23,42,0.07); }
        .nav-inner { max-width: 1160px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .brand img { width: 34px; height: 34px; }
        .brand-text { font-family: 'Outfit'; font-weight: 800; font-size: 1.2rem; color: #0F2A5C; letter-spacing: -0.03em; }
        .nav-links { display: flex; gap: 26px; }
        .nav-link { background: none; border: none; cursor: pointer; font-family: 'Inter'; font-size: .875rem; font-weight: 500; color: #64748B; transition: color .2s; }
        .nav-link:hover { color: #2563EB; }
        .nav-actions { display: flex; gap: 8px; align-items: center; }

        /* Profile avatar + menu */
        .avatar-btn { width: 38px; height: 38px; border-radius: 50%; border: none; cursor: pointer; color: #fff; font-family: 'Outfit'; font-weight: 800; font-size: .95rem; background: linear-gradient(135deg,#1E3A8A,#2563EB); box-shadow: 0 2px 10px rgba(37,99,235,.35); display: flex; align-items: center; justify-content: center; transition: transform .2s, box-shadow .2s; }
        .avatar-btn:hover { transform: translateY(-1px) scale(1.05); box-shadow: 0 6px 16px rgba(37,99,235,.45); }
        .profile-menu { position: absolute; top: 50px; right: 0; width: 240px; background: #fff; border: 1px solid rgba(15,23,42,.08); border-radius: 14px; box-shadow: 0 18px 44px rgba(15,42,92,.16); padding: 8px; z-index: 70; animation: pop .2s cubic-bezier(.34,1.56,.64,1); }
        .profile-head { display: flex; gap: 12px; align-items: center; padding: 12px; border-bottom: 1px solid #F1F5F9; margin-bottom: 6px; }
        .profile-item { width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 10px 12px; border-radius: 8px; font-family: 'Inter'; font-size: .88rem; font-weight: 600; color: #DC2626; transition: background .2s; }
        .profile-item:hover { background: #FEF2F2; }

        /* Chatbot launcher (cool, on-theme) */
        .chat-fab { position: fixed; bottom: 24px; right: 24px; z-index: 40; width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer; color: #fff; background: linear-gradient(135deg,#1E3A8A 0%,#2563EB 60%,#3B82F6 100%); box-shadow: 0 10px 28px rgba(37,99,235,.45); display: flex; align-items: center; justify-content: center; transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s; }
        .chat-fab:hover { transform: translateY(-3px) scale(1.06); box-shadow: 0 16px 38px rgba(37,99,235,.55); }
        .chat-fab svg { width: 28px; height: 28px; position: relative; z-index: 2; }
        .chat-fab::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: inherit; animation: fabPulse 2.4s ease-out infinite; z-index: 0; }
        @keyframes fabPulse { 0% { transform: scale(1); opacity: .55; } 70%,100% { transform: scale(1.7); opacity: 0; } }
        @media (max-width: 640px){ .chat-fab { bottom: 16px; right: 16px; width: 54px; height: 54px; } }

        /* Locked board state */
        .locked { background:#fff; border:1px solid rgba(15,23,42,.08); border-radius:20px; padding:48px 28px; text-align:center; max-width:520px; margin:0 auto; box-shadow:0 10px 40px rgba(15,42,92,.05); }
        .lock-icon { width:56px; height:56px; border-radius:14px; background:#EFF6FF; display:flex; align-items:center; justify-content:center; margin:0 auto 18px; }

        /* Buttons */
        .btn { font-family: 'Outfit'; font-weight: 700; cursor: pointer; border: none; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s, background .2s, color .2s; }
        .btn:active { transform: translateY(1px) !important; }
        .btn-solid { background: #2563EB; color: #fff; padding: 9px 20px; border-radius: 9px; font-size: .875rem; box-shadow: 0 2px 10px rgba(37,99,235,0.28); }
        .btn-solid:hover { background: #1D4ED8; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37,99,235,0.34); }
        .btn-outline { background: transparent; color: #2563EB; padding: 9px 20px; border-radius: 9px; font-size: .875rem; border: 1.5px solid #BFDBFE; }
        .btn-outline:hover { background: #EFF6FF; border-color: #93C5FD; transform: translateY(-2px); }
        .btn-hero { padding: 13px 30px; border-radius: 11px; font-size: 1rem; }
        .btn-ghost-dark { background: rgba(255,255,255,0.08); color: #fff; border: 1.5px solid rgba(255,255,255,0.18); padding: 13px 30px; border-radius: 11px; font-size: 1rem; }
        .btn-ghost-dark:hover { background: rgba(255,255,255,0.16); transform: translateY(-2px); }

        /* Layout */
        .section { padding: 96px 28px; position: relative; z-index: 10; }
        .inner { max-width: 1100px; margin: 0 auto; }
        .eyebrow { display:inline-block; background:#EFF6FF; color:#2563EB; padding:5px 12px; border-radius:7px; font-size:.74rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase; }
        .h-title { font-weight: 800; font-size: clamp(1.8rem,4vw,2.6rem); color: #0F172A; margin-bottom: 12px; }
        .h-sub { color: #64748B; font-size: 1rem; line-height: 1.6; max-width: 480px; }

        /* Reveal — visible by default, animates in once */
        .reveal { opacity: 1; }
        .reveal.in { animation: rise .6s cubic-bezier(.34,1.56,.64,1) both; }
        @keyframes rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }

        /* Cards with subtle 3D tilt */
        .card { background:#fff; border:1px solid rgba(15,23,42,0.07); border-radius:16px; padding:26px; transition: transform .3s, box-shadow .3s; }
        .card:hover { transform: translateY(-6px) perspective(800px) rotateX(2.5deg); box-shadow: 0 22px 50px rgba(37,99,235,0.10), 0 4px 12px rgba(0,0,0,.05); }
        .num { font-family:'Outfit'; font-weight:900; font-size:2rem; color:#E2E8F0; line-height:1; margin-bottom:16px; }
        .badge-num { width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Outfit';font-weight:800;color:#fff;background:linear-gradient(135deg,#1E3A8A,#2563EB);box-shadow:0 4px 12px rgba(37,99,235,.25);font-size:1.05rem; }

        /* Explore tab panel */
        .tabs { display:flex; gap:6px; background:#EEF2F8; padding:6px; border-radius:14px; flex-wrap:wrap; justify-content:center; max-width:560px; margin:0 auto 36px; }
        .tab { flex:1; min-width:120px; padding:11px 14px; border:none; border-radius:9px; cursor:pointer; font-family:'Outfit'; font-weight:700; font-size:.9rem; color:#64748B; background:transparent; transition:all .2s; }
        .tab.active { background:#fff; color:#0F2A5C; box-shadow:0 2px 8px rgba(15,42,92,.12); }
        .panel { background:#fff; border:1px solid rgba(15,23,42,0.08); border-radius:20px; padding:36px; box-shadow:0 10px 40px rgba(15,42,92,.05); }
        .panel-body { animation: swap .28s ease both; }
        @keyframes swap { from { opacity:0; transform: translateY(8px);} to {opacity:1; transform:translateY(0);} }
        .panel-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:18px; margin-top:26px; }

        /* Pinterest board */
        .chips { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-bottom:38px; }
        .chip-btn { padding:9px 16px; border-radius:999px; border:1.5px solid #CBD5E1; background:#fff; color:#475569; font-weight:600; font-size:.85rem; cursor:pointer; transition:all .2s; }
        .chip-btn:hover { border-color:#93C5FD; transform: translateY(-1px); }
        .chip-btn.on { background:#2563EB; border-color:#2563EB; color:#fff; box-shadow:0 4px 12px rgba(37,99,235,.28); }
        .board { column-count: 4; column-gap: 16px; }
        @media (max-width:1000px){ .board{ column-count:3; } }
        @media (max-width:720px){ .board{ column-count:2; } }
        @media (max-width:460px){ .board{ column-count:1; } }
        .pin { break-inside:avoid; margin-bottom:16px; border-radius:16px; padding:18px; color:#fff; display:flex; flex-direction:column; justify-content:flex-end; background:linear-gradient(160deg,#1E3A8A,#2563EB); box-shadow:0 8px 24px rgba(15,42,92,.14); transition: transform .25s, box-shadow .25s; cursor:pointer; }
        .pin:hover { transform: translateY(-5px) scale(1.01); box-shadow:0 16px 36px rgba(15,42,92,.24); }
        .pin .pin-cat { font-size:.68rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase; opacity:.8; margin-bottom:6px; }
        .pin .pin-title { font-family:'Outfit'; font-weight:800; font-size:1.05rem; margin-bottom:6px; }
        .pin .pin-blurb { font-size:.83rem; opacity:.9; line-height:1.5; }
        .pin:nth-child(3n){ background:linear-gradient(160deg,#0F2A5C,#1E40AF); }
        .pin:nth-child(4n){ background:linear-gradient(160deg,#1D4ED8,#3B82F6); }

        /* CTA */
        .cta { background:#0F2A5C; padding:110px 28px; text-align:center; position:relative; z-index:10; }

        /* Footer */
        footer { border-top:1px solid #F1F5F9; padding:50px 28px 34px; background:#fff; position:relative; z-index:10; }
        .footer-grid { max-width:1100px; margin:0 auto 42px; display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:36px; }
        .footer-link { display:block; color:#94A3B8; font-size:.875rem; text-decoration:none; margin-bottom:8px; transition:color .2s; background:none; border:none; cursor:pointer; padding:0; text-align:left; }
        .footer-link:hover { color:#2563EB; }

        /* Auth modal */
        .overlay { position:fixed; inset:0; background:rgba(15,23,42,0.55); display:flex; align-items:center; justify-content:center; z-index:200; animation:fade .2s ease; padding:16px; }
        @keyframes fade { from{opacity:0;} to{opacity:1;} }
        .modal { background:#fff; border-radius:20px; padding:38px; max-width:420px; width:100%; position:relative; box-shadow:0 28px 64px rgba(0,0,0,.2); animation:pop .3s cubic-bezier(.34,1.56,.64,1); }
        @keyframes pop { from{opacity:0; transform:scale(.93) translateY(14px);} to{opacity:1; transform:scale(1) translateY(0);} }
        .x { position:absolute; top:16px; right:16px; background:none; border:none; cursor:pointer; color:#94A3B8; font-size:1.4rem; line-height:1; padding:4px 8px; border-radius:6px; transition:.2s; }
        .x:hover { background:#F1F5F9; color:#475569; }
        .mtabs { display:flex; gap:4px; background:#F1F5F9; border-radius:10px; padding:4px; margin-bottom:26px; }
        .mtab { flex:1; padding:9px 0; border:none; border-radius:7px; font-family:'Outfit'; font-weight:700; font-size:.9rem; cursor:pointer; background:transparent; color:#64748B; transition:.2s; }
        .mtab.on { background:#fff; color:#0F2A5C; box-shadow:0 1px 3px rgba(0,0,0,.1); }
        .input { width:100%; padding:11px 14px; border:1.5px solid #E2E8F0; border-radius:10px; font-family:'Inter'; font-size:.95rem; color:#0F172A; background:#F8FAFC; margin-bottom:12px; transition:.2s; }
        .input:focus { outline:none; border-color:#3B82F6; background:#fff; box-shadow:0 0 0 3px rgba(59,130,246,.12); }
        .msg-ok { background:#F0FDF4; color:#15803D; border-radius:8px; padding:10px 14px; font-size:.875rem; margin-bottom:14px; line-height:1.5; }
        .msg-err { background:#FEF2F2; color:#DC2626; border-radius:8px; padding:10px 14px; font-size:.875rem; margin-bottom:14px; line-height:1.5; }
        .hint { font-size:.78rem; color:#94A3B8; margin:-4px 0 12px 2px; }

        /* OAuth buttons */
        .oauth-row { display:flex; gap:8px; margin-bottom:18px; }
        .oauth-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:7px; padding:10px 6px; border:1.5px solid #E2E8F0; border-radius:10px; background:#fff; cursor:pointer; font-family:'Outfit'; font-weight:600; font-size:.82rem; color:#0F172A; transition:all .2s; }
        .oauth-btn:hover { border-color:#93C5FD; background:#F8FAFC; transform:translateY(-1px); }
        .oauth-btn:disabled { opacity:.5; cursor:default; }
        .divider { display:flex; align-items:center; text-align:center; color:#94A3B8; font-size:.78rem; margin-bottom:18px; }
        .divider::before, .divider::after { content:''; flex:1; height:1px; background:#E2E8F0; }
        .divider span { padding:0 12px; }

        /* Dashboard header */
        .dash-head { display:flex; justify-content:space-between; align-items:flex-end; gap:24px; flex-wrap:wrap; }
        .dash-stats { display:flex; gap:28px; }
        .dash-stat-n { font-family:'Outfit'; font-weight:900; font-size:1.7rem; color:#0F2A5C; line-height:1; }
        .dash-stat-l { font-size:.72rem; color:#94A3B8; font-weight:600; letter-spacing:.06em; text-transform:uppercase; margin-top:4px; }

        @media (max-width:640px){ .nav-links{ display:none; } .section{ padding:68px 18px; } .panel{ padding:24px; } }
        @media (prefers-reduced-motion: reduce){ .t-a,.t-b,.t-c{ animation:none; } *,*::before,*::after{ animation-duration:.01ms !important; } }
      `}</style>

      {/* Progress bar */}
      <div className="progress" />

      {/* Floating 3D wireframe shapes (blue outline, pop + tumble) */}
      <div className="fw" style={{ top: '8%', right: '5%', width: 120, height: 120 }}>
        <div className="fw-3d t-a">
          <svg viewBox="0 0 120 120" fill="none">
            <polygon points="60,10 108,38 108,82 60,110 12,82 12,38" stroke="#2563EB" strokeWidth="3.5" />
            <line x1="60" y1="10" x2="60" y2="60" stroke="#2563EB" strokeWidth="2" />
            <line x1="12" y1="38" x2="60" y2="60" stroke="#2563EB" strokeWidth="2" />
            <line x1="108" y1="38" x2="60" y2="60" stroke="#2563EB" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="fw" style={{ top: '24%', left: '3%', width: 100, height: 100 }}>
        <div className="fw-3d t-b">
          <svg viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="34" stroke="#2563EB" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="18" stroke="#2563EB" strokeWidth="2.5" />
          </svg>
        </div>
      </div>
      <div className="fw" style={{ bottom: '26%', left: '7%', width: 92, height: 92 }}>
        <div className="fw-3d t-c">
          <svg viewBox="0 0 120 120" fill="none">
            <rect x="18" y="18" width="84" height="84" rx="10" stroke="#2563EB" strokeWidth="3.5" />
            <rect x="40" y="40" width="40" height="40" stroke="#2563EB" strokeWidth="2.5" />
          </svg>
        </div>
      </div>
      <div className="fw" style={{ top: '56%', right: '8%', width: 92, height: 92 }}>
        <div className="fw-3d t-a">
          <svg viewBox="0 0 120 120" fill="none">
            <polygon points="60,12 104,96 16,96" stroke="#2563EB" strokeWidth="3.5" />
            <line x1="60" y1="12" x2="60" y2="96" stroke="#2563EB" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Scroll-driven sketch → professional rocket */}
      <svg className="sketch" viewBox="0 0 200 200" fill="none">
        <g className="rough" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M101 28 C118 50 120 96 102 134 C84 96 84 50 101 28 Z" strokeDasharray="5 6" />
          <path d="M86 110 C74 120 70 140 73 150 C84 142 90 130 92 122" strokeDasharray="5 6" />
          <path d="M116 110 C128 120 132 140 129 150 C118 142 112 130 110 122" strokeDasharray="5 6" />
          <circle cx="101" cy="78" r="11" strokeDasharray="4 5" />
          <path d="M90 150 C95 168 107 168 112 150" strokeDasharray="4 6" />
        </g>
        <g className="clean" stroke="#2563EB" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none">
          <path d="M100 26 C120 50 122 98 100 138 C78 98 80 50 100 26 Z"
                strokeDasharray="320" style={{ strokeDashoffset: 'calc(320px * (1 - var(--sk)))' }} />
          <path d="M84 112 C70 122 66 144 70 154 C82 146 90 132 92 124"
                fill="rgba(37,99,235,0.08)" strokeDasharray="120" style={{ strokeDashoffset: 'calc(120px * (1 - var(--sk)))' }} />
          <path d="M116 112 C130 122 134 144 130 154 C118 146 110 132 108 124"
                fill="rgba(37,99,235,0.08)" strokeDasharray="120" style={{ strokeDashoffset: 'calc(120px * (1 - var(--sk)))' }} />
          <circle cx="100" cy="76" r="12" fill="rgba(37,99,235,0.1)" strokeDasharray="80" style={{ strokeDashoffset: 'calc(80px * (1 - var(--sk)))' }} />
        </g>
      </svg>

      {/* Nav */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" className="brand">
            <img src="/logo.svg" alt="SFE Foundry logo" />
            <span className="brand-text">SFE Foundry</span>
          </a>
          <div className="nav-links">
            {TABS.map((t) => (
              <button key={t.id} className="nav-link" onClick={() => goToTab(t.id)}>{t.label}</button>
            ))}
            <a href="/faq" className="nav-link" style={{ textDecoration: 'none' }}>FAQ</a>
          </div>
          <div className="nav-actions">
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  className="avatar-btn"
                  onClick={() => setShowProfile((s) => !s)}
                  title={user.email}
                  aria-label="Profile"
                >
                  {(user.name?.trim()?.[0] || user.email[0]).toUpperCase()}
                </button>
                {showProfile && (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 60 }} onClick={() => setShowProfile(false)} />
                    <div className="profile-menu">
                      <div className="profile-head">
                        <div className="avatar-btn" style={{ width: 40, height: 40, fontSize: '1rem', cursor: 'default' }}>
                          {(user.name?.trim()?.[0] || user.email[0]).toUpperCase()}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          {user.name && <div style={{ fontWeight: 700, fontSize: '.9rem', color: '#0F172A' }}>{user.name}</div>}
                          <div style={{ fontSize: '.78rem', color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                        </div>
                      </div>
                      <button className="profile-item" onClick={signOut}>Sign out</button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <button className="btn btn-solid" onClick={() => openModal('signup')}>Sign Up</button>
                <button className="btn btn-outline" onClick={() => openModal('signin')}>Sign In</button>
              </>
            )}
          </div>
        </div>
      </nav>

      <span id="top" />

      {/* ══════════ SIGNED-IN DASHBOARD ══════════ */}
      {user && (
        <section className="section" style={{ paddingTop: 56, paddingBottom: 30 }}>
          <div className="inner">
            <div className="dash-head reveal in">
              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>Your Dashboard</div>
                <h1 className="h-title" style={{ fontSize: 'clamp(1.9rem,4vw,2.8rem)', marginBottom: 8 }}>
                  Welcome back{user.name ? ', ' + user.name.split(' ')[0] : ''}
                </h1>
                <p className="h-sub">Your personalized feed of events, hackathons, and workshops.</p>
              </div>
              <div className="dash-stats">
                {[['50+', 'Members'], ['12+', 'Projects'], ['4', 'Hackathons']].map(([n, l]) => (
                  <div key={l} className="dash-stat"><div className="dash-stat-n">{n}</div><div className="dash-stat-l">{l}</div></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Personalized board — dashboard only */}
      {user && (
        <section id="board" className="section" style={{ paddingTop: 10 }}>
          <div className="inner">
            <div className="reveal" style={{ marginBottom: 22 }}>
              <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.3rem', color: '#0F2A5C', marginBottom: 6 }}>For you</h2>
              <p style={{ color: '#64748B', fontSize: '.92rem' }}>Pick what you’re into and we’ll tailor your board.</p>
            </div>

            <div className="chips reveal" style={{ justifyContent: 'flex-start' }}>
              {INTERESTS.map((i) => (
                <button key={i} className={`chip-btn${interests.includes(i) ? ' on' : ''}`} onClick={() => toggleInterest(i)}>
                  {interests.includes(i) ? '✓ ' : ''}{i}
                </button>
              ))}
            </div>

            {interests.length > 0 && (
              <p style={{ color: '#94A3B8', fontSize: '.82rem', marginBottom: 24 }}>
                Showing {visiblePins.length} pins for {interests.length} interest{interests.length > 1 ? 's' : ''} ·{' '}
                <button className="footer-link" style={{ display: 'inline', color: '#2563EB' }} onClick={() => setInterests([])}>clear</button>
              </p>
            )}

            <div className="board reveal">
              {visiblePins.map((p, i) => (
                <div key={p.title + i} className="pin" style={{ minHeight: p.h }} onClick={() => jumpTo('explore')}>
                  <div className="pin-cat">{p.cat}</div>
                  <div className="pin-title">{p.title}</div>
                  <div className="pin-blurb">{p.blurb}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ LANDING HERO (signed out) ══════════ */}
      {!user && (
      <section className="section" style={{ minHeight: '84vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 70 }}>
        <div style={{ maxWidth: 760 }}>
          <div className="reveal in eyebrow" style={{ marginBottom: 26 }}>Student Innovation &amp; Entrepreneurship</div>
          <h1 className="reveal in" style={{ fontWeight: 900, fontSize: 'clamp(3rem,8vw,5.4rem)', lineHeight: 1.04, marginBottom: 24, color: '#0F172A' }}>
            Build cool things.<br /><span style={{ color: '#2563EB' }}>Ship them.</span>
          </h1>
          <p className="reveal in" style={{ fontSize: '1.1rem', color: '#64748B', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 42px' }}>
            Join students building startups, winning hackathons, and turning ideas into products people actually use.
          </p>
          <div className="reveal in" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-solid btn-hero" onClick={() => openModal('signup')}>Sign Up</button>
            <button className="btn btn-outline btn-hero" onClick={() => jumpTo('explore')}>Explore Programs</button>
          </div>
          <div className="reveal in" style={{ marginTop: 76, display: 'flex', justifyContent: 'center', gap: 54, flexWrap: 'wrap' }}>
            {[['50+', 'Members'], ['12+', 'Projects Shipped'], ['4', 'Hackathons / yr']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2.1rem', color: '#0F2A5C' }}>{n}</div>
                <div style={{ fontSize: '.76rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Explore — tabbed panel (both views) */}
      <section id="explore" className="section" style={{ background: '#fff' }}>
        <div className="inner">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Explore</div>
            <h2 className="h-title">{user ? 'Browse programs' : 'Everything in one place'}</h2>
            <p className="h-sub" style={{ margin: '0 auto' }}>Switch tabs to browse — the panel updates instantly, no scrolling around.</p>
          </div>

          <div className="tabs reveal">
            {TABS.map((t) => (
              <button key={t.id} className={`tab${activeTab === t.id ? ' active' : ''}`} onClick={() => setActiveTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="panel reveal">
            <div className="panel-body" key={activeTab}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F2A5C', marginBottom: 8 }}>{activeTabData.title}</h3>
              <p style={{ color: '#64748B', fontSize: '.95rem', lineHeight: 1.6 }}>{activeTabData.blurb}</p>
              <div className="panel-grid">
                {activeTabData.items.map((it) => (
                  <div key={it.h} className="card">
                    {activeTab === 'team'
                      ? <div className="badge-num" style={{ marginBottom: 16 }}>{it.n}</div>
                      : <div className="num">{it.n}</div>}
                    <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0F172A', marginBottom: 8 }}>{it.h}</h4>
                    <p style={{ color: '#64748B', fontSize: '.88rem', lineHeight: 1.6 }}>{it.p}</p>
                  </div>
                ))}
              </div>
              {!user && (
                <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button className="btn btn-solid" onClick={() => openModal('signup')}>Sign Up to Join</button>
                  <button className="btn btn-outline" onClick={() => openModal('signin')}>Sign In</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hall of Fame (signed out) */}
      {!user && (
      <section className="section" style={{ background: '#F8FAFC' }}>
        <div className="inner">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Hall of Fame</div>
            <h2 className="h-title">Top builders this year</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 18 }}>
            {[['Sarah Chen', 'Hackathon Winner'], ['Marcus Johnson', 'Top Pitcher'], ['Lisa Wong', 'Best Project'], ['Alex Rodriguez', 'Community MVP']].map(([n, a]) => (
              <div key={n} className="card reveal" style={{ textAlign: 'center', padding: '30px 22px' }}>
                <div className="badge-num" style={{ width: 66, height: 66, fontSize: '1.5rem', margin: '0 auto 16px' }}>{n.charAt(0)}</div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0F172A', marginBottom: 6 }}>{n}</div>
                <div className="eyebrow" style={{ background: '#F1F5F9', color: '#64748B' }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* CTA (signed out) */}
      {!user && (
      <section className="cta">
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5.5vw,3.1rem)', color: '#fff', marginBottom: 18, lineHeight: 1.1 }}>
            Ready to build something?
          </h2>
          <p style={{ color: '#A9BEDC', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 42 }}>
            Sign up free and get access to all events, hackathons, and the community.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-hero" style={{ background: '#fff', color: '#0F2A5C' }} onClick={() => openModal('signup')}>Sign Up</button>
            <button className="btn btn-ghost-dark btn-hero" onClick={() => openModal('signin')}>Sign In</button>
          </div>
        </div>
      </section>
      )}

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 12 }}>
              <img src="/logo.svg" alt="" style={{ width: 30, height: 30 }} />
              <span className="brand-text" style={{ fontSize: '1.1rem' }}>SFE Foundry</span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '.875rem', lineHeight: 1.6 }}>Build. Compete. Launch.</p>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: 14, fontSize: '.875rem' }}>Explore</div>
            {TABS.map((t) => <button key={t.id} className="footer-link" onClick={() => goToTab(t.id)}>{t.label}</button>)}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: 14, fontSize: '.875rem' }}>Community</div>
            {['Discord', 'Instagram', 'LinkedIn'].map((l) => <a key={l} href="#" className="footer-link">{l}</a>)}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: 14, fontSize: '.875rem' }}>Contact</div>
            <a href="mailto:sfefoundery@gmail.com" className="footer-link">sfefoundery@gmail.com</a>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto', borderTop: '1px solid #F1F5F9', paddingTop: 22, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ color: '#CBD5E1', fontSize: '.82rem' }}>© 2025 SFE Foundry</span>
          <span style={{ color: '#CBD5E1', fontSize: '.82rem' }}>Build. Compete. Launch.</span>
        </div>
      </footer>

      {/* Auth Modal (Sign In / Sign Up) */}
      {showModal && (
        <div className="overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="x" onClick={() => setShowModal(false)} aria-label="Close">×</button>
            <div className="mtabs">
              <button className={`mtab${authMode === 'signup' ? ' on' : ''}`} onClick={() => { setAuthMode('signup'); setMessage(''); }}>Sign Up</button>
              <button className={`mtab${authMode === 'signin' ? ' on' : ''}`} onClick={() => { setAuthMode('signin'); setMessage(''); }}>Sign In</button>
            </div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontWeight: 800, fontSize: '1.4rem', color: '#0F172A', marginBottom: 6 }}>
                {authMode === 'signup' ? 'Create your account' : 'Welcome back'}
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '.875rem', lineHeight: 1.55 }}>
                {authMode === 'signup'
                  ? 'Join SFE Foundry — we\'ll send a verification link to your email.'
                  : 'Sign in to your SFE Foundry account.'}
              </p>
            </div>

            {message && <div className={msgOk ? 'msg-ok' : 'msg-err'}>{message}</div>}

            {/* OAuth providers */}
            <div className="oauth-row">
              <button type="button" className="oauth-btn" onClick={() => handleOAuth('google')} disabled={loading} title="Continue with Google">
                <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>
                Google
              </button>
            </div>
            <div className="divider"><span>or</span></div>

            <form onSubmit={handleAuthSubmit}>
              {authMode === 'signup' && (
                <input className="input" type="text" placeholder="Full name" value={name}
                       onChange={(e) => setName(e.target.value)} required disabled={loading} />
              )}
              <input className="input" type="email" placeholder="Email address" value={email}
                     onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
              <input className="input" type="password" placeholder="Password" value={password}
                     onChange={(e) => setPassword(e.target.value)} required disabled={loading}
                     minLength={6} autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'} />
              {authMode === 'signup' && <div className="hint">At least 6 characters.</div>}
              {authMode === 'signup' && (
                <textarea className="input" placeholder="Why do you want to join? (optional)" value={reason}
                          onChange={(e) => setReason(e.target.value)} disabled={loading} rows={3}
                          style={{ resize: 'none', fontFamily: 'Inter, sans-serif' }} />
              )}
              <button type="submit" className="btn btn-solid" style={{ width: '100%', padding: 13, fontSize: '.95rem', borderRadius: 10, marginTop: 4 }}
                      disabled={loading || !email || !password || (authMode === 'signup' && !name)}>
                {loading
                  ? (authMode === 'signup' ? 'Creating account…' : 'Signing in…')
                  : (authMode === 'signup' ? 'Sign Up' : 'Sign In')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chatbot Widget */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="chat-fab"
          title="Chat with us"
          aria-label="Open chat"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {showChat && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black/20 z-30"
            onClick={() => setShowChat(false)}
          />
          {/* Chat Modal — airy layout, navy/blue/white theme */}
          <div
            className="fixed bg-white rounded-3xl shadow-2xl flex flex-col z-40 overflow-hidden border border-slate-200"
            style={{
              bottom: 16,
              right: 16,
              left: 'auto',
              width: 'min(384px, calc(100vw - 32px))',
              height: 'min(560px, calc(100dvh - 32px))',
            }}
          >
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center flex-shrink-0 border-b border-slate-100" style={{ background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)' }}>
              <h3 className="font-extrabold text-lg leading-tight" style={{ color: '#0F2A5C', fontFamily: 'Outfit, sans-serif' }}>
                SFE Foundry<br />Assistant
              </h3>
              <button
                onClick={() => setShowChat(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition flex-shrink-0"
                style={{ background: '#2563EB' }}
                title="Minimize"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                </svg>
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 bg-white" data-chat-messages>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="space-y-3">
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`px-5 py-4 text-[15px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'text-white rounded-3xl rounded-br-lg shadow-md max-w-[80%]'
                          : 'bg-white text-slate-800 rounded-3xl rounded-tl-lg shadow-sm border border-slate-200 w-full'
                      }`}
                      style={msg.role === 'user' ? { background: '#2563EB' } : undefined}
                    >
                      <p className="break-words">{msg.content}</p>
                    </div>
                  </div>

                  {/* Suggestions — full-width pills */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-col gap-2.5">
                      {msg.suggestions.map((suggestion, sidx) => (
                        <button
                          key={sidx}
                          onClick={() => {
                            setChatInput(suggestion);
                            setTimeout(() => {
                              const form = document.querySelector('form[data-chat-form]');
                              if (form) form.dispatchEvent(new Event('submit', { bubbles: true }));
                            }, 50);
                          }}
                          className="w-full px-5 py-3.5 bg-white text-slate-700 rounded-full text-[15px] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#93C5FD] transition border border-slate-200 text-left shadow-sm font-medium"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-400 px-5 py-3 rounded-3xl rounded-tl-lg text-sm shadow-sm border border-slate-200">
                    Typing…
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleChatSubmit}
              data-chat-form
              className="px-4 py-4 border-t border-slate-100 flex gap-2.5 items-center flex-shrink-0 bg-white"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Message…"
                className="flex-1 px-5 py-3.5 bg-white rounded-full text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] border border-slate-200 shadow-sm"
                disabled={chatLoading}
              />
              <button
                type="submit"
                className="w-12 h-12 disabled:opacity-40 text-white rounded-full flex items-center justify-center transition flex-shrink-0 shadow-md hover:brightness-110"
                style={{ background: '#2563EB' }}
                disabled={chatLoading || !chatInput.trim()}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
