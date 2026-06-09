'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

type HistoryData = { year: number; volume_sold: number };

export default function ProductSalesChart({ histories }: { histories: HistoryData[] }) {
  if (!histories || histories.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
        <p style={{ color: 'var(--color-stone)' }}>Belum ada data riwayat penjualan untuk produk ini.</p>
      </div>
    );
  }

  // Urutkan berdasarkan tahun agar runtut
  const sortedData = [...histories].sort((a, b) => a.year - b.year);

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-espresso)', marginBottom: '1.5rem' }}>
        Performa Penjualan Tahunan (Tonase)
      </h3>
      <div style={{ width: '100%', height: '350px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={300}>
          <BarChart
            data={sortedData}
            margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
            barSize={45}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} dx={-10} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
              formatter={(value) => [`${value} Ton`, 'Total Distribusi']}
              labelStyle={{ fontWeight: 800, color: 'var(--color-espresso)', marginBottom: '6px' }}
              itemStyle={{ color: '#d97706', fontWeight: 600 }}
            />
            {/* Warna Gold/Amber untuk batang agar kontras dengan hijau brand */}
            <Bar dataKey="volume_sold" fill="#d97706" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
