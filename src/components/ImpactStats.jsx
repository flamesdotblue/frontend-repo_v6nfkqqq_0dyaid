import React, { useEffect, useState } from 'react';
import { Users, ThumbsUp, Leaf } from 'lucide-react';

const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 600;
    const start = performance.now();
    const from = 0;
    const to = Number(value) || 0;
    let raf;
    const step = (ts) => {
      const progress = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{display.toLocaleString()}</span>;
};

const ImpactStats = () => {
  const [reported, setReported] = useState(0);
  const [challengesDone, setChallengesDone] = useState(0);

  useEffect(() => {
    try {
      const issues = JSON.parse(localStorage.getItem('civicsense:issues') || '[]');
      setReported(issues.length);
    } catch {
      setReported(0);
    }
    try {
      const completed = JSON.parse(localStorage.getItem('civicsense:completed') || '{}');
      setChallengesDone(Object.values(completed).filter(Boolean).length);
    } catch {
      setChallengesDone(0);
    }
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Neighbors Engaged</div>
              <div className="text-2xl font-semibold"><AnimatedNumber value={1204} /></div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <ThumbsUp className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Issues Reported</div>
              <div className="text-2xl font-semibold"><AnimatedNumber value={reported} /></div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Challenges Completed</div>
              <div className="text-2xl font-semibold"><AnimatedNumber value={challengesDone} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
