import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      // Set HttpOnly cookie
      (await cookies()).set('admin_token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 hari
        path: '/',
      });

      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: data.message || 'Login gagal, periksa kredensial Anda.' },
        { status: res.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: 'Koneksi ke server gagal.' }, { status: 500 });
  }
}
