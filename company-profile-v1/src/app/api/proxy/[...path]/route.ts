import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join('/');
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const url = `${API_BASE}/api/${path}${req.nextUrl.search}`;

  const forwardHeaders = new Headers();
  // Copy relevant headers
  const contentType = req.headers.get('content-type');
  if (contentType) {
    forwardHeaders.set('content-type', contentType);
  }
  const accept = req.headers.get('accept');
  if (accept) {
    forwardHeaders.set('accept', accept);
  }

  if (token) {
    forwardHeaders.set('Authorization', `Bearer ${token}`);
  }

  // Next.js Request body is a stream or null
  const body = (req.method !== 'GET' && req.method !== 'HEAD') ? req.body : undefined;

  try {
    const res = await fetch(url, {
      method: req.method,
      headers: forwardHeaders,
      body: body as any,
      // @ts-ignore
      duplex: 'half'
    });

    const resBody = await res.arrayBuffer();

    const responseHeaders = new Headers();
    const outContentType = res.headers.get('content-type');
    if (outContentType) {
      responseHeaders.set('content-type', outContentType);
    }

    return new NextResponse(resBody, {
      status: res.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
