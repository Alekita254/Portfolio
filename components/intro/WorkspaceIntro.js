import React, { useEffect, useState } from 'react';
import Ubuntu from '../ubuntu';
import WorkspaceScene from './WorkspaceScene';

const INTRO_SEEN_KEY = 'alex-os-intro-seen';

export default function WorkspaceIntro() {
  const [phase, setPhase] = useState('workspace');
  const [osEntryMode, setOsEntryMode] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [introSeen, setIntroSeen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    setIntroSeen(window.localStorage.getItem(INTRO_SEEN_KEY) === 'true');

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    if (phase === 'activating') {
      const timeoutId = window.setTimeout(() => {
        setPhase(reducedMotion ? 'booting' : 'zooming');
        if (reducedMotion) {
          setOsEntryMode('force-boot');
          window.localStorage.setItem(INTRO_SEEN_KEY, 'true');
        }
      }, 280);
      return () => window.clearTimeout(timeoutId);
    }

    if (phase === 'zooming') {
      const timeoutId = window.setTimeout(() => {
        setPhase('screen');
      }, 900);
      return () => window.clearTimeout(timeoutId);
    }

    if (phase === 'screen') {
      const timeoutId = window.setTimeout(() => {
        setOsEntryMode('force-boot');
        window.localStorage.setItem(INTRO_SEEN_KEY, 'true');
        setPhase('booting');
      }, 260);
      return () => window.clearTimeout(timeoutId);
    }

    if (phase === 'booting') {
      const timeoutId = window.setTimeout(() => {
        setPhase('os');
      }, 2200);
      return () => window.clearTimeout(timeoutId);
    }

    return undefined;
  }, [phase, reducedMotion]);

  const activateLaptop = () => {
    if (phase !== 'workspace') {
      return;
    }
    setPhase('activating');
  };

  const skipIntro = () => {
    if (phase !== 'workspace') {
      return;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(INTRO_SEEN_KEY, 'true');
    }
    setOsEntryMode('skip-boot');
    setPhase('os');
  };

  const showOs = phase === 'booting' || phase === 'os';

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {showOs ? <Ubuntu bootMode={osEntryMode || 'skip-boot'} /> : null}
      {phase !== 'os' ? (
        <WorkspaceScene
          phase={phase}
          reducedMotion={reducedMotion}
          onActivate={activateLaptop}
          onSkip={skipIntro}
          introSeen={introSeen}
        />
      ) : null}
    </div>
  );
}
