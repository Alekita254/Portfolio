import React from 'react';
import identity from '../../config/identity';
import Laptop from './Laptop';
import IntroOverlay from './IntroOverlay';

export default function WorkspaceScene({ phase, reducedMotion, onActivate, onSkip, introSeen }) {
  const isTransitioning = phase !== 'workspace';
  const isZooming = phase === 'zooming';
  const isScreen = phase === 'screen' || phase === 'booting';

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
    <div className={(phase === 'booting' ? 'pointer-events-none opacity-0 ' : 'opacity-100 ') + 'absolute inset-0 overflow-hidden bg-[#040507] transition-opacity duration-300'}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,41,59,0.42),transparent_35%),linear-gradient(180deg,#06070a_0%,#0a0b0f_45%,#050608_100%)]"></div>
      <div className="absolute right-[12%] top-[18%] h-[34%] w-[26%] bg-[radial-gradient(circle,rgba(255,214,153,0.1),transparent_68%)] blur-3xl"></div>
      <div className={(isTransitioning ? 'opacity-100 ' : 'opacity-70 ') + 'absolute inset-0 bg-[radial-gradient(circle_at_75%_38%,rgba(16,185,129,0.08),transparent_26%),radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_24%)] transition-opacity duration-500'}></div>
      <div className={(isTransitioning ? 'bg-black bg-opacity-30 ' : 'bg-black bg-opacity-10 ') + 'absolute inset-0 transition-colors duration-500'}></div>

      <div className="absolute inset-0" style={{ perspective: reducedMotion ? undefined : '1800px' }}>
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.9,0.2,1)]" style={sceneStyle}>
          <div className="absolute inset-x-0 top-0 h-[56%] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-[linear-gradient(180deg,rgba(18,20,27,0.3),rgba(8,9,12,0.95))]"></div>

          <div className="absolute right-[14%] top-[24%] hidden h-[32%] w-[18%] lg:block">
            <div className="absolute right-[22%] top-[3%] h-[10%] w-[18%] rounded-t-full rounded-b-[0.8rem] border border-amber-100 border-opacity-20 bg-[linear-gradient(180deg,#2f3746,#11151c)] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"></div>
            <div className="absolute right-[29%] top-[10%] h-[26%] w-[2.6%] -rotate-[28deg] rounded-full bg-[linear-gradient(180deg,#475164,#161a22)]"></div>
            <div className="absolute right-[40%] top-[25%] h-[22%] w-[2.6%] rotate-[32deg] rounded-full bg-[linear-gradient(180deg,#4d5666,#171b22)]"></div>
            <div className="absolute right-[36%] top-[42%] h-[7%] w-[18%] rounded-full bg-[linear-gradient(180deg,#202530,#0c0f15)]"></div>
            <div className="absolute right-[23%] top-[7%] h-[48%] w-[54%] bg-[conic-gradient(from_200deg_at_78%_8%,rgba(255,214,153,0.42),rgba(255,214,153,0.14)_18%,transparent_35%,transparent_100%)] opacity-90 blur-xl"></div>
            <div className="absolute right-[42%] top-[40%] h-[11%] w-[34%] rounded-full bg-[radial-gradient(circle,rgba(255,214,153,0.24),rgba(255,214,153,0.03)_65%,transparent_75%)] blur-lg"></div>
          </div>

          <div className="absolute left-1/2 bottom-[13%] hidden h-[40%] w-[24%] -translate-x-1/2 lg:block">
            <div className="absolute left-1/2 top-[4%] h-[50%] w-[56%] -translate-x-1/2 rounded-t-[5rem] rounded-b-[1.5rem] border border-white border-opacity-10 bg-[linear-gradient(180deg,rgba(31,41,55,0.78),rgba(10,12,17,0.92))] shadow-[0_18px_60px_rgba(0,0,0,0.35)]"></div>
            <div className="absolute left-1/2 top-[47%] h-[12%] w-[40%] -translate-x-1/2 rounded-[1.2rem] border border-white border-opacity-10 bg-[linear-gradient(180deg,rgba(24,28,37,0.95),rgba(9,10,14,0.98))]"></div>
            <div className="absolute left-1/2 top-[56%] h-[22%] w-[4%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#3f4654,#11131a)]"></div>
            <div className="absolute left-1/2 top-[74%] h-[5%] w-[26%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#232834,#0d1016)] shadow-[0_8px_20px_rgba(0,0,0,0.35)]"></div>
            <div className="absolute left-[37%] top-[77%] h-[12%] w-[2.5%] origin-top rotate-[32deg] rounded-full bg-[#181b22]"></div>
            <div className="absolute left-[46.5%] top-[77%] h-[13%] w-[2.5%] origin-top rotate-[10deg] rounded-full bg-[#181b22]"></div>
            <div className="absolute right-[46.5%] top-[77%] h-[13%] w-[2.5%] origin-top -rotate-[10deg] rounded-full bg-[#181b22]"></div>
            <div className="absolute right-[37%] top-[77%] h-[12%] w-[2.5%] origin-top -rotate-[32deg] rounded-full bg-[#181b22]"></div>
          </div>

          <div className="absolute bottom-[16%] left-1/2 h-[33%] w-[94%] -translate-x-1/2 rounded-[2.5rem] border border-white border-opacity-5 bg-[linear-gradient(180deg,#1f232d,#0b0d12)] shadow-[0_40px_120px_rgba(0,0,0,0.6)]"></div>
          <div className="absolute bottom-[18%] left-1/2 h-[24%] w-[48%] -translate-x-1/2 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(44,105,94,0.18),rgba(255,214,153,0.08)_34%,rgba(17,24,39,0.02)_62%,transparent_76%)] blur-2xl"></div>
          <div className="absolute bottom-[20%] left-[57%] h-[18%] w-[30%] rounded-[2rem] bg-[radial-gradient(circle,rgba(255,214,153,0.16),rgba(255,214,153,0.03)_58%,transparent_72%)] blur-2xl"></div>
          <div className="absolute bottom-[41%] left-1/2 h-[2.3%] w-[78%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]"></div>
          <div className="absolute bottom-[25%] left-[15%] hidden h-[8%] w-[17%] rounded-[1rem] border border-white border-opacity-5 bg-[linear-gradient(180deg,#11151d,#0a0c10)] shadow-[0_12px_25px_rgba(0,0,0,0.25)] sm:block"></div>
          <div className="absolute bottom-[25.5%] right-[15%] hidden h-[7%] w-[9%] rounded-full border border-white border-opacity-5 bg-[linear-gradient(180deg,#151821,#090a0f)] shadow-[0_10px_24px_rgba(0,0,0,0.22)] sm:block"></div>
          <div className="absolute bottom-[26%] right-[25%] hidden h-[6%] w-[5.5%] rounded-full border border-white border-opacity-5 bg-[linear-gradient(180deg,#161a22,#08090d)] shadow-[0_10px_20px_rgba(0,0,0,0.2)] sm:block"></div>

          <div className={(isZooming || isScreen ? 'opacity-0 ' : 'opacity-100 ') + 'absolute left-[50%] top-[17%] z-10 hidden -translate-x-1/2 rounded-full border border-white border-opacity-10 bg-black bg-opacity-20 px-4 py-1 text-[0.6rem] uppercase tracking-[0.45em] text-gray-500 lg:block transition-opacity duration-300'}>
            {identity.name}'s workspace
          </div>

          <div className="absolute bottom-[28%] left-1/2 z-10 -translate-x-1/2 translate-y-1/2 md:bottom-[27%] md:translate-y-0">
            <Laptop phase={phase} onActivate={onActivate} disabled={phase !== 'workspace'} />
          </div>
          <div className="absolute bottom-[21.5%] left-1/2 z-[5] h-[6%] w-[28%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.5),rgba(0,0,0,0.18)_54%,transparent_76%)] blur-xl"></div>
        </div>
      </div>

      <IntroOverlay phase={phase} onSkip={onSkip} disabled={phase !== 'workspace'} introSeen={introSeen} />
    </div>
  );
}
