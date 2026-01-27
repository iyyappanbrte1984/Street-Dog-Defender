
import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
            The Safety Gap: <span className="text-orange-600">Seconds Matter</span>
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            In India, dog bites are a critical public health crisis. Every year, over 1.7 million cases are reported, with Tamil Nadu being among the most high-risk areas. Traditional responses—stones, sticks, or mobile apps—are simply too slow.
          </p>
          
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
              <h4 className="font-bold text-slate-900 mb-2">High Burden of Conflict</h4>
              <p className="text-slate-700">Especially dangerous for children, street workers, and night-shift commuters who lack immediate defense during an escalation.</p>
            </div>
            
            <div className="bg-slate-50 border-l-4 border-slate-900 p-6 rounded-r-xl">
              <h4 className="font-bold text-slate-900 mb-2">The Reaction Lag</h4>
              <p className="text-slate-700">Attacks escalate in under 5 seconds. Panicked victims often cannot reach for a phone or spray. The "freeze" response is real.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center uppercase tracking-tight">The "Safety Gap" Reaction Times</h3>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-500">
                <span>STAIN / STONES</span>
                <span>10+ SECONDS</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 w-full"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-500">
                <span>PEPPER SPRAY / APP</span>
                <span>5-8 SECONDS</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-600 w-3/4"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-orange-600">
                <span>STREET DOG DEFENDER</span>
                <span>&lt; 1 SECOND</span>
              </div>
              <div className="h-4 bg-orange-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 w-1/6 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="mt-10 p-4 bg-slate-900 rounded-xl text-center">
            <p className="text-white font-medium italic text-sm">"Our device bridges the gap between fear and safety instantly."</p>
          </div>
        </div>
      </div>
    </div>
  );
};
