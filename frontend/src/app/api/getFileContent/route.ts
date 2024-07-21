import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('fileName');

  if (!fileName) {
    return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'src', fileName);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    return NextResponse.json({ content: fileContent }, { status: 200 });
  } catch (error) {
    console.error('Error reading file content:', error);
    return NextResponse.json({ error: 'Failed to read file content' }, { status: 500 });
  }
}
