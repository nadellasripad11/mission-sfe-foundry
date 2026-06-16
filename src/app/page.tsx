'use client';

import { useEffect, useState } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Chatbot state
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! 👋 I\'m here to help with any questions about SFE Foundry. What would you like to know?',
      suggestions: ['Tell me about SFE Foundry', 'How do I join?', 'What events do you host?', 'About hackathons']
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          reason: reason || null
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Welcome! Check your email for next steps.');
        setEmail('');
        setName('');
        setReason('');
        setTimeout(() => setShowModal(false), 2000);
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Failed to join. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');

    // Add user message to chat
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
        const assistantMsg: ChatMessage = {
          role: 'assistant',
          content: data.content,
          suggestions: data.suggestions || []
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

  return (
    <div className="bg-[#EEF2F7] text-[#1D3557] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Fredoka:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        html {
          scroll-behavior: smooth;
          cursor: none;
        }

        * {
          font-family: 'Inter', sans-serif;
          cursor: none !important;
        }

        ::selection {
          background: rgba(77, 168, 255, 0.3);
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Fredoka', sans-serif;
          font-weight: 700;
        }

        .handwritten {
          font-family: 'Caveat', cursive;
          font-weight: 700;
        }

        body {
          background:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(77, 168, 255, 0.03) 39px,
              rgba(77, 168, 255, 0.03) 40px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 39px,
              rgba(77, 168, 255, 0.03) 39px,
              rgba(77, 168, 255, 0.03) 40px
            ),
            linear-gradient(135deg, #EEF2F7 0%, #F5F7FB 50%, #EEF2F7 100%);
          background-attachment: fixed;
          position: relative;
        }

        /* Floating Elements Container */
        .floating-element {
          position: fixed;
          pointer-events: none;
          opacity: 0.85;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.08));
          z-index: 1;
        }

        .floating-element:hover {
          opacity: 1;
          filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.12));
          z-index: 15;
        }

        /* Floating Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
          50% { transform: translateY(-30px) rotate(var(--rotation, 0deg)); }
        }

        @keyframes drift {
          0%, 100% { transform: translateX(0px) translateY(0px) rotate(var(--rotation, 0deg)); }
          33% { transform: translateX(15px) translateY(-20px) rotate(var(--rotation, 0deg)); }
          66% { transform: translateX(-10px) translateY(15px) rotate(var(--rotation, 0deg)); }
        }

        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        .drift-animation {
          animation: drift 8s ease-in-out infinite;
        }

        .spin-animation {
          animation: slowSpin 20s linear infinite;
        }

        /* SVG Styles */
        svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.06));
        }

        /* Parallax Effect */
        .parallax {
          will-change: transform;
          transition: transform 0.5s cubic-bezier(0.33, 0.66, 0.66, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Content Layer */
        .content-wrapper {
          position: relative;
          z-index: 10;
        }

        /* Navigation */
        nav {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(77, 168, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nav-link {
          color: #1D3557;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #4DA8FF, #06D6A0);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #4DA8FF;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Buttons */
        .btn {
          font-family: 'Fredoka', sans-serif;
          font-weight: 700;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          font-size: 1rem;
          padding: 12px 28px;
          border: 2px solid;
        }

        .btn-primary {
          background: linear-gradient(135deg, #4DA8FF, #06D6A0);
          color: white;
          border-color: transparent;
          box-shadow: 0 8px 20px rgba(77, 168, 255, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(77, 168, 255, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #FF6B35;
          border-color: #FF6B35;
        }

        .btn-secondary:hover {
          background: #FF6B35;
          color: white;
          transform: translateY(-3px);
        }

        /* Cards */
        .card {
          background: white;
          border: 2px solid rgba(77, 168, 255, 0.15);
          border-radius: 20px;
          padding: 28px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(77, 168, 255, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .card:hover::before {
          left: 100%;
        }

        .card:hover {
          transform: translateY(-8px);
          border-color: rgba(77, 168, 255, 0.3);
          box-shadow: 0 12px 40px rgba(77, 168, 255, 0.15);
        }

        /* Animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slide-in {
          animation: slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }

        /* Section Styles */
        section {
          position: relative;
          padding: 80px 0;
        }

        /* Handwritten elements */
        .handwritten-note {
          font-size: 1.5rem;
          color: #FF6B35;
          font-weight: 700;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
        }

        /* Color accents */
        .text-blue { color: #4DA8FF; }
        .text-orange { color: #FF6B35; }
        .text-yellow { color: #FFD166; }
        .text-green { color: #06D6A0; }

        .bg-blue-light { background: rgba(77, 168, 255, 0.1); }
        .bg-orange-light { background: rgba(255, 107, 53, 0.1); }
        .bg-yellow-light { background: rgba(255, 209, 102, 0.1); }
        .bg-green-light { background: rgba(6, 214, 160, 0.1); }

        /* Badge styles */
        .badge {
          display: inline-block;
          background: white;
          border: 2px solid #4DA8FF;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          margin: 8px 8px 8px 0;
          transition: all 0.3s ease;
        }

        .badge:hover {
          background: #4DA8FF;
          color: white;
          transform: scale(1.05);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          items: center;
          justify: center;
          z-index: 100;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          padding: 40px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-content h2 {
          font-size: 1.875rem;
          margin-bottom: 12px;
          color: #1D3557;
        }

        .modal-content p {
          color: #1D3557;
          opacity: 0.7;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .modal-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid rgba(77, 168, 255, 0.2);
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          transition: all 0.3s ease;
          margin-bottom: 16px;
        }

        .modal-input:focus {
          outline: none;
          border-color: #4DA8FF;
          box-shadow: 0 0 0 3px rgba(77, 168, 255, 0.1);
        }

        .modal-buttons {
          display: flex;
          gap: 12px;
        }

        .modal-message {
          text-align: center;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 0.95rem;
        }

        .modal-message.success {
          background: rgba(6, 214, 160, 0.1);
          color: #06D6A0;
        }

        .modal-message.error {
          background: rgba(255, 107, 53, 0.1);
          color: #FF6B35;
        }

        /* Custom Cursor */
        .custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          width: 30px;
          height: 40px;
          transform: translate(0, 0);
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 40" width="30" height="40"><path d="M 2 2 L 2 35 L 12 25 L 20 35 L 25 32 L 17 22 L 25 22 Z" fill="black"/></svg>');
          background-repeat: no-repeat;
          background-size: contain;
        }
      `}</style>

      {/* Floating Startup Elements */}
      <div className="floating-element float-animation" style={{ top: '8%', right: '5%', width: '160px', height: '160px', '--rotation': '15deg' } as any}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rocket */}
          <g>
            <path d="M100 30 L110 60 L90 60 Z" fill="#FF6B35" stroke="#FF6B35" strokeWidth="2"/>
            <rect x="85" y="60" width="30" height="80" fill="#4DA8FF" stroke="#4DA8FF" strokeWidth="2" rx="4"/>
            <circle cx="100" cy="150" r="12" fill="#FFD166" stroke="#FFD166" strokeWidth="2"/>
            <path d="M80 130 L70 160 L80 155 Z" fill="#06D6A0"/>
            <path d="M120 130 L130 160 L120 155 Z" fill="#06D6A0"/>
          </g>
        </svg>
      </div>

      <div className="floating-element drift-animation" style={{ top: '25%', left: '3%', width: '140px', height: '140px', '--rotation': '-20deg' } as any}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Laptop */}
          <g>
            <rect x="40" y="30" width="120" height="80" fill="#4DA8FF" stroke="#4DA8FF" strokeWidth="2" rx="6"/>
            <rect x="45" y="35" width="110" height="65" fill="white" stroke="#1D3557" strokeWidth="1.5"/>
            <rect x="30" y="110" width="140" height="8" fill="#1D3557" rx="2"/>
            <line x1="70" y1="120" x2="130" y2="120" stroke="#FF6B35" strokeWidth="2"/>
          </g>
        </svg>
      </div>

      <div className="floating-element float-animation" style={{ top: '50%', right: '8%', width: '150px', height: '150px', '--rotation': '10deg', animationDelay: '1s' } as any}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Trophy */}
          <g>
            <path d="M50 80 L50 40 Q50 20 70 20 L130 20 Q150 20 150 40 L150 80" fill="none" stroke="#FFD166" strokeWidth="3"/>
            <rect x="60" y="80" width="80" height="40" fill="#FFD166" stroke="#FFD166" strokeWidth="2" rx="4"/>
            <path d="M85 120 L85 140 L50 140 L50 150 L150 150 L150 140 L115 140 L115 120" fill="#FFD166" stroke="#FFD166" strokeWidth="2"/>
            <circle cx="100" cy="50" r="15" fill="#FF6B35" opacity="0.3"/>
          </g>
        </svg>
      </div>

      <div className="floating-element spin-animation" style={{ bottom: '20%', left: '10%', width: '130px', height: '130px' }}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Lightbulb */}
          <g>
            <circle cx="100" cy="70" r="40" fill="#06D6A0" stroke="#06D6A0" strokeWidth="2"/>
            <path d="M80 110 L120 110 L115 140 L85 140 Z" fill="#1D3557" stroke="#1D3557" strokeWidth="2"/>
            <line x1="90" y1="150" x2="110" y2="150" stroke="#4DA8FF" strokeWidth="3"/>
            <line x1="88" y1="165" x2="112" y2="165" stroke="#4DA8FF" strokeWidth="3"/>
          </g>
        </svg>
      </div>

      <div className="floating-element drift-animation" style={{ top: '45%', left: '85%', width: '120px', height: '120px', '--rotation': '25deg', animationDelay: '2s' } as any}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sticky Note */}
          <g>
            <rect x="30" y="20" width="140" height="140" fill="#FFD166" stroke="#FFD166" strokeWidth="2" rx="4"/>
            <line x1="40" y1="50" x2="160" y2="50" stroke="#1D3557" strokeWidth="1.5" opacity="0.5"/>
            <line x1="40" y1="70" x2="160" y2="70" stroke="#1D3557" strokeWidth="1.5" opacity="0.5"/>
            <line x1="40" y1="90" x2="160" y2="90" stroke="#1D3557" strokeWidth="1.5" opacity="0.5"/>
            <circle cx="150" cy="35" r="8" fill="#FF6B35"/>
          </g>
        </svg>
      </div>

      <div className="floating-element float-animation" style={{ top: '65%', right: '12%', width: '140px', height: '140px', '--rotation': '-15deg', animationDelay: '1.5s' } as any}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Robot */}
          <g>
            <rect x="50" y="40" width="100" height="80" fill="#4DA8FF" stroke="#4DA8FF" strokeWidth="2" rx="6"/>
            <circle cx="70" cy="60" r="8" fill="#FF6B35"/>
            <circle cx="130" cy="60" r="8" fill="#FF6B35"/>
            <rect x="75" y="80" width="50" height="20" fill="#06D6A0" stroke="#06D6A0" strokeWidth="1.5" rx="3"/>
            <rect x="45" y="130" width="20" height="40" fill="#FFD166" stroke="#FFD166" strokeWidth="2"/>
            <rect x="135" y="130" width="20" height="40" fill="#FFD166" stroke="#FFD166" strokeWidth="2"/>
          </g>
        </svg>
      </div>

      <div className="floating-element drift-animation" style={{ bottom: '35%', right: '5%', width: '150px', height: '150px', '--rotation': '20deg', animationDelay: '0.5s' } as any}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pitch Deck */}
          <g>
            <rect x="35" y="30" width="130" height="95" fill="white" stroke="#FF6B35" strokeWidth="2.5" rx="4"/>
            <rect x="42" y="38" width="50" height="30" fill="#4DA8FF" opacity="0.7" rx="3"/>
            <rect x="100" y="38" width="50" height="30" fill="#06D6A0" opacity="0.7" rx="3"/>
            <rect x="42" y="75" width="108" height="8" fill="#FFD166" opacity="0.7" rx="2"/>
            <rect x="35" y="130" width="130" height="8" fill="#1D3557" rx="2"/>
            <circle cx="170" cy="170" r="12" fill="#FF6B35"/>
          </g>
        </svg>
      </div>

      <div className="floating-element float-animation" style={{ top: '15%', left: '70%', width: '140px', height: '140px', '--rotation': '-10deg', animationDelay: '2.5s' } as any}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dashboard */}
          <g>
            <rect x="30" y="25" width="140" height="150" fill="white" stroke="#4DA8FF" strokeWidth="2" rx="6"/>
            <rect x="40" y="35" width="30" height="20" fill="#FF6B35" rx="2"/>
            <rect x="80" y="35" width="30" height="20" fill="#06D6A0" rx="2"/>
            <rect x="120" y="35" width="30" height="20" fill="#FFD166" rx="2"/>
            <path d="M45 70 L55 65 L65 75 L75 60 L85 70" stroke="#4DA8FF" strokeWidth="2" fill="none"/>
            <line x1="40" y1="95" x2="130" y2="95" stroke="#1D3557" strokeWidth="1" opacity="0.3"/>
            <line x1="40" y1="110" x2="130" y2="110" stroke="#1D3557" strokeWidth="1" opacity="0.3"/>
            <line x1="40" y1="125" x2="130" y2="125" stroke="#1D3557" strokeWidth="1" opacity="0.3"/>
            <line x1="40" y1="140" x2="130" y2="140" stroke="#1D3557" strokeWidth="1" opacity="0.3"/>
          </g>
        </svg>
      </div>

      <div className="floating-element drift-animation" style={{ bottom: '8%', left: '75%', width: '130px', height: '130px', '--rotation': '-25deg', animationDelay: '1.2s' } as any}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Medal */}
          <g>
            <circle cx="100" cy="60" r="35" fill="#FFD166" stroke="#FFD166" strokeWidth="2.5"/>
            <circle cx="100" cy="60" r="28" fill="white" stroke="#FFD166" strokeWidth="1.5"/>
            <text x="100" y="70" fontSize="40" textAnchor="middle" fill="#FFD166">★</text>
            <path d="M90 95 Q100 105 110 95 L110 120 Q100 130 90 120 Z" fill="#FF6B35" stroke="#FF6B35" strokeWidth="1.5"/>
            <line x1="80" y1="95" x2="120" y2="95" stroke="#4DA8FF" strokeWidth="2"/>
          </g>
        </svg>
      </div>

      <div className="floating-element spin-animation" style={{ top: '72%', left: '12%', width: '120px', height: '120px' }}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Code Window */}
          <g>
            <rect x="30" y="30" width="140" height="140" fill="white" stroke="#1D3557" strokeWidth="2" rx="4"/>
            <rect x="30" y="30" width="140" height="25" fill="#1D3557" rx="4"/>
            <circle cx="45" cy="42" r="3" fill="#FF6B35"/>
            <circle cx="60" cy="42" r="3" fill="#FFD166"/>
            <circle cx="75" cy="42" r="3" fill="#06D6A0"/>
            <line x1="40" y1="65" x2="160" y2="65" stroke="#4DA8FF" strokeWidth="1.5" opacity="0.6"/>
            <line x1="40" y1="80" x2="160" y2="80" stroke="#4DA8FF" strokeWidth="1.5" opacity="0.6"/>
            <line x1="40" y1="95" x2="160" y2="95" stroke="#4DA8FF" strokeWidth="1.5" opacity="0.6"/>
            <line x1="40" y1="110" x2="160" y2="110" stroke="#4DA8FF" strokeWidth="1.5" opacity="0.6"/>
            <line x1="40" y1="125" x2="160" y2="125" stroke="#4DA8FF" strokeWidth="1.5" opacity="0.6"/>
            <line x1="40" y1="140" x2="160" y2="140" stroke="#4DA8FF" strokeWidth="1.5" opacity="0.6"/>
          </g>
        </svg>
      </div>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Navigation */}
        <nav className="px-8 py-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-3xl font-bold handwritten text-text-orange">SFE Foundry</div>
            <div className="hidden md:flex gap-10">
              <a href="#competitions" className="nav-link">Competitions</a>
              <a href="#events" className="nav-link">Events</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#team" className="nav-link">Team</a>
            </div>
            <button className="btn btn-primary px-6 py-3" onClick={() => setShowModal(true)}>
              Join Us
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-8 overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-8xl md:text-9xl font-bold handwritten mb-6 text-blue slide-in" style={{ lineHeight: '1.2' }}>
              Build cool
              <br />
              <span className="text-orange">things.</span>
            </h1>

            <p className="slide-in stagger-1 text-2xl md:text-3xl font-semibold text-[#1D3557] mb-12 leading-relaxed max-w-2xl mx-auto">
              Join students building startups, winning hackathons, launching projects, and turning ideas into reality.
            </p>

            <div className="slide-in stagger-2 flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>Join SFE Foundry</button>
              <button className="btn btn-secondary" onClick={() => window.location.href = '#events'}>Upcoming Events</button>
            </div>

            {/* Stats */}
            <div className="slide-in stagger-3 mt-16 flex justify-center gap-12">
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-3">🚀</div>
                <div className="font-bold text-lg text-blue">50+ Members</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-3">⚡</div>
                <div className="font-bold text-lg text-blue">Building Daily</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-3">🎨</div>
                <div className="font-bold text-lg text-blue">Super Ambitious</div>
              </div>
            </div>
          </div>
        </section>

        {/* Startup Competitions Section */}
        <section id="competitions" className="py-32 px-8 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold handwritten text-center mb-4 text-blue">
              Startup <span className="text-orange">Competitions</span>
            </h2>
            <p className="text-center text-lg text-[#1D3557]/70 mb-16 max-w-2xl mx-auto">
              Pitch your ideas, get feedback from mentors, compete for prizes, and launch your next big thing.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {['Pitch Competition', 'Demo Day', 'Founders Summit'].map((title, idx) => (
                <div key={idx} className="card slide-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                  <div className="text-5xl mb-4">🎤</div>
                  <h3 className="text-3xl font-bold handwritten mb-4 text-orange">{title}</h3>
                  <p className="text-[#1D3557]/70 mb-6 leading-relaxed">
                    Monthly competitions where student founders pitch ideas to judges and win prizes.
                  </p>
                  <button className="btn btn-secondary w-full" onClick={() => window.location.href = '#events'}>Learn More</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hackathons Section */}
        <section id="events" className="py-32 px-8 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold handwritten text-center mb-4 text-blue">
              <span className="text-green">Hackathons</span> & Build Challenges
            </h2>
            <p className="text-center text-lg text-[#1D3557]/70 mb-16 max-w-2xl mx-auto">
              Build projects, compete with friends, and show off your creations.
            </p>

            <div className="space-y-8">
              {[
                { title: '24-Hour Hackathons', emoji: '⏱️', bg: 'bg-yellow-light' },
                { title: 'Weekly Challenges', emoji: '📅', bg: 'bg-blue-light' },
                { title: 'AI/ML Hackathons', emoji: '🤖', bg: 'bg-green-light' },
              ].map((hack, idx) => (
                <div key={idx} className={`${hack.bg} border-2 border-[#4DA8FF] rounded-3xl p-10 slide-in`} style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className="flex items-center gap-6">
                    <div className="text-6xl">{hack.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-[#1D3557] mb-2">{hack.title}</h3>
                      <p className="text-[#1D3557]/70">Build something amazing and compete with the community.</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>Register</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Projects Section */}
        <section id="projects" className="py-32 px-8 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold handwritten text-center mb-4 text-blue">
              Projects Built by <span className="text-green">Our Community</span>
            </h2>
            <p className="text-center text-lg text-[#1D3557]/70 mb-16 max-w-2xl mx-auto">
              Check out the amazing things our members are building.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'AI Study Assistant', emoji: '📚', members: '3 members' },
                { title: 'E-Commerce Platform', emoji: '🛍️', members: '5 members' },
                { title: 'Social App', emoji: '💬', members: '2 members' },
                { title: 'Mobile Game', emoji: '🎮', members: '4 members' },
                { title: 'Weather Dashboard', emoji: '🌤️', members: '2 members' },
                { title: 'Finance Tracker', emoji: '💰', members: '3 members' },
              ].map((proj, idx) => (
                <div key={idx} className="card slide-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="text-6xl mb-4">{proj.emoji}</div>
                  <h3 className="text-2xl font-bold text-[#1D3557] mb-2">{proj.title}</h3>
                  <p className="text-[#1D3557]/60 text-sm mb-4">{proj.members}</p>
                  <button className="btn btn-secondary w-full text-sm" onClick={() => alert(`${proj.title} project details coming soon!`)}>View Project</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hall of Fame */}
        <section className="py-32 px-8 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold handwritten text-center mb-4">
              🏆 Hall of <span className="text-orange">Fame</span>
            </h2>
            <p className="text-center text-lg text-[#1D3557]/70 mb-16 max-w-2xl mx-auto">
              Celebrating our amazing builders and innovators.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { name: 'Sarah Chen', achievement: 'Hackathon Winner' },
                { name: 'Marcus Johnson', achievement: 'Top Pitcher' },
                { name: 'Lisa Wong', achievement: 'Best Project' },
                { name: 'Alex Rodriguez', achievement: 'Community MVP' },
              ].map((person, idx) => (
                <div key={idx} className="card text-center slide-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-green-400 mx-auto mb-4"></div>
                  <h3 className="text-2xl font-bold text-[#1D3557] mb-1">{person.name}</h3>
                  <p className="text-orange font-bold mb-2">{person.achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors */}
        <section className="py-32 px-8 bg-gradient-to-br from-blue-light to-green-light relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold handwritten text-center mb-4 text-blue">
              Supported By <span className="text-orange">Amazing Partners</span>
            </h2>
            <p className="text-center text-lg text-[#1D3557]/70 mb-16">
              Thanks to our sponsors who believe in student builders.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="h-32 rounded-3xl flex items-center justify-center cursor-pointer transition-all slide-in card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-sm font-bold text-[#1D3557]">Partner {i}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="py-32 px-8 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-bold handwritten text-center mb-4 text-blue">
              Meet the <span className="text-green">Builders</span>
            </h2>
            <p className="text-center text-lg text-[#1D3557]/70 mb-16 max-w-2xl mx-auto">
              The amazing students leading SFE Foundry.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { role: 'Founder & President', name: 'Jamie Lee', color: 'from-blue-400 to-orange-400' },
                { role: 'VP of Events', name: 'Alex Kim', color: 'from-green-400 to-blue-400' },
                { role: 'Community Lead', name: 'Jordan Smith', color: 'from-yellow-400 to-orange-400' },
              ].map((member, idx) => (
                <div key={idx} className="card text-center slide-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.color} mx-auto mb-6`}></div>
                  <h3 className="text-2xl font-bold text-[#1D3557] mb-2">{member.name}</h3>
                  <p className="text-orange font-bold">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-32 px-8 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold handwritten text-center mb-12 text-blue">
              Your <span className="text-orange">Achievements</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
              {[
                { emoji: '🚀' },
                { emoji: '⚡' },
                { emoji: '🏆' },
                { emoji: '🎤' },
                { emoji: '👥' },
                { emoji: '💡' },
                { emoji: '🔥' },
                { emoji: '⭐' },
              ].map((achievement, idx) => (
                <div key={idx} className="w-20 h-20 rounded-full bg-white border-2 border-[#4DA8FF] flex items-center justify-center text-3xl slide-in hover:scale-110 transition-transform cursor-pointer shadow-md" style={{ animationDelay: `${idx * 0.05}s` }}>
                  {achievement.emoji}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-8 bg-gradient-to-r from-blue-light via-transparent to-green-light relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl md:text-7xl font-bold handwritten text-blue mb-6 slide-in">
              Ready to build something cool?
            </h2>
            <p className="text-xl text-[#1D3557] mb-12 slide-in stagger-1 leading-relaxed">
              Join SFE Foundry and become part of a movement of ambitious students turning ideas into reality.
            </p>
            <div className="slide-in stagger-2 flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>Join the Community</button>
              <button className="btn btn-secondary" onClick={() => window.location.href = '#events'}>See Events →</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#4DA8FF]/20 py-12 px-8 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-bold handwritten text-orange mb-4">SFE Foundry</h3>
                <p className="text-[#1D3557]/70">Building cool things together.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#1D3557] mb-4">Navigation</h4>
                <ul className="space-y-2 text-[#1D3557]/70">
                  <li><a href="#competitions" className="hover:text-blue transition">Competitions</a></li>
                  <li><a href="#events" className="hover:text-blue transition">Events</a></li>
                  <li><a href="#projects" className="hover:text-blue transition">Projects</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#1D3557] mb-4">Community</h4>
                <ul className="space-y-2 text-[#1D3557]/70">
                  <li><a href="#" className="hover:text-blue transition">Discord</a></li>
                  <li><a href="#" className="hover:text-blue transition">Instagram</a></li>
                  <li><a href="#" className="hover:text-blue transition">Twitter</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#1D3557] mb-4">Contact</h4>
                <p className="text-[#1D3557]/70">hello@sfefoundry.com</p>
                <p className="text-orange font-bold mt-2">Building cool things.</p>
              </div>
            </div>
            <div className="border-t border-[#1D3557]/10 pt-8 text-center text-[#1D3557]/60">
              <p>© 2024 SFE Foundry • Build. Compete. Launch.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Join Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Join SFE Foundry</h2>
            <p>Be part of a community building the future. Get updates on competitions, hackathons, and events.</p>

            {message && (
              <div className={`modal-message ${message.includes('Welcome') || message.includes('successful') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleJoinSubmit}>
              <input
                type="text"
                className="modal-input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />

              <input
                type="email"
                className="modal-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />

              <textarea
                className="modal-input"
                placeholder="Why do you want to join? (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={loading}
                rows={3}
                style={{ resize: 'none', fontFamily: 'Inter, sans-serif' }}
              />

              <div className="modal-buttons">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={loading || !email || !name}
                >
                  {loading ? 'Joining...' : 'Join Now'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary flex-1"
                  disabled={loading}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chatbot Widget */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-green-400 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center z-40 cursor-pointer"
          title="Chat with us"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          {/* Chat Modal - Fixed and Properly Structured */}
          <div className="fixed bottom-6 right-6 w-96 h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col z-40 overflow-hidden border border-gray-200">
            {/* Header - Fixed Height */}
            <div className="h-16 px-6 py-4 flex justify-between items-center border-b border-gray-100 flex-shrink-0 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="font-bold text-base text-gray-800">SFE Foundry Assistant</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Container - Takes remaining space */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="space-y-3">
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="break-words">{msg.content}</p>
                    </div>
                  </div>

                  {/* Suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-col gap-2 justify-start pl-2">
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
                          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition border border-gray-200 text-left"
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
                  <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-2xl text-sm">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input Area - Fixed at bottom */}
            <form
              onSubmit={handleChatSubmit}
              data-chat-form
              className="h-20 px-4 py-3 border-t border-gray-100 flex gap-2 items-center flex-shrink-0 bg-white"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
                disabled={chatLoading}
              />
              <button
                type="submit"
                className="w-10 h-10 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-full flex items-center justify-center transition flex-shrink-0"
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

      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`
        }}
      />
    </div>
  );
}
