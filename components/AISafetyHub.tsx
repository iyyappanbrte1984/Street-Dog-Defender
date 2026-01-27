import React, { useState } from 'react';

// Fake Data Generator (Simulates AI Logic)
const generateAnalysis = (location: string, area: string) => {
  // Use the name length to create "consistent" fake data (so the same city gives same results)
  const seed = location.length + area.length;
  const riskScore = Math.min(95, Math.max(20, (seed * 7) % 100));
  
  return {
    riskScore,
    strayDensity: riskScore > 70 ? 'High' : riskScore > 40 ? 'Moderate' : 'Low',
    lighting: riskScore > 60 ? 'Poor' : 'Excellent',
    incidents: [
      { id: 1, type: 'Pack Aggression', date: '2 days ago', severity: 'Medium' },
      { id: 2, type: 'Stray Sighting', date: '1 week ago', severity: 'Low' },
      { id: 3, type: 'Bite Incident', date: 'Last Month', severity: 'Critical' },
    ],
    recommendations: riskScore > 50 
      ? ['Increase Street Lighting', 'Deploy Animal Control Patrol', 'Install Ultrasonic Deterrents'] 
      : ['Routine Monitoring', 'Maintain Waste Management']
  };
};

export const AISafetyHub: React.FC = () => {
  const [formData, setFormData] = useState({ location: '', area: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setReport(null);

    // Simulate AI Processing Time
    setTimeout(() => {
      const result = generateAnalysis(formData.location, formData.area);
      setReport(result);
      setIsAnalyzing(false);
    }, 2500); // 2.5s delay for effect
  };

  // CSV Download Logic
  const downloadCSV = () => {
    if (!report) return;
    const headers = "Location,Area,Risk Score,Stray Density,Lighting Quality,Recommendation\n";
    const row = `${formData.location},${formData.area},${report.riskScore}/100,${report.strayDensity},${report.lighting},${report.recommendations[0]}\n`;
    
    const blob = new Blob([headers + row], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SDD_Safety_Report_${formData.location}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 font-sans relative overflow-hidden">
      
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold tracking-widest mb-4">
            PREDICTIVE ANALYTICS ENGINE V2.0
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
            AI Risk Assessment
          </h1>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Enter a location to run a comprehensive safety audit. Our AI analyzes historical incident data, satellite terrain features, and stray population models.
          </p>
        </div>

        {/* INPUT SECTION */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl mb-12 transform hover:scale-[1.01] transition-all">
          <form onSubmit={handleAnalyze} className="grid md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Target City / District</label>
              <div className="relative">
                <input 
                  required 
                  type="text" 
                  placeholder="e.g. Salem" 
                  className="w-full bg-slate-950 border border-slate-700 text-white p-4 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all pl-12"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
                <span className="absolute left-4 top-4 text-slate-500">🏙️</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Specific Zone / Landmark</label>
              <div className="relative">
                <input 
                  required 
                  type="text" 
                  placeholder="e.g. Junction Main Rd" 
                  className="w-full bg-slate-950 border border-slate-700 text-white p-4 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all pl-12"
                  value={formData.area}
                  onChange={e => setFormData({...formData, area: e.target.value})}
                />
                <span className="absolute left-4 top-4 text-slate-500">📍</span>
              </div>
            </div>

            <button 
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white p-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  PROCESSING DATA...
                </>
              ) : (
                <>
                  🚀 RUN SAFETY SCAN
                </>
              )}
            </button>
          </form>
        </div>

        {/* LOADING ANIMATION */}
        {isAnalyzing && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center animate-pulse mb-8">
            <div className="font-mono text-blue-400 mb-2">CONNECTING TO SATELLITE FEED...</div>
            <div className="h-2 bg-slate-800 rounded-full max-w-md mx-auto overflow-hidden">
              <div className="h-full bg-blue-500 w-1/2 animate-[scan_1s_linear_infinite]"></div>
            </div>
          </div>
        )}

        {/* RESULTS DASHBOARD */}
        {report && !isAnalyzing && (
          <div className="animate-fade-in-up">
            
            {/* Top Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Risk Score */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold ${report.riskScore > 50 ? 'text-red-500' : 'text-green-500'}`}>!</div>
                <div className="text-sm text-slate-400 font-bold uppercase mb-2">Safety Risk Score</div>
                <div className="flex items-end gap-3">
                  <span className={`text-5xl font-extrabold ${report.riskScore > 50 ? 'text-red-500' : 'text-green-400'}`}>{report.riskScore}</span>
                  <span className="text-slate-500 mb-2 text-xl">/ 100</span>
                </div>
                <div className="w-full bg-slate-800 h-2 mt-4 rounded-full overflow-hidden">
                  <div className={`h-full ${report.riskScore > 50 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${report.riskScore}%` }}></div>
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  {report.riskScore > 50 ? 'High probability of stray incidents. Caution advised.' : 'Zone is relatively safe. Routine caution only.'}
                </p>
              </div>

              {/* Environmental Factors */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                <div className="text-sm text-slate-400 font-bold uppercase mb-4">Environmental Scan</div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                    <span>🐕 Stray Density</span>
                    <span className={`font-bold ${report.strayDensity === 'High' ? 'text-red-400' : 'text-blue-400'}`}>{report.strayDensity}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                    <span>💡 Street Lighting</span>
                    <span className={`font-bold ${report.lighting === 'Poor' ? 'text-orange-400' : 'text-green-400'}`}>{report.lighting}</span>
                  </div>
                </div>
              </div>

              {/* Action Plan */}
              <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/30 rounded-2xl p-6">
                <div className="text-sm text-blue-300 font-bold uppercase mb-4">AI Recommendations</div>
                <ul className="space-y-2">
                  {report.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <span className="text-blue-500">✓</span> {rec}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-slate-700/50">
                  <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded transition-colors">
                    Request Municipality Action
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section: History & Exports */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* History Table */}
              <div className="md:col-span-2 bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="p-4 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="font-bold">Recent Nearby Incidents</h3>
                  <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">Last 30 Days</span>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="text-slate-500 border-b border-slate-800">
                    <tr>
                      <th className="p-4">Type</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {report.incidents.map((inc: any) => (
                      <tr key={inc.id} className="hover:bg-slate-800/30">
                        <td className="p-4 font-medium text-white">{inc.type}</td>
                        <td className="p-4 text-slate-400">{inc.date}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${inc.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {inc.severity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Export Tools */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col justify-center gap-4">
                <h3 className="font-bold text-center mb-2">Export Data</h3>
                
                <button 
                  onClick={downloadCSV}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group"
                >
                  📄 Download CSV
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
                </button>

                <button 
                  onClick={() => window.print()}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group"
                >
                  🖨️ Print PDF Report
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>

                <p className="text-xs text-center text-slate-500 mt-2">
                  Report generated via SDD Neural Cloud.
                  <br/>ID: #REQ-{Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
      
      {/* Animation Styles */}
      <style>{`
        @keyframes scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      `}</style>
    </div>
  );
};