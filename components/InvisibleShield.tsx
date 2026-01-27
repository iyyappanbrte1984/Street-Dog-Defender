
import React from 'react';

export const InvisibleShield: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square bg-slate-800 rounded-3xl border border-slate-700 flex flex-col p-10 overflow-hidden">
            <h4 className="text-2xl font-bold mb-8 uppercase tracking-widest text-orange-500">Spectral Analysis</h4>
            
            <div className="flex-1 flex items-end gap-2 px-4 mb-8">
              {[40, 60, 45, 30, 80, 100, 40, 30, 20, 15, 20, 25, 30, 120, 150, 130, 110, 90, 70, 50].map((h, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t-sm transition-all duration-1000 ${i > 10 && i < 16 ? 'bg-orange-500 animate-pulse' : 'bg-slate-600'}`}
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                  <span className="font-bold">HUMAN RANGE (20Hz - 20kHz)</span>
                </div>
                <p className="text-slate-400">Effectively silent to human ears at all levels.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="font-bold text-orange-500">DOG SENSITIVE (20kHz - 60kHz)</span>
                </div>
                <p className="text-slate-400">Intense, startling sound creates avoidance response.</p>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="text-8xl font-black text-white/5 pointer-events-none">25 kHz</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-extrabold mb-8 uppercase tracking-tight">The Invisible Shield</h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            While humans only hear up to 20 kHz, dogs have superior hearing capabilities extending to 60 kHz. Our device targets the <span className="text-orange-500 font-bold">23–27 kHz band</span>.
          </p>
          
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-600 flex-shrink-0 flex items-center justify-center text-white font-bold">✓</div>
              <div>
                <h4 className="font-bold text-white text-lg">Humane & Non-Lethal</h4>
                <p className="text-slate-400">Creates a "silent wall" that dogs instinctively avoid. No physical contact or harm occurs.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-600 flex-shrink-0 flex items-center justify-center text-white font-bold">✓</div>
              <div>
                <h4 className="font-bold text-white text-lg">Socially Discreet</h4>
                <p className="text-slate-400">Activation goes unnoticed by other humans in public spaces, unlike loud air horns or shouting.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-600 flex-shrink-0 flex items-center justify-center text-white font-bold">✓</div>
              <div>
                <h4 className="font-bold text-white text-lg">Scientific Deterrence</h4>
                <p className="text-slate-400">Uses Frequency Modulation to prevent dogs from getting "habituated" or used to the sound.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
