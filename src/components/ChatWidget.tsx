'use client';

import { useEffect, useState } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
}

export default function ChatWidget() {
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hey! What do you wanna know about SFE Foundry?',
      suggestions: ['Tell me about SFE Foundry', 'How do I join?', 'How do I ship a project?', 'About ratings'],
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const c = document.querySelector('[data-chat-messages]');
    if (c) setTimeout(() => { c.scrollTop = c.scrollHeight; }, 100);
  }, [chatMessages]);

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
        body: JSON.stringify({ messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      if (res.ok) {
        const lastAssistant = [...chatMessages].reverse().find((m) => m.role === 'assistant');
        const isRepeat = lastAssistant && lastAssistant.content.trim() === String(data.content).trim();
        const asked = new Set(updatedMessages.filter((m) => m.role === 'user').map((m) => m.content.trim().toLowerCase()));
        const fresh = (data.suggestions || []).filter((s: string) => !asked.has(s.trim().toLowerCase()));
        const assistantMsg: ChatMessage = isRepeat
          ? { role: 'assistant', content: 'I think I already covered that! Is there anything else I can help you with?', suggestions: ['How do I join?', 'How do I ship a project?', 'About ratings'] }
          : { role: 'assistant', content: data.content, suggestions: fresh.length ? fresh : ['Anything else I can help with?'] };
        setChatMessages([...updatedMessages, assistantMsg]);
      } else {
        setChatMessages([...updatedMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
      }
    } catch {
      setChatMessages([...updatedMessages, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again." }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <>
      {!showChat && (
        <button onClick={() => setShowChat(true)} className="chat-fab" title="Chat with us" aria-label="Open chat">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {showChat && (
        <>
          <div className="fixed inset-0 bg-black/20 z-50" onClick={() => setShowChat(false)} />
          <div
            className="fixed bg-white rounded-3xl shadow-2xl flex flex-col z-[60] overflow-hidden border border-slate-200"
            style={{ bottom: 16, right: 16, left: 'auto', width: 'min(384px, calc(100vw - 32px))', height: 'min(560px, calc(100dvh - 32px))' }}
          >
            <div className="px-6 py-4 flex justify-between items-center flex-shrink-0 border-b border-slate-100" style={{ background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)' }}>
              <h3 className="font-extrabold text-lg leading-tight" style={{ color: '#0F2A5C', fontFamily: 'Outfit, sans-serif' }}>SFE Foundry<br />Assistant</h3>
              <button onClick={() => setShowChat(false)} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#2563EB' }} title="Minimize">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 bg-white" data-chat-messages>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="space-y-3">
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`px-5 py-4 text-[15px] leading-relaxed ${msg.role === 'user' ? 'text-white rounded-3xl rounded-br-lg shadow-md max-w-[80%]' : 'bg-white text-slate-800 rounded-3xl rounded-tl-lg shadow-sm border border-slate-200 w-full'}`}
                      style={msg.role === 'user' ? { background: '#2563EB' } : undefined}
                    >
                      <p className="break-words">{msg.content}</p>
                    </div>
                  </div>
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-col gap-2.5">
                      {msg.suggestions.map((s, sidx) => (
                        <button
                          key={sidx}
                          onClick={() => {
                            setChatInput(s);
                            setTimeout(() => {
                              const form = document.querySelector('form[data-chat-form]');
                              if (form) form.dispatchEvent(new Event('submit', { bubbles: true }));
                            }, 50);
                          }}
                          className="w-full px-5 py-3.5 bg-white text-slate-700 rounded-full text-[15px] hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#93C5FD] transition border border-slate-200 text-left shadow-sm font-medium"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-400 px-5 py-3 rounded-3xl rounded-tl-lg text-sm shadow-sm border border-slate-200">Typing…</div>
                </div>
              )}
            </div>

            <form onSubmit={handleChatSubmit} data-chat-form className="px-4 py-4 border-t border-slate-100 flex gap-2.5 items-center flex-shrink-0 bg-white">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Message…" className="flex-1 px-5 py-3.5 bg-white rounded-full text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] border border-slate-200 shadow-sm" disabled={chatLoading} />
              <button type="submit" className="w-12 h-12 disabled:opacity-40 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md hover:brightness-110" style={{ background: '#2563EB' }} disabled={chatLoading || !chatInput.trim()}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" /></svg>
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
