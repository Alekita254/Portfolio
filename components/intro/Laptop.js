import React from 'react';
import identity from '../../config/identity';

export default function Laptop({ phase, onActivate, disabled }) {
  const isIdle = phase === 'workspace';
  const isActivating = phase === 'activating';
  const isZooming = phase === 'zooming';
  const isScreen = phase === 'screen' || phase === 'booting';

  const keyboardRows = [
    ['w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]'],
    ['w-[8.5%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[8.5%]'],
    ['w-[10%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[12%]'],
    ['w-[12%]', 'w-[7%]', 'w-[7%]', 'w-[7%]', 'w-[26%]', 'w-[7%]', 'w-[7%]', 'w-[12%]'],
  ];

  return (
    <button
      type="button"
      onClick={onActivate}
      disabled={disabled}
      aria-label="Activate laptop and enter Alex OS"
      className={
        (disabled ? 'cursor-default ' : 'cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black ') +
        'group relative block w-[18rem] sm:w-[24rem] md:w-[28rem] xl:w-[33rem] outline-none transition-transform duration-500 ease-out'
      }
    >
      <div
        className={
          (isIdle ? 'group-hover:-translate-y-1 group-hover:scale-[1.01] ' : '') +
          (isActivating ? 'scale-[1.02] -translate-y-1 ' : '') +
          (isZooming ? 'scale-[1.06] ' : '') +
          'relative aspect-[16/10] rounded-[1.5rem] border border-white border-opacity-10 bg-gradient-to-b from-[#171b23] via-[#0a0d13] to-[#050608] px-3 pt-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out'
        }
      >
        <div className="absolute left-1/2 top-[0.4rem] z-20 h-[0.36rem] w-[18%] -translate-x-1/2 rounded-b-[0.45rem] bg-[#0b0e14] shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"></div>
        <div
          className={
            (isIdle ? 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.12)] ' : '') +
            (isActivating ? 'shadow-[0_0_60px_rgba(59,130,246,0.18)] ' : '') +
            (isZooming || isScreen ? 'shadow-[0_0_80px_rgba(255,255,255,0.12)] ' : '') +
            'workspace-screen-glow relative h-full overflow-hidden rounded-[1.05rem] border border-white border-opacity-10 bg-[#040506] transition-shadow duration-500'
          }
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_45%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_30%,rgba(0,0,0,0.35))]"></div>
          <div
            className={
              (isIdle ? 'opacity-20 group-hover:opacity-35 ' : '') +
              (isActivating ? 'opacity-45 ' : '') +
              (isZooming ? 'opacity-70 ' : '') +
              (isScreen ? 'opacity-100 ' : 'opacity-10 ') +
              'absolute inset-0 bg-[linear-gradient(180deg,rgba(16,185,129,0.18),rgba(15,23,42,0.12),rgba(0,0,0,0.8))] transition-opacity duration-500'
            }
          ></div>
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-left">
            <div className="flex items-center justify-between text-[0.55rem] uppercase tracking-[0.3em] text-gray-500 sm:text-[0.65rem]">
              <span>{identity.osName}</span>
              <span>{identity.terminalPersona}</span>
            </div>
            <div className="pb-4 sm:pb-5">
              <div
                className={
                  (isScreen ? 'opacity-100 translate-y-0 ' : isActivating || isZooming ? 'opacity-90 translate-y-0 ' : 'opacity-70 translate-y-1 ') +
                  'transition-all duration-500'
                }
              >
                <div className="text-sm font-medium text-white sm:text-base md:text-lg">Alex Murimi</div>
                <div className="mt-1 text-[0.65rem] leading-5 text-gray-300 sm:text-xs md:text-sm">Senior Software Engineer</div>
                <div className="mt-2 text-[0.55rem] uppercase tracking-[0.25em] text-emerald-200 sm:text-[0.65rem]">
                  Full Stack Engineer • AI Engineer
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-full h-3 w-24 -translate-x-1/2 rounded-b-full bg-[#1e2128]"></div>
      </div>

      <div className="relative mx-auto mt-[0.3rem] w-[118%] -translate-x-[9%] [perspective:1200px]">
        <div className="relative h-[5.55rem] sm:h-[6rem] md:h-[6.45rem] origin-top rounded-b-[1.75rem] border border-white border-opacity-15 bg-[linear-gradient(180deg,#d7d9dd_0%,#999fa8_14%,#50545d_46%,#2b2f37_100%)] px-[5.7%] pt-[0.65rem] shadow-[0_30px_64px_rgba(0,0,0,0.38)] [transform:rotateX(61deg)]">
          <div className="absolute inset-x-[2.2%] top-[6%] h-[15%] rounded-[1.15rem] bg-[linear-gradient(180deg,#2a2f38,#11151d)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"></div>
          <div className="absolute left-1/2 top-[0.1rem] z-20 h-[0.32rem] w-[13%] -translate-x-1/2 rounded-b-[0.45rem] bg-[#e6e7ea] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"></div>

          <div className="grid gap-[0.16rem] pt-[0.18rem] sm:gap-[0.18rem]">
            {keyboardRows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex items-center justify-center gap-[0.14rem] sm:gap-[0.16rem]">
                {row.map((keyWidth, keyIndex) => (
                  <span
                    key={`key-${rowIndex}-${keyIndex}`}
                    className={
                      keyWidth +
                      ' block h-[0.4rem] sm:h-[0.45rem] md:h-[0.5rem] rounded-[0.2rem] border border-white border-opacity-[0.08] bg-[linear-gradient(180deg,#212634,#0d1017)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.38)]'
                    }
                  ></span>
                ))}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-[0.4rem] h-[1rem] w-[27%] rounded-[0.7rem] border border-white border-opacity-10 bg-[linear-gradient(180deg,#111620,#080b11)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-[1.1rem] md:h-[1.2rem]"></div>
          <div className="absolute left-[5.5%] top-[53%] h-[18%] w-[10%] rounded-full bg-[linear-gradient(180deg,#757c86,#171b22)] opacity-45 blur-[1px]"></div>
          <div className="absolute right-[5.5%] top-[53%] h-[18%] w-[10%] rounded-full bg-[linear-gradient(180deg,#757c86,#171b22)] opacity-45 blur-[1px]"></div>
        </div>

        <div className="absolute left-1/2 top-full mt-[-0.1rem] h-[0.95rem] w-[95%] -translate-x-1/2 rounded-b-[999px] border border-white border-opacity-10 bg-gradient-to-b from-[#3c424f] to-[#11151c]"></div>
      </div>

      <div className="absolute left-1/2 top-full mt-[4.95rem] h-6 w-[90%] -translate-x-1/2 rounded-[999px] bg-black bg-opacity-40 blur-xl"></div>
    </button>
  );
}
