import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '{AUTH}
    },
    body: JSON.stringify(body)
  };

  try {
    const response = await fetch('https://api.{AWS}/v1/generate-music', options);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate music' }, { status: 500 });
  }
}