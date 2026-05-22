import { NextResponse } from 'next/server';

const DB_URL = 'https://api.restful-api.dev/objects/ff8081819d82fab6019e5032e06d6a18';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const visitor = {
      id: Date.now().toString(),
      name: data.name,
      age: data.age,
      timestamp: new Date().toISOString()
    };
    
    // Fetch current data
    const getRes = await fetch(DB_URL);
    const currentDb = await getRes.json();
    const users = currentDb?.data?.users || [];
    
    users.push(visitor);
    
    // Update data
    await fetch(DB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: "LauraVisitors", data: { users } })
    });

    return NextResponse.json({ success: true, visitor });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer admin-laura-2026`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const getRes = await fetch(DB_URL, { cache: 'no-store' });
    const currentDb = await getRes.json();
    return NextResponse.json(currentDb?.data?.users || []);
  } catch (e) {
    return NextResponse.json([]);
  }
}
