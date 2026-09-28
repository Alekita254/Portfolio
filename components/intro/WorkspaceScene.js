import React from 'react';
import identity from '../../config/identity';
import Laptop from './Laptop';
import IntroOverlay from './IntroOverlay';

// Tiny floating dust motes caught in the lamp light (positions are fixed so nothing re-randomises)
const DUST = [
  { l: 4, t: 10, s: 3, d: 0, u: 9 },
  { l: 18, t: 30, s: 2, d: 2, u: 12 },
  { l: 30, t: 6, s: 2, d: 5, u: 10 },
  { l: 42, t: 44, s: 3, d: 1, u: 14 },
  { l: 55, t: 20, s: 2, d: 7, u: 11 },
  { l: 66, t: 52, s: 2, d: 3, u: 13 },
  { l: 78, t: 12, s: 3, d: 6, u: 10 },
  { l: 88, t: 36, s: 2, d: 4, u: 15 },
];

const BOKEH = [
  { l: '12%', t: '58%', s: '16%', c: 'rgba(255,196,120,0.75)' },
  { l: '34%', t: '66%', s: '11%', c: 'rgba(120,200,255,0.65)' },
  { l: '55%', t: '52%', s: '18%', c: 'rgba(255,150,120,0.55)' },
  { l: '72%', t: '70%', s: '12%', c: 'rgba(160,255,220,0.6)' },
  { l: '84%', t: '48%', s: '10%', c: 'rgba(255,230,160,0.7)' },
];

export default function WorkspaceScene({ phase, reducedMotion, onActivate, onSkip, introSeen }) {
  const isTransitioning = phase !== 'workspace';
  const isZooming = phase === 'zooming';
  const isScreen = phase === 'screen' || phase === 'booting';

  // How strongly the laptop screen lights up the desk around it
  const spill = phase === 'workspace' ? 'opacity-40' : phase === 'activating' ? 'opacity-75' : 'opacity-100';

  const sceneStyle = reducedMotion
    ? undefined
    : {
        transformOrigin: '50% 45%',
        transform:
          phase === 'workspace'
            ? 'scale(1) translate3d(0, 0, 0)'
            : phase === 'activating'
              ? 'scale(1.04) translate3d(0, 0.5vh, 0)'
              : phase === 'zooming'
                ? 'scale(2.9) translate3d(0, 4vh, 0)'
                : 'scale(3.3) translate3d(0, 5vh, 0)',
      };

  return (
    <div className={(phase === 'booting' ? 'pointer-events-none opacity-0 ' : 'opacity-100 ') + 'ws-root absolute inset-0 overflow-hidden bg-[#040507] transition-opacity duration-300'}>
      <style>{CSS}</style>

      {/* ------------------------------ Room ambience ------------------------------ */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,41,59,0.42),transparent_35%),linear-gradient(180deg,#06070a_0%,#0a0b0f_45%,#050608_100%)]"></div>
      <div className="absolute right-[12%] top-[18%] h-[34%] w-[26%] bg-[radial-gradient(circle,rgba(255,214,153,0.1),transparent_68%)] blur-3xl"></div>
      <div className={(isTransitioning ? 'opacity-100 ' : 'opacity-70 ') + 'absolute inset-0 bg-[radial-gradient(circle_at_75%_38%,rgba(16,185,129,0.08),transparent_26%),radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_24%)] transition-opacity duration-500'}></div>
      <div className={(isTransitioning ? 'bg-black bg-opacity-30 ' : 'bg-black bg-opacity-10 ') + 'absolute inset-0 transition-colors duration-500'}></div>

      <div className="absolute inset-0" style={{ perspective: reducedMotion ? undefined : '1800px' }}>
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.9,0.2,1)]" style={sceneStyle}>
          <div className="absolute inset-x-0 top-0 h-[56%] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]"></div>

          {/* ---------------- Night window with blinds (left) ---------------- */}
          <div className="absolute left-[9%] top-[13%] hidden h-[33%] w-[19%] lg:block">
            <div className="absolute inset-0 rounded-[0.35rem] border border-white border-opacity-10 bg-[#03060c] p-[0.35rem] shadow-[0_0_60px_rgba(80,120,200,0.18)]">
              <div className="relative h-full w-full overflow-hidden rounded-[0.15rem] bg-[linear-gradient(180deg,#0a1226_0%,#111d3a_55%,#1a2a45_100%)]">
                {BOKEH.map((b, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full blur-[3px]"
                    style={{ left: b.l, top: b.t, width: b.s, paddingBottom: b.s, background: 'radial-gradient(circle,' + b.c + ',transparent 70%)' }}
                  ></span>
                ))}
                {/* blinds, half raised */}
                <div className="ws-blinds absolute inset-x-0 top-0 h-[62%]"></div>
                <div className="absolute inset-x-0 top-[62%] h-[3%] bg-[linear-gradient(180deg,#20242d,#0b0d12)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),transparent_35%)]"></div>
              </div>
            </div>
            <div className="absolute -bottom-[2%] left-[-6%] right-[-6%] h-[4%] rounded-sm bg-[linear-gradient(180deg,#2a2f3a,#0d1015)] shadow-[0_10px_20px_rgba(0,0,0,0.4)]"></div>
          </div>
          {/* cool light shaft from the window */}
          <div className="absolute left-[18%] top-[20%] hidden h-[50%] w-[30%] -skew-x-[18deg] bg-[linear-gradient(90deg,rgba(120,160,255,0.10),transparent_75%)] blur-2xl lg:block"></div>

          {/* ---------------- Chair (slightly out of focus) ---------------- */}
          <div className="absolute left-1/2 bottom-[13%] hidden h-[40%] w-[24%] -translate-x-1/2 opacity-90 blur-[1.5px] lg:block">
            <div className="absolute left-1/2 top-[4%] h-[50%] w-[56%] -translate-x-1/2 rounded-t-[5rem] rounded-b-[1.5rem] border border-white border-opacity-10 bg-[linear-gradient(180deg,rgba(31,41,55,0.78),rgba(10,12,17,0.92))] shadow-[0_18px_60px_rgba(0,0,0,0.35)]"></div>
            <div className="absolute left-[30%] top-[10%] h-[36%] w-[8%] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.08),transparent)]"></div>
            <div className="absolute left-1/2 top-[47%] h-[12%] w-[40%] -translate-x-1/2 rounded-[1.2rem] border border-white border-opacity-10 bg-[linear-gradient(180deg,rgba(24,28,37,0.95),rgba(9,10,14,0.98))]"></div>
            <div className="absolute left-1/2 top-[56%] h-[22%] w-[4%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#3f4654,#11131a)]"></div>
            <div className="absolute left-1/2 top-[74%] h-[5%] w-[26%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#232834,#0d1016)] shadow-[0_8px_20px_rgba(0,0,0,0.35)]"></div>
            <div className="absolute left-[37%] top-[77%] h-[12%] w-[2.5%] origin-top rotate-[32deg] rounded-full bg-[#181b22]"></div>
            <div className="absolute left-[46.5%] top-[77%] h-[13%] w-[2.5%] origin-top rotate-[10deg] rounded-full bg-[#181b22]"></div>
            <div className="absolute right-[46.5%] top-[77%] h-[13%] w-[2.5%] origin-top -rotate-[10deg] rounded-full bg-[#181b22]"></div>
            <div className="absolute right-[37%] top-[77%] h-[12%] w-[2.5%] origin-top -rotate-[32deg] rounded-full bg-[#181b22]"></div>
          </div>

          {/* ---------------- Desk: full walnut surface with grain ---------------- */}
          <div className="ws-wood absolute bottom-0 left-0 right-0 h-[49%] shadow-[0_-30px_90px_rgba(0,0,0,0.55)]"></div>
          {/* back edge highlight + wall contact shadow */}
          <div className="absolute bottom-[48.6%] left-0 right-0 h-[0.15rem] bg-[linear-gradient(90deg,transparent,rgba(255,214,153,0.22),rgba(255,255,255,0.12),rgba(255,214,153,0.22),transparent)]"></div>
          <div className="absolute bottom-[49%] left-0 right-0 h-[5%] bg-[linear-gradient(0deg,rgba(0,0,0,0.5),transparent)]"></div>
          {/* lamp pool + warm bounce */}
          <div className="absolute bottom-[18%] left-[56%] h-[24%] w-[34%] rounded-[2rem] bg-[radial-gradient(circle,rgba(255,214,153,0.2),rgba(255,214,153,0.04)_58%,transparent_72%)] blur-2xl"></div>
          <div className="absolute bottom-[18%] left-1/2 h-[24%] w-[48%] -translate-x-1/2 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(44,105,94,0.18),rgba(255,214,153,0.08)_34%,rgba(17,24,39,0.02)_62%,transparent_76%)] blur-2xl"></div>

          {/* screen light spilling on the desk (gets stronger as the laptop wakes) */}
          <div className={spill + ' pointer-events-none absolute bottom-[12%] left-1/2 h-[32%] w-[66%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_20%,rgba(110,231,183,0.34),rgba(96,165,250,0.16)_45%,transparent_72%)] mix-blend-screen blur-2xl transition-opacity duration-700'}></div>

          {/* ---------------- Desk lamp: base rests on the desk (right) ---------------- */}
          <div className="absolute bottom-[37%] right-[12%] z-[2] hidden h-[36%] w-[17%] lg:block">
            <svg viewBox="0 0 200 300" className="h-full w-full overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="ws-shade" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#4d576b" />
                  <stop offset="0.6" stopColor="#1c212c" />
                  <stop offset="1" stopColor="#0d1016" />
                </linearGradient>
                <linearGradient id="ws-cone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffd699" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#ffd699" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="ws-bulb">
                  <stop offset="0" stopColor="#fff2d6" />
                  <stop offset="0.4" stopColor="#ffd699" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#ffd699" stopOpacity="0" />
                </radialGradient>
                <filter id="ws-blur" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
              </defs>

              {/* contact shadow on the desk */}
              <ellipse cx="116" cy="291" rx="64" ry="8" fill="#000" opacity="0.6" filter="url(#ws-blur)" />

              {/* light cone from the shade */}
              <g transform="rotate(35 134 66)">
                <polygon points="104,68 164,68 214,250 54,250" fill="url(#ws-cone)" filter="url(#ws-blur)" />
              </g>

              {/* base */}
              <ellipse cx="120" cy="285" rx="42" ry="9" fill="#0d1016" />
              <ellipse cx="120" cy="281" rx="40" ry="8" fill="#262c39" stroke="rgba(255,255,255,0.14)" />
              <ellipse cx="120" cy="279" rx="20" ry="4" fill="#161a23" />

              {/* arms */}
              <line x1="120" y1="279" x2="72" y2="150" stroke="#2f3644" strokeWidth="7" strokeLinecap="round" />
              <line x1="118" y1="279" x2="70" y2="150" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="72" cy="150" r="8" fill="#1c212c" stroke="rgba(255,255,255,0.14)" />
              <line x1="72" y1="150" x2="132" y2="62" stroke="#343b4a" strokeWidth="6" strokeLinecap="round" />
              <line x1="70" y1="150" x2="130" y2="62" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="120" cy="279" r="6" fill="#1c212c" stroke="rgba(255,255,255,0.14)" />

              {/* shade + bulb */}
              <g transform="rotate(35 134 66)">
                <path d="M100 68 A34 32 0 0 1 168 68 Z" fill="url(#ws-shade)" stroke="rgba(255,214,153,0.28)" />
                <ellipse cx="134" cy="68" rx="34" ry="5" fill="#ffd699" opacity="0.55" />
                <circle cx="134" cy="72" r="14" fill="url(#ws-bulb)" />
              </g>
              <circle cx="132" cy="62" r="6" fill="#1c212c" stroke="rgba(255,255,255,0.14)" />
            </svg>

            {/* dust in the beam */}
            {!reducedMotion && (
              <div className="absolute left-0 top-[10%] h-[70%] w-[70%]">
                {DUST.map((m, i) => (
                  <span
                    key={i}
                    className="ws-dust absolute rounded-full bg-amber-100"
                    style={{ left: m.l + '%', top: m.t + '%', width: m.s, height: m.s, animationDelay: m.d + 's', animationDuration: m.u + 's' }}
                  ></span>
                ))}
              </div>
            )}
          </div>

          {/* ---------------- Desk objects ---------------- */}
          {/* notebook + pen + sticky note */}
          <div className="absolute bottom-[24%] left-[14%] hidden h-[9%] w-[17%] -rotate-[4deg] sm:block">
            <div className="absolute inset-0 rounded-[0.35rem] border border-white border-opacity-10 bg-[linear-gradient(180deg,#1a1f29,#0b0d12)] shadow-[0_14px_26px_rgba(0,0,0,0.45)]"></div>
            <div className="ws-lines absolute inset-[10%] left-[14%] rounded-sm opacity-60"></div>
            <div className="absolute inset-y-0 left-[6%] w-[2%] bg-[linear-gradient(180deg,#0a0c10,#2a303c,#0a0c10)] opacity-70"></div>
            <div className="absolute -right-[4%] top-[18%] h-[5%] w-[52%] rotate-[14deg] rounded-full bg-[linear-gradient(180deg,#d1d5db,#6b7280)] shadow-[0_4px_8px_rgba(0,0,0,0.4)]"></div>
            <div className="absolute right-[10%] top-[8%] h-[38%] w-[20%] rotate-[6deg] bg-[linear-gradient(180deg,#f3d98b,#d9b95f)] opacity-90 shadow-[0_5px_10px_rgba(0,0,0,0.35)]"></div>
          </div>

          {/* phone with an occasional notification glow */}
          <div className="absolute bottom-[23%] left-[7.5%] hidden h-[9%] w-[4%] rotate-[8deg] rounded-[0.35rem] border border-white border-opacity-10 bg-[#07080b] shadow-[0_10px_20px_rgba(0,0,0,0.5)] sm:block">
            <div className="ws-phone absolute inset-[7%] rounded-[0.25rem] bg-[linear-gradient(180deg,rgba(96,165,250,0.5),rgba(16,185,129,0.25))]"></div>
          </div>

          {/* mug with steam */}
          <div className="absolute bottom-[26%] right-[24.5%] hidden h-[7%] w-[4.6%] sm:block">
            {!reducedMotion && (
              <div className="absolute -top-[95%] left-0 right-0 h-[95%]">
                <span className="ws-steam absolute bottom-0 left-[22%]" style={{ animationDelay: '0s' }}></span>
                <span className="ws-steam absolute bottom-0 left-[46%]" style={{ animationDelay: '1.3s' }}></span>
                <span className="ws-steam absolute bottom-0 left-[68%]" style={{ animationDelay: '2.4s' }}></span>
              </div>
            )}
            <div className="absolute inset-0 rounded-b-[0.7rem] rounded-t-[0.2rem] border border-white border-opacity-10 bg-[linear-gradient(90deg,#20242e,#3a4150_35%,#161a22)] shadow-[0_12px_20px_rgba(0,0,0,0.5)]"></div>
            <div className="absolute inset-x-[6%] top-[3%] h-[16%] rounded-full bg-[radial-gradient(ellipse,#3b2a1c,#120c08)]"></div>
            <div className="absolute -right-[26%] top-[24%] h-[46%] w-[34%] rounded-r-full border-[0.2rem] border-l-0 border-[#2b303c]"></div>
          </div>

          {/* small plant */}
          <div className="absolute bottom-[25%] right-[11%] hidden h-[11%] w-[6%] sm:block">
            <span className="ws-leaf absolute bottom-[38%] left-[42%] h-[70%] w-[22%] origin-bottom -rotate-[34deg]"></span>
            <span className="ws-leaf absolute bottom-[38%] left-[42%] h-[88%] w-[22%] origin-bottom -rotate-[8deg]"></span>
            <span className="ws-leaf absolute bottom-[38%] left-[42%] h-[76%] w-[22%] origin-bottom rotate-[20deg]"></span>
            <span className="ws-leaf absolute bottom-[38%] left-[42%] h-[56%] w-[22%] origin-bottom rotate-[46deg]"></span>
            <div className="absolute bottom-0 left-[14%] right-[14%] h-[44%] rounded-b-[0.7rem] rounded-t-[0.2rem] bg-[linear-gradient(90deg,#2a2f3a,#454c5c_40%,#181b23)] shadow-[0_12px_20px_rgba(0,0,0,0.5)]"></div>
          </div>

          {/* workspace label */}
          <div className={(isZooming || isScreen ? 'opacity-0 ' : 'opacity-100 ') + 'absolute left-[50%] top-[17%] z-10 hidden -translate-x-1/2 rounded-full border border-white border-opacity-10 bg-black bg-opacity-20 px-4 py-1 text-[0.6rem] uppercase tracking-[0.45em] text-gray-500 lg:block transition-opacity duration-300'}>
            {identity.name}'s workspace
          </div>

          {/* ---------------- Laptop + contact shadow ---------------- */}
          <div className="absolute bottom-[21.5%] left-1/2 z-[5] h-[6%] w-[30%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.6),rgba(0,0,0,0.22)_54%,transparent_76%)] blur-xl"></div>
          {/* faint glossy reflection of the laptop base on the desk */}
          <div className="pointer-events-none absolute bottom-[19%] left-1/2 z-[5] h-[3%] w-[26%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(200,205,215,0.12),transparent)] blur-md"></div>
          <div className="absolute bottom-[28%] left-1/2 z-10 -translate-x-1/2 translate-y-1/2 md:bottom-[27%] md:translate-y-0">
            <Laptop phase={phase} onActivate={onActivate} disabled={phase !== 'workspace'} />
          </div>
        </div>
      </div>

      {/* ---------------- Camera feel: vignette + film grain ---------------- */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_45%,rgba(0,0,0,0.55)_100%)]"></div>
      <div className="ws-grain pointer-events-none absolute inset-0"></div>

      <IntroOverlay phase={phase} onSkip={onSkip} disabled={phase !== 'workspace'} introSeen={introSeen} />
    </div>
  );
}

const CSS = `
.ws-wood{
  background:
    linear-gradient(180deg,rgba(255,255,255,.07),transparent 16%,rgba(0,0,0,.42) 100%),
    repeating-linear-gradient(180deg,rgba(255,255,255,.028) 0 1px,transparent 1px 7px),
    repeating-linear-gradient(178.6deg,rgba(0,0,0,.2) 0 2px,transparent 2px 23px),
    repeating-linear-gradient(181deg,rgba(255,190,120,.035) 0 3px,transparent 3px 41px),
    linear-gradient(180deg,#2c2118,#16100c);
}
.ws-blinds{background:repeating-linear-gradient(180deg,rgba(18,20,26,.92) 0 .32rem,rgba(60,66,80,.55) .32rem .4rem)}
.ws-lines{background:repeating-linear-gradient(180deg,transparent 0 .5rem,rgba(255,255,255,.14) .5rem calc(.5rem + 1px))}
.ws-leaf{border-radius:100% 0 100% 0;background:linear-gradient(160deg,#2f6b4f,#123326);box-shadow:inset 0 0 6px rgba(0,0,0,.4)}
.ws-steam{width:.45rem;height:2.6rem;border-radius:999px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.28),transparent);filter:blur(4px);opacity:0;animation:ws-steam 4s ease-in infinite}
.ws-dust{opacity:0;animation:ws-dust 12s ease-in-out infinite}
.ws-phone{opacity:.06;animation:ws-phone 11s ease-in-out infinite}
.ws-grain{
  opacity:.07;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
@keyframes ws-steam{0%{transform:translateY(0) scaleX(1);opacity:0}25%{opacity:.55}100%{transform:translateY(-2.6rem) scaleX(1.8);opacity:0}}
@keyframes ws-dust{0%,100%{transform:translate(0,0);opacity:0}20%{opacity:.5}50%{transform:translate(14px,-18px);opacity:.35}80%{opacity:.45}}
@keyframes ws-phone{0%,82%,100%{opacity:.06}86%,94%{opacity:.9}}
@media (prefers-reduced-motion: reduce){
  .ws-root *{animation:none!important}
  .ws-phone{opacity:.06}
}
`;