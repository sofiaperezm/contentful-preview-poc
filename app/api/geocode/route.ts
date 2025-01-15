import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { lat, lon } = await request.json();

    const apiKey = process.env.OPENCAGE_API_KEY;
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      return NextResponse.json({ address: data.results[0].formatted });
    } else {
      return NextResponse.json({ error: 'No address found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch address' }, { status: 500 });
  }
}
