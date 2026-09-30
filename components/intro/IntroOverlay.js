import React from 'react';

export default function IntroOverlay({ phase, onSkip, disabled, introSeen }) {
  const helperVisible = phase === 'workspace';

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-16 z-20 flex justify-center px-4 md:bottom-10">
        <div
          className={
            (helperVisible ? 'opacity-100 translate-y-0 ' : 'opacity-0 translate-y-2 ') +
            'workspace-helper-pulse rounded-full border border-white border-opacity-10 bg-black bg-opacity-35 px-3 py-2 text-[0.62rem] uppercase tracking-[0.3em] text-gray-200 transition-all duration-300 sm:px-4 sm:text-[0.68rem] md:text-xs'
          }
        >
          {introSeen ? 'Click laptop to enter' : 'Click to activate'}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 md:bottom-9 md:left-auto md:right-8 md:translate-x-0">
        <button
          type="button"
          onClick={onSkip}
          disabled={disabled}
          className={(disabled ? 'opacity-50 cursor-default ' : 'hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black ') + 'rounded px-2 py-1 text-xs text-gray-400 transition sm:text-sm'}
        >
          Skip intro →
        </button>
      </div>
    </>
  );
}
