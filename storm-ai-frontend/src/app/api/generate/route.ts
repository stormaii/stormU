import { NextResponse } from 'next/server';

// Helper function to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: Request) {
  try {
    const { topic, keywords } = await request.json();

    console.log('API Route: Received request for content generation:');
    console.log('Topic:', topic);
    console.log('Keywords:', keywords);

    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return NextResponse.json(
        { error: 'Topic is required and must be a non-empty string.' },
        { status: 400 }
      );
    }

    if (keywords && typeof keywords !== 'string') {
      return NextResponse.json(
        { error: 'Keywords must be a string if provided.' },
        { status: 400 }
      );
    }

    // Simulate AI content generation (placeholder)
    await delay(1000); // Simulate network/processing delay

    let generatedText = `This is AI-generated placeholder content from the Next.js API route for the topic: "${topic}".`;
    if (keywords && keywords.trim() !== '') {
      generatedText += `\nRelevant keywords provided were: "${keywords}".`;
    }
    generatedText += `\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec sollicitudin molestie malesuada. This content is now served from a Vercel-compatible API route.`;

    console.log('API Route: Sending generated content to client.');
    return NextResponse.json({ content: generatedText });

  } catch (error: any) {
    console.error('API Route: Error generating content:', error.message);
    return NextResponse.json(
      { error: 'Failed to generate content due to an internal server error.' },
      { status: 500 }
    );
  }
}

// Optional: Handle other methods or provide a GET response for the route
export async function GET() {
  return NextResponse.json({ message: 'This is the generate API route. Use POST to generate content.' });
}
