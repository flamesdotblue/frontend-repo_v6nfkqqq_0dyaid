import React, { useRef } from 'react';
import Hero from './components/Hero.jsx';
import ReportIssue from './components/ReportIssue.jsx';
import CivicChallenges from './components/CivicChallenges.jsx';
import ImpactStats from './components/ImpactStats.jsx';

function App() {
  const reportRef = useRef(null);
  const challengesRef = useRef(null);

  const scrollTo = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero onReportClick={() => scrollTo(reportRef)} onPledgeClick={() => scrollTo(challengesRef)} />
      <ImpactStats />
      <ReportIssue ref={reportRef} />
      <CivicChallenges ref={challengesRef} />
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-600">Made with care for better neighborhoods.</p>
          <div className="text-sm text-slate-500">CivicSense · Be the change you want to see</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
