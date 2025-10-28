import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ListChecks, Sparkles } from 'lucide-react';

const starterChallenges = [
  { id: 'segregate', title: 'Segregate your waste today', points: 10 },
  { id: 'crosswalk', title: 'Use a crosswalk and help someone cross', points: 15 },
  { id: 'plant', title: 'Water a community plant or tree', points: 12 },
  { id: 'public-transport', title: 'Choose public transport once today', points: 20 },
  { id: 'noise', title: 'Keep noise low in shared spaces', points: 8 },
];

const CivicChallenges = React.forwardRef((props, ref) => {
  const [completed, setCompleted] = useState(() => {
    try {
      const raw = localStorage.getItem('civicsense:completed');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('civicsense:completed', JSON.stringify(completed));
  }, [completed]);

  const toggle = (id) => setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));

  const progress = useMemo(() => {
    const total = starterChallenges.length;
    const done = starterChallenges.filter((c) => completed[c.id]).length;
    const points = starterChallenges
      .filter((c) => completed[c.id])
      .reduce((sum, c) => sum + c.points, 0);
    return { total, done, points, pct: Math.round((done / total) * 100) };
  }, [completed]);

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <ListChecks className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">Daily Civic Challenges</h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> {progress.done}/{progress.total} done</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1"><Sparkles className="h-4 w-4 text-amber-500" /> {progress.points} pts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {starterChallenges.map((c) => (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${completed[c.id] ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              <div className={`mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full ${completed[c.id] ? 'bg-emerald-600 text-white' : 'bg-white text-slate-400 border border-slate-300'}`}>
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900">{c.title}</div>
                <div className="text-xs text-slate-500">Worth {c.points} points</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <div className="h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-emerald-500"
              style={{ width: `${progress.pct}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-slate-600">You're {progress.pct}% through today's challenges. Keep going!</div>
        </div>
      </div>
    </section>
  );
});

export default CivicChallenges;
