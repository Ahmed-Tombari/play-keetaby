'use client';
import { useState } from 'react';
import { ALL_LETTERS } from '@/components/kids/letters';

export default function DebugPage() {
  const [idx, setIdx] = useState(0);
  const letter = ALL_LETTERS[idx]!;

  // The reference images are 1430×780 but we render at fixed width
  const IMG_W = 1430;
  const IMG_H = 780;
  // The letter occupies roughly the center third of the image
  // We'll overlay the SVG centered on the middle copy

  return (
    <div style={{ background: '#1a1a2e', minHeight: '100vh', padding: 24, color: '#fff', fontFamily: 'monospace' }}>
      <h1 style={{ marginBottom: 16 }}>Letter Path Debug — {letter.arabicName} ({letter.id})</h1>

      <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}
          style={{ padding: '6px 16px', background: '#7c3aed', border: 'none', color: '#fff', borderRadius: 6, cursor: 'pointer', opacity: idx === 0 ? 0.4 : 1 }}>
          ← Prev
        </button>
        <span style={{ padding: '6px 16px' }}>{idx + 1} / {ALL_LETTERS.length}</span>
        <button onClick={() => setIdx(i => Math.min(ALL_LETTERS.length - 1, i + 1))} disabled={idx === ALL_LETTERS.length - 1}
          style={{ padding: '6px 16px', background: '#7c3aed', border: 'none', color: '#fff', borderRadius: 6, cursor: 'pointer', opacity: idx === ALL_LETTERS.length - 1 ? 0.4 : 1 }}>
          Next →
        </button>
      </div>

      {/* Reference image with SVG overlay side by side */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>

        {/* Reference image */}
        <div style={{ flex: 1 }}>
          <p style={{ marginBottom: 4, opacity: 0.6 }}>Reference image ({letter.id}.png)</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/assets/letters/${letter.id}.png`}
            alt={letter.arabicName}
            style={{ width: '100%', maxWidth: 600, border: '2px solid #7c3aed', borderRadius: 8 }}
          />
        </div>

        {/* SVG path preview */}
        <div style={{ flex: 1 }}>
          <p style={{ marginBottom: 4, opacity: 0.6 }}>Current SVG path(s)</p>
          <div style={{ background: '#fff', borderRadius: 8, border: '2px solid #7c3aed', padding: 8 }}>
            <svg viewBox={letter.viewBox} style={{ width: '100%', maxWidth: 400, height: 'auto', display: 'block', margin: '0 auto' }}>
              {letter.strokes.map((d, i) => (
                <g key={i}>
                  {/* tube */}
                  <path d={d} fill="none" stroke="#1a1a1a" strokeWidth={56} strokeLinecap="round" strokeLinejoin="round" />
                  <path d={d} fill="none" stroke="#fff" strokeWidth={46} strokeLinecap="round" strokeLinejoin="round" />
                  {/* guide */}
                  <path d={d} fill="none" stroke="#333" strokeWidth={3} strokeDasharray="12 12" strokeLinecap="round" />
                </g>
              ))}
            </svg>
          </div>
          <details style={{ marginTop: 8 }}>
            <summary style={{ cursor: 'pointer', opacity: 0.7 }}>Show path data</summary>
            <pre style={{ marginTop: 4, background: '#111', padding: 12, borderRadius: 6, fontSize: 11, overflowX: 'auto' }}>
              viewBox: {letter.viewBox}{'\n\n'}
              {letter.strokes.map((s, i) => `stroke[${i}]:\n${s}`).join('\n\n')}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
}
