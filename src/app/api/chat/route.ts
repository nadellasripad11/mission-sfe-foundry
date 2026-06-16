import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a helpful and friendly chatbot for SFE Foundry, a student-led innovation and entrepreneurship club at Stanford.

About SFE Foundry:
- We are a community of student founders, hackers, and builders
- We host startup competitions, hackathons, workshops, and mentorship programs
- Our mission is to help students build, compete, and launch their ideas
- We have 500+ members, 100+ projects, and have helped students raise $1M+

You can help visitors with:
1. Information about SFE Foundry's mission, vision, and events
2. Details about joining the community
3. Questions about our hackathons, pitch competitions, and workshops
4. Guidance on starting projects and building with other students
5. General entrepreneurship and startup advice

Be concise, friendly, and encouraging. If asked about something outside your scope, politely redirect to relevant topics or suggest they email hello@sfefoundry.com for specific questions.`;

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
      generationConfig: {
        maxOutputTokens: 256,
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

    return NextResponse.json({
      content: text,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message', details: String(error) },
      { status: 500 }
    );
  }
}
