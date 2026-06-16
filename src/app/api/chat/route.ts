import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    const assistantMessage = response.content[0];

    if (assistantMessage.type !== 'text') {
      return NextResponse.json(
        { error: 'Unexpected response type' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: assistantMessage.text,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
