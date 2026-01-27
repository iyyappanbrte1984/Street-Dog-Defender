
import React, { useState, useEffect } from 'react';
import { CrisisMap } from './CrisisMap';
import { ParentPortal } from './ParentPortal';
import { AdminDashboard } from './AdminDashboard';
import { AISafetyHub } from './AISafetyHub';

type DashboardTab = 'map' | 'portal' | 'admin' | 'ai';

export const SafetyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('map');
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      let newTab: DashboardTab = 'map';
      if (hash === '#parent-portal') newTab = 'portal';
      else if (hash === '#crisis-map') newTab = 'map';
      else if (hash === '#admin') newTab = 'admin';
      else if (hash === '#safety-ai') newTab = 'ai';
      
      setIsChanging(true);
      setTimeout(() => {
        setActiveTab(newTab);
        setIsChanging(false);
      }, 150);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
           RUBY_OS Enterprise v2.5
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
          Safe City <span className="text-orange-600">Command Center</span>
        </h2>
        
        <div className="flex flex-wrap p-2 bg-slate-200/50 backdrop-blur-md rounded-[2.5rem] shadow-inner w-full max-w-2xl border border-slate-200 gap-2">
          {[
            { id: 'map', label: 'Incidents', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 7m0 10V7' },
            { id: 'portal', label: 'Parent', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
            { id: 'ai', label: 'Safety AI', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { id: 'admin', label: 'Admin', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                window.location.hash = tab.id === 'map' ? 'crisis-map' : tab.id === 'portal' ? 'parent-portal' : tab.id === 'ai' ? 'safety-ai' : 'admin';
                setActiveTab(tab.id as DashboardTab);
              }}
              className={`flex-1 min-w-[120px] py-4 px-6 rounded-[1.5rem] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 text-[10px] ${
                activeTab === tab.id 
                  ? 'bg-white text-orange-600 shadow-xl border border-orange-100' 
                  : 'text-slate-500 hover:bg-white/50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={tab.icon} /></svg>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`relative min-h-[700px] transition-opacity duration-300 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
        {activeTab === 'map' && (
          <div className="bg-[#0f172a] rounded-[4rem] p-8 md:p-12 text-white overflow-hidden shadow-2xl border border-white/5 ring-1 ring-white/10">
            <CrisisMap />
          </div>
        )}
        {activeTab === 'portal' && (
          <div className="bg-white rounded-[4rem] p-8 md:p-16 border border-slate-200 shadow-xl overflow-hidden">
            <ParentPortal />
          </div>
        )}
        {activeTab === 'ai' && (
          <div className="bg-slate-50 rounded-[4rem] p-8 md:p-16 border border-slate-200">
            <AISafetyHub />
          </div>
        )}
        {activeTab === 'admin' && (
          <div className="animate-fade-in">
            <AdminDashboard />
          </div>
        )}
      </div>
    </div>
  );
};
