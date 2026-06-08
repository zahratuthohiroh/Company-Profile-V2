'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Simpan token ke cookie (berlaku 1 hari)
        Cookies.set('admin_token', data.token, { expires: 1, secure: true });
        router.push('/admin');
      } else {
        setError(data.message || 'Login gagal, periksa kredensial Anda.');
      }
    } catch (err) {
      setError('Koneksi ke server gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'var(--font-sans), system-ui, sans-serif' }}>
      {/* Background Image dari Landing Page */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2,
      }} />
      {/* Overlay Gradien Elegan */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(14, 40, 24, 0.85) 0%, rgba(27, 67, 50, 0.65) 100%)',
        zIndex: -1,
      }} />

      {/* Glassmorphism Card */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        backdropFilter: 'blur(16px)', 
        WebkitBackdropFilter: 'blur(16px)',
        padding: '48px 40px', 
        borderRadius: '24px', 
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)', 
        maxWidth: '420px', 
        width: '100%', 
        border: '1px solid rgba(255, 255, 255, 0.2)', 
        position: 'relative', 
        zIndex: 1 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 700, color: 'white', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>
            Portal Admin
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', fontWeight: 300, margin: 0 }}>
            Manajemen Internal Ugi Cahaya Mentari
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(254, 226, 226, 0.9)', color: '#991b1b', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', border: '1px solid #fca5a5' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginBottom: '10px', letterSpacing: '0.5px' }}>Email Akses</label>
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
              style={{ 
                width: '100%', padding: '14px 16px', borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.3)', 
                background: 'rgba(255,255,255,0.05)', 
                fontSize: '1rem', color: 'white', outline: 'none',
                transition: 'all 0.3s ease'
              }} 
              placeholder="Masukkan Username Anda"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginBottom: '10px', letterSpacing: '0.5px' }}>Kata Sandi</label>
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
              style={{ 
                width: '100%', padding: '14px 16px', borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.3)', 
                background: 'rgba(255,255,255,0.05)', 
                fontSize: '1rem', color: 'white', outline: 'none',
                transition: 'all 0.3s ease'
              }} 
              placeholder="Masukkan Password Anda"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              backgroundColor: 'white', 
              color: '#1b4332', 
              padding: '16px', 
              border: 'none', 
              borderRadius: '12px', 
              fontWeight: 700, 
              fontSize: '1.05rem', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              marginTop: '12px', 
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? 'Memverifikasi Kredensial...' : 'Masuk ke Dasbor'}
          </button>
        </form>
      </div>

      {/* Styles for placeholder text */}
      <style>{`
        input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        input:focus {
          background: rgba(255, 255, 255, 0.15) !important;
          border-color: rgba(255, 255, 255, 0.6) !important;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
