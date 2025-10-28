import React from 'react';
import { Rocket, Heart, Shield } from 'lucide-react';

const Hero = ({ onReportClick, onPledgeClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 via-blue-500 to-sky-400 text-white">
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur">
            <Shield className="h-4 w-4" />
            Building kinder, cleaner cities
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            CivicSense
          </h1>
          <p className="max-w-2xl text-lg/7 text-white/90">
            A gentle nudge towards better civic habits. Report local issues, take daily challenges, and see the positive impact around you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onReportClick}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-blue-700 shadow hover:shadow-md transition"
            >
              <Rocket className="h-5 w-5" /> Report an Issue
            </button>
            <button
              onClick={onPledgeClick}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700/30 px-5 py-3 font-medium text-white ring-1 ring-white/30 hover:bg-blue-700/40 transition"
            >
              <Heart className="h-5 w-5" /> Take a Civic Pledge
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
