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

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const date = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
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
        'lp-btn group relative block w-[18rem] sm:w-[24rem] md:w-[28rem] xl:w-[33rem] outline-none'
      }
    >
      <style>{CSS}</style>

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
                  <div className="lp-time">{time}</div>
                  <div className="lp-date">{date}</div>
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

/* ------------------------------------------------------------------ */
/*  Styles. Everything is sized in cqw so the laptop scales perfectly  */
/*  with whatever width the button gets.                               */
/* ------------------------------------------------------------------ */
const CSS = `
.lp-root{container-type:inline-size;width:100%}
.lp-tilt{
  transform:rotateX(calc(var(--rx,0)*-5deg)) rotateY(calc(var(--ry,0)*7deg));
  transition:transform .5s cubic-bezier(.2,.7,.2,1);
  will-change:transform;
}
.lp-root[data-phase="activating"] .lp-tilt{transform:translateY(-1%) scale(1.02)}
.lp-root[data-phase="zooming"] .lp-tilt,
.lp-root[data-phase="screen"] .lp-tilt,
.lp-root[data-phase="booting"] .lp-tilt{transform:scale(1.06)}

/* ---- lid ---- */
.lp-lid{
  position:relative;display:flex;aspect-ratio:16/10;
  padding:2cqw 2cqw 2.6cqw;
  border-radius:3.2cqw 3.2cqw .9cqw .9cqw;
  background:linear-gradient(180deg,#2b303b 0%,#13161d 40%,#07080b 100%);
  box-shadow:inset 0 0 0 .15cqw rgba(255,255,255,.14),0 0 0 .2cqw #000;
  transform-origin:50% 100%;
  transform:perspective(220cqw) rotateX(-6deg);
  transition:transform .6s cubic-bezier(.2,.7,.2,1);
}
.lp-btn:hover .lp-root[data-phase="workspace"] .lp-lid{transform:perspective(220cqw) rotateX(-3.5deg)}
.lp-root[data-phase="activating"] .lp-lid{transform:perspective(220cqw) rotateX(-2deg)}
.lp-root[data-phase="zooming"] .lp-lid,
.lp-root[data-phase="screen"] .lp-lid,
.lp-root[data-phase="booting"] .lp-lid{transform:perspective(220cqw) rotateX(0deg)}

.lp-cam{position:absolute;top:.85cqw;left:50%;width:.8cqw;height:.8cqw;margin-left:-.4cqw;border-radius:50%;background:#05070a;box-shadow:0 0 0 .18cqw #1a1e27;transition:background .4s,box-shadow .4s}
.lp-cam-on{background:#34d399;box-shadow:0 0 0 .18cqw #1a1e27,0 0 1.2cqw #34d399}

/* ---- screen ---- */
.lp-screen{
  position:relative;flex:1;overflow:hidden;border-radius:1.4cqw;background:#030406;
  box-shadow:0 0 0 .12cqw rgba(255,255,255,.08),0 0 0 rgba(16,185,129,0);
  transition:box-shadow .6s;
}
.lp-btn:hover .lp-root[data-phase="workspace"] .lp-screen{box-shadow:0 0 0 .12cqw rgba(255,255,255,.08),0 0 6cqw rgba(16,185,129,.22)}
.lp-root[data-phase="activating"] .lp-screen{box-shadow:0 0 0 .12cqw rgba(255,255,255,.1),0 0 8cqw rgba(59,130,246,.3)}
.lp-root[data-phase="zooming"] .lp-screen,
.lp-root[data-phase="screen"] .lp-screen,
.lp-root[data-phase="booting"] .lp-screen{box-shadow:0 0 0 .12cqw rgba(255,255,255,.12),0 0 10cqw rgba(255,255,255,.2)}

.lp-wall{
  position:absolute;inset:0;opacity:.35;transition:opacity .6s;
  background:
    radial-gradient(120% 80% at 15% 0%,rgba(16,185,129,.55),transparent 55%),
    radial-gradient(90% 70% at 100% 100%,rgba(59,130,246,.35),transparent 60%),
    #05070a;
}
.lp-btn:hover .lp-root[data-phase="workspace"] .lp-wall{opacity:.55}
.lp-root[data-phase="activating"] .lp-wall{opacity:.8}
.lp-root[data-phase="zooming"] .lp-wall,
.lp-root[data-phase="screen"] .lp-wall,
.lp-root[data-phase="booting"] .lp-wall{opacity:1}

.lp-content{
  position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;
  padding:2cqw 2.8cqw 2.6cqw;color:#e9f0f3;text-align:left;
  font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  opacity:.6;transition:opacity .6s;
}
.lp-btn:hover .lp-root[data-phase="workspace"] .lp-content{opacity:.85}
.lp-root[data-phase="activating"] .lp-content{opacity:.95}
.lp-root[data-phase="zooming"] .lp-content,
.lp-root[data-phase="screen"] .lp-content,
.lp-root[data-phase="booting"] .lp-content{opacity:1}

.lp-bar{display:flex;justify-content:space-between;align-items:center;font-size:1.25cqw;letter-spacing:.06em;color:rgba(233,240,243,.72)}
.lp-bar-right{display:flex;align-items:center;gap:1.1cqw}
.lp-time{font-size:9.5cqw;font-weight:200;line-height:1;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.lp-date{margin-top:.8cqw;font-size:1.6cqw;color:rgba(233,240,243,.62)}
.lp-hint{
  display:inline-flex;align-items:center;gap:.9cqw;margin-top:1.8cqw;padding:.8cqw 1.5cqw;
  font-size:1.4cqw;border-radius:99cqw;background:rgba(255,255,255,.08);border:.12cqw solid rgba(255,255,255,.14);
}
.lp-hint i{width:.9cqw;height:.9cqw;border-radius:50%;background:#34d399;animation:lp-pulse 1.8s ease-in-out infinite}
.lp-boot{margin-top:2.2cqw;width:26cqw;height:.5cqw;border-radius:9cqw;background:rgba(255,255,255,.14);overflow:hidden}
.lp-boot b{display:block;height:100%;transform-origin:left;background:#6ee7b7;animation:lp-boot 1.6s ease-out forwards}

.lp-foot{display:flex;justify-content:space-between;align-items:flex-end;gap:2cqw}
.lp-name{font-size:2.7cqw;font-weight:600;letter-spacing:-.01em}
.lp-role{margin-top:.4cqw;font-size:1.6cqw;color:rgba(233,240,243,.75)}
.lp-tags{margin-top:.9cqw;font-size:1.2cqw;color:#a7f3d0;letter-spacing:.08em}
.lp-term{
  min-width:38%;min-height:6.4cqw;padding:1cqw 1.3cqw;border-radius:.9cqw;
  background:rgba(0,0,0,.42);border:.12cqw solid rgba(255,255,255,.08);
  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:1.3cqw;line-height:1.55;color:#6ee7b7;
  white-space:nowrap;overflow:hidden;
}
.lp-caret{display:inline-block;width:.6cqw;height:1.3cqw;margin-left:.3cqw;vertical-align:text-bottom;background:#6ee7b7;animation:lp-blink 1s steps(1) infinite}

.lp-glare{
  position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.09) 45%,transparent 60%) no-repeat;
  background-size:260% 100%;
  background-position:calc(50% + var(--ry,0) * -90%) 0;
}

/* ---- hinge ---- */
.lp-hinge{
  position:relative;z-index:2;width:86%;height:1.1cqw;margin:0 auto -.55cqw;
  border-radius:0 0 .9cqw .9cqw;background:linear-gradient(180deg,#07080b,#2b2f37 60%,#14171c);
}

/* ---- base ---- */
.lp-base{position:relative;aspect-ratio:100/27;perspective:220cqw}
.lp-shadow{position:absolute;left:6%;right:6%;bottom:-3cqw;height:6cqw;border-radius:50%;background:rgba(0,0,0,.55);filter:blur(2.6cqw)}
.lp-deck{
  position:absolute;top:0;left:0;width:100%;aspect-ratio:100/66;
  padding:3cqw 4.2cqw;border-radius:1.5cqw 1.5cqw 3cqw 3cqw;
  background:linear-gradient(180deg,#d3d6db 0%,#a2a8b1 30%,#727882 100%);
  box-shadow:inset 0 0 0 .2cqw rgba(255,255,255,.22),0 3cqw 6cqw rgba(0,0,0,.35);
  transform-origin:top center;transform:rotateX(66deg);transform-style:preserve-3d;
}
.lp-deck::after{
  content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:.15;transition:opacity .6s;
  background:radial-gradient(70% 45% at 50% 0%,rgba(110,231,183,.4),transparent 70%);
}
.lp-root[data-phase="activating"] .lp-deck::after,
.lp-root[data-phase="zooming"] .lp-deck::after,
.lp-root[data-phase="screen"] .lp-deck::after,
.lp-root[data-phase="booting"] .lp-deck::after{opacity:.8}

.lp-well{position:relative;padding:1cqw;border-radius:1cqw;background:linear-gradient(180deg,#07090d,#0d1016);box-shadow:inset 0 .2cqw .6cqw rgba(0,0,0,.85),0 .15cqw 0 rgba(255,255,255,.35)}
.lp-keys{display:grid;gap:.6cqw}
.lp-row{display:flex;gap:.6cqw;height:5.2cqw}
.lp-row-short{height:3.2cqw}
.lp-key{
  min-width:0;display:flex;align-items:center;justify-content:center;border-radius:.6cqw;
  font-family:ui-sans-serif,system-ui,sans-serif;font-size:1.3cqw;line-height:1;text-transform:lowercase;
  color:rgba(110,231,183,.6);text-shadow:0 0 .8cqw rgba(16,185,129,.6);
  background:linear-gradient(180deg,#242938,#0f121a);
  box-shadow:inset 0 .12cqw 0 rgba(255,255,255,.09),0 .2cqw .3cqw rgba(0,0,0,.55);
  transition:transform 90ms,background 90ms,color 90ms,box-shadow 90ms;
}
.lp-key.lp-mod{font-size:.85cqw;color:rgba(180,190,205,.45);text-shadow:none}
.lp-key-on{
  transform:translateY(.2cqw) scale(.95);color:#d1fae5;
  background:linear-gradient(180deg,#14584a,#0b2b25);
  box-shadow:inset 0 0 1cqw rgba(52,211,153,.6),0 0 1.8cqw rgba(16,185,129,.6);
}
.lp-pad{
  width:36%;height:20cqw;margin:3.5cqw auto 0;border-radius:1.4cqw;
  background:linear-gradient(180deg,#8c919a,#a9aeb6);
  box-shadow:inset 0 0 0 .2cqw rgba(0,0,0,.22),inset 0 .3cqw .8cqw rgba(0,0,0,.25),0 .15cqw 0 rgba(255,255,255,.4);
}
.lp-spk{position:absolute;top:4cqw;width:2.2cqw;height:32cqw;background:radial-gradient(circle,rgba(0,0,0,.5) .17cqw,transparent .2cqw) 0 0/.7cqw .7cqw;opacity:.7}
.lp-spk-l{left:1cqw}
.lp-spk-r{right:1cqw}
/* front edge: a real face hanging down from the deck's near edge, so it always sits on the edge */
.lp-front{
  position:absolute;top:100%;left:3cqw;right:3cqw;height:1.7cqw;
  transform-origin:top center;transform:rotateX(-90deg);
  border-radius:0 0 1cqw 1cqw;
  background:linear-gradient(180deg,#9a9fa8,#555a64 55%,#2b2e35);
}
.lp-front::after{content:"";position:absolute;left:50%;top:0;width:14%;height:.6cqw;transform:translateX(-50%);border-radius:0 0 1cqw 1cqw;background:rgba(0,0,0,.4)}

@keyframes lp-blink{50%{opacity:0}}
@keyframes lp-pulse{0%,100%{opacity:.45}50%{opacity:1}}
@keyframes lp-boot{from{transform:scaleX(0)}to{transform:scaleX(1)}}

@media (prefers-reduced-motion: reduce){
  .lp-root *,.lp-root{animation:none!important;transition:none!important}
}
`