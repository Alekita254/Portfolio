import React, { memo, useEffect, useRef, useState } from 'react';
import identity from '../../config/identity';

/* ------------------------------------------------------------------ */
/*  Keyboard layout (each row totals 15 "units" so the edges line up)  */
/* ------------------------------------------------------------------ */
const chars = (s) => s.split('').map((l) => ({ l }));
const mod = (l, f = 1) => ({ l, f, mod: true });

const KEY_ROWS = [
  {
    short: true,
    keys: ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'pwr'].map((l) => mod(l, 1.07)),
  },
  { keys: [...chars('`1234567890-='), mod('delete', 2)] },
  { keys: [mod('tab', 1.5), ...chars('qwertyuiop[]'), { l: '\\', f: 1.5 }] },
  { keys: [mod('caps', 1.75), ...chars("asdfghjkl;'"), mod('return', 2.25)] },
  { keys: [mod('shift', 2.25), ...chars('zxcvbnm,./'), mod('shift', 2.75)] },
  {
    keys: [mod('fn'), mod('ctrl'), mod('opt', 1.2), mod('cmd', 1.3), mod('', 5), mod('cmd', 1.3), mod('opt', 1.2), mod('◀'), mod('▼'), mod('▶')],
  },
];

// Only letter/number keys "type" on their own
const LIVE_KEYS = KEY_ROWS.flatMap((row, r) =>
  row.keys.map((k, i) => (k.mod ? null : `${r}-${i}`)).filter(Boolean)
);

const Keyboard = memo(function Keyboard({ activeKey }) {
  return (
    <div className="lp-keys">
      {KEY_ROWS.map((row, r) => (
        <div key={r} className={'lp-row' + (row.short ? ' lp-row-short' : '')}>
          {row.keys.map((k, i) => {
            const id = `${r}-${i}`;
            return (
              <span
                key={id}
                style={{ flex: `${k.f || 1} 1 0%` }}
                className={'lp-key' + (k.mod ? ' lp-mod' : '') + (id === activeKey ? ' lp-key-on' : '')}
              >
                {k.l}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
});

/* ------------------------------------------------------------------ */
/*  Live terminal text                                                 */
/* ------------------------------------------------------------------ */
const TERMINAL_LINES = ['$ whoami', 'alex — full stack & ai engineer', '$ ./start --workspace'];
const TYPE_TOTAL = TERMINAL_LINES.reduce((n, l) => n + l.length, 0);
const HOLD_TICKS = 28; // pause once everything is typed

function typedLines(tick) {
  let left = Math.min(tick, TYPE_TOTAL);
  return TERMINAL_LINES.map((line) => {
    const shown = line.slice(0, Math.max(0, left));
    left -= line.length;
    return shown;
  }).filter((s) => s.length > 0);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Laptop({ phase, onActivate, disabled }) {
  const isIdle = phase === 'workspace';
  const isActivating = phase === 'activating';
  const isZooming = phase === 'zooming';
  const isBooting = phase === 'booting';
  const isScreen = phase === 'screen' || isBooting;

  const tiltRef = useRef(null);
  const reducedMotion = useRef(false);

  const [now, setNow] = useState(() => new Date());
  const [tick, setTick] = useState(0);
  const [activeKey, setActiveKey] = useState(null);

  // Respect reduced-motion for the JS-driven effects
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Live clock
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(id);
  }, []);

  // Typewriter + "someone is typing" key presses
  useEffect(() => {
    if (reducedMotion.current) {
      setTick(TYPE_TOTAL);
      return undefined;
    }
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setTick(n > TYPE_TOTAL + HOLD_TICKS ? (n = 0) : n);
      if (n % 2 === 0) {
        setActiveKey(LIVE_KEYS[Math.floor(Math.random() * LIVE_KEYS.length)]);
      }
    }, 75);
    return () => clearInterval(id);
  }, []);

  // Mouse tilt (uses CSS variables, so no re-renders)
  const handleMove = (e) => {
    if (!isIdle || reducedMotion.current || !tiltRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current.style.setProperty('--rx', y.toFixed(3));
    tiltRef.current.style.setProperty('--ry', x.toFixed(3));
  };
  const handleLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.setProperty('--rx', '0');
    tiltRef.current.style.setProperty('--ry', '0');
  };

  const time = now ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';
  const date = now ? now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) : '';
  const lines = typedLines(tick);
  const lastIndex = lines.length - 1;

  return (
    <button
      type="button"
      onClick={onActivate}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      disabled={disabled}
      aria-label="Activate laptop and enter Alex OS"
      style={{ perspective: '1400px' }}
      className={
        (disabled
          ? 'cursor-default '
          : 'cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black ') +
        'lp-btn group relative block w-[14rem] max-w-[92vw] sm:w-[18rem] md:w-[24rem] xl:w-[33rem] outline-none'
      }
    >
      <div className="lp-root" data-phase={phase}>
        <div className="lp-tilt" ref={tiltRef}>
          {/* ------------------------------ LID ------------------------------ */}
          <div className="lp-lid">
            <span className={'lp-cam' + (isIdle ? '' : ' lp-cam-on')} />
            <div className="lp-screen">
              <div className="lp-wall" />

              <div className="lp-content">
                <div className="lp-bar">
                  <span>{identity.osName}</span>
                  <span className="lp-bar-right">
                    <span>{identity.terminalPersona}</span>
                    <svg viewBox="0 0 24 24" width="1.6cqw" height="1.6cqw" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ width: '1.7cqw', height: '1.7cqw' }}>
                      <path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" />
                      <circle cx="12" cy="19.5" r="1" fill="currentColor" />
                    </svg>
                    <svg viewBox="0 0 28 14" width="2.6cqw" height="1.4cqw" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ width: '2.8cqw', height: '1.4cqw' }}>
                      <rect x="1" y="1" width="22" height="12" rx="3" />
                      <rect x="3" y="3" width="15" height="8" rx="1.5" fill="currentColor" stroke="none" />
                      <path d="M25 5v4" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>

                <div>
                  <div className="lp-time" suppressHydrationWarning>{time}</div>
                  <div className="lp-date" suppressHydrationWarning>{date}</div>
                  {isIdle && (
                    <div className="lp-hint">
                      <i /> Open Alex OS
                    </div>
                  )}
                  {isBooting && (
                    <div className="lp-boot" aria-hidden="true">
                      <b />
                    </div>
                  )}
                </div>

                <div className="lp-foot">
                  <div>
                    <div className="lp-name">Alex Murimi</div>
                    <div className="lp-role">Senior Software Engineer</div>
                    <div className="lp-tags">Full Stack Engineer • AI Engineer</div>
                  </div>
                  <div className="lp-term" aria-hidden="true">
                    {lines.map((line, i) => (
                      <div key={i}>
                        {line}
                        {i === lastIndex && <span className="lp-caret" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lp-glare" />
            </div>
          </div>

          {/* ------------------------------ BASE ----------------------------- */}
          <div className="lp-hinge" />
          <div className="lp-base">
            <div className="lp-shadow" />
            <div className="lp-deck">
              <span className="lp-spk lp-spk-l" />
              <span className="lp-spk lp-spk-r" />
              <div className="lp-well">
                <Keyboard activeKey={activeKey} />
              </div>
              <div className="lp-pad" />
              <div className="lp-front" />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}