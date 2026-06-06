'use client';

import { useEffect, useRef } from 'react';

type AnalyticsProps = {
  type: 'website_visit' | 'product_view';
  layanan_id?: number;
};

export default function AnalyticsTracker({ type, layanan_id }: AnalyticsProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    fetch('http://127.0.0.1:8000/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, layanan_id })
    }).catch(e => console.error('Analytics tracking failed', e));
  }, [type, layanan_id]);

  return null;
}
