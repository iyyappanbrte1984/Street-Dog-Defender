
import React from 'react';

export const TechSpecs: React.FC = () => {
  const specs = [
    { label: "Main Controller", value: "ESP32-WROOM-32 (Dual-Core 240MHz)" },
    { label: "Biometric Sensor", value: "MAX30102 High-Sensitivity Heart Rate & Pulse Oximeter" },
    { label: "Deterrent Array", value: "Triple 25kHz Piezo Transducers (115-120dB SPL)" },
    { label: "Voltage Driver", value: "MT3608 DC-DC Boost (3.7V to 15V output)" },
    { label: "Connectivity", value: "Wi-Fi + BLE + GSM (SIM800L Optional) + GPS (NEO-6M)" },
    { label: "Visual Defense", value: "High-Intensity White LED Strobe (12-15 Hz Pulsing)" },
    { label: "Battery", value: "500mAh Li-Po with TP4056 Protection & USB-C Charging" },
    { label: "Chassis", value: "SLA 3D Printed Industrial Resin (Water Resistant)" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 uppercase tracking-tight">Technical Specifications</h2>
        <p className="text-xl text-slate-600">Built with industrial-grade components for life-critical reliability.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 font-bold text-slate-500 uppercase tracking-widest text-xs">Feature Component</th>
                <th className="px-8 py-5 font-bold text-slate-500 uppercase tracking-widest text-xs">Specification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {specs.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-900">{s.label}</td>
                  <td className="px-8 py-5 text-slate-600">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div className="bg-orange-600 p-8 rounded-3xl text-white shadow-xl">
            <h4 className="text-2xl font-bold mb-4">Documentation</h4>
            <p className="text-orange-100 mb-8">Access our full strategic engineering reports and innovation pitch packs.</p>
            
            <div className="space-y-4">
              <button className="w-full bg-white text-orange-600 font-bold py-3 px-6 rounded-xl flex items-center justify-between hover:bg-orange-50 transition-all">
                Engineering Report
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
              <button className="w-full bg-orange-700/50 border border-orange-500 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-between hover:bg-orange-700 transition-all">
                Pitch Deck Pack
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
              <button className="w-full bg-orange-700/50 border border-orange-500 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-between hover:bg-orange-700 transition-all">
                School Pilot One-Pager
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-3xl text-white">
            <h4 className="text-xl font-bold mb-2">Prototype Status</h4>
            <div className="flex items-center gap-2 text-green-400 font-bold mb-4">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              V1.2 FIELD READY
            </div>
            <p className="text-slate-400 text-sm">Our current build is undergoing environmental stress testing in Salem and Kadayampatti.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
