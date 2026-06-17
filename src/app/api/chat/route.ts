import { NextRequest, NextResponse } from 'next/server';
import { findMatchingResponse } from './saved-responses';

function generateSuggestions(response: string, messages: any[]): string[] {
  const suggestions: string[] = [];

  // Context-aware suggestions based on conversation
  const lastUserMessage = messages
    .slice()
    .reverse()
    .find((m: any) => m.role === 'user')?.content.toLowerCase() || '';

  if (response.includes('join') || lastUserMessage.includes('join')) {
    if (!suggestions.includes('What\'s the membership process?')) {
      suggestions.push('What\'s the membership process?');
    }
  }

  if (response.includes('event') || lastUserMessage.includes('event')) {
    if (!suggestions.includes('When is the next event?')) {
      suggestions.push('When is the next event?');
    }
  }

  if (response.includes('competition') || response.includes('hackathon')) {
    if (!suggestions.includes('How do I register for an event?')) {
      suggestions.push('How do I register for an event?');
    }
  }

  if (response.includes('startup') || response.includes('entrepreneurship')) {
    if (!suggestions.includes('Tell me about the pitch competition')) {
      suggestions.push('Tell me about the pitch competition');
    }
  }

  // Default suggestions if none were added
  if (suggestions.length === 0) {
    const defaultSuggestions = [
      'Tell me more',
      'What else should I know?',
      'How can I get involved?',
      'What\'s next?'
    ];
    return defaultSuggestions.slice(0, 3);
  }

  return suggestions.slice(0, 4);
}

const SYSTEM_PROMPT = `You are a casual, friendly chatbot for SFE Foundry, a student innovation club. Keep responses SHORT and CONVERSATIONAL - max 2-3 sentences. Sound like a real high school student, not an AI.

Quick facts about us:
- We're a community of student builders, founders, and hackers
- We run hackathons, pitch competitions, workshops, and mentorship
- Help students build cool projects and launch ideas

Keep it brief and chill. Be encouraging and have fun!

If something is out of scope, just say you're not sure and suggest emailing sfefoundery@gmail.com.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array required' },
        { status: 400 }
      );
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user' },
        { status: 400 }
      );
    }

    // Check for saved responses first
    const savedResponse = findMatchingResponse(lastMessage.content);
    if (savedResponse) {
      const suggestions = generateSuggestions(savedResponse.response, messages);
      return NextResponse.json({
        content: savedResponse.response,
        suggestions,
      });
    }

    // Friendly fallback shown when the AI is unavailable (no key / rate-limited / error)
    const fallback = (note?: string) =>
      NextResponse.json({
        content:
          (note ? note + ' ' : '') +
          "I can't answer that one right now, but I'd love to help! You can email us at sfefoundery@gmail.com, or ask me about joining, events, or hackathons.",
        suggestions: ['How do I join?', 'What events do you host?', 'About hackathons'],
      });

    // If no saved response, use AI
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return fallback();
    }

    // Use the REST API directly with available models
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // Convert messages to Gemini REST format
    const contents = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const requestBody = {
      contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      // Gracefully degrade instead of surfacing a scary error in the chat UI
      return fallback();
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, I could not generate a response.';

    // Generate suggestions based on the response
    const suggestions = generateSuggestions(text, messages);

    return NextResponse.json({
      content: text,
      suggestions,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({
      content:
        "Sorry, I'm having a little trouble right now. You can reach the team at sfefoundery@gmail.com, or ask me about joining, events, or hackathons.",
      suggestions: ['How do I join?', 'What events do you host?', 'About hackathons'],
    });
  }
}
