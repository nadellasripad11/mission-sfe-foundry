import { NextRequest, NextResponse } from 'next/server';

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

If something is out of scope, just say you're not sure and suggest emailing hello@sfefoundry.com.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
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
      return NextResponse.json(
        { error: 'Failed to process chat message', details: data.error?.message || 'Unknown error' },
        { status: 500 }
      );
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
    return NextResponse.json(
      { error: 'Failed to process chat message', details: String(error) },
      { status: 500 }
    );
  }
}
