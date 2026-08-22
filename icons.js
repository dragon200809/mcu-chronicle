/* ===========================================================
   ICONS
   - UI icons: minimal hand-drawn SVGs (check, chevron, etc.)
   - EMBLEMS: original abstract geometric marks loosely themed
     to a part of the MCU (an arc-style ring cluster, a web of
     radiating lines, twin curved "horn" strokes, etc.). These
     are entirely original shapes — not traced from, or a copy
     of, any character's actual costume, logo, or likeness —
     used purely as decorative color accents.
=========================================================== */

const Icon = {
  check: () => `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  chevron: () => `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  film: () => `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
  tv: () => `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  sparkle: () => `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>`,
  star: (fill) => `<svg viewBox="0 0 24 24" width="11" height="11" fill="${fill ? '#F2C230' : 'none'}" stroke="#F2C230" stroke-width="1.5"><polygon points="12 2 15 9 22 9.5 16.5 14.5 18.5 22 12 18 5.5 22 7.5 14.5 2 9.5 9 9"/></svg>`,
  flame: () => `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17a2.5 2.5 0 0 0 2.5-2.5c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7.5 7.5 0 1 1-15 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  trophy: () => `<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3a2 2 0 0 1-2 4M7 5H4a2 2 0 0 0 2 4"/></svg>`,
  lock: () => `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
};

const Emblem = {
  reactor: (c) => `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="${c}" stroke-width="1.4"/><circle cx="20" cy="20" r="10" fill="none" stroke="${c}" stroke-width="1.4"/><circle cx="20" cy="20" r="4" fill="${c}"/></svg>`,
  burst: (c) => `<svg viewBox="0 0 40 40">${Array.from({length:8}).map((_,i)=>{const a=(i*Math.PI)/4;const x1=20+Math.cos(a)*8,y1=20+Math.sin(a)*8,x2=20+Math.cos(a)*17,y2=20+Math.sin(a)*17;return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`}).join('')}<circle cx="20" cy="20" r="6" fill="${c}"/></svg>`,
  web: (c) => `<svg viewBox="0 0 40 40">${Array.from({length:6}).map((_,i)=>{const a=(i*Math.PI)/3;const x2=20+Math.cos(a)*17,y2=20+Math.sin(a)*17;return `<line x1="20" y1="20" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1.2"/>`}).join('')}<circle cx="20" cy="20" r="6" fill="none" stroke="${c}" stroke-width="1.2"/><circle cx="20" cy="20" r="11" fill="none" stroke="${c}" stroke-width="1.2"/></svg>`,
  diamond: (c) => `<svg viewBox="0 0 40 40"><polygon points="20,5 32,20 20,35 8,20" fill="none" stroke="${c}" stroke-width="1.6"/><polygon points="20,13 26,20 20,27 14,20" fill="${c}" opacity="0.5"/></svg>`,
  rings: (c) => `<svg viewBox="0 0 40 40"><circle cx="16" cy="18" r="11" fill="none" stroke="${c}" stroke-width="1.4"/><circle cx="24" cy="22" r="11" fill="none" stroke="${c}" stroke-width="1.4" opacity="0.6"/></svg>`,
  hex: (c) => `<svg viewBox="0 0 40 40"><polygon points="20,4 34,12 34,28 20,36 6,28 6,12" fill="none" stroke="${c}" stroke-width="1.6"/><circle cx="20" cy="20" r="5" fill="${c}"/></svg>`,
  horns: (c) => `<svg viewBox="0 0 40 40"><path d="M14 30 Q6 16 16 6" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/><path d="M26 30 Q34 16 24 6" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  crescent: (c) => `<svg viewBox="0 0 40 40"><path d="M26 6a15 15 0 1 0 0 28 12 12 0 1 1 0-28z" fill="${c}" opacity="0.85"/></svg>`,
  shard: (c) => `<svg viewBox="0 0 40 40"><polygon points="20,4 30,16 24,36 16,36 10,16" fill="none" stroke="${c}" stroke-width="1.6"/><line x1="20" y1="4" x2="20" y2="36" stroke="${c}" stroke-width="1" opacity="0.6"/></svg>`,
};
