import React from 'react';

export default function IntroOverlay({ phase, onSkip, disabled, introSeen }) {
  const helperVisible = phase === 'workspace';

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center px-4 md:bottom-10">
        <div
          className={
            (helperVisible ? 'opacity-100 translate-y-0 ' : 'opacity-0 translate-y-2 ') +
            'workspace-helper-pulse rounded-full border border-white border-opacity-10 bg-black bg-opacity-35 px-4 py-2 text-[0.68rem] uppercase tracking-[0.35em] text-gray-200 transition-all duration-300 md:text-xs'
          }
        >
          {introSeen ? 'Click laptop to enter' : 'Click to activate'}
        </div>
      </div>
      <div className="absolute bottom-7 right-4 z-20 md:bottom-9 md:right-8">
        <button
          type="button"
          onClick={onSkip}
          disabled={disabled}
          className={(disabled ? 'opacity-50 cursor-default ' : 'hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black ') + 'rounded px-2 py-1 text-sm text-gray-400 transition'}
        >
          Skip intro →
        </button>
      </div>
    </>
  );
}
