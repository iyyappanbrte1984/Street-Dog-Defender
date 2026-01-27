
import React from 'react';

export const Ecosystem: React.FC = () => {
  const steps = [
    { title: "Wearable Device", desc: "Personal protection for students, joggers, and delivery workers.", tag: "Available for Pilots" },
    { title: "Smart Poles", desc: "Stationary solar units for school zones and known dog bite hotspots.", tag: "Testing Phae" },
    { title: "Cloud Heatmap", desc: "Aggregated data shared with Municipalities to guide sterilization (ABC) drives.", tag: "Data Integration" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-8 uppercase tracking-tight">The Ecosystem Strategy</h2>
          <p className="text-xl text-slate-600 mb-12">We aren't just building a gadget; we're building a network of safety for the entire community.</p>
          
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-xl font-bold text-slate-900">{s.title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded text-slate-500">{s.tag}</span>
                  </div>
                  <p className="text-slate-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000" 
              alt="Smart City Visualization" 
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-12">
               <h4 className="text-white text-3xl font-black mb-2">SMART CITY READY</h4>
               <p className="text-slate-300">Our data layer creates live heatmaps of aggressive dog hotspots for municipal planning.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 p-12 bg-slate-900 rounded-3xl text-white">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold uppercase tracking-widest">Innovation Roadmap</h3>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { q: "Q4 2024", task: "SIDP Prototype Approval", active: true },
            { q: "Q1 2025", task: "School Pilot Trials", active: true },
            { q: "Q3 2025", task: "B2G Municipal Testing", active: false },
            { q: "Q1 2026", task: "Consumer Launch", active: false }
          ].map((item, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${item.active ? 'border-orange-500 bg-orange-600/10' : 'border-slate-800 bg-slate-800/20'}`}>
              <div className={`text-sm font-bold mb-2 ${item.active ? 'text-orange-500' : 'text-slate-500'}`}>{item.q}</div>
              <div className="font-bold text-lg">{item.task}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
