
import { NextResponse } from 'next/server';
import { agregarFilaSheet } from '@/utils/google-sheets';

export const runtime = 'nodejs'; // Ensure it runs on Node.js runtime

// Helper to set CORS headers
function setCorsHeaders(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins (or restrict to your GitHub Pages domain)
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}

export async function OPTIONS() {
  const res = NextResponse.json({}, { status: 200 });
  return setCorsHeaders(res);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate body structure if needed, for now passing directly to utility
    const resultado = await agregarFilaSheet(body);

    if (!resultado.exito) {
      throw new Error(resultado.error);
    }

    const res = NextResponse.json({ exito: true });
    return setCorsHeaders(res);
  } catch (error) {
    console.error('Error al guardar cálculo ROI (API):', error);
    const res = NextResponse.json(
      { exito: false, error: 'Error al guardar datos' },
      { status: 500 }
    );
    return setCorsHeaders(res);
  }
}
