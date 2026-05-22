import { NextResponse } from 'next/server';

// In-memory store for serverless demo (resets on cold starts)
declare global {
  var visitors: any[];
}
global.visitors = global.visitors || [];

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const visitor = {
      id: Date.now().toString(),
      name: data.name,
      age: data.age,
      timestamp: new Date().toISOString()
    };
    global.visitors.push(visitor);
    return NextResponse.json({ success: true, visitor });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function GET(req: Request) {
  // Simple Basic Auth check
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer admin-laura-2026`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  return NextResponse.json(global.visitors);
}
